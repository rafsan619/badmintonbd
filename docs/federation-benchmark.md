# Federation website benchmark and gap analysis

Researched 24 November 2026. I compared the BBF site against the public websites of 18 badminton governing bodies.

**Read directly:**
- Badminton Asia
- Badminton Association of India
- Badminton Association of Malaysia
- PBSI Indonesia
- Singapore Badminton Association
- Nippon Badminton Association (Japan)
- Hong Kong Badminton Association
- Badminton Association of Thailand
- Sri Lanka Badminton
- Badminton Scotland
- Badminton Denmark
- USA Badminton
- Badminton Canada
- Badminton Australia
- Badminton New Zealand

**Read partly:**
- Badminton England, from its sitemap.
- BWF, Badminton Europe and Badminton Ireland blocked automated access, so I used search results for them.

## What most federation sites have

| Feature | How common | BBF before | BBF now |
| --- | --- | --- | --- |
| News | All sites | 3 items, no article pages | Filterable news, article pages, share links, related stories |
| Tournament calendar | All sites | Static list of 4 | Calendar grouped by month with filters, event detail pages, entry countdown, "How to enter" |
| Rankings | 13 of 16 | Missing | Tabs for all five disciplines, rank movement, name filter, top 5 on the home page |
| Governance (board, committees) | 15 of 16 | One paragraph | Executive committee, standing committees, governance page |
| Partners and sponsors | 15 of 16 | CTA only | Partner page with sponsor tiers, home-page logo strip |
| Coach and officials education | 13 of 16 | Mentioned only | Coach zone (4 licence levels), umpire and referee grades, upcoming courses |
| Photo and video gallery | 8 of 9 Asian sites | Missing | Masonry gallery with full-screen lightbox and keyboard controls |
| Integrity, anti-doping, safeguarding | 9 of 16 | One line | Integrity page covering anti-doping, safeguarding and match-fixing, a sanctions register and a confidential "Report a concern" form |
| Player and squad profiles | 6 of 9 Asian sites; most western sites | Generic "tracks" | Squad explorer (senior, junior, para) and a profile page for each player |
| Club finder | 6 of 7 western sites | Missing | Division map with club list and filters for junior and para sessions |
| Para badminton | All 7 western sites | One card | Dedicated section with sport classes, para event and para-friendly clubs |
| Results archive | 4 of 9 Asian sites | Missing | Results page with finals tables, plus a live results ticker on the home page |
| History and honours | 9 of 16 | Missing | Timeline and honours roll |
| Documents and transparency (constitution, AGM minutes, accounts) | 2 to 4 of 9 | Missing | Searchable document library by type |
| Tenders and careers | 8 of 16 | Missing | Notices list with closing dates |
| Online registration and player ID | 9 of 16 | Contact form only | Registration form for player, club, coach and volunteer, plus a player ID lookup |
| Site search | 7 of 16 | Missing | Search across pages, players, events, clubs and documents. Opens with Ctrl K or / |
| FAQ | 3 of 9 | Missing | FAQs on the membership and contact pages |
| Laws of the game | 3 of 16 | Missing | Plain-language laws with a court diagram drawn to scale |
| Schools programme (Shuttle Time) and AirBadminton | 3 of 7 | Missing | Schools section on the Play page |
| Volunteer | 3 of 7 | Missing | Volunteer roles on the membership page |
| Newsletter | 3 of 7 | Missing | Signup with a topic choice in the footer |
| Audience selector ("I want to…") | USA, Scotland | Missing | Home page "What would you like to do?" list with image preview |
| Statistics counters | Australia, Sri Lanka | Missing | Animated counters band |
| Language toggle | Hong Kong, Thailand, Canada | Missing | **Not done.** The Bangla federation name is in the header and footer, and the body font supports Bangla. A full বাংলা version is the next step. |

## Navigation patterns adopted
- **Utility bar above the main navigation** (Scotland, USA): Report a concern, Downloads, Contact.
- **Navigation grouped by task** (Australia, Scotland, Singapore): Play, Compete, Teams, Get involved, Federation, News. Each group opens a mega menu with link descriptions and a featured item.
- **A Register button that is always visible** (Hong Kong, Sri Lanka, USA).
- **Skip-to-content link** (Malaysia), plus keyboard support for the menus, search, gallery and accordions.
- **"On this page" jump links** at the top of every long page.
- **Breadcrumbs** on every inner page.

## Still to do before launch
1. **Real content.** Everything in `src/lib/data.ts` and `src/lib/org.ts` is sample data marked as such. This includes player names, rankings, results, history dates, office-bearers and fees.
2. **Photography.** Pexels placeholders are used now. Players show monogram cards until headshots are supplied.
3. **Form back end.** The newsletter, registration, contact and report forms show a confirmation but don't send anything yet (see `FormShell`). Connect them to email or a database.
4. **Document files.** The document library rows say "Coming soon" until PDFs are uploaded.
5. **Bangla translation.**
6. **Live scores.** Most federations link out to tournamentsoftware.com or BWF. Decide on a provider.
