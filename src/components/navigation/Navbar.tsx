import React, { useState, useEffect } from 'react';
import { EVENT_DETAILS, COORDINATORS } from '../../config/eventData';
import { MagneticButton } from '../ui/MagneticButton';
import { Menu, X, Phone, Calendar, MapPin, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenRegister: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRegister }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'ABOUT', href: '#about' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'ATTIRE', href: '#attire' },
    { label: 'VENUE', href: '#venue' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#241711]/92 backdrop-blur-md border-b border-[#B08A45]/30 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
            : 'bg-transparent border-b border-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Wordmark */}
          <a
            href="#"
            className="group flex items-baseline gap-2 text-left focus:outline-hidden"
            aria-label="ASMITA Home"
          >
            <span className="text-2xl sm:text-3xl font-cinzel font-bold tracking-[0.22em] text-[#F3EBDD] group-hover:text-[#E8D7B8] transition-colors">
              ASMITA
            </span>
            <span className="text-xs font-serif italic text-[#C08A32] opacity-80 hidden xs:inline">
              अस्मिता
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-xs font-cinzel font-medium tracking-[0.25em] text-[#D8C19A] hover:text-[#F3EBDD] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#B08A45] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <MagneticButton
              variant="brass"
              size="sm"
              onClick={onOpenRegister}
              className="shadow-[0_4px_16px_rgba(176,138,69,0.3)]"
            >
              <span>REGISTER NOW</span>
              <span className="text-xs">→</span>
            </MagneticButton>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#D8C19A] hover:text-[#F3EBDD] focus:outline-hidden"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      {/* Full-Screen Mobile Navigation Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-[#241711] transition-opacity duration-400 md:hidden flex flex-col justify-between p-6 pt-24 paper-grain-texture ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Decorative corner borders */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#B08A45]/40" />
        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#B08A45]/40" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#B08A45]/40" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#B08A45]/40" />

        {/* Menu Content */}
        <div className="flex flex-col space-y-5 my-auto">
          <span className="text-[10px] font-cinzel tracking-[0.3em] text-[#C08A32] uppercase">
            CULTURAL GATHERING
          </span>

          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-3xl font-serif-display font-light tracking-wide text-[#F3EBDD] hover:text-[#C08A32] transition-colors"
            >
              {link.label}
            </a>
          ))}

          <div className="pt-4">
            <MagneticButton
              variant="brass"
              size="md"
              className="w-full"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegister();
              }}
            >
              <span>REGISTER FOR ASMITA</span>
              <span>→</span>
            </MagneticButton>
          </div>
        </div>

        {/* Mobile Drawer Footer with event facts */}
        <div className="border-t border-[#B08A45]/30 pt-4 space-y-2 text-xs text-[#D8C19A]/80">
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-[#C08A32]" />
            <span>{EVENT_DETAILS.dateString}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-[#C08A32]" />
            <span>{EVENT_DETAILS.venue}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={14} className="text-[#C08A32]" />
            <span>Coordinators: {COORDINATORS[0].displayPhone}</span>
          </div>
        </div>
      </div>
    </>
  );
};
