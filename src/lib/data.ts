/**
 * SAMPLE CONTENT — every name, date, score and figure in this file is placeholder
 * copy for layout purposes. Replace with official BBF records before launch.
 */
import { images } from "./images";

export const divisions = [
  "Dhaka",
  "Chattogram",
  "Rajshahi",
  "Khulna",
  "Barishal",
  "Sylhet",
  "Rangpur",
  "Mymensingh",
] as const;
export type Division = (typeof divisions)[number];

/* ---------------------------------------------------------------- News */

export type NewsItem = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  image: string;
  category: "Results" | "Development" | "Events" | "Federation" | "Integrity";
  body: string[];
};

export const newsItems: NewsItem[] = [
  {
    slug: "national-championships-2026-entries-open",
    title: "Entries open for the 2026 National Championships",
    excerpt:
      "Five disciplines, three age groups and a new para category. Entries close on 6 December.",
    date: "2026-11-20",
    image: images.senior,
    category: "Events",
    body: [
      "Entries are now open for the 2026 Bangladesh National Championships, which will be held in Dhaka from 15 to 21 December.",
      "Senior, under-19 and under-15 draws will be played in all five disciplines. For the first time, a para singles category will run alongside the main event, in line with the federation's inclusion plan.",
      "Players must hold a current BBF player ID to enter. You can check your registration status online before submitting your entry through your division association.",
      "Seeding will be based on the national ranking list published on 1 December.",
    ],
  },
  {
    slug: "junior-selection-camp-chattogram",
    title: "Eighty juniors called up for the Chattogram selection camp",
    excerpt:
      "Players from all eight divisions will train under national coaches ahead of the Asia junior qualifiers.",
    date: "2026-11-12",
    image: images.smash,
    category: "Development",
    body: [
      "Eighty under-17 and under-19 players have been invited to a two-week selection camp in Chattogram.",
      "The camp combines on-court sessions, physical testing and match play. Final squads for the Asia junior qualifiers will be named at the end of the camp.",
      "Parents and guardians will receive a welfare briefing on the first day, covering accommodation, supervision and the federation's safeguarding policy.",
    ],
  },
  {
    slug: "dhaka-division-league-final-results",
    title: "Dhaka Division League: final day results",
    excerpt: "Mirpur Shuttlers retain the team title after a deciding mixed doubles.",
    date: "2026-11-03",
    image: images.lunge,
    category: "Results",
    body: [
      "Mirpur Shuttlers retained the Dhaka Division League title after winning the final tie 3–2 against Uttara Smash Academy.",
      "The tie went to a deciding mixed doubles, which Mirpur took in three games.",
      "Full scores for every round are available on the results page.",
    ],
  },
  {
    slug: "coach-level-one-courses-2027",
    title: "Coach Level 1 courses announced for early 2027",
    excerpt: "Six courses across Rajshahi, Khulna, Sylhet and Rangpur. Registration opens 1 December.",
    date: "2026-10-28",
    image: images.court,
    category: "Development",
    body: [
      "The federation will run six Coach Level 1 courses between January and March 2027.",
      "The course is the entry point to the national coaching licence and follows the BWF coach education framework.",
      "Places are limited to 24 per course. Club-nominated candidates will be prioritised.",
    ],
  },
  {
    slug: "anti-doping-education-week",
    title: "Clean sport education week for national squad players",
    excerpt:
      "All squad members complete anti-doping and whereabouts training before the international season.",
    date: "2026-10-15",
    image: images.overhead,
    category: "Integrity",
    body: [
      "Every member of the senior and junior national squads completed anti-doping education this month.",
      "Sessions covered the prohibited list, therapeutic use exemptions and whereabouts obligations.",
      "Players and support staff can find the same material on the integrity page.",
    ],
  },
  {
    slug: "bangladesh-international-challenge-host-call",
    title: "Venues invited to host the 2027 Bangladesh International Challenge",
    excerpt: "Expressions of interest close on 15 January 2027.",
    date: "2026-10-02",
    image: images.shuttleNet,
    category: "Federation",
    body: [
      "The federation invites venues and division associations to submit expressions of interest to host the 2027 Bangladesh International Challenge.",
      "Venues need at least four courts meeting BWF lighting and floor requirements, plus warm-up space and broadcast positions.",
      "The full tender document is available in the documents section.",
    ],
  },
];

/* -------------------------------------------------------------- Events */

export type EventType = "National" | "International" | "Junior" | "Para" | "Education";
export type EventItem = {
  slug: string;
  title: string;
  type: EventType;
  city: string;
  venue: string;
  start: string; // ISO date
  end: string;
  entryDeadline?: string;
  categories: string[];
  summary: string;
};

export const events: EventItem[] = [
  {
    slug: "national-championships-2026",
    title: "Bangladesh National Championships",
    type: "National",
    city: "Dhaka",
    venue: "Shaheed Suhrawardy Indoor Stadium",
    start: "2026-12-15",
    end: "2026-12-21",
    entryDeadline: "2026-12-06",
    categories: ["Senior", "U19", "U15", "Para singles"],
    summary:
      "The flagship national event. Titles in all five disciplines and ranking points at the highest national grade.",
  },
  {
    slug: "junior-circuit-sylhet",
    title: "Junior Ranking Circuit: Sylhet",
    type: "Junior",
    city: "Sylhet",
    venue: "Sylhet Divisional Indoor Stadium",
    start: "2027-01-09",
    end: "2027-01-11",
    entryDeadline: "2026-12-28",
    categories: ["U13", "U15", "U17", "U19"],
    summary: "Round one of the 2027 junior circuit. Results count towards junior squad selection.",
  },
  {
    slug: "coach-level-1-rajshahi",
    title: "Coach Level 1 course",
    type: "Education",
    city: "Rajshahi",
    venue: "Rajshahi Division Sports Complex",
    start: "2027-01-23",
    end: "2027-01-26",
    entryDeadline: "2027-01-10",
    categories: ["Coaches"],
    summary: "Four-day entry-level coaching course. Successful candidates receive a Level 1 licence.",
  },
  {
    slug: "para-badminton-open-2027",
    title: "Para Badminton Open",
    type: "Para",
    city: "Chattogram",
    venue: "Chattogram Indoor Stadium",
    start: "2027-02-12",
    end: "2027-02-14",
    entryDeadline: "2027-01-29",
    categories: ["WH1–WH2", "SL3–SU5", "SH6"],
    summary: "Open para competition with on-site classification for new players.",
  },
  {
    slug: "bangladesh-international-challenge-2027",
    title: "Bangladesh International Challenge",
    type: "International",
    city: "Dhaka",
    venue: "Venue to be confirmed",
    start: "2027-03-18",
    end: "2027-03-22",
    categories: ["Senior"],
    summary: "BWF-sanctioned international event with world ranking points.",
  },
  {
    slug: "umpire-assessment-khulna",
    title: "National umpire assessment",
    type: "Education",
    city: "Khulna",
    venue: "Khulna Division Stadium",
    start: "2027-04-05",
    end: "2027-04-06",
    entryDeadline: "2027-03-20",
    categories: ["Technical officials"],
    summary: "Practical and written assessment for candidates moving to national umpire grade.",
  },
];

/* ------------------------------------------------------------- Results */

export type Final = { discipline: string; winner: string; runnerUp: string; score: string };
export type ResultSet = { event: string; date: string; city: string; finals: Final[] };

export const results: ResultSet[] = [
  {
    event: "Dhaka Division League",
    date: "2026-11-02",
    city: "Dhaka",
    finals: [
      { discipline: "Team final", winner: "Mirpur Shuttlers", runnerUp: "Uttara Smash Academy", score: "3–2" },
    ],
  },
  {
    event: "Independence Day Open",
    date: "2026-09-20",
    city: "Chattogram",
    finals: [
      { discipline: "Men's singles", winner: "Arif Hossain", runnerUp: "Tanvir Ahmed", score: "21–17, 18–21, 21–15" },
      { discipline: "Women's singles", winner: "Nusrat Jahan", runnerUp: "Sadia Islam", score: "21–14, 21–19" },
      { discipline: "Men's doubles", winner: "Rahman / Karim", runnerUp: "Uddin / Sarkar", score: "21–19, 21–18" },
      { discipline: "Women's doubles", winner: "Akter / Khatun", runnerUp: "Begum / Parvin", score: "19–21, 21–16, 21–12" },
      { discipline: "Mixed doubles", winner: "Hossain / Jahan", runnerUp: "Rahman / Akter", score: "21–15, 21–13" },
    ],
  },
  {
    event: "Junior Ranking Circuit: Final",
    date: "2026-08-14",
    city: "Rajshahi",
    finals: [
      { discipline: "Boys' U19 singles", winner: "Imran Kabir", runnerUp: "Shakil Mia", score: "21–18, 21–16" },
      { discipline: "Girls' U19 singles", winner: "Tasnim Ara", runnerUp: "Mim Chowdhury", score: "21–12, 17–21, 21–19" },
      { discipline: "Boys' U17 singles", winner: "Rafi Hasan", runnerUp: "Joy Das", score: "21–10, 21–14" },
    ],
  },
];

/* ------------------------------------------------------------- Players */

export type Discipline = "MS" | "WS" | "MD" | "WD" | "XD";
export const disciplineNames: Record<Discipline, string> = {
  MS: "Men's singles",
  WS: "Women's singles",
  MD: "Men's doubles",
  WD: "Women's doubles",
  XD: "Mixed doubles",
};

export type Player = {
  slug: string;
  name: string;
  squad: "Senior" | "Junior" | "Para";
  disciplines: Discipline[];
  division: Division;
  born: number;
  hand: "Right" | "Left";
  club: string;
  nationalRank: number;
  bio: string;
  highlights: string[];
};

export const players: Player[] = [
  {
    slug: "arif-hossain", name: "Arif Hossain", squad: "Senior", disciplines: ["MS", "XD"], division: "Dhaka",
    born: 2000, hand: "Right", club: "Mirpur Shuttlers", nationalRank: 1,
    bio: "An attacking singles player known for his steep smash and fast recovery to the net.",
    highlights: ["National champion, men's singles 2025", "Independence Day Open winner 2026"],
  },
  {
    slug: "nusrat-jahan", name: "Nusrat Jahan", squad: "Senior", disciplines: ["WS", "XD"], division: "Chattogram",
    born: 2002, hand: "Right", club: "Port City Badminton Club", nationalRank: 1,
    bio: "A patient, deceptive player who builds rallies from the rear court.",
    highlights: ["National champion, women's singles 2024 and 2025", "South Asian Games squad member"],
  },
  {
    slug: "tanvir-ahmed", name: "Tanvir Ahmed", squad: "Senior", disciplines: ["MS"], division: "Sylhet",
    born: 2001, hand: "Left", club: "Sylhet Smashers", nationalRank: 2,
    bio: "Left-handed singles specialist with a strong cross-court defence.",
    highlights: ["Runner-up, Independence Day Open 2026"],
  },
  {
    slug: "sadia-islam", name: "Sadia Islam", squad: "Senior", disciplines: ["WS", "WD"], division: "Rajshahi",
    born: 2003, hand: "Right", club: "Padma Badminton Academy", nationalRank: 2,
    bio: "Moved up from the junior squad in 2024 and now plays both singles and doubles.",
    highlights: ["Junior national champion 2021"],
  },
  {
    slug: "mahmud-rahman", name: "Mahmud Rahman", squad: "Senior", disciplines: ["MD", "XD"], division: "Dhaka",
    born: 1998, hand: "Right", club: "Uttara Smash Academy", nationalRank: 1,
    bio: "Front-court doubles player and squad vice-captain.",
    highlights: ["National men's doubles champion 2023–2025"],
  },
  {
    slug: "kamal-karim", name: "Kamal Karim", squad: "Senior", disciplines: ["MD"], division: "Khulna",
    born: 1999, hand: "Left", club: "Khulna Racket Club", nationalRank: 1,
    bio: "Rear-court power player in the top men's doubles pair.",
    highlights: ["National men's doubles champion 2023–2025"],
  },
  {
    slug: "rumana-akter", name: "Rumana Akter", squad: "Senior", disciplines: ["WD", "XD"], division: "Barishal",
    born: 2001, hand: "Right", club: "Barishal Badminton Club", nationalRank: 1,
    bio: "Doubles specialist with quick hands at the net.",
    highlights: ["Women's doubles champion, Independence Day Open 2026"],
  },
  {
    slug: "farzana-khatun", name: "Farzana Khatun", squad: "Senior", disciplines: ["WD"], division: "Rangpur",
    born: 2000, hand: "Right", club: "Rangpur Shuttle Club", nationalRank: 1,
    bio: "Consistent rear-court player in the leading women's doubles pair.",
    highlights: ["Women's doubles champion, Independence Day Open 2026"],
  },
  {
    slug: "imran-kabir", name: "Imran Kabir", squad: "Junior", disciplines: ["MS"], division: "Mymensingh",
    born: 2008, hand: "Right", club: "Mymensingh Youth Badminton", nationalRank: 6,
    bio: "Top-ranked under-19 player, training with the senior squad twice a week.",
    highlights: ["Junior circuit final winner, U19 singles 2026"],
  },
  {
    slug: "tasnim-ara", name: "Tasnim Ara", squad: "Junior", disciplines: ["WS", "WD"], division: "Dhaka",
    born: 2009, hand: "Left", club: "Mirpur Shuttlers", nationalRank: 5,
    bio: "Left-handed junior with a sharp net game.",
    highlights: ["Junior circuit final winner, U19 singles 2026"],
  },
  {
    slug: "rafi-hasan", name: "Rafi Hasan", squad: "Junior", disciplines: ["MS"], division: "Rajshahi",
    born: 2010, hand: "Right", club: "Padma Badminton Academy", nationalRank: 14,
    bio: "Under-17 player selected for the Asia junior qualifiers camp.",
    highlights: ["Junior circuit final winner, U17 singles 2026"],
  },
  {
    slug: "shahidul-alam", name: "Shahidul Alam", squad: "Para", disciplines: ["MS"], division: "Chattogram",
    born: 1995, hand: "Right", club: "Port City Badminton Club", nationalRank: 1,
    bio: "Wheelchair (WH2) player and a founding member of the para programme.",
    highlights: ["Para Badminton Open champion 2025"],
  },
];

/* ------------------------------------------------------------ Rankings */

export type RankRow = { rank: number; name: string; division: Division; points: number; move: number; slug?: string };

export const rankings: Record<Discipline, RankRow[]> = {
  MS: [
    { rank: 1, name: "Arif Hossain", division: "Dhaka", points: 18420, move: 0, slug: "arif-hossain" },
    { rank: 2, name: "Tanvir Ahmed", division: "Sylhet", points: 16910, move: 1, slug: "tanvir-ahmed" },
    { rank: 3, name: "Sajib Uddin", division: "Khulna", points: 16100, move: -1 },
    { rank: 4, name: "Nayeem Sarkar", division: "Dhaka", points: 14250, move: 0 },
    { rank: 5, name: "Habib Mollah", division: "Rangpur", points: 12980, move: 2 },
    { rank: 6, name: "Imran Kabir", division: "Mymensingh", points: 12300, move: 3, slug: "imran-kabir" },
    { rank: 7, name: "Rakib Hasan", division: "Barishal", points: 11840, move: -2 },
    { rank: 8, name: "Ashik Roy", division: "Rajshahi", points: 10920, move: -1 },
  ],
  WS: [
    { rank: 1, name: "Nusrat Jahan", division: "Chattogram", points: 19050, move: 0, slug: "nusrat-jahan" },
    { rank: 2, name: "Sadia Islam", division: "Rajshahi", points: 17200, move: 0, slug: "sadia-islam" },
    { rank: 3, name: "Mim Chowdhury", division: "Sylhet", points: 14800, move: 2 },
    { rank: 4, name: "Sharmin Sultana", division: "Dhaka", points: 14010, move: -1 },
    { rank: 5, name: "Tasnim Ara", division: "Dhaka", points: 13260, move: 4, slug: "tasnim-ara" },
    { rank: 6, name: "Lima Begum", division: "Khulna", points: 12100, move: -2 },
    { rank: 7, name: "Ritu Parvin", division: "Barishal", points: 11030, move: -1 },
    { rank: 8, name: "Shathi Rani", division: "Rangpur", points: 10440, move: 0 },
  ],
  MD: [
    { rank: 1, name: "Mahmud Rahman / Kamal Karim", division: "Dhaka", points: 20100, move: 0, slug: "mahmud-rahman" },
    { rank: 2, name: "Jahid Uddin / Nayeem Sarkar", division: "Dhaka", points: 17640, move: 0 },
    { rank: 3, name: "Rakib Hasan / Ashik Roy", division: "Barishal", points: 15220, move: 1 },
    { rank: 4, name: "Sohel Mia / Babul Das", division: "Sylhet", points: 14980, move: -1 },
    { rank: 5, name: "Faisal Ahmed / Rony Paul", division: "Chattogram", points: 12030, move: 0 },
  ],
  WD: [
    { rank: 1, name: "Rumana Akter / Farzana Khatun", division: "Barishal", points: 18730, move: 0, slug: "rumana-akter" },
    { rank: 2, name: "Lima Begum / Ritu Parvin", division: "Khulna", points: 16550, move: 0 },
    { rank: 3, name: "Sadia Islam / Mim Chowdhury", division: "Rajshahi", points: 15100, move: 2 },
    { rank: 4, name: "Sharmin Sultana / Shathi Rani", division: "Dhaka", points: 13880, move: -1 },
    { rank: 5, name: "Tasnim Ara / Nadia Ferdous", division: "Dhaka", points: 11260, move: -1 },
  ],
  XD: [
    { rank: 1, name: "Arif Hossain / Nusrat Jahan", division: "Dhaka", points: 17950, move: 1, slug: "arif-hossain" },
    { rank: 2, name: "Mahmud Rahman / Rumana Akter", division: "Dhaka", points: 17820, move: -1, slug: "mahmud-rahman" },
    { rank: 3, name: "Kamal Karim / Farzana Khatun", division: "Khulna", points: 14390, move: 0 },
    { rank: 4, name: "Jahid Uddin / Lima Begum", division: "Dhaka", points: 12700, move: 0 },
    { rank: 5, name: "Rony Paul / Ritu Parvin", division: "Chattogram", points: 10980, move: 0 },
  ],
};

export const rankingsUpdated = "2026-11-18";
