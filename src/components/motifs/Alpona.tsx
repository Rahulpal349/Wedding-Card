import React from 'react';

interface AlponaProps {
  className?: string;
  color?: string;
}

const round = (n: number) => Math.round(n * 100) / 100;

// Precomputed and rounded coordinates to ensure 100% deterministic SSR hydration across all runtimes
const INNER_PETALS = Array.from({ length: 8 }).map((_, i) => {
  const angle = (i * 45 * Math.PI) / 180;
  return {
    cx: round(200 + 42 * Math.cos(angle)),
    cy: round(200 + 42 * Math.sin(angle)),
    rot: i * 45,
  };
});

const OUTER_PETALS = Array.from({ length: 8 }).map((_, i) => {
  const angle = ((i * 45 + 22.5) * Math.PI) / 180;
  return {
    cx: round(200 + 95 * Math.cos(angle)),
    cy: round(200 + 95 * Math.sin(angle)),
    x1: round(200 + 60 * Math.cos(angle)),
    y1: round(200 + 60 * Math.sin(angle)),
    x2: round(200 + 130 * Math.cos(angle)),
    y2: round(200 + 130 * Math.sin(angle)),
    rot: round(i * 45 + 22.5),
  };
});

const PAISLEYS = Array.from({ length: 16 }).map((_, i) => {
  const angle = (i * 22.5 * Math.PI) / 180;
  return {
    px: round(200 + 150 * Math.cos(angle)),
    py: round(200 + 150 * Math.sin(angle)),
    rot: round(i * 22.5 + 90),
  };
});

const RICE_GRAINS = Array.from({ length: 24 }).map((_, i) => {
  const angle = (i * 15 * Math.PI) / 180;
  return {
    gx: round(200 + 185 * Math.cos(angle)),
    gy: round(200 + 185 * Math.sin(angle)),
    rot: round(i * 15 + 90),
  };
});

const ARCS = Array.from({ length: 8 }).map((_, i) => {
  const a1 = ((i * 45 + 22.5) * Math.PI) / 180;
  const a2 = (((i + 1) * 45 + 22.5) * Math.PI) / 180;
  const sx = round(200 + 135 * Math.cos(a1));
  const sy = round(200 + 135 * Math.sin(a1));
  const ex = round(200 + 135 * Math.cos(a2));
  const ey = round(200 + 135 * Math.sin(a2));
  const mx = round(200 + 160 * Math.cos((a1 + a2) / 2));
  const my = round(200 + 160 * Math.sin((a1 + a2) / 2));
  return `M${sx},${sy} Q${mx},${my} ${ex},${ey}`;
});

const INNER_DOTS = Array.from({ length: 8 }).map((_, i) => {
  const angle = (i * 45 * Math.PI) / 180;
  return {
    dx: round(200 + 28 * Math.cos(angle)),
    dy: round(200 + 28 * Math.sin(angle)),
  };
});

/**
 * Traditional Bengali alpona (rice-paste floor art) pattern.
 * A symmetric lotus design with decorative petals, paisley elements,
 * and rice-grain shapes — distinctly Bengali folk-art style.
 *
 * All paths carry className="alpona-path" and use strokeDasharray
 * so the design can be animated with a stroke-draw-on effect.
 */
export const AlponaSVG: React.FC<AlponaProps> = ({
  className,
  color = 'currentColor',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 400 400"
    fill="none"
    stroke={color}
    aria-hidden="true"
    className={className}
  >
    {/* ── Central lotus core ── */}
    <circle
      cx="200"
      cy="200"
      r="18"
      strokeWidth="2"
      strokeDasharray="6 3"
      className="alpona-path"
    />
    <circle
      cx="200"
      cy="200"
      r="8"
      strokeWidth="1.5"
      fill={color}
      className="alpona-path"
    />

    {/* ── Inner ring of 8 lotus petals ── */}
    {INNER_PETALS.map((petal, i) => (
      <ellipse
        key={`inner-petal-${i}`}
        cx={petal.cx}
        cy={petal.cy}
        rx="12"
        ry="26"
        strokeWidth="1.8"
        strokeDasharray="8 4"
        transform={`rotate(${petal.rot} ${petal.cx} ${petal.cy})`}
        className="alpona-path"
      />
    ))}

    {/* ── Middle decorative ring ── */}
    <circle
      cx="200"
      cy="200"
      r="72"
      strokeWidth="1"
      strokeDasharray="4 6"
      className="alpona-path"
    />

    {/* ── 8 outer lotus petals (larger) ── */}
    {OUTER_PETALS.map((petal, i) => (
      <g key={`outer-petal-${i}`}>
        <ellipse
          cx={petal.cx}
          cy={petal.cy}
          rx="18"
          ry="40"
          strokeWidth="1.8"
          strokeDasharray="10 4"
          transform={`rotate(${petal.rot} ${petal.cx} ${petal.cy})`}
          className="alpona-path"
        />
        {/* petal centre vein */}
        <line
          x1={petal.x1}
          y1={petal.y1}
          x2={petal.x2}
          y2={petal.y2}
          strokeWidth="1"
          strokeDasharray="5 5"
          className="alpona-path"
        />
      </g>
    ))}

    {/* ── Outer decorative ring ── */}
    <circle
      cx="200"
      cy="200"
      r="140"
      strokeWidth="1.2"
      strokeDasharray="3 5"
      className="alpona-path"
    />

    {/* ── 16 paisley curls around the outer ring ── */}
    {PAISLEYS.map((p, i) => (
      <path
        key={`paisley-${i}`}
        d="M0,0 C4,-10 14,-14 10,-2 C8,4 2,6 0,0Z"
        strokeWidth="1.2"
        strokeDasharray="6 3"
        transform={`translate(${p.px},${p.py}) rotate(${p.rot}) scale(1.3)`}
        className="alpona-path"
      />
    ))}

    {/* ── Outermost scalloped border ── */}
    <circle
      cx="200"
      cy="200"
      r="175"
      strokeWidth="1.8"
      strokeDasharray="12 6"
      className="alpona-path"
    />

    {/* ── Rice-grain shapes around the outer edge ── */}
    {RICE_GRAINS.map((g, i) => (
      <ellipse
        key={`rice-${i}`}
        cx={g.gx}
        cy={g.gy}
        rx="2.5"
        ry="6"
        strokeWidth="1"
        strokeDasharray="4 3"
        transform={`rotate(${g.rot} ${g.gx} ${g.gy})`}
        className="alpona-path"
      />
    ))}

    {/* ── Connecting arcs between outer petals ── */}
    {ARCS.map((d, i) => (
      <path
        key={`arc-${i}`}
        d={d}
        strokeWidth="1"
        strokeDasharray="5 4"
        className="alpona-path"
      />
    ))}

    {/* ── Small dot accents inside inner petals ── */}
    {INNER_DOTS.map((dot, i) => (
      <circle
        key={`dot-${i}`}
        cx={dot.dx}
        cy={dot.dy}
        r="2"
        fill={color}
        strokeWidth="0"
        className="alpona-path"
      />
    ))}
  </svg>
);

export default AlponaSVG;
