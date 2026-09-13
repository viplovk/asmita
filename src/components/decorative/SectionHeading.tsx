import React from 'react';

interface SectionHeadingProps {
  number?: string;
  tag?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  dark?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  number,
  tag,
  title,
  subtitle,
  align = 'left',
  className = '',
  dark = true,
}) => {
  const alignmentClass = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  }[align];

  return (
    <div className={`flex flex-col ${alignmentClass} mb-6 sm:mb-8 ${className}`}>
      {/* Top category / ceremonial badge */}
      <div className="inline-flex items-center gap-2 mb-3">
        {number && (
          <span className="text-[11px] font-mono tracking-widest text-[#B08A45] uppercase">
            {number}
          </span>
        )}
        {number && tag && <span className="text-[#8E3F2C] text-xs">/</span>}
        {tag && (
          <span className="text-[11px] font-cinzel tracking-[0.25em] text-[#C08A32] uppercase font-semibold">
            {tag}
          </span>
        )}
      </div>

      {/* Main Heading */}
      <h2
        className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif-display leading-[1.08] tracking-tight ${
          dark ? 'text-[#F3EBDD]' : 'text-[#241711]'
        }`}
      >
        {title}
      </h2>

      {/* Editorial Subtitle */}
      {subtitle && (
        <p
          className={`mt-4 text-base sm:text-lg max-w-2xl font-light leading-relaxed ${
            dark ? 'text-[#D8C19A]/90' : 'text-[#3A241B]/80'
          }`}
        >
          {subtitle}
        </p>
      )}

      {/* Subtle under-divider */}
      <div
        className={`mt-6 h-[1.5px] w-16 bg-gradient-to-r ${
          align === 'center'
            ? 'from-transparent via-[#B08A45] to-transparent'
            : 'from-[#B08A45] to-transparent'
        }`}
      />
    </div>
  );
};
