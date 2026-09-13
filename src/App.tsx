import React, { useState } from 'react';
import { CustomCursor } from './components/decorative/CustomCursor';
import { Navbar } from './components/navigation/Navbar';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { AttireSection } from './sections/AttireSection';
import { DetailsSection } from './sections/DetailsSection';
import { RegistrationSection } from './sections/RegistrationSection';
import { ContactSection } from './sections/ContactSection';
import { ClosingSection } from './sections/ClosingSection';
import { RegistrationModal } from './components/ui/RegistrationModal';

export default function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#241711] text-[#F3EBDD] selection:bg-[#B65A3C] selection:text-[#F3EBDD]">
      {/* Desktop Custom Brass Ring/Dot Cursor */}
      <CustomCursor />

      {/* Main Navigation */}
      <Navbar
        onOpenRegister={() => setIsRegisterOpen(true)}
      />

      {/* Main Sections */}
      <main>
        <HeroSection onOpenRegister={() => setIsRegisterOpen(true)} />
        <AboutSection />
        <ExperienceSection />
        <AttireSection />
        <DetailsSection />
        <RegistrationSection />
        <ContactSection />
      </main>

      {/* Final Cinematic Closing & Discreet Creator Credit */}
      <ClosingSection onOpenRegister={() => setIsRegisterOpen(true)} />

      {/* Registration Modal Dialog */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </div>
  );
}
