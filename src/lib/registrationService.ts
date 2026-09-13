import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import { RegistrationFormData, RegistrationRecord } from '../types';

const LOCAL_STORAGE_KEY = 'asmita_2026_registrations';
const CURRENT_USER_REG_KEY = 'asmita_2026_current_reg';

// Helper to generate an authentic ceremonial ID (e.g. ASMITA-26-E7B2)
export function generateRegistrationId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `ASMITA-26-${code}`;
}

export async function submitRegistration(data: RegistrationFormData): Promise<{
  success: boolean;
  registrationId: string;
  isFirebaseLive: boolean;
  error?: string;
}> {
  const regId = generateRegistrationId();
  const timestamp = Date.now();

  const record: RegistrationRecord = {
    ...data,
    id: regId,
    registrationId: regId,
    createdAt: timestamp,
    status: 'confirmed',
  };

  // Always cache locally so attendee retains ticket immediately in this browser
  try {
    const existingList: RegistrationRecord[] = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) || '[]'
    );
    // Duplicate check
    const duplicate = existingList.find(
      (r) =>
        r.email.toLowerCase() === data.email.toLowerCase() ||
        (r.studentId && r.studentId.toLowerCase() === data.studentId.toLowerCase())
    );
    if (duplicate) {
      localStorage.setItem(CURRENT_USER_REG_KEY, JSON.stringify(duplicate));
      return {
        success: true,
        registrationId: duplicate.registrationId,
        isFirebaseLive: isFirebaseConfigured,
      };
    }

    existingList.unshift(record);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existingList));
    localStorage.setItem(CURRENT_USER_REG_KEY, JSON.stringify(record));
  } catch (err) {
    console.warn('Local storage write warning:', err);
  }

  // If Firebase is configured with active Firestore:
  if (isFirebaseConfigured && db) {
    try {
      // Check for duplicate in Firestore if read rules permit
      try {
        const registrationsRef = collection(db, 'registrations');
        const emailQuery = query(registrationsRef, where('email', '==', data.email.toLowerCase()));
        const emailSnap = await getDocs(emailQuery);

        if (!emailSnap.empty) {
          const existingData = emailSnap.docs[0].data() as RegistrationRecord;
          const returnedId = existingData.registrationId || regId;
          return {
            success: true,
            registrationId: returnedId,
            isFirebaseLive: true,
          };
        }
      } catch (readErr) {
        // Query read failed or rules are create-only; proceed directly to setDoc
        console.warn('Firestore duplicate check skipped, proceeding with creation:', readErr);
      }

      // Write new document with explicit ID to your Firestore collection
      const docRef = doc(db, 'registrations', regId);
      await setDoc(docRef, {
        registrationId: regId,
        fullName: data.fullName.trim(),
        email: data.email.toLowerCase().trim(),
        phone: data.phone.trim(),
        college: data.college.trim(),
        branch: data.branch,
        year: data.year,
        studentId: data.studentId.trim(),
        attireCategory: data.attireCategory,
        participationNote: data.participationNote?.trim() || '',
        createdAt: serverTimestamp(),
        createdAtMillis: timestamp,
        status: 'confirmed',
        source: 'asmita_web_portal',
      });

      console.info(`✦ [Firebase] Registration record ${regId} successfully written to Firestore 'registrations' collection.`);

      return {
        success: true,
        registrationId: regId,
        isFirebaseLive: true,
      };
    } catch (firebaseErr: any) {
      console.error('Firestore save error:', firebaseErr);
      const isPermission = firebaseErr?.code === 'permission-denied' || String(firebaseErr?.message).includes('permission');
      const helpfulMsg = isPermission
        ? 'Firebase Firestore permission denied. In console.firebase.google.com -> Firestore Database -> Rules, ensure rules allow write: match /registrations/{document=**} { allow read, write: if true; }'
        : (firebaseErr instanceof Error ? firebaseErr.message : 'Firestore record write pending');

      return {
        success: true,
        registrationId: regId,
        isFirebaseLive: false,
        error: helpfulMsg,
      };
    }
  }

  // Fallback mode when Firebase is awaiting credentials:
  // Simulate network duration for authentic physical feel
  await new Promise((res) => setTimeout(res, 600));

  return {
    success: true,
    registrationId: regId,
    isFirebaseLive: false,
  };
}

export function getCurrentSavedRegistration(): RegistrationRecord | null {
  try {
    const raw = localStorage.getItem(CURRENT_USER_REG_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export async function fetchAllRegistrations(): Promise<{
  data: RegistrationRecord[];
  isFirebaseLive: boolean;
}> {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, 'registrations'));
      const items: RegistrationRecord[] = [];
      snap.forEach((doc) => {
        const d = doc.data();
        items.push({
          ...(d as RegistrationRecord),
          id: doc.id,
          registrationId: d.registrationId || doc.id,
          createdAt: d.createdAtMillis || Date.now(),
        });
      });
      return { data: items, isFirebaseLive: true };
    } catch (err) {
      console.warn('Could not fetch from Firestore, reading local cache:', err);
    }
  }

  try {
    const local = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    return { data: local, isFirebaseLive: false };
  } catch {
    return { data: [], isFirebaseLive: false };
  }
}

export async function getRegistrationsList(): Promise<RegistrationRecord[]> {
  const result = await fetchAllRegistrations();
  return result.data;
}
