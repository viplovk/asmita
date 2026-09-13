import React from 'react';

interface MandalaProps {
  className?: string;
  size?: number | string;
  opacity?: number;
  spinning?: boolean;
}

export const MandalaArt: React.FC<MandalaProps> = ({
  className = '',
  size = 600,
  opacity = 0.25,
  spinning = false,
}) => {
  return (
    <div
      className={`relative pointer-events-none select-none ${spinning ? 'animate-[spin_120s_linear_infinite]' : ''} ${className}`}
      style={{ width: size, height: size, opacity }}
    >
      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        aria-hidden="true"
      >
        {/* Outermost ring */}
        <circle cx="250" cy="250" r="240" stroke="#B08A45" strokeWidth="1" strokeDasharray="4 6" />
        <circle cx="250" cy="250" r="230" stroke="#C08A32" strokeWidth="1.5" />
        <circle cx="250" cy="250" r="222" stroke="#B65A3C" strokeWidth="0.75" />

        {/* Outer 24 Petals */}
        <g stroke="#B08A45" strokeWidth="1.2">
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 360) / 24;
            return (
              <g key={`petal-24-${i}`} transform={`rotate(${angle} 250 250)`}>
                <path d="M250 20 C235 70 230 110 250 140 C270 110 265 70 250 20 Z" />
                <circle cx="250" cy="50" r="3" fill="#B08A45" />
                <circle cx="250" cy="25" r="2" fill="#E8D7B8" />
              </g>
            );
          })}
        </g>

        {/* Intermediate Ring with Diamond Beading */}
        <circle cx="250" cy="250" r="165" stroke="#E8D7B8" strokeWidth="1" strokeDasharray="2 4" />
        <circle cx="250" cy="250" r="155" stroke="#B08A45" strokeWidth="1.8" />

        {/* 16 Arch Jaali Segments */}
        <g stroke="#C08A32" strokeWidth="1">
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i * 360) / 16;
            return (
              <g key={`arch-16-${i}`} transform={`rotate(${angle} 250 250)`}>
                <path d="M250 95 C230 120 220 140 250 160 C280 140 270 120 250 95 Z" />
                <path d="M250 110 L250 145" strokeDasharray="2 2" />
              </g>
            );
          })}
        </g>

        {/* Inner Lotus Layer (12 Petals) */}
        <g stroke="#B65A3C" strokeWidth="1.5">
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 360) / 12;
            return (
              <g key={`petal-12-${i}`} transform={`rotate(${angle} 250 250)`}>
                <path d="M250 155 C230 185 235 210 250 225 C265 210 270 185 250 155 Z" fill="#8E3F2C" fillOpacity="0.12" />
                <circle cx="250" cy="180" r="2.5" fill="#B08A45" />
              </g>
            );
          })}
        </g>

        {/* Core Radiating Sun & Floral Center */}
        <circle cx="250" cy="250" r="85" stroke="#B08A45" strokeWidth="2" />
        <circle cx="250" cy="250" r="75" stroke="#D8C19A" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="250" cy="250" r="45" stroke="#C08A32" strokeWidth="1.5" />
        <circle cx="250" cy="250" r="35" fill="#3A241B" stroke="#B08A45" strokeWidth="1" />

        {/* Core Star */}
        <g stroke="#E8D7B8" strokeWidth="1.2">
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 360) / 8;
            return (
              <g key={`star-8-${i}`} transform={`rotate(${angle} 250 250)`}>
                <line x1="250" y1="215" x2="250" y2="285" />
                <circle cx="250" cy="225" r="2" fill="#B08A45" />
              </g>
            );
          })}
        </g>

        {/* Central Bindu */}
        <circle cx="250" cy="250" r="8" fill="#B65A3C" />
        <circle cx="250" cy="250" r="3" fill="#F3EBDD" />
      </svg>
    </div>
  );
};
