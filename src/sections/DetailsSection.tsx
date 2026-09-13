import React, { useState } from 'react';
import { EVENT_DETAILS } from '../config/eventData';
import { SectionHeading } from '../components/decorative/SectionHeading';
import { PhysicalCard } from '../components/decorative/PhysicalCard';
import { CornerFlourish, CeremonialSeal, DiyaFlame } from '../components/decorative/DecorativeIcons';
import { BrassDivider } from '../components/decorative/BrassDivider';
import { Calendar, CalendarPlus, MapPin, Clock, Copy, Check, Navigation } from 'lucide-react';
import { getGoogleCalendarUrl } from '../lib/calendar';

export const DetailsSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyVenue = () => {
    navigator.clipboard.writeText(EVENT_DETAILS.fullVenue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="venue"
      className="relative w-full pt-6 sm:pt-10 pb-24 sm:pb-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#241711] via-[#331E17] to-[#241711] text-[#F3EBDD] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading
          number="05"
          tag="CEREMONIAL CONVOCATION"
          title="THE OFFICIAL INVITATION"
          subtitle="You are cordially invited to celebrate culture and heritage at IEC College of Engineering & Technology."
          align="center"
        />

        {/* Physical Royal Invitation Card */}
        <div className="relative mx-auto max-w-4xl">
          <PhysicalCard
            variant="parchment"
            elevation="high"
            className="p-8 sm:p-14 text-center border-2 border-[#B08A45]"
          >
            {/* Wax Seal Badge Header */}
            <div className="flex justify-center mb-6">
              <CeremonialSeal size={84} text="ASMITA • 2026 • IEC CET •" />
            </div>

            {/* Subtitle / Invitation Text */}
            <span className="text-xs sm:text-sm font-cinzel tracking-[0.3em] text-[#8E3F2C] uppercase font-bold block mb-3">
              OFFICIAL EVENT CONVOCATION
            </span>

            <p className="text-sm sm:text-base font-serif italic text-[#3A241B] max-w-xl mx-auto leading-relaxed mb-8">
              The Spearheads Student Council cordially invites all students, faculty, and patrons under The IECian Cultural Society Network to partake in:
            </p>

            {/* Wordmark in Invitation */}
            <h3 className="text-5xl sm:text-7xl md:text-8xl font-serif-display font-black text-[#241711] tracking-tight mb-2">
              ASMITA
            </h3>
            <span className="text-lg sm:text-2xl font-cinzel font-semibold tracking-[0.35em] text-[#B65A3C] uppercase block mb-10">
              ETHNIC DAY
            </span>

            {/* VISUALLY DOMINANT DATE BLOCK */}
            <div className="my-8 py-8 border-y-2 border-[#8E3F2C]/30 bg-[#F3EBDD]/60 rounded-xl relative overflow-hidden">
              <div className="flex flex-col items-center justify-center space-y-3">
                <span className="text-xs sm:text-sm font-cinzel font-bold tracking-[0.3em] text-[#8E3F2C] uppercase">
                  DATE OF CELEBRATION
                </span>
                <div className="text-4xl sm:text-6xl md:text-7xl font-serif-display font-black text-[#241711] tracking-tight">
                  SEPTEMBER 16, 2026
                </div>
                <div className="inline-flex items-center gap-3">
                  <div className="h-[1px] w-12 bg-[#8E3F2C]/60" />
                  <span className="text-base sm:text-xl font-cinzel font-semibold tracking-[0.25em] text-[#8E3F2C]">
                    WEDNESDAY
                  </span>
                  <div className="h-[1px] w-12 bg-[#8E3F2C]/60" />
                </div>

                {/* Direct Google Calendar Link */}
                <div className="pt-2">
                  <a
                    href={getGoogleCalendarUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#8E3F2C] hover:bg-[#A84D34] text-[#FAF6EE] text-xs font-cinzel font-bold tracking-wider transition-all duration-200 shadow-md hover:scale-[1.02]"
                    title="Add ASMITA 2026 to Google Calendar"
                  >
                    <CalendarPlus size={15} className="text-[#E8D7B8]" />
                    <span>ADD TO GOOGLE CALENDAR</span>
                  </a>
                </div>
              </div>
            </div>

            {/* VENUE BLOCK */}
            <div className="my-8 space-y-3">
              <span className="text-xs sm:text-sm font-cinzel font-bold tracking-[0.3em] text-[#8E3F2C] uppercase block">
                VENUE & LOCATION
              </span>
              <div className="text-2xl sm:text-4xl font-serif-display font-bold text-[#241711]">
                SEMINAR HALL, F BLOCK
              </div>
              <p className="text-base sm:text-lg font-serif text-[#3A241B]">
                IEC College of Engineering & Technology, Greater Noida
              </p>

              {/* Copy Address Action */}
              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  onClick={handleCopyVenue}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#8E3F2C]/40 bg-[#E8D7B8] hover:bg-[#F3EBDD] text-[#241711] text-xs font-cinzel tracking-wider transition-colors"
                >
                  {copied ? <Check size={14} className="text-emerald-700" /> : <Copy size={14} />}
                  <span>{copied ? 'VENUE COPIED TO CLIPBOARD' : 'COPY FULL VENUE ADDRESS'}</span>
                </button>
              </div>
            </div>

            {/* Schedule Section Readiness (Honoring prompt mandate: do not invent schedules, make easily editable) */}
            <div className="mt-10 p-5 rounded-lg border border-[#8E3F2C]/20 bg-[#F3EBDD]/40 text-left max-w-2xl mx-auto">
              <div className="flex items-center gap-2 text-xs font-cinzel font-bold text-[#8E3F2C] uppercase mb-1">
                <Clock size={14} />
                <span>PROGRAM TIMETABLE</span>
              </div>
              <p className="text-xs text-[#3A241B]/80 leading-relaxed font-sans">
                The detailed sequence of cultural ceremonies, ethnic showcases, and faculty recognitions will be circulated to all registered attendees prior to September 16, 2026.
              </p>
            </div>

            {/* Invitation Footer */}
            <div className="mt-10 pt-6 border-t border-[#8E3F2C]/30 text-xs sm:text-sm font-serif italic text-[#8E3F2C]">
              Traditional attire encouraged • Free entry with registered participant pass
            </div>
          </PhysicalCard>
        </div>
      </div>
    </section>
  );
};
