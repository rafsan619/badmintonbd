import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const IconSearch = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);
export const IconArrow = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
export const IconChevron = (p: P) => (
  <svg {...base} {...p}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);
export const IconClose = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const IconPin = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);
export const IconCalendar = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="5" width="17" height="15" rx="2" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </svg>
);
export const IconDownload = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
  </svg>
);
export const IconUp = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </svg>
);
export const IconCheck = (p: P) => (
  <svg {...base} {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);
export const IconPlus = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

/** Shuttlecock glyph drawn to match the crest: feathered skirt, round cork. */
export const Shuttle = (p: P) => (
  <svg viewBox="0 0 40 48" fill="none" aria-hidden {...p}>
    <path
      d="M4 6 L14 34 M12 3 L17 34 M20 2 L20 34 M28 3 L23 34 M36 6 L26 34"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path d="M4 6 Q20 -1 36 6" stroke="currentColor" strokeWidth="2.2" fill="none" />
    <path d="M13 33h14v4H13z" fill="currentColor" />
    <path d="M13 37h14v2a7 7 0 0 1-14 0z" fill="currentColor" />
  </svg>
);
