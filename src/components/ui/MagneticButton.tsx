import React, { useRef, useState } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'brass';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  id?: string;
  ariaLabel?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  id,
  ariaLabel,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    const { clientX, clientY } = e;
    const { top, left, width, height } = e.currentTarget.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    // Subtle magnetic attraction
    setPosition({ x: middleX * 0.22, y: middleY * 0.22 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs tracking-wider',
    md: 'px-6 py-3 text-sm tracking-widest',
    lg: 'px-8 py-4 text-base tracking-[0.2em]',
  }[size];

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-[#B65A3C] via-[#8E3F2C] to-[#8E3F2C] text-[#F3EBDD] border border-[#B08A45]/60 shadow-[0_8px_24px_rgba(142,63,44,0.35)] hover:shadow-[0_12px_32px_rgba(182,90,60,0.5)] hover:border-[#D8C19A]',
    brass:
      'bg-gradient-to-r from-[#B08A45] via-[#C08A32] to-[#B08A45] text-[#241711] font-semibold border border-[#F3EBDD]/40 shadow-[0_8px_24px_rgba(176,138,69,0.35)] hover:shadow-[0_12px_32px_rgba(216,193,154,0.6)]',
    secondary:
      'bg-[#E8D7B8] text-[#241711] border border-[#B08A45]/40 hover:bg-[#F3EBDD] shadow-[0_4px_16px_rgba(0,0,0,0.2)]',
    outline:
      'bg-transparent text-[#F3EBDD] border border-[#B08A45]/60 hover:border-[#F3EBDD] hover:bg-[#B08A45]/10',
  }[variant];

  return (
    <button
      id={id}
      ref={buttonRef}
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: position.x === 0 ? 'transform 0.4s cubic-bezier(0.2, 0, 0, 1)' : 'none',
      }}
      className={`group relative inline-flex items-center justify-center font-cinzel uppercase rounded-full overflow-hidden select-none disabled:opacity-50 disabled:pointer-events-none ${sizeStyles} ${variantStyles} ${className}`}
    >
      {/* Brass sheen shimmer effect on hover */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />

      {/* Button Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </button>
  );
};
