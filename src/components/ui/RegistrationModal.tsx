import React from 'react';
import { RegistrationSection } from '../../sections/RegistrationSection';
import { X } from 'lucide-react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#241711] border-2 border-[#B08A45] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] my-8 overflow-hidden paper-grain-texture">
        {/* Modal Close Button */}
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-[#3A241B] border border-[#B08A45]/40 text-[#D8C19A] hover:text-[#F3EBDD] hover:bg-[#8E3F2C] transition-colors"
            aria-label="Close Registration Modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6">
          <RegistrationSection isModal={true} onCloseModal={onClose} />
        </div>
      </div>
    </div>
  );
};
