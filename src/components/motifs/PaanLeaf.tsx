import React from 'react';

interface PaanLeafProps {
  className?: string;
  color?: string;
}

/**
 * Betel leaf (Paan pata) - quintessential for Shubho Drishti & Bengali wedding rituals.
 */
export const PaanLeafSVG: React.FC<PaanLeafProps> = ({
  className,
  color = '#2F5D3A',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 140"
    fill="none"
    aria-hidden="true"
    className={className}
  >
    {/* ── Stem ── */}
    <path
      d="M50,135 C52,125 50,115 50,110"
      stroke="#B5532E"
      strokeWidth="2.5"
      strokeLinecap="round"
    />

    {/* ── Heart-shaped Paan Leaf ── */}
    <path
      d="M50,110 C20,95 2,70 5,42 C8,15 35,5 50,25 C65,5 92,15 95,42 C98,70 80,95 50,110Z"
      fill={color}
      fillOpacity="0.2"
      stroke={color}
      strokeWidth="2.5"
      strokeLinejoin="round"
    />

    {/* ── Central main vein ── */}
    <path
      d="M50,110 C50,80 50,55 50,26"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* ── Side veins ── */}
    <g stroke={color} strokeWidth="1.2" strokeLinecap="round">
      <path d="M50,90 C36,78 22,68 14,56" />
      <path d="M50,90 C64,78 78,68 86,56" />

      <path d="M50,70 C33,58 20,48 15,35" />
      <path d="M50,70 C67,58 80,48 85,35" />

      <path d="M50,50 C38,40 28,30 25,20" />
      <path d="M50,50 C62,40 72,30 75,20" />
    </g>

    {/* ── Little auspicious sindoor bindu at base of leaf ── */}
    <circle cx="50" cy="98" r="3.5" fill="#B3172F" />
  </svg>
);

export default PaanLeafSVG;

