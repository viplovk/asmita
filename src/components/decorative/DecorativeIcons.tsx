import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
  color?: string;
}

// Indian Paisley (Kalka / Buta motif)
export const PaisleyIcon: React.FC<IconProps> = ({
  className = 'w-6 h-6',
  size = 24,
  color = 'currentColor',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M50 110C25 110 10 90 10 65C10 40 28 20 45 10C50 7 54 12 52 17C46 32 55 45 68 42C75 40 82 45 84 52C88 65 92 82 78 98C71 106 61 110 50 110Z"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M50 95C35 95 24 82 24 65C24 48 35 34 46 25C47 28 47 32 49 35C53 44 63 50 72 49C72 58 74 72 65 83C61 88 56 95 50 95Z"
      stroke={color}
      strokeWidth="1.5"
      strokeDasharray="3 3"
    />
    <circle cx="50" cy="65" r="5" fill={color} />
  </svg>
);

// Traditional Corner Ornament / Border Flourish
export const CornerFlourish: React.FC<{
  className?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  size?: number;
  color?: string;
}> = ({
  className = '',
  position = 'top-left',
  size = 48,
  color = '#B08A45',
}) => {
  const rotation = {
    'top-left': 'rotate(0deg)',
    'top-right': 'rotate(90deg)',
    'bottom-right': 'rotate(180deg)',
    'bottom-left': 'rotate(270deg)',
  }[position];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none ${className}`}
      style={{ transform: rotation }}
      aria-hidden="true"
    >
      <path
        d="M4 56V16C4 9.37 9.37 4 16 4H56"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 48V20C12 15.58 15.58 12 20 12H48"
        stroke={color}
        strokeWidth="1"
        strokeOpacity="0.7"
      />
      <circle cx="24" cy="24" r="3.5" fill={color} fillOpacity="0.9" />
      <circle cx="36" cy="12" r="2" fill={color} />
      <circle cx="12" cy="36" r="2" fill={color} />
      <path
        d="M4 4L12 12"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
};

// Ceremonial Diya Flame Motif
export const DiyaFlame: React.FC<IconProps> = ({
  className = 'w-6 h-6',
  size = 24,
  color = '#C08A32',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M20 2C20 2 29 18 29 28C29 36 24 42 20 42C16 42 11 36 11 28C11 18 20 2 20 2Z"
      fill="url(#diyaFlameGrad)"
      stroke={color}
      strokeWidth="1"
    />
    <path
      d="M20 14C20 14 24 24 24 30C24 35 21 38 20 38C19 38 16 35 16 30C16 24 20 14 20 14Z"
      fill="#F3EBDD"
      fillOpacity="0.8"
    />
    <path
      d="M6 44C10 49 30 49 34 44C34 47 30 50 20 50C10 50 6 47 6 44Z"
      fill="#B65A3C"
    />
    <defs>
      <linearGradient id="diyaFlameGrad" x1="20" y1="2" x2="20" y2="42" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F3EBDD" />
        <stop offset="0.4" stopColor="#C08A32" />
        <stop offset="1" stopColor="#B65A3C" />
      </linearGradient>
    </defs>
  </svg>
);

// Traditional Floral Motif / Kamal (Lotus) Blossom
export const LotusMotif: React.FC<IconProps> = ({
  className = 'w-6 h-6',
  size = 24,
  color = 'currentColor',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Central petal */}
    <path
      d="M32 10C32 10 24 26 24 38C24 45 28 50 32 50C36 50 40 45 40 38C40 26 32 10 32 10Z"
      stroke={color}
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    {/* Left petal */}
    <path
      d="M26 24C26 24 14 32 14 42C14 47 18 50 24 50C28 50 30 46 30 42C30 36 26 24 26 24Z"
      stroke={color}
      strokeWidth="1.5"
    />
    {/* Right petal */}
    <path
      d="M38 24C38 24 50 32 50 42C50 47 46 50 40 50C36 50 34 46 34 42C34 36 38 24 38 24Z"
      stroke={color}
      strokeWidth="1.5"
    />
    {/* Far left petal */}
    <path
      d="M18 36C18 36 6 42 8 50C10 54 18 53 22 51"
      stroke={color}
      strokeWidth="1.2"
    />
    {/* Far right petal */}
    <path
      d="M46 36C46 36 58 42 56 50C54 54 46 53 42 51"
      stroke={color}
      strokeWidth="1.2"
    />
    {/* Base rim */}
    <path
      d="M20 54C28 57 36 57 44 54"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// Wax Seal / Official Insignia Stamp
export const CeremonialSeal: React.FC<{
  className?: string;
  size?: number;
  text?: string;
}> = ({
  className = '',
  size = 80,
  text = 'ASMITA • 2026 • ETHNIC DAY',
}) => (
  <div
    className={`relative flex items-center justify-center rounded-full select-none ${className}`}
    style={{ width: size, height: size }}
  >
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className="absolute inset-0"
    >
      <circle
        cx="50"
        cy="50"
        r="47"
        fill="#8E3F2C"
        stroke="#B08A45"
        strokeWidth="2"
      />
      <circle
        cx="50"
        cy="50"
        r="42"
        fill="none"
        stroke="#D8C19A"
        strokeWidth="0.75"
        strokeDasharray="2 2"
      />
      <path
        id="sealCurve"
        d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
        fill="none"
      />
      <text fill="#F3EBDD" fontSize="6.8" fontWeight="600" letterSpacing="2">
        <textPath href="#sealCurve" startOffset="0%">
          {text}
        </textPath>
      </text>
      <circle cx="50" cy="50" r="16" fill="#3A241B" stroke="#B08A45" strokeWidth="1" />
      <text
        x="50"
        y="53"
        fill="#B08A45"
        fontSize="10"
        fontWeight="700"
        textAnchor="middle"
        fontFamily="Cinzel, serif"
      >
        IEC
      </text>
    </svg>
  </div>
);
