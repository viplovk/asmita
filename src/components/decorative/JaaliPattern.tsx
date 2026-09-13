import React from 'react';

interface JaaliPatternProps {
  className?: string;
  opacity?: number;
  patternType?: 'star' | 'floral' | 'diamond';
}

export const JaaliPattern: React.FC<JaaliPatternProps> = ({
  className = '',
  opacity = 0.08,
  patternType = 'star',
}) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg width="100%" height="100%">
        <defs>
          {patternType === 'star' && (
            <pattern id="jaaliStar" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M20 0 L25 15 L40 20 L25 25 L20 40 L15 25 L0 20 L15 15 Z"
                fill="none"
                stroke="#B08A45"
                strokeWidth="0.75"
              />
              <circle cx="20" cy="20" r="2.5" fill="#B65A3C" fillOpacity="0.4" />
              <circle cx="0" cy="0" r="1.5" fill="#B08A45" />
              <circle cx="40" cy="0" r="1.5" fill="#B08A45" />
              <circle cx="0" cy="40" r="1.5" fill="#B08A45" />
              <circle cx="40" cy="40" r="1.5" fill="#B08A45" />
            </pattern>
          )}

          {patternType === 'floral' && (
            <pattern id="jaaliFloral" width="48" height="48" patternUnits="userSpaceOnUse">
              <circle cx="24" cy="24" r="12" fill="none" stroke="#C08A32" strokeWidth="0.8" />
              <path
                d="M24 6 C24 16 34 24 44 24 C34 24 24 34 24 44 C24 34 14 24 4 24 C14 24 24 16 24 6 Z"
                fill="none"
                stroke="#B65A3C"
                strokeWidth="0.75"
              />
              <circle cx="24" cy="24" r="3" fill="#B08A45" />
            </pattern>
          )}

          {patternType === 'diamond' && (
            <pattern id="jaaliDiamond" width="32" height="32" patternUnits="userSpaceOnUse">
              <path
                d="M16 0 L32 16 L16 32 L0 16 Z"
                fill="none"
                stroke="#D8C19A"
                strokeWidth="0.6"
              />
              <rect x="13" y="13" width="6" height="6" fill="#8E3F2C" fillOpacity="0.3" transform="rotate(45 16 16)" />
            </pattern>
          )}
        </defs>

        <rect
          width="100%"
          height="100%"
          fill={`url(#${patternType === 'star' ? 'jaaliStar' : patternType === 'floral' ? 'jaaliFloral' : 'jaaliDiamond'})`}
        />
      </svg>
    </div>
  );
};
