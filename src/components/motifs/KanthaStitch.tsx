import React from 'react';

interface KanthaStitchProps {
  className?: string;
  color?: string;
}

/**
 * Traditional Kantha running stitch line with floral dot accents.
 * Used as elegant ethnic dividers across sections.
 */
export const KanthaStitchSVG: React.FC<KanthaStitchProps> = ({
  className,
  color = 'currentColor',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 400 24"
    fill="none"
    aria-hidden="true"
    className={className}
    preserveAspectRatio="none"
  >
    {/* Running Kantha stitch */}
    <line
      x1="0"
      y1="12"
      x2="400"
      y2="12"
      stroke={color}
      strokeWidth="2"
      strokeDasharray="8 6"
      strokeLinecap="round"
    />

    {/* Center floral rosette accent */}
    <g transform="translate(200, 12)">
      <circle cx="0" cy="0" r="4" fill={color} />
      <circle cx="-14" cy="0" r="2" fill={color} />
      <circle cx="14" cy="0" r="2" fill={color} />
      <circle cx="-24" cy="0" r="1.5" fill={color} />
      <circle cx="24" cy="0" r="1.5" fill={color} />
    </g>

    {/* Quarter accents */}
    <g transform="translate(100, 12)">
      <circle cx="0" cy="0" r="2.5" fill={color} />
      <circle cx="-8" cy="0" r="1.5" fill={color} />
      <circle cx="8" cy="0" r="1.5" fill={color} />
    </g>
    <g transform="translate(300, 12)">
      <circle cx="0" cy="0" r="2.5" fill={color} />
      <circle cx="-8" cy="0" r="1.5" fill={color} />
      <circle cx="8" cy="0" r="1.5" fill={color} />
    </g>
  </svg>
);

export default KanthaStitchSVG;

