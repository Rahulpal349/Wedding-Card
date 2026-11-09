import React from 'react';

interface CoupleProps {
  className?: string;
}

/**
 * Kalighat Patachitra-inspired Bengali wedding couple illustration.
 * Bride with Mukut/Alpona forehead, red Banarasi, Shankha-Pola.
 * Groom with traditional Topor, Punjabi & Dhoti, connected by marigold garland.
 */
export const CoupleIllustrationSVG: React.FC<CoupleProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 400 480"
    fill="none"
    aria-hidden="true"
    className={className}
  >
    {/* ── Background Halo / Arch ── */}
    <ellipse cx="200" cy="240" rx="180" ry="210" fill="#FFF8EC" fillOpacity="0.08" stroke="#F2B705" strokeWidth="1.5" strokeDasharray="6 6" />

    {/* ═════════════════════════════════════════════
        BRIDE (Left)
       ═════════════════════════════════════════════ */}
    <g id="bride">
      {/* Hair Bun with Jasmine Garland (Beli Phool) */}
      <circle cx="95" cy="190" r="38" fill="#1A0508" />
      <g stroke="#FFF8EC" strokeWidth="4" strokeLinecap="round">
        <circle cx="70" cy="175" r="4" fill="#FFF8EC" />
        <circle cx="64" cy="188" r="4.5" fill="#FFF8EC" />
        <circle cx="68" cy="202" r="4" fill="#FFF8EC" />
        <circle cx="78" cy="214" r="4" fill="#FFF8EC" />
        <circle cx="92" cy="222" r="4" fill="#FFF8EC" />
      </g>

      {/* Face & Neck Profile */}
      <path
        d="M125,150 C145,155 160,175 160,195 C160,215 145,235 125,240 C128,255 135,270 145,285"
        stroke="#3A0D14"
        strokeWidth="2.5"
        fill="#F6E9D2"
      />
      {/* Forehead profile & chin */}
      <path
        d="M130,152 C150,158 162,175 160,190 C158,198 165,200 160,208 C155,216 150,225 140,230 L135,245"
        stroke="#3A0D14"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Kalighat-style large almond Eye */}
      <path
        d="M136,182 Q150,174 158,185 Q148,194 136,182 Z"
        fill="#FFFFFF"
        stroke="#3A0D14"
        strokeWidth="2"
      />
      <circle cx="148" cy="184" r="4.5" fill="#1A0508" />
      <circle cx="150" cy="182" r="1.5" fill="#FFFFFF" />
      {/* Kohl sweep / Kajal line */}
      <path d="M158,184 Q166,180 172,185" stroke="#3A0D14" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M134,176 Q146,168 158,172" stroke="#1A0508" strokeWidth="2.2" strokeLinecap="round" />

      {/* Chandan Bindu dots on forehead (Chandaner Alpona) */}
      <circle cx="144" cy="166" r="2.5" fill="#B3172F" />
      <g fill="#FFF8EC">
        <circle cx="138" cy="164" r="1.5" />
        <circle cx="150" cy="164" r="1.5" />
        <circle cx="134" cy="166" r="1.2" />
        <circle cx="154" cy="166" r="1.2" />
        <circle cx="130" cy="170" r="1.2" />
        <circle cx="157" cy="170" r="1.2" />
      </g>

      {/* Nose Ring (Noluk / Nath) with chain */}
      <circle cx="160" cy="202" r="7" stroke="#F2B705" strokeWidth="1.8" fill="none" />
      <path d="M158,200 Q150,195 142,192" stroke="#F2B705" strokeWidth="1" strokeDasharray="2 2" />

      {/* Red Lips */}
      <path d="M152,216 Q158,214 162,217 Q157,222 152,216 Z" fill="#B3172F" stroke="#3A0D14" strokeWidth="1" />

      {/* Red Benarasi Sari Pallu draped around head & shoulders */}
      <path
        d="M100,140 Q130,135 150,148 Q130,175 125,235 Q100,290 80,360 L180,440 L80,440 Z"
        fill="#B3172F"
        stroke="#6F0E20"
        strokeWidth="2"
      />
      {/* Gold Zari zari border on Sari */}
      <path
        d="M105,142 Q132,137 152,150 Q132,177 127,237 Q102,292 82,362"
        stroke="#F2B705"
        strokeWidth="3.5"
        strokeDasharray="6 3"
      />

      {/* Bride Arm & Hand holding Paan leaf */}
      <path
        d="M110,310 Q140,320 160,310 Q175,305 185,295"
        stroke="#3A0D14"
        strokeWidth="3"
        fill="#F6E9D2"
        strokeLinecap="round"
      />
      {/* Shankha (white) & Pola (red) on wrist */}
      <g transform="translate(145, 302) rotate(-15)">
        <rect x="0" y="0" width="4" height="14" fill="#FFF8EC" stroke="#3A0D14" strokeWidth="0.8" rx="1" />
        <rect x="6" y="0" width="5" height="14" fill="#B3172F" stroke="#3A0D14" strokeWidth="0.8" rx="1" />
        <rect x="13" y="0" width="3" height="14" fill="#F2B705" stroke="#3A0D14" strokeWidth="0.8" rx="1" />
      </g>
    </g>

    {/* ═════════════════════════════════════════════
        GROOM (Right)
       ═════════════════════════════════════════════ */}
    <g id="groom">
      {/* Traditional White Wedding Crown (Topor) */}
      <path
        d="M260,145 L275,60 Q285,45 290,30 Q295,45 305,60 L320,145 Z"
        fill="#FFF8EC"
        stroke="#3A0D14"
        strokeWidth="2.5"
      />
      {/* Topor Shola (Pith) intricate tiers & spikes */}
      <line x1="268" y1="120" x2="312" y2="120" stroke="#B3172F" strokeWidth="2" />
      <line x1="272" y1="95" x2="308" y2="95" stroke="#B3172F" strokeWidth="2" />
      <line x1="278" y1="70" x2="302" y2="70" stroke="#F2B705" strokeWidth="2" />
      <circle cx="290" cy="25" r="5" fill="#B3172F" stroke="#3A0D14" strokeWidth="1" />
      {/* Side hanging kadamba balls */}
      <path d="M260,140 Q250,155 252,175" stroke="#FFF8EC" strokeWidth="2" strokeDasharray="3 3" />
      <circle cx="252" cy="177" r="4" fill="#FFF8EC" stroke="#3A0D14" strokeWidth="1" />

      {/* Hair */}
      <path d="M265,145 Q285,140 315,145 Q310,175 300,185 Q280,180 268,165 Z" fill="#1A0508" />

      {/* Groom Face & Jaw */}
      <path
        d="M268,160 Q245,175 240,195 Q240,215 255,232 L260,250"
        stroke="#3A0D14"
        strokeWidth="2.5"
        fill="#F6E9D2"
      />
      {/* Nose, lips & chin */}
      <path
        d="M266,165 Q248,172 240,185 Q242,192 238,198 Q242,205 248,212 L254,226"
        stroke="#3A0D14"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Groom Eye */}
      <path
        d="M264,180 Q250,174 242,184 Q252,192 264,180 Z"
        fill="#FFFFFF"
        stroke="#3A0D14"
        strokeWidth="2"
      />
      <circle cx="252" cy="182" r="4.2" fill="#1A0508" />
      <circle cx="250" cy="180" r="1.5" fill="#FFFFFF" />
      <path d="M266,172 Q252,168 240,174" stroke="#1A0508" strokeWidth="2.2" strokeLinecap="round" />

      {/* Groom Kurta & Chador / Uttariyo */}
      <path
        d="M260,250 Q230,280 220,350 L220,440 L340,440 Q330,340 310,260 Z"
        fill="#FFF8EC"
        stroke="#3A0D14"
        strokeWidth="2.5"
      />
      {/* Cream / Golden Silk texture */}
      <path
        d="M255,260 Q270,300 290,360 Q305,400 310,440"
        stroke="#F2B705"
        strokeWidth="2"
        strokeDasharray="8 4"
      />
      {/* Chador (Draped shawl) */}
      <path
        d="M270,255 Q240,300 235,370 Q245,410 265,440"
        fill="none"
        stroke="#B3172F"
        strokeWidth="3.5"
      />
    </g>

    {/* ═════════════════════════════════════════════
        GARLAND OF MARIGOLDS (Genda Phool Mala)
        Connecting Bride & Groom warmly in center
       ═════════════════════════════════════════════ */}
    <g id="mala">
      {/* Hanging curve connecting them */}
      <path
        d="M170,260 Q200,380 235,270"
        stroke="#F2B705"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
        strokeDasharray="2 10"
      />
      {/* Marigold flowers along curve */}
      {[
        { cx: 172, cy: 265, r: 8, col: '#F2B705' },
        { cx: 178, cy: 288, r: 9, col: '#E8872A' },
        { cx: 186, cy: 312, r: 9.5, col: '#F2B705' },
        { cx: 198, cy: 334, r: 10, col: '#E8872A' },
        { cx: 206, cy: 335, r: 10, col: '#F2B705' },
        { cx: 218, cy: 312, r: 9.5, col: '#E8872A' },
        { cx: 226, cy: 288, r: 9, col: '#F2B705' },
        { cx: 232, cy: 265, r: 8, col: '#E8872A' },
      ].map((f, i) => (
        <g key={`flower-${i}`}>
          <circle cx={f.cx} cy={f.cy} r={f.r} fill={f.col} stroke="#3A0D14" strokeWidth="1" />
          <circle cx={f.cx} cy={f.cy} r={f.r * 0.45} fill="#B3172F" />
        </g>
      ))}
    </g>

    {/* Bottom decorative border */}
    <path d="M40,460 L360,460" stroke="#B3172F" strokeWidth="2" strokeDasharray="6 4" />
    <circle cx="200" cy="460" r="4" fill="#B3172F" />
  </svg>
);

export default CoupleIllustrationSVG;

