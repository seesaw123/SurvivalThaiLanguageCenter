-- =============================================================================
-- SurvivalThai: limit admin access to a fixed list of admin accounts
-- =============================================================================
-- Run once in Supabase → SQL Editor. Safe to run again (idempotent).
--
-- BEFORE RUNNING: replace the two example emails in step 2 with the email
-- addresses of your two admins. Both must already exist under
-- Authentication → Users (create them there first if needed).
--
-- What it does
--   1. Creates a private `admins` list and an `is_admin()` check.
--   2. Adds your two admins to that list.
--   3. Adds RESTRICTIVE rules: a signed-in account that is NOT on the list can
--      no longer read private data (contact messages, teacher applications,
--      certificates) or change anything. Existing rules stay, but every
--      signed-in action must now also pass is_admin().
--   4. Adds rules that let the listed admins do everything the admin page needs
--      (including the new "Add a teacher" form and file uploads).
--   Public visitors are unaffected: they can still read the schedule, approved
--   teacher profiles and teacher photos, and send the contact form.
-- =============================================================================

begin;

-- 1. Admin list + check ---------------------------------------------------------
create table if not exists public.admins (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  email      text not null,
  created_at timestamptz not null default now()
);
alter table public.admins enable row level security;     -- no policies: unreadable via the API
revoke all on public.admins from anon, authenticated;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;
revoke all on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

-- 2. Your two admins (EDIT THESE EMAILS) ----------------------------------------
do $$
declare
  admin_emails text[] := array['first.admin@example.com', 'second.admin@example.com'];
  found int;
begin
  select count(*) into found from auth.users where lower(email) = any (select lower(e) from unnest(admin_emails) e);
  if found <> array_length(admin_emails, 1) then
    raise exception 'Found % of % admin accounts. Check the emails, and create missing users under Authentication → Users first.',
      found, array_length(admin_emails, 1);
  end if;
  -- the list contains exactly these accounts: anyone previously listed is removed
  delete from public.admins where lower(email) <> all (select lower(e) from unnest(admin_emails) e);
  insert into public.admins (user_id, email)
    select id, email from auth.users where lower(email) = any (select lower(e) from unnest(admin_emails) e)
  on conflict (user_id) do update set email = excluded.email;
end $$;

-- 3. Gate every signed-in action behind is_admin() (restrictive = must ALSO pass) --
-- Private tables: signed-in non-admins get nothing at all.
drop policy if exists "Only admins (signed in)" on public.inquiries;
create policy "Only admins (signed in)" on public.inquiries
  as restrictive for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Only admins (signed in)" on public.teacher_applications;
create policy "Only admins (signed in)" on public.teacher_applications
  as restrictive for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- Public tables: anyone may still READ; only admins may insert/update/delete.
do $$
declare t text; c text;
begin
  foreach t in array array['schedule_slots', 'teacher_profiles'] loop
    foreach c in array array['insert', 'update', 'delete'] loop
      execute format('drop policy if exists %I on public.%I', 'Only admins ' || c, t);
      if c = 'insert' then
        execute format('create policy %I on public.%I as restrictive for insert to authenticated with check (public.is_admin())', 'Only admins ' || c, t);
      elsif c = 'update' then
        execute format('create policy %I on public.%I as restrictive for update to authenticated using (public.is_admin()) with check (public.is_admin())', 'Only admins ' || c, t);
      else
        execute format('create policy %I on public.%I as restrictive for delete to authenticated using (public.is_admin())', 'Only admins ' || c, t);
      end if;
    end loop;
  end loop;
end $$;

-- Teacher files: signed-in non-admins cannot touch the two teacher buckets.
drop policy if exists "Teacher files: only admins (signed in)" on storage.objects;
create policy "Teacher files: only admins (signed in)" on storage.objects
  as restrictive for all to authenticated
  using (bucket_id not in ('teacher-photos', 'teacher-certificates') or public.is_admin())
  with check (bucket_id not in ('teacher-photos', 'teacher-certificates') or public.is_admin());

-- 4. Let the listed admins do everything the admin page needs --------------------
do $$
declare t text;
begin
  foreach t in array array['inquiries', 'teacher_applications', 'schedule_slots', 'teacher_profiles'] loop
    execute format('drop policy if exists %I on public.%I', 'Admins manage ' || t, t);
    execute format('create policy %I on public.%I for all to authenticated using (public.is_admin()) with check (public.is_admin())', 'Admins manage ' || t, t);
    execute format('grant select, insert, update, delete on public.%I to authenticated', t);
  end loop;
end $$;

drop policy if exists "Admins manage teacher files" on storage.objects;
create policy "Admins manage teacher files" on storage.objects
  for all to authenticated
  using (bucket_id in ('teacher-photos', 'teacher-certificates') and public.is_admin())
  with check (bucket_id in ('teacher-photos', 'teacher-certificates') and public.is_admin());

commit;

-- Check the result (should list your two admins):
select email, created_at from public.admins order by email;
