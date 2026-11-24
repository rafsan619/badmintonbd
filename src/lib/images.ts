/**
 * Placeholder badminton imagery from Pexels (free licence) — replace with
 * official BBF photography before launch.
 */
const px = (id: number, w = 1600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const images = {
  hero: px(3660204, 2400), // rackets and shuttles on a green court, top-down
  court: px(2202685, 1800), // club doubles session
  smash: px(14605729), // junior jumping smash in a sports hall
  senior: px(8796050), // male player ready position
  rally: px(8007090), // woman playing at the net
  lunge: px(8007094), // woman lunging on red court
  overhead: px(8007089), // woman preparing an overhead
  junior: px(10544231), // junior session in a club hall
  outdoor: px(4110242), // outdoor street play
  shuttleNet: px(8496270), // shuttle resting on the net
  shuttleRacket: px(8496267), // shuttle on a racket
} as const;

export const gallery = [
  { src: images.smash, alt: "Junior player jumping into a smash", event: "Junior Ranking Circuit" },
  { src: images.senior, alt: "Player in ready position during a match", event: "National Championships 2025" },
  { src: images.rally, alt: "Player reaching for a shot at the net", event: "Independence Day Open" },
  { src: images.court, alt: "Doubles players during a club session", event: "Dhaka Division League" },
  { src: images.lunge, alt: "Player lunging to return a drop shot", event: "Independence Day Open" },
  { src: images.junior, alt: "Junior players training in a club hall", event: "Junior Selection Camp" },
  { src: images.hero, alt: "Rackets and shuttles laid out on court", event: "Venue preview" },
  { src: images.overhead, alt: "Player preparing an overhead shot", event: "National squad camp" },
  { src: images.outdoor, alt: "Young player hitting a shuttle outdoors", event: "Come and play, Chattogram" },
  { src: images.shuttleNet, alt: "Feather shuttle resting on the net", event: "Venue preview" },
] as const;
