export interface FormFieldConfig {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  type: 'text' | 'email' | 'tel' | 'select' | 'textarea';
  step: 1 | 2 | 3;
  required: boolean;
  options?: { value: string; label: string }[];
  helperText?: string;
  validationRegex?: RegExp;
  errorMessage?: string;
}

export const REGISTRATION_STEPS = [
  { step: 1, title: 'Personal Details', description: 'Your identity & contact coordinates' },
  { step: 2, title: 'Academic Profile', description: 'Institution & department details' },
  { step: 3, title: 'Cultural Expression', description: 'Attire theme & participation notes' },
];

export const FIRST_YEAR_SECTION_OPTIONS = [
  { value: 'Section A', label: 'Section A' },
  { value: 'Section B', label: 'Section B' },
];

export const HIGHER_YEAR_SECTION_OPTIONS = [
  { value: 'Section A', label: 'Section A' },
  { value: 'Section B', label: 'Section B' },
  { value: 'Section C', label: 'Section C' },
  { value: 'Section D', label: 'Section D' },
];

export function getSectionOptions(year: string) {
  return year === '1st Year' ? FIRST_YEAR_SECTION_OPTIONS : HIGHER_YEAR_SECTION_OPTIONS;
}

export const REGISTRATION_FIELDS: FormFieldConfig[] = [
  // Step 1: Personal Coordinates
  {
    id: 'fullName',
    name: 'fullName',
    label: 'Full Name',
    placeholder: 'e.g. Aarav Sharma',
    type: 'text',
    step: 1,
    required: true,
    errorMessage: 'Please enter your full name (at least 2 characters)',
  },
  {
    id: 'email',
    name: 'email',
    label: 'Email Address',
    placeholder: 'e.g. aarav.sharma@iec.edu.in',
    type: 'email',
    step: 1,
    required: true,
    validationRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    helperText: 'Your pass confirmation & schedule will be sent to this email',
    errorMessage: 'Please enter a valid email address (e.g. student@iec.edu.in)',
  },
  {
    id: 'phone',
    name: 'phone',
    label: 'WhatsApp / Contact Phone',
    placeholder: 'e.g. +91 98765 43210',
    type: 'tel',
    step: 1,
    required: true,
    validationRegex: /^(\+?91[\-\s]?)?[6789]\d{9}$/,
    helperText: 'For urgent cultural squad and helpline updates',
    errorMessage: 'Please provide a valid 10-digit mobile number',
  },

  // Step 2: Academic Profile
  {
    id: 'college',
    name: 'college',
    label: 'College / Institution',
    placeholder: 'e.g. IEC College of Engineering & Technology',
    type: 'text',
    step: 2,
    required: true,
    errorMessage: 'Institution name is required',
  },
  {
    id: 'branch',
    name: 'branch',
    label: 'Course / Branch',
    placeholder: 'Select or enter your department',
    type: 'select',
    step: 2,
    required: true,
    options: [
      { value: 'Computer Science & Engineering', label: 'Computer Science & Engineering (CSE)' },
      { value: 'CSE (AI & Machine Learning)', label: 'CSE (AI & Machine Learning)' },
      { value: 'Information Technology', label: 'Information Technology (IT)' },
      { value: 'Electronics & Communication', label: 'Electronics & Communication (ECE)' },
      { value: 'Mechanical Engineering', label: 'Mechanical Engineering (ME)' },
      { value: 'Civil Engineering', label: 'Civil Engineering (CE)' },
      { value: 'Management Studies (MBA)', label: 'Management Studies (MBA)' },
      { value: 'Computer Applications (MCA)', label: 'Computer Applications (MCA)' },
      { value: 'Pharmacy / Health Sciences', label: 'Pharmacy / Allied Sciences' },
      { value: 'Other Academic Branch', label: 'Other Academic Branch' },
    ],
  },
  {
    id: 'year',
    name: 'year',
    label: 'Academic Year',
    placeholder: 'Select Year',
    type: 'select',
    step: 2,
    required: true,
    options: [
      { value: '1st Year', label: '1st Year (Freshman - Roll No. Not Required)' },
      { value: '2nd Year', label: '2nd Year (Sophomore)' },
      { value: '3rd Year', label: '3rd Year (Junior)' },
      { value: '4th Year', label: '4th Year (Senior)' },
      { value: 'Postgraduate / Faculty', label: 'Postgraduate / Alumni / Faculty' },
    ],
  },
  {
    id: 'section',
    name: 'section',
    label: 'Class Section',
    placeholder: 'Select your section',
    type: 'select',
    step: 2,
    required: true,
    options: FIRST_YEAR_SECTION_OPTIONS,
    helperText: '1st Year has Section A & B; 2nd Year onwards has Sections A, B, C & D',
    errorMessage: 'Please select your class section',
  },
  {
    id: 'studentId',
    name: 'studentId',
    label: 'University Roll Number / Student ID',
    placeholder: 'e.g. 2300970100012 or AKTU/College Roll No.',
    type: 'text',
    step: 2,
    required: false, // Conditionally validated for non-1st year students
    helperText: 'Waived for 1st Year students (not yet allocated). Required for 2nd, 3rd, 4th Year.',
    errorMessage: 'University Roll Number is required for 2nd, 3rd, and 4th year students',
  },

  // Step 3: Cultural Expression
  {
    id: 'attireCategory',
    name: 'attireCategory',
    label: 'Preferred Ethnic Wear / Cultural Attire',
    placeholder: 'Select your attire tradition',
    type: 'select',
    step: 3,
    required: true,
    options: [
      { value: 'North Indian (Kurta / Sherwani / Lehenga / Salwar)', label: 'North Indian (Kurta / Sherwani / Lehenga)' },
      { value: 'South Indian (Mundu / Veshti / Kanjeevaram Saree)', label: 'South Indian (Mundu / Veshti / Kanjeevaram Saree)' },
      { value: 'East & North-East (Mekhela / Kurtha / Dhoti / Tussar)', label: 'East & North-East (Mekhela / Tussar / Kurtha)' },
      { value: 'West Indian (Bandhani / Kedia / Gujarati / Marathi Navvari)', label: 'West Indian (Bandhani / Kedia / Navvari)' },
      { value: 'Pan-Indian Traditional Handloom / Khadi', label: 'Pan-Indian Traditional Handloom / Khadi' },
      { value: 'Indo-Western Artisanal Fusion', label: 'Indo-Western Artisanal Fusion' },
      { value: 'Other Indigenous Attire', label: 'Other Indigenous Attire' },
    ],
  },
  {
    id: 'participationNote',
    name: 'participationNote',
    label: 'Additional Participation Details / Cultural Notes (Optional)',
    placeholder: 'Any story behind your attire, group affiliation, or cultural performance query...',
    type: 'textarea',
    step: 3,
    required: false,
    helperText: 'Let us know if you have a special heritage weave or performance interest.',
  },
];
