import React from 'react';
import { COORDINATORS, EVENT_DETAILS } from '../config/eventData';
import { SectionHeading } from '../components/decorative/SectionHeading';
import { PhysicalCard } from '../components/decorative/PhysicalCard';
import { BrassDivider } from '../components/decorative/BrassDivider';
import { Phone, Mail, MapPin, User, MessageSquare } from 'lucide-react';

export const ContactSection: React.FC = () => {
  return (
    <section
      id="contact"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#241711] text-[#F3EBDD] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading
          number="07"
          tag="COORDINATION DESK"
          title="INQUIRIES & DELEGATION CONTACTS"
          subtitle="Direct coordinates for institutional delegations, cultural queries, and event coordination."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {COORDINATORS.map((coordinator, idx) => (
            <PhysicalCard
              key={idx}
              variant={idx === 0 ? 'terracotta' : 'wood'}
              elevation="high"
              className="p-8 border-[#B08A45]/50 flex flex-col justify-between"
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between border-b border-[#B08A45]/20 pb-3 mb-6">
                  <span className="text-[10px] font-mono tracking-widest text-[#C08A32] uppercase font-semibold">
                    {coordinator.role.toUpperCase()}
                  </span>
                  <User size={16} className="text-[#B08A45]" />
                </div>

                {/* Coordinator Name */}
                <h3 className="text-2xl sm:text-3xl font-serif-display font-bold text-[#F3EBDD] tracking-tight mb-2">
                  {coordinator.name}
                </h3>

                {/* Title & Affiliation if student */}
                {coordinator.title && (
                  <p className="text-xs font-cinzel text-[#C08A32] tracking-wider mb-1 font-semibold">
                    {coordinator.title}
                  </p>
                )}
                {coordinator.organization && (
                  <p className="text-xs text-[#D8C19A]/80 font-sans mb-6">
                    {coordinator.organization}
                  </p>
                )}
                {!coordinator.title && (
                  <p className="text-xs text-[#D8C19A]/80 font-sans mb-6">
                    IEC College of Engineering & Technology
                  </p>
                )}
              </div>

              {/* Clickable phone contact */}
              <div className="pt-6 border-t border-[#B08A45]/20">
                <span className="text-[10px] font-mono text-[#D8C19A]/60 block mb-2 uppercase">
                  DIRECT LINE / WHATSAPP
                </span>
                <a
                  href={`tel:${coordinator.phone}`}
                  className="group inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-[#3A241B]/90 border border-[#B08A45]/40 hover:border-[#E8D7B8] text-base font-cinzel font-bold text-[#F3EBDD] tracking-wider transition-all shadow-md"
                  aria-label={`Call ${coordinator.name} at ${coordinator.displayPhone}`}
                >
                  <Phone size={18} className="text-[#C08A32] group-hover:scale-110 transition-transform" />
                  <span>{coordinator.displayPhone}</span>
                </a>
              </div>
            </PhysicalCard>
          ))}
        </div>

        {/* Institution & Network affiliation dispatch */}
        <div className="mt-12 text-center max-w-xl mx-auto text-xs text-[#D8C19A]/80 leading-relaxed font-sans">
          <p>
            {EVENT_DETAILS.presentedBy} • {EVENT_DETAILS.governingBody}
          </p>
          <p className="mt-1 text-[#B08A45] font-serif italic">
            Knowledge Park I, Greater Noida, Uttar Pradesh
          </p>
        </div>
      </div>
    </section>
  );
};
