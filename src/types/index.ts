export interface RegistrationFormData {
  fullName: string;
  email: string;
  phone: string;
  college: string;
  branch: string;
  year: string;
  studentId: string;
  attireCategory: string;
  participationNote?: string;
}

export interface RegistrationRecord extends RegistrationFormData {
  id: string;
  registrationId: string;
  createdAt: number | string;
  status: 'confirmed' | 'pending' | 'waitlist';
}

export interface EventCoordinator {
  role: 'Faculty Coordinator' | 'Student Coordinator';
  name: string;
  title?: string;
  organization?: string;
  phone: string;
  displayPhone: string;
}

export interface ExperienceTheme {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  accentColor: string;
  materialLook: 'terracotta' | 'parchment' | 'brass' | 'wood';
  highlights: string[];
}
