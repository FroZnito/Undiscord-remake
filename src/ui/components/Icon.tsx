const CIRCLE = 'M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18z';

const PATHS = {
  trash: ['M3 6h18', 'M8 6V4h8v2', 'M19 6l-1 14H6L5 6', 'M10 11v6', 'M14 11v6'],
  sparkles: ['M12 3l1.8 4.7 4.7 1.8-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z', 'M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z'],
  hash: ['M4 9h16', 'M4 15h16', 'M10 3L8 21', 'M16 3l-2 18'],
  message: ['M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z'],
  users: ['M16 20v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1', 'M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0', 'M22 20v-1a4 4 0 0 0-3-3.9', 'M16 3.1a4 4 0 0 1 0 7.8'],
  server: ['M6 3h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z', 'M6 14h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2z', 'M8 6.5h.01', 'M8 17.5h.01'],
  list: ['M9 6h12', 'M9 12h12', 'M9 18h12', 'M4 6h.01', 'M4 12h.01', 'M4 18h.01'],
  package: ['M21 8l-9-5-9 5 9 5 9-5z', 'M3 8v8l9 5 9-5V8', 'M12 13v8', 'M7.5 5.5l9 5'],
  archive: ['M3 4h18v4H3z', 'M5 8v12h14V8', 'M10 12h4'],
  log: ['M14 3H6v18h12V7z', 'M14 3v4h4', 'M9 13h6', 'M9 17h6', 'M9 9h1'],
  sliders: ['M4 21v-7', 'M4 10V3', 'M12 21v-9', 'M12 8V3', 'M20 21v-5', 'M20 12V3', 'M1 14h6', 'M9 8h6', 'M17 16h6'],
  x: ['M18 6L6 18', 'M6 6l12 12'],
  minus: ['M5 12h14'],
  play: ['M7 4l13 8-13 8z'],
  pause: ['M7 4h3v16H7z', 'M14 4h3v16h-3z'],
  stop: ['M6 6h12v12H6z'],
  eye: ['M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z', 'M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0'],
  filter: ['M3 5h18l-7 8v6l-4 2v-8z'],
  chevronDown: ['M6 9l6 6 6-6'],
  chevronLeft: ['M15 18l-6-6 6-6'],
  check: ['M5 12l5 5 9-10'],
  search: ['M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14z', 'M21 21l-5-5'],
  refresh: ['M21 12a9 9 0 1 1-2.6-6.4', 'M21 3v6h-6'],
  download: ['M12 3v12', 'M7 10l5 5 5-5', 'M5 21h14'],
  copy: ['M9 9h11v11H9z', 'M5 15H4V4h11v1'],
  crosshair: [CIRCLE, 'M12 2v5', 'M12 17v5', 'M2 12h5', 'M17 12h5'],
  clock: [CIRCLE, 'M12 7v5l3 2'],
  alert: ['M12 3l10 18H2z', 'M12 10v4', 'M12 17h.01'],
  info: [CIRCLE, 'M12 11v5', 'M12 8h.01'],
  checkCircle: [CIRCLE, 'M8 12l3 3 5-6'],
  xCircle: [CIRCLE, 'M9 9l6 6', 'M15 9l-6 6'],
  skip: [CIRCLE, 'M8 12h8'],
  upload: ['M12 21V9', 'M7 14l5-5 5 5', 'M5 3h14'],
  folder: ['M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'],
  shield: ['M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z', 'M9 12l2 2 4-4'],
  zap: ['M13 2L4 14h7l-1 8 9-12h-7z'],
  key: ['M8 20a4 4 0 1 1 0-8 4 4 0 0 1 0 8z', 'M11 13l9-9', 'M16 8l3 3', 'M18 6l2 2'],
  history: ['M3 12a9 9 0 1 0 3-6.7L3 8', 'M3 3v5h5', 'M12 7v5l4 2'],
  external: ['M14 4h6v6', 'M20 4l-9 9', 'M18 14v6H4V6h6'],
  bell: ['M18 16H6l1.5-2V10a4.5 4.5 0 0 1 9 0v4z', 'M10 19a2 2 0 0 0 4 0'],
  calendar: ['M4 6h16v15H4z', 'M4 10h16', 'M9 3v4', 'M15 3v4'],
  paperclip: ['M21 11l-8.5 8.5a5 5 0 0 1-7-7L14 4a3.5 3.5 0 0 1 5 5l-8.5 8.5a2 2 0 0 1-3-3L15 7'],
  pin: ['M9 4h6l-1 6 4 3H6l4-3z', 'M12 13v8'],
  user: ['M20 21a8 8 0 0 0-16 0', 'M16 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0'],
  globe: [CIRCLE, 'M3 12h18', 'M12 3a14 14 0 0 1 0 18', 'M12 3a14 14 0 0 0 0 18'],
  sort: ['M7 4v16', 'M3 16l4 4 4-4', 'M14 6h7', 'M14 12h5', 'M14 18h3'],
} as const;

export type IconName = keyof typeof PATHS;

export function Icon({ name, size, class: cls }: { name: IconName; size?: 'sm' | 'lg'; class?: string }) {
  return (
    <svg
      class={`icon${size ? ` ${size}` : ''}${cls ? ` ${cls}` : ''}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      {PATHS[name].map(d => <path d={d} />)}
    </svg>
  );
}
