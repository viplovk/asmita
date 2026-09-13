import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EVENT_DETAILS } from '../config/eventData';
import { MandalaArt } from '../components/decorative/MandalaArt';
import { JaaliPattern } from '../components/decorative/JaaliPattern';
import { CulturalArtifactCanvas } from '../three/CulturalArtifactCanvas';
import { MagneticButton } from '../components/ui/MagneticButton';
import { CountdownTimer } from '../components/ui/CountdownTimer';
import { CornerFlourish, CeremonialSeal } from '../components/decorative/DecorativeIcons';
import { Calendar, CalendarPlus, MapPin, Sparkles, ArrowDown } from 'lucide-react';
import { getGoogleCalendarUrl } from '../lib/calendar';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onOpenRegister: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenRegister }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const ornamentFrameRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const titleLetters = 'ASMITA'.split('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Letter-by-letter dramatic editorial reveal
      gsap.from(letterRefs.current, {
        y: 80,
        opacity: 0,
        rotateX: 45,
        stagger: 0.08,
        duration: 1.4,
        ease: 'power3.out',
        delay: 0.2,
      });

      // 2. Subtitle & metadata reveal
      gsap.from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out',
        delay: 0.8,
      });

      // 3. CTA Buttons reveal
      gsap.from(ctaRef.current, {
        y: 20,
        opacity: 0,
        duration: 1.0,
        ease: 'power2.out',
        delay: 1.1,
      });

      // 4. ScrollTrigger: Subtle ornamental frame separation on scroll
      if (ornamentFrameRef.current) {
        gsap.to(ornamentFrameRef.current, {
          scale: 1.15,
          opacity: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between items-center px-4 sm:px-6 lg:px-8 pt-28 pb-12 overflow-hidden bg-gradient-to-b from-[#241711] via-[#2D1B14] to-[#241711] paper-grain-texture"
    >
      {/* Background Architectural Jaali Texture */}
      <JaaliPattern patternType="star" opacity={0.06} />

      {/* Decorative Traditional Corner Accents */}
      <div className="absolute top-6 left-6 pointer-events-none hidden md:block">
        <CornerFlourish position="top-left" size={60} color="#B08A45" />
      </div>
      <div className="absolute top-6 right-6 pointer-events-none hidden md:block">
        <CornerFlourish position="top-right" size={60} color="#B08A45" />
      </div>

      {/* Floating Center Mandala Geometry */}
      <div
        ref={ornamentFrameRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
      >
        <MandalaArt size={750} opacity={0.2} spinning={true} />
      </div>

      {/* Top Event Kicker & Presenter Notice */}
      <div className="relative z-10 text-center max-w-2xl mx-auto mt-2 sm:mt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#B08A45]/40 bg-[#3A241B]/60 backdrop-blur-xs mb-3">
          <Sparkles size={12} className="text-[#C08A32]" />
          <span className="text-[10px] sm:text-[11px] font-cinzel tracking-[0.25em] text-[#E8D7B8] uppercase">
            SPEARHEADS STUDENT COUNCIL PRESENTS
          </span>
        </div>
        <p className="text-[10px] tracking-[0.2em] text-[#D8C19A]/80 uppercase font-sans">
          The IECian Cultural Society Network • IEC College of Engineering & Technology
        </p>
      </div>

      {/* Hero Core Content: 3D Artifact + Dramatic ASMITA Typography */}
      <div className="relative z-10 w-full max-w-6xl mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-8 py-6 sm:py-10">
        
        {/* Left / Center Editorial Headline & Information */}
        <div className="lg:col-span-7 text-center lg:text-left">
          {/* Devanagari Script Touch */}
          <div className="mb-2">
            <span className="text-sm sm:text-base font-serif italic text-[#C08A32] tracking-widest">
              — अस्मिता : आत्मसम्मान एवं संस्कृति —
            </span>
          </div>

          {/* Enormous Editorial ASMITA Wordmark */}
          <div
            ref={titleContainerRef}
            className="flex justify-center lg:justify-start items-center gap-1 sm:gap-2 my-2 overflow-hidden"
          >
            {titleLetters.map((letter, i) => (
              <span
                key={i}
                ref={(el) => (letterRefs.current[i] = el)}
                className="inline-block text-6xl sm:text-8xl md:text-9xl lg:text-[7.5rem] font-serif-display font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-[#F3EBDD] via-[#E8D7B8] to-[#B08A45] drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)] select-none"
              >
                {letter}
              </span>
            ))}
          </div>

          {/* Tagline & Subtitle */}
          <div ref={subtitleRef} className="space-y-4">
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <div className="h-[1px] w-8 sm:w-12 bg-[#B65A3C]" />
              <span className="text-xl sm:text-2xl md:text-3xl font-cinzel font-semibold tracking-[0.3em] text-[#B65A3C] uppercase">
                ETHNIC DAY
              </span>
              <div className="h-[1px] w-8 sm:w-12 bg-[#B65A3C]" />
            </div>

            <p className="text-sm sm:text-base md:text-lg text-[#D8C19A] max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
              A celebration of culture, identity & expression. An evening honoring ancestral roots, handcrafted textiles, and living traditions.
            </p>

            {/* Event Coordinates Badge */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs sm:text-sm text-[#F3EBDD]">
              <a
                href={getGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                title="Add ASMITA 2026 to Google Calendar"
                className="flex items-center gap-2 bg-[#3A241B]/70 hover:bg-[#4E2B1E] border border-[#B08A45]/30 hover:border-[#C08A32] px-3.5 py-2 rounded-lg backdrop-blur-xs transition-all duration-200 group cursor-pointer"
              >
                <CalendarPlus size={16} className="text-[#C08A32] group-hover:scale-110 transition-transform" />
                <span className="font-cinzel tracking-wider group-hover:text-[#F3EBDD]">
                  SEPTEMBER 16, 2026 • WEDNESDAY
                </span>
                <span className="text-[9.5px] font-sans text-[#C08A32] bg-[#B08A45]/20 px-1.5 py-0.5 rounded border border-[#B08A45]/40 ml-1">
                  + Google Cal
                </span>
              </a>
              <div className="flex items-center gap-2 bg-[#3A241B]/70 border border-[#B08A45]/30 px-3.5 py-2 rounded-lg backdrop-blur-xs">
                <MapPin size={16} className="text-[#B65A3C]" />
                <span className="font-cinzel tracking-wider">
                  SEMINAR HALL, F BLOCK • GREATER NOIDA
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
            >
              <MagneticButton
                variant="primary"
                size="lg"
                onClick={onOpenRegister}
                className="w-full sm:w-auto"
              >
                <span>REGISTER FOR ASMITA</span>
                <span className="text-sm">→</span>
              </MagneticButton>

              <a
                href="#about"
                className="inline-flex items-center gap-2 text-xs font-cinzel tracking-[0.2em] text-[#D8C19A] hover:text-[#F3EBDD] py-3 px-4 transition-colors"
              >
                <span>EXPLORE THE GATHERING</span>
                <ArrowDown size={14} className="text-[#C08A32] animate-bounce" />
              </a>
            </div>
          </div>
        </div>

        {/* Right 3D Interactive Cultural Artifact Centerpiece */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          {/* Subtle glow backdrop */}
          <div className="absolute w-72 h-72 rounded-full bg-[#B65A3C]/15 blur-3xl pointer-events-none" />

          {/* Ceremonial Insignia Seal Badge */}
          <div className="absolute -top-4 -right-4 z-20 hidden sm:block">
            <CeremonialSeal size={72} />
          </div>

          <CulturalArtifactCanvas className="w-full max-w-sm sm:max-w-md mx-auto" />
        </div>
      </div>

      {/* Hero Bottom Bar: Live Countdown & Subtle Scroll Cue */}
      <div className="relative z-10 w-full max-w-4xl mx-auto pt-6 border-t border-[#B08A45]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <CountdownTimer />
        <div className="text-center sm:text-right text-[11px] text-[#D8C19A]/80 font-serif italic">
          <span>Traditional attire encouraged • Greater Noida</span>
        </div>
      </div>
    </section>
  );
};
