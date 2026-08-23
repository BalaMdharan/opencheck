export type NavLink = { to: string; label: string };

export const NAV_LINKS: NavLink[] = [
  { to: "/", label: "Home" },
  { to: "/checker", label: "Checker" },
  { to: "/how-it-works", label: "How it works" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export const LEGAL_LINKS: NavLink[] = [
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms of Service" },
];
