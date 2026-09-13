import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeading } from '../components/decorative/SectionHeading';
import { PhysicalCard } from '../components/decorative/PhysicalCard';
import { EXPERIENCE_THEMES } from '../config/eventData';
import { PaisleyIcon, DiyaFlame, LotusMotif, CornerFlourish } from '../components/decorative/DecorativeIcons';
import { Compass, Sparkles, Feather, Crown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const ExperienceSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsContainerRef.current?.children;
      if (cards) {
        gsap.from(cards, {
          y: 70,
          opacity: 0,
          stagger: 0.15,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: 'top 80%',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getThemeIcon = (id: string) => {
    switch (id) {
      case 'tradition':
        return <LotusMotif size={28} className="text-[#B65A3C]" />;
      case 'style':
        return <Crown size={26} className="text-[#C08A32]" />;
      case 'culture':
        return <PaisleyIcon size={28} className="text-[#D8C19A]" />;
      case 'celebration':
        return <DiyaFlame size={26} className="text-[#B08A45]" />;
      default:
        return <Sparkles size={26} className="text-[#B08A45]" />;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative w-full py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#241711] via-[#2A1812] to-[#241711] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          number="03"
          tag="THE ATMOSPHERE"
          title="FOUR PILLARS OF ETHNIC HERITAGE"
          subtitle="A multi-sensory physical journey through four distinct cultural facets of Asmita."
          align="center"
        />

        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch"
        >
          {EXPERIENCE_THEMES.map((theme, index) => (
            <div key={theme.id} className="flex flex-col">
              <PhysicalCard
                variant={theme.materialLook}
                elevation="high"
                className="h-full flex flex-col justify-between"
              >
                <div>
                  {/* Top metadata badge */}
                  <div className="flex items-center justify-between border-b pb-3 mb-4 opacity-70 text-[10px] font-mono tracking-widest uppercase">
                    <span>ARTEFACT 0{index + 1}</span>
                    <span>{theme.materialLook.toUpperCase()}</span>
                  </div>

                  {/* Icon & Title */}
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-lg bg-black/20 flex items-center justify-center mb-3">
                      {getThemeIcon(theme.id)}
                    </div>
                    <h3 className="text-2xl font-serif-display font-bold tracking-wide">
                      {theme.title}
                    </h3>
                    <p className="text-xs font-cinzel tracking-wider text-[#C08A32] mt-1">
                      {theme.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm opacity-90 leading-relaxed font-light mb-6">
                    {theme.description}
                  </p>
                </div>

                {/* Highlights list */}
                <div className="border-t pt-4 space-y-1.5 text-[11px] font-medium tracking-wide">
                  {theme.highlights.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 opacity-85">
                      <span className="text-[#C08A32] text-xs">❖</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </PhysicalCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
