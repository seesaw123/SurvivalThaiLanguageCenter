import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient.js';

// Loads the class schedule from Supabase and keeps it live: any row a teacher
// adds, edits or removes in the Supabase table editor appears here within moments,
// no redeploy needed.
export function useSchedule() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const load = async () => {
      const { data, error } = await supabase
        .from('schedule_slots')
        .select('*')
        .order('sort_order', { ascending: true });
      if (!active) return;
      if (!error) setRows(data);
      setLoading(false);
    };
    load();

    const channel = supabase
      .channel('schedule_slots_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'schedule_slots' }, load)
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, []);

  return { rows, loading };
}
