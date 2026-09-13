import React, { useRef, useState } from 'react';
import { RegistrationRecord } from '../../types';
import { EVENT_DETAILS } from '../../config/eventData';
import { CeremonialSeal, DiyaFlame, CornerFlourish } from '../decorative/DecorativeIcons';
import { Calendar, MapPin, Download, Printer, Loader2, Check, Sparkles } from 'lucide-react';
import { generateTicketPDF } from '../../lib/pdfGenerator';

interface PassCardProps {
  record: RegistrationRecord;
  onClose?: () => void;
}

export const PassCard: React.FC<PassCardProps> = ({ record, onClose }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadPDF = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    setDownloadSuccess(false);

    try {
      await generateTicketPDF(record, cardRef.current);
      setDownloadSuccess(true);
      setTimeout(() => {
        setDownloadSuccess(false);
      }, 4000);
    } catch (err) {
      console.error('Failed to generate PDF pass:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    try {
      window.print();
    } catch {
      // Fallback in environments where window.print() is restricted
      handleDownloadPDF();
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto select-none">
      {/* Visual Ceremonial Entry Pass */}
      <div
        ref={cardRef}
        id="asmita-printable-pass"
        className="relative bg-gradient-to-b from-[#E8D7B8] to-[#D8C19A] text-[#241711] p-6 sm:p-8 rounded-2xl border-2 border-[#B08A45] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden paper-grain-texture"
      >
        {/* Decorative corner borders */}
        <CornerFlourish position="top-left" size={32} color="#8E3F2C" className="absolute top-2 left-2" />
        <CornerFlourish position="top-right" size={32} color="#8E3F2C" className="absolute top-2 right-2" />
        <CornerFlourish position="bottom-left" size={32} color="#8E3F2C" className="absolute bottom-2 left-2" />
        <CornerFlourish position="bottom-right" size={32} color="#8E3F2C" className="absolute bottom-2 right-2" />

        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[#8E3F2C]/30 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-700" />
            <span className="text-[10px] font-mono tracking-widest text-[#8E3F2C] uppercase font-semibold">
              OFFICIAL ENTRY PASS
            </span>
          </div>
          <span className="text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-[#8E3F2C] text-[#F3EBDD]">
            {record.registrationId}
          </span>
        </div>

        {/* Pass Title */}
        <div className="text-center my-3">
          <span className="text-[10px] font-cinzel tracking-[0.25em] text-[#8E3F2C] uppercase block">
            IEC COLLEGE OF ENGINEERING & TECHNOLOGY
          </span>
          <h3 className="text-3xl sm:text-4xl font-serif-display font-black text-[#241711] tracking-tight">
            ASMITA
          </h3>
          <span className="text-xs font-cinzel font-semibold tracking-[0.3em] text-[#B65A3C] uppercase block">
            ETHNIC DAY • 2026
          </span>
        </div>

        {/* Participant Details Box */}
        <div className="my-5 p-4 rounded-xl bg-[#F3EBDD]/70 border border-[#8E3F2C]/20 space-y-2 text-xs">
          <div className="flex items-center justify-between border-b border-[#8E3F2C]/15 pb-1.5">
            <span className="text-[#8E3F2C] font-medium font-cinzel">PARTICIPANT:</span>
            <span className="font-bold text-sm text-[#241711]">{record.fullName}</span>
          </div>
          <div className="flex items-center justify-between border-b border-[#8E3F2C]/15 pb-1.5">
            <span className="text-[#8E3F2C] font-medium font-cinzel">COLLEGE:</span>
            <span className="font-medium text-right truncate max-w-[200px]">{record.college}</span>
          </div>
          <div className="flex items-center justify-between border-b border-[#8E3F2C]/15 pb-1.5">
            <span className="text-[#8E3F2C] font-medium font-cinzel">BRANCH & YEAR:</span>
            <span className="font-medium">{record.branch} • {record.year}</span>
          </div>
          <div className="flex items-center justify-between border-b border-[#8E3F2C]/15 pb-1.5">
            <span className="text-[#8E3F2C] font-medium font-cinzel">STUDENT ID:</span>
            <span className="font-mono font-medium">{record.studentId}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#8E3F2C] font-medium font-cinzel">ATTIRE THEME:</span>
            <span className="font-serif italic text-right truncate max-w-[180px]">{record.attireCategory}</span>
          </div>
        </div>

        {/* Event Schedule Bar */}
        <div className="grid grid-cols-2 gap-2 text-[11px] p-3 rounded-lg bg-[#E8D7B8] border border-[#8E3F2C]/25 text-[#3A241B]">
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-[#8E3F2C]" />
            <div>
              <span className="block font-bold">16 SEPTEMBER 2026</span>
              <span className="text-[9px] opacity-80">Wednesday</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-[#8E3F2C]" />
            <div>
              <span className="block font-bold">SEMINAR HALL</span>
              <span className="text-[9px] opacity-80">F Block, IEC Greater Noida</span>
            </div>
          </div>
        </div>

        {/* Bottom Seal & Verification QR representation */}
        <div className="mt-5 pt-4 border-t-2 border-dashed border-[#8E3F2C]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CeremonialSeal size={50} text="ASMITA • PASS • VERIFIED •" />
            <div className="text-[9px] font-mono text-[#8E3F2C]/90">
              <span className="block font-bold">STATUS: CONFIRMED</span>
              <span>Spearheads Student Council</span>
            </div>
          </div>

          <div className="text-right">
            <div className="w-12 h-12 border border-[#8E3F2C] rounded p-0.5 bg-white flex items-center justify-center shadow-xs">
              {/* Clean SVG mini QR glyph representation */}
              <svg viewBox="0 0 24 24" width="38" height="38" fill="#241711">
                <rect x="2" y="2" width="6" height="6" />
                <rect x="16" y="2" width="6" height="6" />
                <rect x="2" y="16" width="6" height="6" />
                <rect x="10" y="4" width="4" height="2" />
                <rect x="10" y="8" width="2" height="4" />
                <rect x="14" y="10" width="4" height="4" />
                <rect x="10" y="14" width="4" height="2" />
                <rect x="18" y="16" width="4" height="6" />
                <rect x="10" y="18" width="4" height="4" />
              </svg>
            </div>
            <span className="text-[8px] font-mono opacity-70 block mt-0.5">SCAN AT ENTRY</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
        {/* Main PDF Download Button */}
        <button
          onClick={handleDownloadPDF}
          disabled={isGenerating}
          className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#B08A45] ${
            downloadSuccess
              ? 'bg-emerald-800 text-[#F3EBDD] border-emerald-500'
              : 'bg-gradient-to-r from-[#B65A3C] to-[#8E3F2C] hover:from-[#C06545] hover:to-[#9E4530] text-[#F3EBDD]'
          } text-xs font-cinzel font-bold tracking-wider transition-all duration-300 shadow-[0_4px_16px_rgba(182,90,60,0.4)] disabled:opacity-75`}
        >
          {isGenerating ? (
            <>
              <Loader2 size={15} className="animate-spin" />
              <span>GENERATING PDF...</span>
            </>
          ) : downloadSuccess ? (
            <>
              <Check size={15} className="text-emerald-300" />
              <span>PASS SAVED AS PDF!</span>
            </>
          ) : (
            <>
              <Download size={15} />
              <span>DOWNLOAD PDF TICKET</span>
            </>
          )}
        </button>

        {/* Print / Save Trigger */}
        <button
          onClick={handlePrint}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-[#B08A45]/50 bg-[#3A241B] hover:bg-[#4E3024] text-[#F3EBDD] text-xs font-cinzel tracking-wider transition-colors shadow-md"
          title="Open printer dialog"
        >
          <Printer size={14} />
          <span>PRINT PASS</span>
        </button>

        {onClose && (
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-3 rounded-full border border-[#B08A45]/30 hover:bg-[#3A241B]/50 text-[#D8C19A] text-xs font-cinzel tracking-wider transition-colors"
          >
            RETURN TO SITE
          </button>
        )}
      </div>

      <p className="text-center text-[10px] font-mono text-[#D8C19A]/60 mt-3">
        ✦ Tip: Save the PDF or keep a screenshot handy on your mobile device for entry at the F Block Seminar Hall.
      </p>
    </div>
  );
};
