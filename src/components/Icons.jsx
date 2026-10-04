// Inline stroke icons used across the site.
const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

function Svg({ size = 20, sw = 2, children, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={sw} {...base} {...rest}>
      {children}
    </svg>
  );
}

export const ArrowIcon = (p) => <Svg size={18} sw={2.2} {...p}><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></Svg>;
export const ChevronIcon = (p) => <Svg size={16} {...p}><path d="M9 18l6-6-6-6" /></Svg>;
export const ChevronDownIcon = (p) => <Svg size={18} sw={2.2} {...p}><path d="M6 9l6 6 6-6" /></Svg>;
export const PrevIcon = (p) => <Svg {...p}><path d="M15 18l-6-6 6-6" /></Svg>;
export const NextIcon = (p) => <Svg {...p}><path d="M9 18l6-6-6-6" /></Svg>;
export const CheckIcon = (p) => <Svg sw={2.4} {...p}><path d="M5 12.5l4.5 4.5L19 7.5" /></Svg>;
export const PlusIcon = (p) => <Svg size={18} sw={2.4} {...p}><path d="M12 5v14" /><path d="M5 12h14" /></Svg>;
export const MenuIcon = (p) => <Svg sw={2.2} {...p}><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></Svg>;
export const CloseIcon = (p) => <Svg sw={2.2} {...p}><path d="M6 6l12 12" /><path d="M18 6L6 18" /></Svg>;
export const GlobeIcon = (p) => (
  <Svg size={18} {...p}>
    <circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18z" />
  </Svg>
);
export const PinIcon = (p) => (
  <Svg size={22} {...p}>
    <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" />
  </Svg>
);
export const PhoneIcon = (p) => (
  <Svg size={22} {...p}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
  </Svg>
);
export const ChatIcon = (p) => (
  <Svg size={22} {...p}><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" /></Svg>
);
export const ClockIcon = (p) => (
  <Svg size={22} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Svg>
);
export const DiceIcon = (p) => (
  <Svg size={18} sw={2.2} {...p}>
    <rect x="4" y="4" width="16" height="16" rx="4" />
    <circle cx="9" cy="9" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="15" cy="9" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="9" cy="15" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="15" cy="15" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" />
  </Svg>
);

// Illustrations for the six phrase cards (48×48 grid).
const PICTURES = {
  hello: (
    <>
      <path d="M18 41c-6-5-8-11-6-16l2-2 4 6V12a2.5 2.5 0 0 1 5 0v10V9a2.5 2.5 0 0 1 5 0v13V11a2.5 2.5 0 0 1 5 0v13v-8a2.5 2.5 0 0 1 5 0v14c0 7-5 12-12 12h-4c-1.5 0-3-.3-4-1z" />
      <path className="wave" d="M9 12c-2 3-2 6 0 9" />
      <path className="wave" d="M5 9c-4 5-4 11 0 16" />
    </>
  ),
  thanks: (
    <>
      <path d="M24 6c-4 4-7 12-7 20v10c0 4 3 6 7 6s7-2 7-6V26c0-8-3-16-7-20z" />
      <path d="M24 10v31" />
      <path className="pop" d="M40 15l-4-4c-2-2.5 1-5.5 4-2.5 3-3 6 0 4 2.5z" />
    </>
  ),
  price: (
    <>
      <path d="M27 6h13a2 2 0 0 1 2 2v13L22 41a2 2 0 0 1-3 0L7 29a2 2 0 0 1 0-3z" />
      <circle cx="35" cy="13" r="2.5" />
      <text x="20.5" y="30" fontSize="14" fontWeight="700" fill="currentColor" stroke="none" textAnchor="middle"
        fontFamily="Instrument Sans,sans-serif" transform="rotate(-45 20.5 25)">฿</text>
    </>
  ),
  chili: (
    <>
      <path d="M12 37c12 0 22-10 22-22 0-3 3-4 4-1 0 15-12 26-26 25z" />
      <path d="M34 15c-1-5 2-8 6-8" />
      <circle className="no" cx="24" cy="24" r="20" />
      <path className="no" d="M10 10l28 28" />
    </>
  ),
  toilet: (
    <>
      <rect x="14" y="7" width="20" height="10" rx="2" />
      <path d="M11 21h26c0 8-5 13-13 13s-13-5-13-13z" />
      <path d="M18 33l-1 9h14l-1-9" />
      <path className="pop" d="M41 6c2 3 3 4 3 6a3 3 0 0 1-6 0c0-2 1-3 3-6z" />
    </>
  ),
  smile: (
    <>
      <circle cx="24" cy="24" r="18" />
      <path d="M15 21c2-2.5 5-2.5 7 0" />
      <path d="M26 21c2-2.5 5-2.5 7 0" />
      <path className="pop" d="M16 29c4 6 12 6 16 0" />
    </>
  ),
};

export function PhrasePicture({ name, size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" strokeWidth={2.5} {...base}>
      {PICTURES[name]}
    </svg>
  );
}
