import clsx from "clsx";

/**
 * Top-down doubles court drawn to BWF proportions (13.4m × 6.1m), horizontal.
 * Each line carries `.court-line` so a parent can animate stroke drawing.
 */
export function CourtLines({
  className,
  strokeWidth = 0.05,
  quiet = false,
}: {
  className?: string;
  strokeWidth?: number;
  /** Draw the net in the line colour instead of orange. */
  quiet?: boolean;
}) {
  const L = 13.4;
  const W = 6.1;
  const singles = 0.46; // singles sideline inset
  const shortService = 1.98; // from net
  const longDoubles = 0.76; // from back boundary
  const net = L / 2;

  const lines: [number, number, number, number][] = [
    // boundary
    [0, 0, L, 0],
    [L, 0, L, W],
    [L, W, 0, W],
    [0, W, 0, 0],
    // singles sidelines
    [0, singles, L, singles],
    [0, W - singles, L, W - singles],
    // short service lines
    [net - shortService, 0, net - shortService, W],
    [net + shortService, 0, net + shortService, W],
    // doubles long service lines
    [longDoubles, 0, longDoubles, W],
    [L - longDoubles, 0, L - longDoubles, W],
    // centre lines
    [0, W / 2, net - shortService, W / 2],
    [net + shortService, W / 2, L, W / 2],
  ];

  return (
    <svg
      viewBox={`-0.2 -0.2 ${L + 0.4} ${W + 0.4}`}
      className={clsx("block", className)}
      fill="none"
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      {lines.map(([x1, y1, x2, y2], i) => (
        <line
          key={i}
          className="court-line"
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          pathLength={1}
        />
      ))}
      {/* net */}
      <line
        className="court-net"
        x1={net}
        y1={-0.2}
        x2={net}
        y2={W + 0.2}
        stroke={quiet ? "currentColor" : "var(--bbf-orange)"}
        strokeWidth={strokeWidth * (quiet ? 1.6 : 2.4)}
        pathLength={1}
      />
    </svg>
  );
}
