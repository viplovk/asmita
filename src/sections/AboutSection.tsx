import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeading } from '../components/decorative/SectionHeading';
import { BrassDivider } from '../components/decorative/BrassDivider';
import { PhysicalCard } from '../components/decorative/PhysicalCard';
import { PaisleyIcon, LotusMotif } from '../components/decorative/DecorativeIcons';
import { EVENT_DETAILS } from '../config/eventData';
import { Sparkles, Shield, Compass, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textContainerRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: textContainerRef.current,
          start: 'top 80%',
        },
      });

      gsap.from(cardRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.4,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-[#241711] text-[#F3EBDD] overflow-hidden"
    >
      {/* Subtle background ambient terracotta warmth */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 rounded-full bg-[#B65A3C]/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 rounded-full bg-[#C08A32]/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          number="02"
          tag="THE PHILOSOPHY"
          title="A CELEBRATION OF CULTURE, IDENTITY & EXPRESSION"
          subtitle="Honoring where we come from, stepping boldly into who we are."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Editorial Statement & Vision */}
          <div ref={textContainerRef} className="lg:col-span-7 space-y-8">
            <div className="relative pl-6 sm:pl-8 border-l-2 border-[#B65A3C]">
              <span className="absolute -left-3 -top-2 text-[#C08A32] text-xl">❝</span>
              <p className="text-xl sm:text-2xl md:text-3xl font-serif-display leading-relaxed text-[#F3EBDD] italic font-light">
                ASMITA — Ethnic Day is an evening dedicated to celebrating culture, tradition and individuality through the language of ethnic fashion and expression.
              </p>
            </div>

            <p className="text-base sm:text-lg text-[#D8C19A] font-light leading-relaxed">
              Rooted in the timeless richness of our subcontinent, ASMITA brings together students, faculty, and creators to express their unique heritage. From the royal drapes of Varanasi and Kanchipuram to hand-spun rural weaves and folk attire, this evening is an invitation to wear your ancestral story with poise and pride.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="p-5 rounded-lg border border-[#B08A45]/30 bg-[#3A241B]/40 paper-grain-texture">
                <div className="flex items-center gap-3 mb-2">
                  <PaisleyIcon size={20} className="text-[#C08A32]" />
                  <h3 className="font-cinzel text-sm text-[#F3EBDD] tracking-wider uppercase">
                    Spearheads Council
                  </h3>
                </div>
                <p className="text-xs text-[#D8C19A]/80 leading-relaxed">
                  Presented with dedication by Spearheads Student Council, fostering creative leadership and cultural stewardship.
                </p>
              </div>

              <div className="p-5 rounded-lg border border-[#B08A45]/30 bg-[#3A241B]/40 paper-grain-texture">
                <div className="flex items-center gap-3 mb-2">
                  <LotusMotif size={20} className="text-[#B65A3C]" />
                  <h3 className="font-cinzel text-sm text-[#F3EBDD] tracking-wider uppercase">
                    The IECian Network
                  </h3>
                </div>
                <p className="text-xs text-[#D8C19A]/80 leading-relaxed">
                  Convened under The IECian Cultural Society Network to unite campus departments in a ceremonial celebration of diversity.
                </p>
              </div>
            </div>

            <BrassDivider variant="minimal" />
          </div>

          {/* Right Column: Physical Museum Plaque / Artifact Card */}
          <div ref={cardRef} className="lg:col-span-5">
            <PhysicalCard
              variant="parchment"
              elevation="high"
              className="relative transform lg:rotate-1"
            >
              {/* Museum label aesthetic header */}
              <div className="flex items-center justify-between border-b border-[#8E3F2C]/30 pb-4 mb-6">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#8E3F2C] uppercase block">
                    CURATORIAL DISPATCH • IEC/ET/2026
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif-display font-bold text-[#241711] tracking-tight">
                    The Spirit of Asmita
                  </h3>
                </div>
                <LotusMotif size={28} className="text-[#8E3F2C]" />
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#3A241B] leading-relaxed">
                <p>
                  <strong>‘Asmita’</strong> translates to pure identity, pride, and selfhood. In a fast-evolving academic landscape, this gathering provides a sacred pause to reflect on the rich tapestry of Indian civilization.
                </p>
                <p>
                  Every weave holds an unspoken memory; every motif carries ancestral blessings. Whether you arrive in silk, khadi, zari, or modern handloom fusion, your presence enriches the collective mosaic.
                </p>
              </div>

              {/* Plaque Footer with official event markers */}
              <div className="mt-8 pt-4 border-t border-[#8E3F2C]/30 flex items-center justify-between text-[11px] font-cinzel text-[#8E3F2C]">
                <div>
                  <span className="block font-bold">WEDNESDAY</span>
                  <span className="opacity-80">16 SEPT 2026</span>
                </div>
                <div className="text-right">
                  <span className="block font-bold">SEMINAR HALL</span>
                  <span className="opacity-80">F BLOCK, IEC CET</span>
                </div>
              </div>
            </PhysicalCard>
          </div>

        </div>
      </div>
    </section>
  );
};
