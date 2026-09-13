import React from 'react';

interface BrassDividerProps {
  className?: string;
  variant?: 'simple' | 'ornate' | 'minimal';
  accentText?: string;
}

export const BrassDivider: React.FC<BrassDividerProps> = ({
  className = '',
  variant = 'ornate',
  accentText,
}) => {
  if (variant === 'minimal') {
    return (
      <div className={`flex items-center justify-center gap-3 my-6 ${className}`}>
        <div className="h-[1px] flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-[#B08A45]/60" />
        <div className="w-1.5 h-1.5 rotate-45 bg-[#B08A45] shadow-[0_0_8px_rgba(176,138,69,0.5)]" />
        <div className="h-[1px] flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-[#B08A45]/60" />
      </div>
    );
  }

  if (variant === 'simple') {
    return (
      <div className={`flex items-center justify-center gap-4 my-8 ${className}`}>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#B08A45]/40 to-[#B08A45]/80" />
        <span className="text-[#C08A32] text-xs font-serif tracking-[0.3em] uppercase px-2">
          {accentText || '✦'}
        </span>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#B08A45]/40 to-[#B08A45]/80" />
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center gap-3 py-6 select-none ${className}`}>
      {/* Left wing */}
      <div className="h-[1px] flex-1 max-w-xs bg-gradient-to-r from-transparent via-[#B08A45]/40 to-[#B08A45]" />
      
      {/* Left ornament */}
      <div className="hidden sm:flex items-center gap-1.5 opacity-80">
        <div className="w-1 h-1 rounded-full bg-[#B08A45]" />
        <div className="w-2 h-2 rotate-45 border border-[#B08A45]" />
      </div>

      {/* Centerpiece */}
      <div className="flex items-center gap-2 px-3 py-1 border border-[#B08A45]/30 rounded-full bg-[#3A241B]/40 backdrop-blur-xs">
        <span className="text-[#C08A32] text-[10px]">❖</span>
        {accentText ? (
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#E8D7B8] font-cinzel font-medium">
            {accentText}
          </span>
        ) : (
          <span className="text-[10px] tracking-[0.3em] text-[#B08A45] font-serif">
            ASMITA • 2026
          </span>
        )}
        <span className="text-[#C08A32] text-[10px]">❖</span>
      </div>

      {/* Right ornament */}
      <div className="hidden sm:flex items-center gap-1.5 opacity-80">
        <div className="w-2 h-2 rotate-45 border border-[#B08A45]" />
        <div className="w-1 h-1 rounded-full bg-[#B08A45]" />
      </div>

      {/* Right wing */}
      <div className="h-[1px] flex-1 max-w-xs bg-gradient-to-l from-transparent via-[#B08A45]/40 to-[#B08A45]" />
    </div>
  );
};
