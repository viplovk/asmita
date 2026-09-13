import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { SectionHeading } from '../components/decorative/SectionHeading';
import { PhysicalCard } from '../components/decorative/PhysicalCard';
import { MagneticButton } from '../components/ui/MagneticButton';
import { Ticket } from '../components/ui/Ticket';
import { PassCard } from '../components/ui/PassCard';
import {
  REGISTRATION_FIELDS,
  REGISTRATION_STEPS,
  FormFieldConfig,
  getSectionOptions,
} from '../config/registrationFields';
import {
  submitRegistration,
  getCurrentSavedRegistration,
} from '../lib/registrationService';
import { RegistrationFormData, RegistrationRecord } from '../types';
import { isFirebaseConfigured, firebaseProjectId } from '../lib/firebase';
import { Check, ArrowRight, ArrowLeft, Loader2, Sparkles, AlertCircle, Info } from 'lucide-react';

interface RegistrationSectionProps {
  isModal?: boolean;
  onCloseModal?: () => void;
}

export const RegistrationSection: React.FC<RegistrationSectionProps> = ({
  isModal = false,
  onCloseModal,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: '',
    email: '',
    phone: '',
    college: 'IEC College of Engineering & Technology',
    branch: 'Computer Science & Engineering',
    year: '1st Year',
    section: 'Section A',
    studentId: '',
    attireCategory: 'North Indian (Kurta / Sherwani / Lehenga / Salwar)',
    participationNote: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRecord, setSubmittedRecord] = useState<RegistrationRecord | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Check if attendee already registered on this device
    const existing = getCurrentSavedRegistration();
    if (existing) {
      setSubmittedRecord(existing);
    }
  }, []);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => {
      const next = { ...prev, [name]: value };
      if (name === 'year') {
        if (value === '1st Year') {
          next.studentId = '';
          // 1st Year only has Section A and Section B
          if (next.section !== 'Section A' && next.section !== 'Section B') {
            next.section = 'Section A';
          }
        } else {
          // 2nd Year onwards has Section A, B, C, and D
          if (!['Section A', 'Section B', 'Section C', 'Section D'].includes(next.section)) {
            next.section = 'Section A';
          }
        }
      }
      return next;
    });

    if (errors[name] || (name === 'year' && value === '1st Year' && errors.studentId) || (name === 'year' && errors.section)) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        if (name === 'year') {
          delete next.section;
          if (value === '1st Year') {
            delete next.studentId;
          }
        }
        return next;
      });
    }
  };

  const validateStep = (step: 1 | 2 | 3): boolean => {
    const stepFields = REGISTRATION_FIELDS.filter((f) => {
      if (f.step !== step) return false;
      // Do not ask or validate roll number for 1st year students
      if (step === 2 && f.name === 'studentId' && formData.year === '1st Year') {
        return false;
      }
      return true;
    });

    const newErrors: { [key: string]: string } = {};

    stepFields.forEach((field) => {
      const val = (formData as any)[field.name];
      // studentId is required for 2nd, 3rd, 4th years, waived for 1st Year
      const isFieldRequired = field.name === 'studentId' ? formData.year !== '1st Year' : field.required;

      if (isFieldRequired && (!val || val.trim() === '')) {
        newErrors[field.name] = field.errorMessage || `${field.label} is required`;
      } else if (val && field.validationRegex && !field.validationRegex.test(val)) {
        newErrors[field.name] = field.errorMessage || `Please enter a valid ${field.label.toLowerCase()}`;
      } else if (field.name === 'section') {
        const validOptions = getSectionOptions(formData.year).map((opt) => opt.value);
        if (!validOptions.includes(val)) {
          newErrors.section = `Please select an authorized section (${validOptions.join(' or ')})`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep((prev) => (prev + 1) as 2 | 3);
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as 1 | 2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent duplicate rapid submission
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    const submissionPayload: RegistrationFormData = {
      ...formData,
      // For 1st years who have not yet received roll numbers, assign clear pending status
      studentId:
        formData.year === '1st Year'
          ? '1st Year (Pending)'
          : formData.studentId.trim(),
    };

    try {
      const res = await submitRegistration(submissionPayload);
      if (res.success) {
        // Trigger celebratory confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#B65A3C', '#C08A32', '#B08A45', '#E8D7B8'],
        });

        setSubmittedRecord({
          ...submissionPayload,
          id: res.registrationId,
          registrationId: res.registrationId,
          createdAt: Date.now(),
          status: 'confirmed',
        });
      } else {
        setErrorMessage(res.error || 'Unable to complete registration. Please check your details.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter out roll number for 1st-year students
  const stepFields = REGISTRATION_FIELDS.filter((f) => {
    if (f.step !== currentStep) return false;
    if (currentStep === 2 && f.name === 'studentId' && formData.year === '1st Year') {
      return false;
    }
    return true;
  });

  return (
    <section
      id="register"
      className={`relative w-full ${
        isModal ? 'py-4' : 'py-10 sm:py-14'
      } px-4 sm:px-6 lg:px-8 bg-[#241711] text-[#F3EBDD] overflow-hidden`}
    >
      <div className="max-w-4xl mx-auto relative z-10">
        {!isModal && (
          <SectionHeading
            number="06"
            tag="RESERVE YOUR PRESENCE"
            title="REGISTER FOR ASMITA"
            subtitle="Secure your official participant pass for Ethnic Day on September 16, 2026."
            align="center"
          />
        )}

        {/* Firebase Cloud Sync Status Banner */}
        <div className="mb-6 p-3 rounded-lg border border-[#B08A45]/30 bg-[#3A241B]/60 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 text-[#D8C19A]">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${
                isFirebaseConfigured
                  ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]'
                  : 'bg-amber-400/80'
              }`}
            />
            <span>
              {isFirebaseConfigured
                ? `Direct Cloud Sync: Connected to Firestore (${firebaseProjectId || 'Project Active'}). Every participant record is stored directly in your Firebase Console.`
                : 'Registrations are active. Configure VITE_FIREBASE_* in environment settings to stream records directly into your Firebase Console.'}
            </span>
          </div>
          <span className="text-[10px] font-mono uppercase text-[#B08A45] px-2 py-0.5 rounded bg-black/40 shrink-0 self-start sm:self-auto">
            {isFirebaseConfigured ? 'Firebase Sync Active' : 'Offline Ready'}
          </span>
        </div>

        {/* If already submitted, show confirmed Pass Card */}
        {submittedRecord ? (
          <div className="space-y-6">
            <div className="text-center space-y-2 mb-4">
              <span className="text-xs font-cinzel font-bold tracking-[0.3em] text-[#C08A32] uppercase">
                RESERVATION CONFIRMED
              </span>
              <h3 className="text-3xl sm:text-4xl font-serif-display font-bold text-[#F3EBDD]">
                YOU’RE ON THE LIST.
              </h3>
              <p className="text-xs sm:text-sm text-[#D8C19A] max-w-md mx-auto">
                ASMITA • ETHNIC DAY • 16 SEPTEMBER 2026 • SEMINAR HALL, F BLOCK
              </p>
            </div>

            <Ticket
              record={submittedRecord}
              onClose={onCloseModal}
              onRegisterAnother={() => {
                setSubmittedRecord(null);
                localStorage.removeItem('asmita_2026_current_reg');
              }}
            />

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setSubmittedRecord(null);
                  localStorage.removeItem('asmita_2026_current_reg');
                }}
                className="text-xs font-mono text-[#D8C19A]/70 hover:text-[#F3EBDD] underline underline-offset-4"
              >
                Register another attendee →
              </button>
            </div>
          </div>
        ) : (
          /* Multi-Step Registration Card */
          <PhysicalCard variant="terracotta" elevation="high" className="p-6 sm:p-10 border-[#B08A45]/60">
            {/* Steps Progress Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                {REGISTRATION_STEPS.map((s) => (
                  <div
                    key={s.step}
                    className="flex-1 text-center cursor-pointer"
                    onClick={() => {
                      if (s.step < currentStep) setCurrentStep(s.step as 1 | 2 | 3);
                    }}
                  >
                    <div className="flex items-center justify-center">
                      <div
                        className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-mono transition-all duration-300 ${
                          currentStep === s.step
                            ? 'border-[#E8D7B8] bg-[#B08A45] text-[#241711] font-bold shadow-[0_0_12px_rgba(176,138,69,0.5)]'
                            : currentStep > s.step
                            ? 'border-[#B65A3C] bg-[#8E3F2C] text-[#F3EBDD]'
                            : 'border-[#B08A45]/30 bg-black/20 text-[#D8C19A]/50'
                        }`}
                      >
                        {currentStep > s.step ? <Check size={14} /> : s.step}
                      </div>
                    </div>
                    <span className="hidden sm:block text-[11px] font-cinzel font-medium text-[#D8C19A] mt-2">
                      {s.title}
                    </span>
                  </div>
                ))}
              </div>

              {/* Step indicator bar */}
              <div className="w-full bg-[#241711] h-1.5 rounded-full overflow-hidden border border-[#B08A45]/20">
                <div
                  className="h-full bg-gradient-to-r from-[#B65A3C] to-[#B08A45] transition-all duration-400 ease-out"
                  style={{ width: `${((currentStep - 1) / 2) * 100 + 33.33}%` }}
                />
              </div>

              <div className="mt-4 text-center">
                <span className="text-xs font-cinzel text-[#C08A32] uppercase tracking-wider">
                  Step 0{currentStep} of 03 — {REGISTRATION_STEPS[currentStep - 1].description}
                </span>
              </div>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {currentStep === 2 && formData.year === '1st Year' && (
                  <div className="sm:col-span-2 p-3.5 rounded-lg bg-[#3A241B]/80 border border-[#B08A45]/50 text-xs text-[#E8D7B8] flex items-start gap-3 shadow-inner">
                    <span className="text-[#C08A32] text-sm font-bold">✦</span>
                    <div>
                      <span className="font-cinzel font-bold text-[#E8D7B8] block tracking-wider uppercase">
                        1st Year Students Notice
                      </span>
                      <span className="text-[#D8C19A]/90 text-[11px] leading-relaxed block mt-0.5 font-sans">
                        University roll numbers are not yet issued to 1st-year students, so roll number entry is waived. 1st Year is divided into Section A and Section B. Your ceremonial pass will be verified using your Name, Branch, and Section.
                      </span>
                    </div>
                  </div>
                )}

                {stepFields.map((field) => {
                  const fieldOptions = field.name === 'section' ? getSectionOptions(formData.year) : field.options;
                  const fieldHelper =
                    field.name === 'section'
                      ? formData.year === '1st Year'
                        ? '1st Year sections: Section A & Section B'
                        : '2nd Year onwards sections: Section A, B, C & D'
                      : field.helperText;

                  return (
                    <div
                      key={field.id}
                      className={
                        field.type === 'textarea' || field.id === 'fullName' || field.id === 'attireCategory'
                          ? 'sm:col-span-2'
                          : 'sm:col-span-1'
                      }
                    >
                      <label
                        htmlFor={field.id}
                        className="block text-xs font-cinzel tracking-wider text-[#E8D7B8] mb-2 font-medium"
                      >
                        {field.label} {field.required && <span className="text-[#B65A3C]">*</span>}
                      </label>

                      {field.type === 'select' ? (
                        <select
                          id={field.id}
                          name={field.name}
                          value={(formData as any)[field.name]}
                          onChange={(e) => handleChange(field.name, e.target.value)}
                          className={`w-full px-4 py-3 rounded-lg bg-[#241711]/90 border text-sm text-[#F3EBDD] focus:outline-hidden focus:border-[#E8D7B8] transition-colors ${
                            errors[field.name] ? 'border-red-500' : 'border-[#B08A45]/40'
                          }`}
                        >
                          {fieldOptions?.map((opt) => (
                            <option key={opt.value} value={opt.value} className="bg-[#241711] text-[#F3EBDD]">
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      ) : field.type === 'textarea' ? (
                        <textarea
                          id={field.id}
                          name={field.name}
                          rows={3}
                          placeholder={field.placeholder}
                          value={(formData as any)[field.name]}
                          onChange={(e) => handleChange(field.name, e.target.value)}
                          className={`w-full px-4 py-3 rounded-lg bg-[#241711]/90 border text-sm text-[#F3EBDD] placeholder-[#D8C19A]/40 focus:outline-hidden focus:border-[#E8D7B8] transition-colors resize-none ${
                            errors[field.name] ? 'border-red-500' : 'border-[#B08A45]/40'
                          }`}
                        />
                      ) : (
                        <input
                          id={field.id}
                          name={field.name}
                          type={field.type}
                          placeholder={field.placeholder}
                          value={(formData as any)[field.name]}
                          onChange={(e) => handleChange(field.name, e.target.value)}
                          className={`w-full px-4 py-3 rounded-lg bg-[#241711]/90 border text-sm text-[#F3EBDD] placeholder-[#D8C19A]/40 focus:outline-hidden focus:border-[#E8D7B8] transition-colors ${
                            errors[field.name] ? 'border-red-500' : 'border-[#B08A45]/40'
                          }`}
                        />
                      )}

                      {fieldHelper && !errors[field.name] && (
                        <p className="mt-1 text-[11px] text-[#D8C19A]/60 font-sans">
                          {fieldHelper}
                        </p>
                      )}

                      {errors[field.name] && (
                        <p className="mt-1 text-xs text-red-400 font-sans">
                          {errors[field.name]}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Submission Error Banner */}
              {errorMessage && (
                <div className="p-4 rounded-lg border border-red-500/40 bg-red-950/70 text-xs text-red-200 flex items-start gap-3 shadow-lg">
                  <AlertCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-semibold text-red-300 font-cinzel tracking-wider">
                      REGISTRATION COULD NOT BE SAVED
                    </p>
                    <p className="text-red-200/90 leading-relaxed font-sans text-xs">
                      {errorMessage}
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="pt-6 border-t border-[#B08A45]/30 flex items-center justify-between gap-4">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#B08A45]/40 text-xs font-cinzel text-[#D8C19A] hover:text-[#F3EBDD] hover:bg-[#3A241B] transition-colors"
                  >
                    <ArrowLeft size={14} />
                    <span>BACK</span>
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#B08A45] to-[#C08A32] text-[#241711] font-cinzel font-bold text-xs tracking-widest hover:brightness-110 transition-all shadow-md"
                  >
                    <span>CONTINUE TO STEP 0{currentStep + 1}</span>
                    <ArrowRight size={14} />
                  </button>
                ) : (
                  <MagneticButton
                    type="submit"
                    variant="brass"
                    size="md"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>ISSUING PASS...</span>
                      </>
                    ) : (
                      <>
                        <span>CONFIRM REGISTRATION</span>
                        <span>✦</span>
                      </>
                    )}
                  </MagneticButton>
                )}
              </div>
            </form>
          </PhysicalCard>
        )}
      </div>
    </section>
  );
};
