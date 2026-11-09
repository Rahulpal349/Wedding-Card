import React from 'react';

interface KalashProps {
  className?: string;
  color?: string;
}

/**
 * Mangal Kalash with 5 mango leaves and coconut on top.
 * Sacred Bengali Hindu wedding motif.
 */
export const KalashSVG: React.FC<KalashProps> = ({
  className,
  color = 'currentColor',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 280"
    fill="none"
    stroke={color}
    aria-hidden="true"
    className={className}
  >
    {/* ── Coconut on top ── */}
    <path
      d="M100,20 C118,20 128,45 125,65 C122,80 110,88 100,88 C90,88 78,80 75,65 C72,45 82,20 100,20Z"
      strokeWidth="2.5"
      fill="#F6E9D2"
      fillOpacity="0.4"
    />
    <path d="M100,20 L100,86" strokeWidth="1" strokeDasharray="4 4" />
    <path d="M92,35 C95,50 96,65 95,80" strokeWidth="0.8" />
    <path d="M108,35 C105,50 104,65 105,80" strokeWidth="0.8" />

    {/* ── 5 Mango leaves fanning out behind coconut ── */}
    {/* Left-most leaf */}
    <path
      d="M80,85 C50,75 25,50 20,25 C35,42 58,62 82,75"
      strokeWidth="2"
      fill="#2F5D3A"
      fillOpacity="0.2"
      strokeLinejoin="round"
    />
    <path d="M20,25 C45,55 70,72 82,75" strokeWidth="1" />

    {/* Mid-left leaf */}
    <path
      d="M88,82 C70,60 55,30 55,10 C72,28 85,55 92,75"
      strokeWidth="2"
      fill="#2F5D3A"
      fillOpacity="0.25"
      strokeLinejoin="round"
    />
    <path d="M55,10 C68,40 82,65 92,75" strokeWidth="1" />

    {/* Center top leaf */}
    <path
      d="M96,70 C96,40 98,15 100,2 C102,15 104,40 104,70"
      strokeWidth="2"
      fill="#2F5D3A"
      fillOpacity="0.3"
      strokeLinejoin="round"
    />

    {/* Mid-right leaf */}
    <path
      d="M112,82 C130,60 145,30 145,10 C128,28 115,55 108,75"
      strokeWidth="2"
      fill="#2F5D3A"
      fillOpacity="0.25"
      strokeLinejoin="round"
    />
    <path d="M145,10 C132,40 118,65 108,75" strokeWidth="1" />

    {/* Right-most leaf */}
    <path
      d="M120,85 C150,75 175,50 180,25 C165,42 142,62 118,75"
      strokeWidth="2"
      fill="#2F5D3A"
      fillOpacity="0.2"
      strokeLinejoin="round"
    />
    <path d="M180,25 C155,55 130,72 118,75" strokeWidth="1" />

    {/* ── Pot Rim / Neck ── */}
    <ellipse cx="100" cy="95" rx="36" ry="10" strokeWidth="3" />
    <path d="M70,98 C72,112 75,120 70,128" strokeWidth="2.5" />
    <path d="M130,98 C128,112 125,120 130,128" strokeWidth="2.5" />
    <ellipse cx="100" cy="128" rx="34" ry="7" strokeWidth="2" />

    {/* ── Pot Belly (Ghata) ── */}
    <path
      d="M70,128 C45,145 35,175 40,210 C45,240 70,260 100,260 C130,260 155,240 160,210 C165,175 155,145 130,128"
      strokeWidth="3"
      fill="#B5532E"
      fillOpacity="0.1"
      strokeLinejoin="round"
    />

    {/* ── Base ── */}
    <path
      d="M78,255 C82,268 90,272 100,272 C110,272 118,268 122,255"
      strokeWidth="2.5"
    />

    {/* ── Traditional Swastika / Auspicious Motif on belly ── */}
    <g strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="100" y1="165" x2="100" y2="215" />
      <line x1="75" y1="190" x2="125" y2="190" />
      {/* Arms */}
      <line x1="100" y1="165" x2="115" y2="165" />
      <line x1="125" y1="190" x2="125" y2="205" />
      <line x1="100" y1="215" x2="85" y2="215" />
      <line x1="75" y1="190" x2="75" y2="175" />
      {/* 4 dots */}
      <circle cx="88" cy="178" r="2" fill={color} strokeWidth="0" />
      <circle cx="112" cy="178" r="2" fill={color} strokeWidth="0" />
      <circle cx="88" cy="202" r="2" fill={color} strokeWidth="0" />
      <circle cx="112" cy="202" r="2" fill={color} strokeWidth="0" />
    </g>

    {/* ── Decorative neck thread (moli) ── */}
    <line x1="68" y1="112" x2="132" y2="112" strokeWidth="2" strokeDasharray="3 3" />
    <line x1="69" y1="118" x2="131" y2="118" strokeWidth="1.5" />
  </svg>
);

export default KalashSVG;

