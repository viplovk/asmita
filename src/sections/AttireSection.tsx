import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeading } from '../components/decorative/SectionHeading';
import { BrassDivider } from '../components/decorative/BrassDivider';
import { PhysicalCard } from '../components/decorative/PhysicalCard';
import { ATTIRE_INSPIRATIONS, EVENT_DETAILS } from '../config/eventData';
import { Sparkles, Layers, Scissors, Shirt } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const AttireSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const editorialQuoteRef = useRef<HTMLDivElement>(null);
  const swatchesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="attire"
      className="relative w-full pt-6 sm:pt-8 pb-2 px-4 sm:px-6 lg:px-8 bg-[#241711] text-[#F3EBDD] overflow-hidden"
    >
      {/* Background textile weave grid */}
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Heading */}
        <SectionHeading
          number="04"
          tag="SARTORIAL CODE"
          title="COME DRESSED IN YOUR STORY"
          subtitle="Traditional attire encouraged. Every fold, weave, and ornament holds a memory waiting to be shared."
          className="!mb-4 sm:!mb-5"
        />

        {/* Editorial Fashion Manifest */}
        <div
          ref={editorialQuoteRef}
          className="mb-4 sm:mb-5 p-5 sm:p-8 rounded-2xl bg-gradient-to-r from-[#3A241B] via-[#2A1812] to-[#3A241B] border border-[#B08A45]/40 paper-grain-texture relative overflow-hidden"
        >
          {/* Subtle watermark */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-9xl font-serif-display font-black text-[#B08A45]/5 select-none pointer-events-none">
            ASMITA
          </div>

          <div className="relative z-10 max-w-3xl">
            <span className="text-[11px] font-cinzel tracking-[0.3em] text-[#C08A32] uppercase block mb-2">
              THE COUTURE OF HERITAGE
            </span>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-serif-display font-light leading-snug text-[#F3EBDD] mb-3">
              Wear the loom of your motherland. Wear the courage of your roots.
            </h3>
            <p className="text-xs sm:text-sm text-[#D8C19A] leading-relaxed font-light">
              Ethnic Day is not about uniformity; it is an open canvas for regional distinctiveness. Whether it is a hand-spun khadi kurta, a regal silk sherwani, a grand nine-yard drape, or indigenous tribal regalia, you are invited to represent your authentic cultural identity.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] font-cinzel text-[#E8D7B8]">
              <span className="px-2.5 py-1 bg-[#8E3F2C]/40 rounded-full border border-[#B65A3C]/40">
                ✦ All Pan-Indian Attire Welcomed
              </span>
              <span className="px-2.5 py-1 bg-[#8E3F2C]/40 rounded-full border border-[#B65A3C]/40">
                ✦ Handlooms & Khadi Celebrated
              </span>
              <span className="px-2.5 py-1 bg-[#8E3F2C]/40 rounded-full border border-[#B65A3C]/40">
                ✦ Cultural Fusion Respected
              </span>
            </div>
          </div>
        </div>

        {/* Attire Archetypes Grid */}
        <div
          ref={swatchesRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          {ATTIRE_INSPIRATIONS.map((item, index) => (
            <div
              key={index}
              className="group relative rounded-xl border border-[#B08A45]/30 bg-[#2A1812]/90 p-4 flex flex-col justify-between hover:border-[#B08A45] transition-all duration-300 paper-grain-texture shadow-[0_4px_16px_rgba(0,0,0,0.25)]"
            >
              <div>
                {/* Textile Swatch Header */}
                <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-[#C08A32] uppercase mb-2.5 pb-1.5 border-b border-[#B08A45]/20">
                  <span>SWATCH 0{index + 1}</span>
                  <span className="text-[#D8C19A]">{item.tag}</span>
                </div>

                {/* Swatch Abstract Texture Graphic */}
                <div className="w-full h-16 sm:h-20 rounded-lg mb-3 bg-gradient-to-br from-[#3A241B] via-[#8E3F2C]/40 to-[#241711] border border-[#B08A45]/20 flex items-center justify-center relative overflow-hidden group-hover:border-[#B08A45]/60 transition-colors">
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `repeating-linear-gradient(45deg, #B08A45 0, #B08A45 1px, transparent 0, transparent 8px)`,
                    }}
                  />
                  <span className="relative z-10 text-[11px] font-cinzel tracking-wider text-[#E8D7B8] px-2.5 py-0.5 bg-[#241711]/80 rounded-sm border border-[#B08A45]/30">
                    {item.tag}
                  </span>
                </div>

                <h4 className="text-base font-serif-display font-bold text-[#F3EBDD] group-hover:text-[#E8D7B8] transition-colors mb-1">
                  {item.category}
                </h4>

                <p className="text-[11px] text-[#D8C19A]/80 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-[#B08A45]/15 text-[10px] font-cinzel text-[#C08A32] tracking-wider flex items-center gap-1.5">
                <span>❖</span>
                <span>Traditional attire encouraged</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
