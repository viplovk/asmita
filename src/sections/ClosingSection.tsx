import React from 'react';
import { EVENT_DETAILS } from '../config/eventData';
import { BrassDivider } from '../components/decorative/BrassDivider';
import { MandalaArt } from '../components/decorative/MandalaArt';
import { CeremonialSeal, CornerFlourish } from '../components/decorative/DecorativeIcons';
import { MagneticButton } from '../components/ui/MagneticButton';
import { Sparkles, ArrowUp } from 'lucide-react';

interface ClosingSectionProps {
  onOpenRegister: () => void;
}

export const ClosingSection: React.FC<ClosingSectionProps> = ({ onOpenRegister }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full pt-12 sm:pt-16 pb-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#241711] via-[#1D120D] to-[#140B07] text-[#F3EBDD] overflow-hidden">
      
      {/* Background Mandala Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-10">
        <MandalaArt size={700} spinning={true} />
      </div>

      <div className="max-w-5xl mx-auto relative z-10 text-center space-y-8">
        {/* Ceremonial Insignia */}
        <div className="flex justify-center">
          <CeremonialSeal size={76} text="ASMITA • 2026 • CELEBRATE •" />
        </div>

        {/* DRAMATIC CLOSING TYPOGRAPHY */}
        <div className="space-y-2">
          <span className="text-xs sm:text-sm font-cinzel tracking-[0.35em] text-[#C08A32] uppercase block">
            AN INVITATION TO ALL HEARTS
          </span>
          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif-display font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#F3EBDD] via-[#E8D7B8] to-[#B08A45]">
            SEE YOU<br />AT ASMITA.
          </h2>
        </div>

        {/* DATE & VENUE RECAP */}
        <div className="space-y-1 pt-2">
          <div className="text-xl sm:text-2xl md:text-3xl font-cinzel font-bold text-[#B65A3C] tracking-widest">
            16 SEPTEMBER 2026
          </div>
          <div className="text-sm sm:text-base font-cinzel tracking-[0.25em] text-[#D8C19A] opacity-90">
            SEMINAR HALL • F BLOCK
          </div>
          <div className="text-xs text-[#D8C19A]/70 font-sans tracking-wider pt-1">
            IEC College of Engineering & Technology, Greater Noida
          </div>
        </div>

        {/* ELEGANT BRASS ORNAMENTAL DIVIDER */}
        <BrassDivider variant="ornate" accentText="CULTURE • TRADITION • CELEBRATION" />

        {/* Footer Message */}
        <p className="text-sm sm:text-base font-serif italic text-[#E8D7B8] max-w-xl mx-auto leading-relaxed">
          {EVENT_DETAILS.footerMessage}
        </p>

        {/* Quick Registration & Back to top */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <MagneticButton variant="brass" size="md" onClick={onOpenRegister}>
            <span>CONFIRM ATTENDANCE</span>
            <span>→</span>
          </MagneticButton>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-cinzel tracking-widest text-[#D8C19A]/70 hover:text-[#F3EBDD] transition-colors"
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={14} />
          </button>
        </div>

        {/* Institutional Affiliation Line */}
        <div className="pt-12 border-t border-[#B08A45]/20 text-xs text-[#D8C19A]/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <span className="font-semibold text-[#D8C19A]">ASMITA — ETHNIC DAY 2026</span>
            <span className="block text-[11px]">Presented by Spearheads Student Council</span>
            <span className="block text-[11px]">Under The IECian Cultural Society Network</span>
          </div>
          <div className="text-center sm:text-right text-[11px]">
            <span>IEC College of Engineering & Technology</span>
            <span className="block">Knowledge Park I, Greater Noida</span>
          </div>
        </div>

        {/* ==================================================== */}
        {/* 27. EXTREMELY SMALL CREATOR CREDIT                     */}
        {/* Subtle, barely visible, 7-9px font size, low opacity    */}
        {/* ==================================================== */}
        <div className="pt-16 pb-4 select-none">
          <div
            className="text-center text-[#D8C19A] opacity-25 hover:opacity-75 transition-opacity duration-300 font-mono tracking-widest"
            style={{ fontSize: '8px', letterSpacing: '0.18em' }}
          >
            <span>Viplov · 19 · Delhi · </span>
            <a href="mailto:viplov7@icloud.com" className="hover:underline">viplov7@icloud.com</a>
            <span> · </span>
            <a href="https://github.com/viplovk" target="_blank" rel="noopener noreferrer" className="hover:underline">github.com/viplovk</a>
            <span> · </span>
            <a href="https://linkedin.com/in/viplov7" target="_blank" rel="noopener noreferrer" className="hover:underline">linkedin.com/in/viplov7</a>
            <span> · </span>
            <a href="https://x.com/vishuk30" target="_blank" rel="noopener noreferrer" className="hover:underline">x.com/vishuk30</a>
            <span> · </span>
            <a href="https://instagram.com/studymaterialboy" target="_blank" rel="noopener noreferrer" className="hover:underline">instagram.com/studymaterialboy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
