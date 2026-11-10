/* Simple outlined icons in the Material style. Decorative: hidden from screen readers. */
const P = {
  about: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0',
  projects: 'm8 7-5 5 5 5M16 7l5 5-5 5M13.5 4l-3 16',
  experience: 'M4 8h16v11H4zM9 8V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V8M4 13h16',
  skills: 'M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17v3h3l5.3-5.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4Z',
  activity: 'M4 19V5M4 19h16M8 15v-3M12 15V8M16 15v-5',
  achievements: 'M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm-3.5 4.5L12 15l3.5 4.5M8.5 13.5 7 21l5-2.5 5 2.5-1.5-7.5',
  contact: 'M4 6h16v12H4zM4 7l8 6 8-6',
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'M6 6l12 12M18 6 6 18',
  sun: 'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4',
  moon: 'M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z',
  arrow: 'M7 17 17 7M9 7h8v8',
  pin: 'M12 21s-6-5.6-6-10.5a6 6 0 0 1 12 0C18 15.4 12 21 12 21Zm0-8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  copy: 'M9 9h10v11H9zM5 15V4h10',
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z',
  school: 'M3 9l9-5 9 5-9 5-9-5Zm4 2.5V16c0 1.5 2.2 3 5 3s5-1.5 5-3v-4.5',
  code: 'm8 7-5 5 5 5M16 7l5 5-5 5',
  star: 'm12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9Z',
  medal: 'M12 22a6 6 0 1 0 0-12 6 6 0 0 0 0 12ZM9 10 6 3h4l2 4 2-4h4l-3 7',
  bolt: 'M13 3 5 13h6l-1 8 8-10h-6l1-8Z',
  heartless: 'M4 6h16v12H4z',
}
export default function Icon({ name, className = 'h-6 w-6', ...rest }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...rest}>
      <path d={P[name] || P.heartless} />
    </svg>
  )
}
