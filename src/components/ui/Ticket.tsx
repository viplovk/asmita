import React, { useRef, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { RegistrationRecord } from '../../types';
import { EVENT_DETAILS, COORDINATORS } from '../../config/eventData';
import { CeremonialSeal, DiyaFlame, CornerFlourish } from '../decorative/DecorativeIcons';
import {
  Calendar,
  CalendarPlus,
  MapPin,
  Clock,
  Download,
  Printer,
  Loader2,
  Check,
  Sparkles,
  Shirt,
  UserCheck,
  FileDown,
  Mail,
} from 'lucide-react';
import { generateTicketPDF } from '../../lib/pdfGenerator';
import { getGoogleCalendarUrl } from '../../lib/calendar';

export interface TicketProps {
  record: RegistrationRecord;
  onClose?: () => void;
  onRegisterAnother?: () => void;
}

/**
 * Ticket Component:
 * Formatted in an authentic 'Earthy Terracotta & Ochre' physical invitation card aesthetic.
 * Allows participants to generate and download their official registration pass as a PDF
 * using html2canvas and jsPDF.
 */
export const Ticket: React.FC<TicketProps> = ({
  record,
  onClose,
  onRegisterAnother,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Generate & Download PDF using html2canvas and jsPDF
  const handleDownloadPDF = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    setDownloadSuccess(false);

    try {
      // Primary high-fidelity generator using html2canvas & jsPDF with vector fallback
      await generateTicketPDF(record, cardRef.current);
      setDownloadSuccess(true);
      setTimeout(() => {
        setDownloadSuccess(false);
      }, 4500);
    } catch (err) {
      console.error('Failed to generate PDF pass with html2canvas and jsPDF:', err);
      // Direct emergency vector fallback via jsPDF
      try {
        const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a5' });
        doc.setFillColor(250, 246, 238);
        doc.rect(0, 0, 148, 210, 'F');
        doc.setDrawColor(142, 63, 44);
        doc.setLineWidth(1.2);
        doc.rect(8, 8, 132, 194);
        doc.setTextColor(142, 63, 44);
        doc.setFontSize(16);
        doc.text('ASMITA — ETHNIC DAY 2026', 74, 25, { align: 'center' });
        doc.setFontSize(10);
        doc.text(`PASS ID: ${record.registrationId}`, 74, 35, { align: 'center' });
        doc.text(`ATTENDEE: ${record.fullName}`, 74, 45, { align: 'center' });
        doc.text(`COLLEGE: ${record.college}`, 74, 55, { align: 'center' });
        doc.save(`ASMITA_Ticket_${record.registrationId}.pdf`);
        setDownloadSuccess(true);
      } catch (vectorErr) {
        console.error('Vector fallback failed:', vectorErr);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    try {
      window.print();
    } catch {
      handleDownloadPDF();
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto select-none">
      {/* Visual Ceremonial Entry Pass (Physical Invitation Card Aesthetic) */}
      <div
        ref={cardRef}
        id="asmita-printable-pass"
        className="relative bg-[#FAF6EE] text-[#241711] p-6 sm:p-8 rounded-2xl border-2 border-[#8E3F2C] shadow-[0_22px_60px_rgba(0,0,0,0.65)] overflow-hidden paper-grain-texture"
        style={{
          boxShadow: '0 20px 50px rgba(36,23,17,0.5), inset 0 0 40px rgba(176,138,69,0.12)',
        }}
      >
        {/* Subtle Ornamental Jaali / Mandala Watermark */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.035] overflow-hidden">
          <svg viewBox="0 0 200 200" width="380" height="380" fill="#8E3F2C">
            <circle cx="100" cy="100" r="90" stroke="#8E3F2C" strokeWidth="2" fill="none" />
            <circle cx="100" cy="100" r="70" stroke="#8E3F2C" strokeWidth="1.5" fill="none" />
            <circle cx="100" cy="100" r="50" stroke="#8E3F2C" strokeWidth="1" fill="none" />
            <path d="M100 10 L100 190 M10 100 L190 100 M36 36 L164 164 M36 164 L164 36" stroke="#8E3F2C" strokeWidth="0.8" />
            <polygon points="100,20 120,80 180,100 120,120 100,180 80,120 20,100 80,80" stroke="#8E3F2C" strokeWidth="1" fill="none" />
          </svg>
        </div>

        {/* Outer Inset Border Frame (Golden Ochre & Terracotta) */}
        <div className="absolute inset-2.5 rounded-xl border border-[#C08A32]/60 pointer-events-none" />
        <div className="absolute inset-3 rounded-lg border border-[#8E3F2C]/30 pointer-events-none" />

        {/* Traditional Corner Flourishes */}
        <CornerFlourish position="top-left" size={38} color="#8E3F2C" className="absolute top-3 left-3" />
        <CornerFlourish position="top-right" size={38} color="#8E3F2C" className="absolute top-3 right-3" />
        <CornerFlourish position="bottom-left" size={38} color="#8E3F2C" className="absolute bottom-3 left-3" />
        <CornerFlourish position="bottom-right" size={38} color="#8E3F2C" className="absolute bottom-3 right-3" />

        {/* 1. Auspicious Cultural Invocation Header */}
        <div className="text-center pt-1 pb-3 relative z-10">
          <span className="text-[11px] sm:text-xs font-serif tracking-[0.35em] text-[#8E3F2C] font-semibold uppercase block">
            ॥ संस्कृति • परम्परा • अस्मिता • गौरव ॥
          </span>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#C08A32]" />
            <span className="text-[#C08A32] text-[10px]">❖</span>
            <span className="text-[9px] sm:text-[10px] font-cinzel font-bold tracking-[0.25em] text-[#A84D34] uppercase">
              IEC COLLEGE OF ENGINEERING & TECHNOLOGY
            </span>
            <span className="text-[#C08A32] text-[10px]">❖</span>
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#C08A32]" />
          </div>
          <span className="text-[8.5px] font-sans tracking-widest text-[#734A38] uppercase block mt-0.5">
            KNOWLEDGE PARK I, GREATER NOIDA • CAMPUS ADMISSIONS
          </span>
        </div>

        {/* 2. Royal Title & Diya Crest */}
        <div className="relative z-10 text-center my-2 py-2 border-y border-[#C08A32]/40 bg-gradient-to-r from-transparent via-[#EFE3CA]/80 to-transparent">
          <div className="flex items-center justify-center gap-4">
            <DiyaFlame size={26} color="#C08A32" />
            <div>
              <h2 className="text-3xl sm:text-4xl font-serif-display font-black tracking-[0.08em] text-[#8E3F2C] leading-none drop-shadow-xs">
                ASMITA
              </h2>
              <span className="text-xs font-serif italic text-[#C08A32] block font-bold tracking-widest mt-0.5">
                अस्मिता • ETHNIC DAY 2026
              </span>
            </div>
            <DiyaFlame size={26} color="#C08A32" />
          </div>
          <p className="text-[10px] font-serif italic text-[#59392C] mt-1 tracking-wide">
            "Celebrating the rich tapestry of Indian heritage, handlooms & cultural identity"
          </p>
        </div>

        {/* 3. Official Pass Status & Passcode Stub Badge */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 px-3 py-2 rounded-lg bg-[#EFE3CA] border border-[#B08A45]/50 my-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8E3F2C] border border-[#C08A32] animate-pulse" />
            <span className="text-[10px] font-cinzel font-bold tracking-[0.2em] text-[#8E3F2C] uppercase">
              CONFIRMED DELEGATE PASS
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-mono tracking-wider text-[#734A38] uppercase">PASS NO:</span>
            <span className="text-xs font-mono font-bold tracking-widest px-2.5 py-0.5 rounded-md bg-[#8E3F2C] text-[#FAF6EE] shadow-xs">
              {record.registrationId}
            </span>
          </div>
        </div>

        {/* 4. Participant Information Sanctuary (Invitation Insert Box) */}
        <div className="relative z-10 my-4 p-4 rounded-xl bg-white/85 border border-[#8E3F2C]/30 shadow-xs space-y-2.5 text-xs">
          {/* Attendee Name Header */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-[#E6D7C3] pb-2">
            <span className="text-[10px] font-cinzel font-bold tracking-wider text-[#A84D34] uppercase">
              INVITED ATTENDEE
            </span>
            <span className="text-base sm:text-lg font-serif-display font-bold text-[#241711] tracking-wide">
              {record.fullName}
            </span>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 pt-0.5 text-[11px]">
            <div>
              <span className="text-[9px] font-cinzel font-bold text-[#8E3F2C] uppercase block">
                DEPARTMENT / BRANCH
              </span>
              <span className="font-semibold text-[#3A241B]">{record.branch}</span>
            </div>

            <div>
              <span className="text-[9px] font-cinzel font-bold text-[#8E3F2C] uppercase block">
                YEAR & SECTION
              </span>
              <span className="font-semibold text-[#3A241B]">
                {record.year} • <span className="font-mono text-[#8E3F2C] font-bold">{record.section || 'Section A'}</span>
              </span>
            </div>

            <div>
              <span className="text-[9px] font-cinzel font-bold text-[#8E3F2C] uppercase block">
                {record.year === '1st Year' ? 'ENROLLMENT STATUS' : 'UNIVERSITY ROLL NUMBER'}
              </span>
              <span className="font-semibold text-[#3A241B] font-mono text-[10.5px]">
                {record.year === '1st Year'
                  ? 'Roll No. Pending (1st Year)'
                  : record.studentId || 'Verified Delegate'}
              </span>
            </div>

            <div>
              <span className="text-[9px] font-cinzel font-bold text-[#8E3F2C] uppercase block">
                REGISTERED EMAIL
              </span>
              <span className="font-mono text-[10.5px] text-[#59392C] truncate block" title={record.email}>
                {record.email}
              </span>
            </div>

            <div className="sm:col-span-2 border-t border-[#E6D7C3]/60 pt-2">
              <span className="text-[9px] font-cinzel font-bold text-[#8E3F2C] uppercase block">
                COLLEGE AFFILIATION
              </span>
              <span className="font-medium text-[#3A241B]">{record.college}</span>
            </div>

            <div className="sm:col-span-2 border-t border-[#E6D7C3]/60 pt-2 flex items-start gap-2">
              <Shirt size={14} className="text-[#C08A32] shrink-0 mt-0.5" />
              <div>
                <span className="text-[9px] font-cinzel font-bold text-[#8E3F2C] uppercase block">
                  HERITAGE ATTIRE CATEGORY
                </span>
                <span className="font-serif italic text-[#6D2C1D] font-medium">
                  {record.attireCategory}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Auspicious Event Schedule & Venue Cartouche */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-3.5 rounded-xl bg-gradient-to-br from-[#F4EBD4] to-[#EFE3CA] border border-[#C08A32]/50 text-[#3A241B] my-3">
          {/* Date & Reporting Time */}
          <div className="flex items-start gap-2.5">
            <div className="p-1.5 rounded-md bg-[#8E3F2C] text-[#FAF6EE] mt-0.5 shadow-xs">
              <Calendar size={15} />
            </div>
            <div>
              <span className="text-[9px] font-cinzel font-bold tracking-widest text-[#8E3F2C] uppercase block">
                DATE & SCHEDULE
              </span>
              <span className="text-xs font-bold text-[#241711] block">
                16 SEPTEMBER 2026
              </span>
              <span className="text-[10px] text-[#59392C] flex items-center gap-1 mt-0.5">
                <Clock size={10} className="text-[#C08A32]" />
                <span>Wednesday • 10:00 AM IST Onwards</span>
              </span>

              <a
                href={getGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-md bg-[#8E3F2C]/10 hover:bg-[#8E3F2C]/20 border border-[#8E3F2C]/30 text-[9px] font-cinzel font-bold text-[#8E3F2C] transition-colors"
                title="Add to Google Calendar"
              >
                <CalendarPlus size={10} className="text-[#8E3F2C]" />
                <span>+ Add to Google Calendar</span>
              </a>
            </div>
          </div>

          {/* Venue & Gate */}
          <div className="flex items-start gap-2.5 border-t sm:border-t-0 sm:border-l border-[#C08A32]/30 pt-2 sm:pt-0 sm:pl-3">
            <div className="p-1.5 rounded-md bg-[#C08A32] text-[#241711] mt-0.5 shadow-xs">
              <MapPin size={15} />
            </div>
            <div>
              <span className="text-[9px] font-cinzel font-bold tracking-widest text-[#8E3F2C] uppercase block">
                CONVOCATION VENUE
              </span>
              <span className="text-xs font-bold text-[#241711] block">
                SEMINAR HALL, F BLOCK
              </span>
              <span className="text-[10px] text-[#59392C] block mt-0.5">
                IEC College Campus, Knowledge Park I
              </span>
            </div>
          </div>
        </div>

        {/* 6. Perforated Tear Line with Semicircular Cutout Notches */}
        <div className="relative my-4">
          {/* Left Notch */}
          <div className="absolute -left-8 -top-3 w-6 h-6 rounded-full bg-[#241711] border-r-2 border-[#8E3F2C]" />
          {/* Dashed Golden Ochre Line */}
          <div className="border-b-2 border-dashed border-[#8E3F2C]/40 mx-3" />
          {/* Right Notch */}
          <div className="absolute -right-8 -top-3 w-6 h-6 rounded-full bg-[#241711] border-l-2 border-[#8E3F2C]" />
        </div>

        {/* 7. Verification Stub: Ceremonial Seal & Security Authenticator */}
        <div className="relative z-10 pt-1 flex items-center justify-between gap-3">
          {/* Ceremonial Wax Seal */}
          <div className="flex items-center gap-3">
            <CeremonialSeal size={56} text="ASMITA • VERIFIED DELEGATE • 2026 •" />
            <div className="text-[9px] font-serif leading-tight text-[#59392C]">
              <span className="font-cinzel font-bold text-[#8E3F2C] block text-[10px]">
                AUTHENTICATED PASS
              </span>
              <span className="block text-[#734A38]">Spearheads Student Council</span>
              <span className="block text-[#734A38]">IECian Cultural Society</span>
              <span className="text-[8px] font-mono text-[#A84D34] mt-0.5 block">
                DRESS CODE: TRADITIONAL ETHNIC
              </span>
            </div>
          </div>

          {/* Clean Security QR Block */}
          <div className="text-right shrink-0">
            <div className="p-1.5 rounded-lg bg-white border border-[#C08A32]/60 shadow-xs inline-block">
              {/* High-contrast QR Symbol representation */}
              <svg viewBox="0 0 24 24" width="44" height="44" fill="#8E3F2C">
                <rect x="2" y="2" width="7" height="7" stroke="#8E3F2C" strokeWidth="1" fill="none" />
                <rect x="4" y="4" width="3" height="3" fill="#8E3F2C" />
                <rect x="15" y="2" width="7" height="7" stroke="#8E3F2C" strokeWidth="1" fill="none" />
                <rect x="17" y="4" width="3" height="3" fill="#8E3F2C" />
                <rect x="2" y="15" width="7" height="7" stroke="#8E3F2C" strokeWidth="1" fill="none" />
                <rect x="4" y="17" width="3" height="3" fill="#8E3F2C" />
                <rect x="11" y="3" width="2" height="4" />
                <rect x="10" y="10" width="4" height="4" />
                <rect x="16" y="11" width="2" height="4" />
                <rect x="11" y="17" width="4" height="2" />
                <rect x="17" y="17" width="5" height="5" />
              </svg>
            </div>
            <span className="text-[7.5px] font-mono text-[#8E3F2C] font-semibold tracking-wider block mt-0.5">
              SCAN AT F BLOCK
            </span>
          </div>
        </div>

        {/* 8. Bottom Coordinator Inscription */}
        <div className="relative z-10 mt-4 pt-2 border-t border-[#C08A32]/30 text-center">
          <p className="text-[8px] sm:text-[8.5px] font-mono text-[#734A38]">
            Helpline: {COORDINATORS[0].name} ({COORDINATORS[0].displayPhone}) • {COORDINATORS[1].name} ({COORDINATORS[1].displayPhone})
          </p>
          <span className="text-[7.5px] font-cinzel text-[#A84D34] tracking-widest block uppercase mt-0.5">
            Non-Transferable • Please present this pass upon arrival
          </span>
        </div>
      </div>

      {/* Action Controls */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {/* Main PDF Download Button using html2canvas & jsPDF */}
        <button
          onClick={handleDownloadPDF}
          disabled={isGenerating}
          className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#B08A45] ${
            downloadSuccess
              ? 'bg-emerald-800 text-[#F3EBDD] border-emerald-500'
              : 'bg-gradient-to-r from-[#B65A3C] via-[#A84D34] to-[#8E3F2C] hover:from-[#C06545] hover:to-[#9E4530] text-[#F3EBDD]'
          } text-xs font-cinzel font-bold tracking-wider transition-all duration-300 shadow-[0_4px_16px_rgba(182,90,60,0.4)] disabled:opacity-75 cursor-pointer`}
        >
          {isGenerating ? (
            <>
              <Loader2 size={15} className="animate-spin" />
              <span>GENERATING INVITATION PDF...</span>
            </>
          ) : downloadSuccess ? (
            <>
              <Check size={15} className="text-emerald-300" />
              <span>INVITATION SAVED AS PDF!</span>
            </>
          ) : (
            <>
              <FileDown size={15} />
              <span>DOWNLOAD INVITATION PASS (PDF)</span>
            </>
          )}
        </button>

        {/* Add to Google Calendar Action */}
        <a
          href={getGoogleCalendarUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-[#C08A32] bg-[#2E1A11] hover:bg-[#3D2317] text-[#FAF6EE] text-xs font-cinzel font-bold tracking-wider transition-all duration-200 shadow-md hover:border-[#E8D7B8] cursor-pointer"
          title="Add event directly to your Google Calendar"
        >
          <CalendarPlus size={14} className="text-[#C08A32]" />
          <span>ADD TO GOOGLE CALENDAR</span>
        </a>

        {/* Print / Save Trigger */}
        <button
          onClick={handlePrint}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-[#B08A45]/60 bg-[#3A241B] hover:bg-[#4E3024] text-[#F3EBDD] text-xs font-cinzel tracking-wider transition-colors shadow-md cursor-pointer"
          title="Open printer dialog"
        >
          <Printer size={14} />
          <span>PRINT INVITATION</span>
        </button>

        {onRegisterAnother && (
          <button
            onClick={onRegisterAnother}
            className="w-full sm:w-auto px-5 py-3 rounded-full border border-[#B08A45]/40 hover:bg-[#3A241B]/60 text-[#D8C19A] text-xs font-cinzel tracking-wider transition-colors cursor-pointer"
          >
            REGISTER ANOTHER
          </button>
        )}

        {onClose && (
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-3 rounded-full border border-[#B08A45]/30 hover:bg-[#3A241B]/50 text-[#D8C19A] text-xs font-cinzel tracking-wider transition-colors cursor-pointer"
          >
            RETURN TO SITE
          </button>
        )}
      </div>

      <p className="text-center text-[10px] font-mono text-[#D8C19A]/70 mt-3">
        ✦ Tip: Save the PDF or keep a screenshot on your phone for verification at the Seminar Hall reception.
      </p>
    </div>
  );
};

export default Ticket;
