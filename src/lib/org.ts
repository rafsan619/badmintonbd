/**
 * SAMPLE CONTENT — organisational data for layout purposes.
 * Replace names, figures and documents with official BBF records before launch.
 */
import type { Division } from "./data";

export const stats = [
  { value: 8, suffix: "", label: "Division associations" },
  { value: 64, suffix: "", label: "District associations" },
  { value: 310, suffix: "+", label: "Affiliated clubs" },
  { value: 12500, suffix: "+", label: "Registered players" },
] as const;

/** The athlete pathway is a genuine sequence, so it is numbered. */
export const pathway = [
  { step: "District", title: "Club and district play", body: "Join an affiliated club, register for a player ID and play district tournaments." },
  { step: "Division", title: "Division squads", body: "Top district players are invited to division training and the junior ranking circuit." },
  { step: "Junior national", title: "Junior national squad", body: "Selection camps twice a year pick U15, U17 and U19 squads for regional events." },
  { step: "Senior national", title: "Senior national squad", body: "Full-time training, sports science support and entries to BWF-sanctioned events." },
  { step: "International", title: "Representing Bangladesh", body: "South Asian Games, Asian Championships, Commonwealth Games and Olympic qualification." },
] as const;

export type Club = { name: string; division: Division; city: string; courts: number; juniors: boolean; para: boolean };
export const clubs: Club[] = [
  { name: "Mirpur Shuttlers", division: "Dhaka", city: "Mirpur, Dhaka", courts: 6, juniors: true, para: false },
  { name: "Uttara Smash Academy", division: "Dhaka", city: "Uttara, Dhaka", courts: 4, juniors: true, para: true },
  { name: "Dhanmondi Badminton Club", division: "Dhaka", city: "Dhanmondi, Dhaka", courts: 3, juniors: false, para: false },
  { name: "Port City Badminton Club", division: "Chattogram", city: "Agrabad, Chattogram", courts: 5, juniors: true, para: true },
  { name: "Cox's Bazar Shuttle Club", division: "Chattogram", city: "Cox's Bazar", courts: 2, juniors: true, para: false },
  { name: "Padma Badminton Academy", division: "Rajshahi", city: "Rajshahi", courts: 4, juniors: true, para: false },
  { name: "Bogura Racket Club", division: "Rajshahi", city: "Bogura", courts: 2, juniors: false, para: false },
  { name: "Khulna Racket Club", division: "Khulna", city: "Khulna", courts: 4, juniors: true, para: true },
  { name: "Jashore Shuttlers", division: "Khulna", city: "Jashore", courts: 2, juniors: true, para: false },
  { name: "Barishal Badminton Club", division: "Barishal", city: "Barishal", courts: 3, juniors: true, para: false },
  { name: "Sylhet Smashers", division: "Sylhet", city: "Sylhet", courts: 4, juniors: true, para: false },
  { name: "Rangpur Shuttle Club", division: "Rangpur", city: "Rangpur", courts: 3, juniors: true, para: false },
  { name: "Mymensingh Youth Badminton", division: "Mymensingh", city: "Mymensingh", courts: 3, juniors: true, para: true },
];

export const sessions = [
  { day: "Friday", time: "08:00–10:00", place: "Mirpur, Dhaka", who: "Beginners, age 10+" },
  { day: "Friday", time: "16:00–18:00", place: "Agrabad, Chattogram", who: "Beginners, age 10+" },
  { day: "Saturday", time: "09:00–11:00", place: "Uttara, Dhaka", who: "Para and inclusive session" },
  { day: "Saturday", time: "15:00–17:00", place: "Rajshahi", who: "Women and girls" },
] as const;

/* ---------------------------------------------------------- Governance */

export const executive = [
  { role: "President", name: "To be confirmed" },
  { role: "Senior Vice President", name: "To be confirmed" },
  { role: "General Secretary", name: "To be confirmed" },
  { role: "Treasurer", name: "To be confirmed" },
  { role: "Joint Secretary", name: "To be confirmed" },
  { role: "Athletes' representative", name: "To be confirmed" },
] as const;

export const committees = [
  { name: "Technical and competitions", remit: "Calendar, tournament regulations, draws and technical officials." },
  { name: "Selection", remit: "National squad selection under the published selection policy." },
  { name: "Coaching and development", remit: "Coach education, the junior pathway and schools programmes." },
  { name: "Para badminton", remit: "Classification, para events and inclusive club sessions." },
  { name: "Integrity and safeguarding", remit: "Anti-doping education, safeguarding cases and code of conduct." },
  { name: "Finance and audit", remit: "Budget, audited accounts and procurement." },
  { name: "Athletes' commission", remit: "Represents players' views to the executive committee." },
] as const;

export type Doc = { title: string; type: "Policy" | "Report" | "Regulation" | "Form" | "Minutes"; year: number; size: string };
export const documents: Doc[] = [
  { title: "Constitution of the Bangladesh Badminton Federation", type: "Regulation", year: 2024, size: "1.2 MB" },
  { title: "Annual report 2025", type: "Report", year: 2025, size: "4.8 MB" },
  { title: "Audited financial statements 2025", type: "Report", year: 2025, size: "860 KB" },
  { title: "AGM minutes, March 2026", type: "Minutes", year: 2026, size: "410 KB" },
  { title: "Tournament regulations 2026", type: "Regulation", year: 2026, size: "720 KB" },
  { title: "National squad selection policy", type: "Policy", year: 2026, size: "290 KB" },
  { title: "Safeguarding policy", type: "Policy", year: 2025, size: "540 KB" },
  { title: "Anti-doping rules", type: "Policy", year: 2025, size: "1.1 MB" },
  { title: "Code of conduct for players and officials", type: "Policy", year: 2025, size: "330 KB" },
  { title: "Player registration form", type: "Form", year: 2026, size: "150 KB" },
  { title: "Club affiliation form", type: "Form", year: 2026, size: "180 KB" },
  { title: "Tournament sanction application", type: "Form", year: 2026, size: "160 KB" },
];

export const notices = [
  { kind: "Tender", title: "Supply of feather shuttlecocks for the 2027 season", closes: "2026-12-10" },
  { kind: "Tender", title: "Hosting rights: Bangladesh International Challenge 2027", closes: "2027-01-15" },
  { kind: "Vacancy", title: "Competitions officer (full time, Dhaka)", closes: "2026-12-05" },
  { kind: "Vacancy", title: "Junior development coach, Sylhet division", closes: "2026-12-20" },
] as const;

/* ----------------------------------------------------------- Integrity */

export const integrityAreas = [
  {
    id: "anti-doping",
    title: "Anti-doping",
    body: "Bangladesh badminton follows the World Anti-Doping Code and BWF anti-doping regulations. Players are responsible for everything they take, including supplements.",
    points: ["Check medicines before you take them", "Apply for a therapeutic use exemption (TUE) in advance", "Squad players must keep whereabouts up to date"],
  },
  {
    id: "safeguarding",
    title: "Safeguarding",
    body: "Every child and adult at risk should be able to play badminton safely. Clubs must appoint a welfare officer and follow the federation's safeguarding policy.",
    points: ["Named welfare officer in every affiliated club", "Background checks for coaches working with juniors", "Clear rules on travel, changing rooms and online contact"],
  },
  {
    id: "match-fixing",
    title: "Match-fixing and betting",
    body: "Players, coaches, officials and support staff must not bet on badminton or share inside information. Any approach must be reported.",
    points: ["No betting on any badminton match, anywhere", "Never share team or injury information for gain", "Report any approach within five days"],
  },
] as const;

export const sanctions = [
  { name: "No current sanctions", detail: "Sanctions imposed under BBF rules will be published here.", date: "" },
] as const;

/* --------------------------------------------------- Coaching & officials */

export const coachLevels = [
  { level: "Level 1", title: "Assistant coach", hours: "32 hours", body: "Run safe, fun sessions for beginners under supervision." },
  { level: "Level 2", title: "Club coach", hours: "60 hours", body: "Plan and deliver club programmes and coach in competition." },
  { level: "Level 3", title: "Performance coach", hours: "120 hours", body: "Develop division and junior squad players. Includes mentoring." },
  { level: "Level 4", title: "High-performance coach", hours: "By selection", body: "Work with national squads, aligned to the BWF coach education framework." },
] as const;

export const officialGrades = [
  { grade: "Line judge", body: "Entry role. One-day course and supervised matches." },
  { grade: "District umpire", body: "Written test and practical assessment at district events." },
  { grade: "National umpire", body: "Assessed at national championships. Eligible for BAC nomination." },
  { grade: "Referee", body: "Runs tournaments, applies regulations and manages officials." },
] as const;

/* ------------------------------------------------------- About & honours */

export const history = [
  { year: "1972", text: "National badminton body organised after independence." },
  { year: "1976", text: "Affiliated to the international federation (now BWF)." },
  { year: "1990s", text: "National championships expand to all divisions." },
  { year: "2010", text: "Bangladesh hosts its first international ranking event." },
  { year: "2019", text: "Para badminton programme launched." },
  { year: "2026", text: "Online player registration and national rankings go live." },
] as const;

export const honours = [
  { year: 2025, title: "National Championships", detail: "Men's singles: Arif Hossain. Women's singles: Nusrat Jahan." },
  { year: 2024, title: "National Championships", detail: "Men's singles: Sajib Uddin. Women's singles: Nusrat Jahan." },
  { year: 2023, title: "National Championships", detail: "Men's doubles: Rahman / Karim." },
] as const;

export const affiliations = [
  { name: "Badminton World Federation", short: "BWF" },
  { name: "Badminton Asia", short: "BA" },
  { name: "Bangladesh Olympic Association", short: "BOA" },
] as const;

/* -------------------------------------------------------------- Partners */

export const partners = {
  principal: ["Principal partner"],
  official: ["Official shuttle supplier", "Official kit partner", "Broadcast partner"],
  supporters: ["Venue partner", "Health partner", "Travel partner", "Media partner"],
};

export const faqs = [
  {
    q: "How do I get a BBF player ID?",
    a: "Register through your club or division association. Once your form is approved you'll receive a player ID by email, which you need to enter any sanctioned tournament.",
  },
  {
    q: "How do I enter a tournament?",
    a: "Entries go through your division association before the deadline shown on the event page. Check that your player ID is active first.",
  },
  {
    q: "How are national squads selected?",
    a: "The selection committee uses national ranking position, results at selection events and coach assessment. The full policy is in the documents section.",
  },
  {
    q: "Can my club affiliate with the federation?",
    a: "Yes. Clubs with access to at least one court and a named welfare officer can apply through their district association using the club affiliation form.",
  },
  {
    q: "Who do I contact about media accreditation?",
    a: "Email the press office at least seven days before the event with your outlet, role and the days you plan to attend.",
  },
] as const;
