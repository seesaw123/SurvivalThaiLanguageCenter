// Convert Western digits to Myanmar digits: 2024 -> ၂၀၂၄
export function toMyDigits(n) {
  const digits = '၀၁၂၃၄၅၆၇၈၉';
  return String(n).replace(/[0-9]/g, (d) => digits[+d]);
}

// Safe localStorage helpers (storage can be blocked in private windows).
export function load(key, fallback) {
  try {
    const v = localStorage.getItem('st-' + key);
    return v == null ? fallback : v;
  } catch {
    return fallback;
  }
}

export function save(key, value) {
  try {
    localStorage.setItem('st-' + key, value);
  } catch {
    /* ignore */
  }
}

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
