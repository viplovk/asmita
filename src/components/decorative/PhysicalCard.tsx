import React from 'react';
import { CornerFlourish } from './DecorativeIcons';

interface PhysicalCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'terracotta' | 'parchment' | 'wood' | 'brass';
  hasCorners?: boolean;
  elevation?: 'subtle' | 'medium' | 'high';
  onClick?: () => void;
  id?: string;
}

export const PhysicalCard: React.FC<PhysicalCardProps> = ({
  children,
  className = '',
  variant = 'terracotta',
  hasCorners = true,
  elevation = 'medium',
  onClick,
  id,
}) => {
  const variantStyles = {
    terracotta:
      'bg-gradient-to-b from-[#3A241B]/90 via-[#2A1A13]/95 to-[#241711] border border-[#8E3F2C]/40 text-[#F3EBDD] shadow-[0_12px_36px_rgba(0,0,0,0.45)] hover:border-[#B65A3C]/70',
    parchment:
      'bg-[#E8D7B8] text-[#241711] border border-[#B08A45]/50 shadow-[0_12px_32px_rgba(36,23,17,0.3)] hover:border-[#8E3F2C]/60',
    wood:
      'bg-gradient-to-b from-[#2E1D16] to-[#1F130E] border border-[#B08A45]/30 text-[#F3EBDD] shadow-[0_14px_40px_rgba(0,0,0,0.5)]',
    brass:
      'bg-gradient-to-br from-[#3D291C] via-[#332015] to-[#251710] border-2 border-[#B08A45]/60 text-[#F3EBDD] shadow-[0_16px_45px_rgba(176,138,69,0.18)] hover:border-[#D8C19A]/90',
  }[variant];

  const elevationShadow = {
    subtle: 'hover:-translate-y-0.5 transition-transform duration-300',
    medium: 'hover:-translate-y-1.5 transition-all duration-400 ease-out',
    high: 'hover:-translate-y-2 hover:shadow-[0_22px_55px_rgba(0,0,0,0.6)] transition-all duration-500 ease-out',
  }[elevation];

  return (
    <div
      id={id}
      onClick={onClick}
      className={`relative rounded-xl overflow-hidden p-6 sm:p-8 backdrop-blur-xs paper-grain-texture ${variantStyles} ${elevationShadow} ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      {/* Corner Ornaments */}
      {hasCorners && (
        <>
          <CornerFlourish
            position="top-left"
            size={28}
            className="absolute top-2 left-2 opacity-60"
            color={variant === 'parchment' ? '#8E3F2C' : '#B08A45'}
          />
          <CornerFlourish
            position="top-right"
            size={28}
            className="absolute top-2 right-2 opacity-60"
            color={variant === 'parchment' ? '#8E3F2C' : '#B08A45'}
          />
          <CornerFlourish
            position="bottom-left"
            size={28}
            className="absolute bottom-2 left-2 opacity-60"
            color={variant === 'parchment' ? '#8E3F2C' : '#B08A45'}
          />
          <CornerFlourish
            position="bottom-right"
            size={28}
            className="absolute bottom-2 right-2 opacity-60"
            color={variant === 'parchment' ? '#8E3F2C' : '#B08A45'}
          />
        </>
      )}

      {/* Subtle border inset line */}
      <div
        className={`absolute inset-2 pointer-events-none rounded-lg border ${
          variant === 'parchment' ? 'border-[#8E3F2C]/15' : 'border-[#B08A45]/15'
        }`}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
};
