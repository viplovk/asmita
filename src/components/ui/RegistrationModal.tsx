import React, { useState, useEffect } from 'react';
import { RegistrationSection } from '../../sections/RegistrationSection';
import { Ticket } from './Ticket';
import { RegistrationRecord } from '../../types';
import { getCurrentSavedRegistration } from '../../lib/registrationService';
import { X, Ticket as TicketIcon, UserPlus, Sparkles } from 'lucide-react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  record?: RegistrationRecord | null;
}

/**
 * RegistrationModal Component
 * Hosts the multi-step registration workflow and embeds the Ticket component,
 * enabling attendees to generate, view, print, and download their official
 * admission pass as a formatted PDF in the 'Earthy Terracotta & Ochre' aesthetic.
 */
export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  record: propRecord,
}) => {
  const [activeRecord, setActiveRecord] = useState<RegistrationRecord | null>(propRecord || null);
  const [activeTab, setActiveTab] = useState<'form' | 'ticket'>('form');

  // Sync existing saved registration on open
  useEffect(() => {
    if (isOpen) {
      const saved = propRecord || getCurrentSavedRegistration();
      if (saved) {
        setActiveRecord(saved);
        // Default to showing their ticket if they are already registered
        setActiveTab('ticket');
      } else {
        setActiveTab('form');
      }
    }
  }, [isOpen, propRecord]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#241711] border-2 border-[#B08A45] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] my-6 sm:my-8 overflow-hidden paper-grain-texture">
        {/* Top Header Bar & Modal Controls */}
        <div className="flex items-center justify-between px-5 sm:px-8 pt-5 pb-3 border-b border-[#B08A45]/30">
          {/* View Switcher Tabs (if existing ticket found) */}
          <div className="flex items-center gap-2">
            {activeRecord ? (
              <div className="inline-flex p-1 rounded-full bg-[#1B110B] border border-[#B08A45]/40 text-xs font-cinzel">
                <button
                  type="button"
                  onClick={() => setActiveTab('ticket')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                    activeTab === 'ticket'
                      ? 'bg-gradient-to-r from-[#B65A3C] to-[#8E3F2C] text-[#FAF6EE] font-bold shadow-xs'
                      : 'text-[#D8C19A] hover:text-[#FAF6EE]'
                  }`}
                >
                  <TicketIcon size={13} />
                  <span>VIEW MY PASS</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('form')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                    activeTab === 'form'
                      ? 'bg-gradient-to-r from-[#B65A3C] to-[#8E3F2C] text-[#FAF6EE] font-bold shadow-xs'
                      : 'text-[#D8C19A] hover:text-[#FAF6EE]'
                  }`}
                >
                  <UserPlus size={13} />
                  <span>REGISTRATION FORM</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs font-cinzel font-bold text-[#C08A32]">
                <Sparkles size={14} className="text-[#C08A32]" />
                <span className="tracking-widest">ASMITA 2026 • OFFICIAL REGISTRATION</span>
              </div>
            )}
          </div>

          {/* Modal Close Button */}
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#3A241B] border border-[#B08A45]/40 text-[#D8C19A] hover:text-[#FAF6EE] hover:bg-[#8E3F2C] transition-colors cursor-pointer"
            aria-label="Close Registration Modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 md:p-8">
          {activeTab === 'ticket' && activeRecord ? (
            <div className="space-y-6">
              <div className="text-center space-y-1">
                <span className="text-[11px] font-cinzel font-bold tracking-[0.25em] text-[#C08A32] uppercase">
                  OFFICIAL EVENT ADMISSION
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif-display font-bold text-[#F3EBDD]">
                  YOUR CEREMONIAL INVITATION PASS
                </h3>
                <p className="text-xs text-[#D8C19A]/80 max-w-md mx-auto">
                  Presented by Spearheads Student Council • 16 September 2026 • Seminar Hall, F Block
                </p>
              </div>

              {/* Formatted Ticket Component (Supports jsPDF and html2canvas PDF download) */}
              <Ticket
                record={activeRecord}
                onClose={onClose}
                onRegisterAnother={() => {
                  setActiveTab('form');
                }}
              />
            </div>
          ) : (
            <RegistrationSection
              isModal={true}
              onCloseModal={onClose}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;
