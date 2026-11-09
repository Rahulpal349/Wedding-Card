import React from 'react';

interface JoraMachProps {
  className?: string;
  color?: string;
}

/**
 * Jora Mach — Twin fish facing each other, mirror-symmetric.
 * Traditional Bengali symbol of fertility and prosperity.
 * Bold folk-art style with decorative scale patterns, curved tails, and large eyes.
 */
export const JoraMachSVG: React.FC<JoraMachProps> = ({
  className,
  color = 'currentColor',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 120"
    fill="none"
    stroke={color}
    aria-hidden="true"
    className={className}
  >
    {/* ── Left fish (facing right) ── */}
    <g strokeWidth="2">
      {/* Body */}
      <path
        d="M20,60 C20,35 50,15 75,25 C90,30 95,45 95,60 C95,75 90,90 75,95 C50,105 20,85 20,60Z"
        strokeLinejoin="round"
      />
      {/* Tail */}
      <path
        d="M20,60 C10,45 2,30 8,20 C12,28 16,32 20,38"
        strokeLinecap="round"
      />
      <path
        d="M20,60 C10,75 2,90 8,100 C12,92 16,88 20,82"
        strokeLinecap="round"
      />
      <path d="M8,20 L8,100" strokeWidth="1.2" />
      {/* Tail decorative lines */}
      <line x1="10" y1="35" x2="10" y2="85" strokeWidth="0.8" />
      <line x1="14" y1="40" x2="14" y2="80" strokeWidth="0.8" />
      {/* Eye */}
      <circle cx="72" cy="50" r="7" strokeWidth="1.8" />
      <circle cx="72" cy="50" r="3" fill={color} strokeWidth="0" />
      {/* Mouth */}
      <path d="M90,58 C93,60 93,62 90,64" strokeWidth="1.5" strokeLinecap="round" />
      {/* Scales — three rows */}
      <path d="M35,45 C40,40 45,40 50,45" strokeWidth="1" />
      <path d="M45,45 C50,40 55,40 60,45" strokeWidth="1" />
      <path d="M55,45 C60,40 65,40 70,45" strokeWidth="1" />
      <path d="M30,55 C35,50 40,50 45,55" strokeWidth="1" />
      <path d="M40,55 C45,50 50,50 55,55" strokeWidth="1" />
      <path d="M50,55 C55,50 60,50 65,55" strokeWidth="1" />
      <path d="M60,55 C65,50 70,50 75,55" strokeWidth="1" />
      <path d="M35,65 C40,60 45,60 50,65" strokeWidth="1" />
      <path d="M45,65 C50,60 55,60 60,65" strokeWidth="1" />
      <path d="M55,65 C60,60 65,60 70,65" strokeWidth="1" />
      <path d="M30,75 C35,70 40,70 45,75" strokeWidth="1" />
      <path d="M40,75 C45,70 50,70 55,75" strokeWidth="1" />
      <path d="M50,75 C55,70 60,70 65,75" strokeWidth="1" />
      {/* Dorsal fin */}
      <path d="M50,25 C55,15 60,12 65,18 C60,20 55,22 50,25" strokeWidth="1.2" />
      {/* Ventral fin */}
      <path d="M50,95 C55,105 60,108 65,102 C60,100 55,98 50,95" strokeWidth="1.2" />
      {/* Pectoral fin */}
      <path d="M75,65 C82,72 80,80 74,78" strokeWidth="1.2" strokeLinecap="round" />
    </g>

    {/* ── Right fish (facing left, mirrored) ── */}
    <g strokeWidth="2" transform="translate(200,0) scale(-1,1)">
      {/* Body */}
      <path
        d="M20,60 C20,35 50,15 75,25 C90,30 95,45 95,60 C95,75 90,90 75,95 C50,105 20,85 20,60Z"
        strokeLinejoin="round"
      />
      {/* Tail */}
      <path
        d="M20,60 C10,45 2,30 8,20 C12,28 16,32 20,38"
        strokeLinecap="round"
      />
      <path
        d="M20,60 C10,75 2,90 8,100 C12,92 16,88 20,82"
        strokeLinecap="round"
      />
      <path d="M8,20 L8,100" strokeWidth="1.2" />
      {/* Tail decorative lines */}
      <line x1="10" y1="35" x2="10" y2="85" strokeWidth="0.8" />
      <line x1="14" y1="40" x2="14" y2="80" strokeWidth="0.8" />
      {/* Eye */}
      <circle cx="72" cy="50" r="7" strokeWidth="1.8" />
      <circle cx="72" cy="50" r="3" fill={color} strokeWidth="0" />
      {/* Mouth */}
      <path d="M90,58 C93,60 93,62 90,64" strokeWidth="1.5" strokeLinecap="round" />
      {/* Scales */}
      <path d="M35,45 C40,40 45,40 50,45" strokeWidth="1" />
      <path d="M45,45 C50,40 55,40 60,45" strokeWidth="1" />
      <path d="M55,45 C60,40 65,40 70,45" strokeWidth="1" />
      <path d="M30,55 C35,50 40,50 45,55" strokeWidth="1" />
      <path d="M40,55 C45,50 50,50 55,55" strokeWidth="1" />
      <path d="M50,55 C55,50 60,50 65,55" strokeWidth="1" />
      <path d="M60,55 C65,50 70,50 75,55" strokeWidth="1" />
      <path d="M35,65 C40,60 45,60 50,65" strokeWidth="1" />
      <path d="M45,65 C50,60 55,60 60,65" strokeWidth="1" />
      <path d="M55,65 C60,60 65,60 70,65" strokeWidth="1" />
      <path d="M30,75 C35,70 40,70 45,75" strokeWidth="1" />
      <path d="M40,75 C45,70 50,70 55,75" strokeWidth="1" />
      <path d="M50,75 C55,70 60,70 65,75" strokeWidth="1" />
      {/* Dorsal fin */}
      <path d="M50,25 C55,15 60,12 65,18 C60,20 55,22 50,25" strokeWidth="1.2" />
      {/* Ventral fin */}
      <path d="M50,95 C55,105 60,108 65,102 C60,100 55,98 50,95" strokeWidth="1.2" />
      {/* Pectoral fin */}
      <path d="M75,65 C82,72 80,80 74,78" strokeWidth="1.2" strokeLinecap="round" />
    </g>

    {/* ── Connecting dots between fish ── */}
    <circle cx="100" cy="50" r="2" fill={color} strokeWidth="0" />
    <circle cx="100" cy="60" r="2.5" fill={color} strokeWidth="0" />
    <circle cx="100" cy="70" r="2" fill={color} strokeWidth="0" />
  </svg>
);

export default JoraMachSVG;
