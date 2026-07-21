import { images } from "./images";

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/athletes", label: "Athletes" },
  { href: "/events", label: "Events" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
] as const;

export const programs = [
  {
    id: "01",
    title: "National Teams",
    description:
      "Elite pathways for senior and junior athletes representing Bangladesh on the international stage.",
    image: images.smash,
    href: "/athletes",
  },
  {
    id: "02",
    title: "Youth Development",
    description:
      "Grassroots academies and age-group circuits that identify talent early and develop it with care.",
    image: images.junior,
    href: "/athletes",
  },
  {
    id: "03",
    title: "Coaching & Officials",
    description:
      "Certification, education, and standards that raise the quality of play across every district.",
    image: images.coach,
    href: "/about",
  },
] as const;

export const newsItems = [
  {
    slug: "national-championships-2026",
    title: "National Championships 2026: Full Results",
    excerpt:
      "Top seeds delivered under pressure as Bangladesh’s ranking circuit crowned new champions in Dhaka.",
    date: "22 Jul 2026",
    image: images.news1,
    category: "Results",
  },
  {
    slug: "junior-selection-camp",
    title: "Junior Selection Camp Opens in Chattogram",
    excerpt:
      "Eighty athletes shortlisted for the next BWF-aligned junior pathway under national coaches.",
    date: "18 Jul 2026",
    image: images.news2,
    category: "Development",
  },
  {
    slug: "international-open-call",
    title: "Host Call: Bangladesh International Challenge",
    excerpt:
      "Associations and venues invited to submit expressions of interest for the 2027 calendar.",
    date: "12 Jul 2026",
    image: images.news3,
    category: "Events",
  },
] as const;

export const events = [
  {
    title: "Bangladesh National Championships",
    location: "Dhaka",
    date: "12–18 Aug 2026",
    type: "National",
  },
  {
    title: "Junior Ranking Circuit — Round 3",
    location: "Sylhet",
    date: "5–7 Sep 2026",
    type: "Junior",
  },
  {
    title: "Coaches Education Workshop",
    location: "Rajshahi",
    date: "20 Sep 2026",
    type: "Education",
  },
  {
    title: "Para Badminton Open",
    location: "Chattogram",
    date: "10–12 Oct 2026",
    type: "Para",
  },
] as const;

export const athleteTracks = [
  {
    title: "Youth Athlete",
    description: "Age-group pathways, school circuits, and junior national camps.",
    image: images.junior,
  },
  {
    title: "Senior Athlete",
    description: "National ranking, international entries, and high-performance support.",
    image: images.athletes,
  },
  {
    title: "Para Athlete",
    description: "Classification, competition calendar, and inclusive development pathways.",
    image: images.para,
  },
  {
    title: "Coach",
    description: "Licensing, continuous education, and national coaching frameworks.",
    image: images.coach,
  },
] as const;
