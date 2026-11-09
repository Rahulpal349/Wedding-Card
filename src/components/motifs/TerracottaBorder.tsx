import React from 'react';

interface TerracottaBorderProps {
  className?: string;
  color?: string;
}

/**
 * Bishnupur Terracotta temple frieze inspired border.
 * Features stylized Bankura terracotta horses, lotus medallions, and temple brick relief.
 */
export const TerracottaBorderSVG: React.FC<TerracottaBorderProps> = ({
  className,
  color = '#B5532E',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 800 80"
    fill="none"
    aria-hidden="true"
    className={className}
    preserveAspectRatio="none"
  >
    {/* ── Top & Bottom Kantha running stitch borders ── */}
    <line x1="0" y1="6" x2="800" y2="6" stroke={color} strokeWidth="2.5" />
    <line x1="0" y1="12" x2="800" y2="12" stroke={color} strokeWidth="1" strokeDasharray="5 5" />
    <line x1="0" y1="68" x2="800" y2="68" stroke={color} strokeWidth="1" strokeDasharray="5 5" />
    <line x1="0" y1="74" x2="800" y2="74" stroke={color} strokeWidth="2.5" />

    {/* ── Repeating 4 panels (each 200px wide) ── */}
    {[0, 200, 400, 600].map((offset, idx) => (
      <g key={`panel-${idx}`} transform={`translate(${offset}, 0)`}>
        {/* Panel divider pillars */}
        <line x1="195" y1="12" x2="195" y2="68" stroke={color} strokeWidth="1.5" strokeDasharray="2 3" />
        <line x1="200" y1="8" x2="200" y2="72" stroke={color} strokeWidth="2" />

        {/* ── Central Motif in Panel: Bankura Horse or Terracotta Lotus ── */}
        {idx % 2 === 0 ? (
          /* Bankura Horse stylized silhouette */
          <g transform="translate(60, 16)" stroke={color} strokeWidth="1.6" strokeLinecap="round">
            {/* Horse long erect ears & crown */}
            <path d="M42,5 L40,16 L46,14 L48,5 Z" fill={color} fillOpacity="0.2" />
            <path d="M48,5 L46,14 L52,14 L54,5 Z" fill={color} fillOpacity="0.2" />
            {/* Long arched neck */}
            <path d="M38,20 C36,30 30,38 25,45 L50,45 C45,36 44,28 44,20 Z" fill={color} fillOpacity="0.25" />
            {/* Torso */}
            <path d="M22,42 C15,44 10,48 5,46" strokeWidth="2" />
            {/* Stilt-like tall legs */}
            <line x1="15" y1="45" x2="15" y2="52" strokeWidth="2" />
            <line x1="25" y1="45" x2="25" y2="52" strokeWidth="2" />
            <line x1="40" y1="45" x2="40" y2="52" strokeWidth="2" />
            <line x1="48" y1="45" x2="48" y2="52" strokeWidth="2" />
            {/* Saddle ornamental circle */}
            <circle cx="32" cy="40" r="3.5" fill={color} />
          </g>
        ) : (
          /* Bishnupur 8-petal Terracotta Rosette Medallion */
          <g transform="translate(100, 40)">
            <circle cx="0" cy="0" r="18" stroke={color} strokeWidth="1.8" fill={color} fillOpacity="0.1" />
            <circle cx="0" cy="0" r="6" fill={color} strokeWidth="0" />
            {Array.from({ length: 8 }).map((_, p) => {
              const ang = (p * 45 * Math.PI) / 180;
              const px = Math.round(12 * Math.cos(ang) * 100) / 100;
              const py = Math.round(12 * Math.sin(ang) * 100) / 100;
              return <circle key={`dot-${p}`} cx={px} cy={py} r="2" fill={color} />;
            })}
          </g>
        )}

        {/* Small corner decorative motifs */}
        <path d="M10,20 L20,20 L10,30 Z" fill={color} fillOpacity="0.3" />
        <path d="M190,20 L180,20 L190,30 Z" fill={color} fillOpacity="0.3" />
        <path d="M10,60 L20,60 L10,50 Z" fill={color} fillOpacity="0.3" />
        <path d="M190,60 L180,60 L190,50 Z" fill={color} fillOpacity="0.3" />
      </g>
    ))}
  </svg>
);

export default TerracottaBorderSVG;

