import React from 'react';

interface ShankhaPolaProps {
  className?: string;
  color?: string;
}

const round = (n: number) => Math.round(n * 100) / 100;

// Precomputed marks for Shankha to guarantee identical numbers during SSR and client hydration
const SHANKHA_MARKS = Array.from({ length: 12 }).map((_, i) => {
  const rad = (i * 30 * Math.PI) / 180;
  return {
    cx: round(90 + 75 * Math.cos(rad)),
    cy: round(90 + 75 * Math.sin(rad)),
  };
});

/**
 * Shankha (white conch bangle) & Pola (red coral bangle) - traditional Bengali bridal bangles.
 */
export const ShankhaPolaSVG: React.FC<ShankhaPolaProps> = ({
  className,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 200"
    fill="none"
    aria-hidden="true"
    className={className}
  >
    {/* ── Outer Shankha (White with intricate carvings) ── */}
    <g transform="translate(10, 15) rotate(-15 90 90)">
      {/* Outer ring */}
      <circle
        cx="90"
        cy="90"
        r="75"
        stroke="#FFF8EC"
        strokeWidth="10"
        fill="none"
        filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.2))"
      />
      <circle
        cx="90"
        cy="90"
        r="75"
        stroke="#B3172F"
        strokeWidth="1"
        strokeDasharray="4 6"
        fill="none"
      />
      {/* Engraved floral marks around circumference */}
      {SHANKHA_MARKS.map((mark, i) => (
        <circle
          key={`shankha-dot-${i}`}
          cx={mark.cx}
          cy={mark.cy}
          r="1.8"
          fill="#B3172F"
        />
      ))}
    </g>

    {/* ── Pola (Sleek sindoor-red coral bangle) ── */}
    <g transform="translate(25, 20) rotate(10 90 90)">
      <circle
        cx="90"
        cy="90"
        r="64"
        stroke="#B3172F"
        strokeWidth="8"
        fill="none"
        filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.25))"
      />
      {/* Gold embossed lining */}
      <circle
        cx="90"
        cy="90"
        r="64"
        stroke="#F2B705"
        strokeWidth="1.5"
        strokeDasharray="8 8"
        fill="none"
      />
    </g>

    {/* ── Inner Shankha ── */}
    <g transform="translate(30, 25) rotate(-5 90 90)">
      <circle
        cx="90"
        cy="90"
        r="52"
        stroke="#F6E9D2"
        strokeWidth="6"
        fill="none"
      />
      <circle
        cx="90"
        cy="90"
        r="52"
        stroke="#B5532E"
        strokeWidth="0.8"
        strokeDasharray="3 5"
        fill="none"
      />
    </g>
  </svg>
);

export default ShankhaPolaSVG;
