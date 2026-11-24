import { images } from "./images";

export type NavLink = { href: string; label: string; description?: string };
export type NavGroup = {
  label: string;
  href: string;
  intro: string;
  links: NavLink[];
  feature?: { title: string; href: string; image: string; cta: string };
};

/** Primary navigation — grouped by what a visitor wants to do. */
export const navGroups: NavGroup[] = [
  {
    label: "Play",
    href: "/play",
    intro: "Pick up a racket, find a club near you, or bring badminton to your school.",
    links: [
      { href: "/play", label: "Get into badminton", description: "First steps for juniors and adults" },
      { href: "/play#clubs", label: "Find a club", description: "Affiliated clubs in all 8 divisions" },
      { href: "/play#para", label: "Para badminton", description: "Classification and inclusive sessions" },
      { href: "/play#schools", label: "Schools and Shuttle Time", description: "Teaching resources for PE staff" },
      { href: "/rules", label: "Laws of the game", description: "Scoring, service and court basics" },
    ],
    feature: {
      title: "Free come-and-play sessions every Friday in Dhaka and Chattogram",
      href: "/play#sessions",
      image: images.outdoor,
      cta: "See session times",
    },
  },
  {
    label: "Compete",
    href: "/events",
    intro: "The national calendar, live entries, results and official rankings.",
    links: [
      { href: "/events", label: "Calendar", description: "National, junior and para events" },
      { href: "/results", label: "Results", description: "Finals and medal tables by event" },
      { href: "/rankings", label: "National rankings", description: "All five disciplines, updated weekly" },
      { href: "/events#how-to-enter", label: "How to enter", description: "Entry rules, deadlines and fees" },
      { href: "/membership#player-id", label: "Player ID lookup", description: "Check your BBF registration" },
    ],
    feature: {
      title: "National Championships 2026: entries close 6 December",
      href: "/events/national-championships-2026",
      image: images.senior,
      cta: "Event details",
    },
  },
  {
    label: "Teams",
    href: "/players",
    intro: "The athletes who represent Bangladesh and the pathway that builds them.",
    links: [
      { href: "/players", label: "National squad", description: "Senior and junior player profiles" },
      { href: "/players#pathway", label: "Athlete pathway", description: "From district trials to international selection" },
      { href: "/players#selection", label: "Selection policy", description: "How squads are chosen" },
      { href: "/about#honours", label: "Honours", description: "Medals and national champions" },
    ],
  },
  {
    label: "Get involved",
    href: "/membership",
    intro: "Register as a player, coach, official, club or volunteer.",
    links: [
      { href: "/membership", label: "Membership and registration", description: "Players, clubs and associations" },
      { href: "/coaching", label: "Coach zone", description: "Licensing levels and courses" },
      { href: "/coaching#officials", label: "Umpire and referee zone", description: "Technical official education" },
      { href: "/membership#volunteer", label: "Volunteer", description: "Help run events across the country" },
      { href: "/partners", label: "Partner with us", description: "Sponsorship and supporters" },
    ],
  },
  {
    label: "Federation",
    href: "/about",
    intro: "Who we are, how we are governed, and how we keep the sport clean.",
    links: [
      { href: "/about", label: "About BBF", description: "Mission, history and affiliations" },
      { href: "/governance", label: "Governance", description: "Executive committee and standing committees" },
      { href: "/governance#documents", label: "Documents and reports", description: "Constitution, AGM minutes, accounts" },
      { href: "/integrity", label: "Integrity", description: "Anti-doping, safeguarding, match-fixing" },
      { href: "/governance#notices", label: "Tenders and careers", description: "Open notices and vacancies" },
    ],
  },
  {
    label: "News",
    href: "/news",
    intro: "Federation announcements, results stories and the photo archive.",
    links: [
      { href: "/news", label: "Latest news", description: "Announcements and match reports" },
      { href: "/media", label: "Photos and video", description: "Galleries from recent events" },
      { href: "/contact#media", label: "Press office", description: "Accreditation and media contacts" },
    ],
  },
];

export const utilityLinks: NavLink[] = [
  { href: "/integrity#report", label: "Report a concern" },
  { href: "/governance#documents", label: "Downloads" },
  { href: "/contact", label: "Contact" },
];

export const socials = [
  { label: "Facebook", href: "https://www.facebook.com/" },
  { label: "YouTube", href: "https://www.youtube.com/" },
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "X", href: "https://x.com/" },
] as const;

export const contact = {
  address: "Dhaka, Bangladesh",
  email: "info@badmintonbd.org",
  media: "media@badmintonbd.org",
  integrity: "integrity@badmintonbd.org",
  phone: "+880 2 0000 0000",
  hours: "Sunday to Thursday, 9:30 to 17:00",
};
