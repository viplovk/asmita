import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';
import { db, auth, isFirebaseConfigured } from './firebase';
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

  // Verify Firestore configuration and instance
  if (!isFirebaseConfigured || !db) {
    return {
      success: false,
      registrationId: '',
      isFirebaseLive: false,
      error: 'Cloud Firestore is not initialized or credentials are missing. Please check your Firebase project configuration.',
    };
  }

  try {
    // 1. Resolve Firebase Auth UID (reuses existing auth session or signs in anonymously if enabled)
    let uid: string | null = auth?.currentUser?.uid || null;
    if (!uid && auth) {
      try {
        const cred = await signInAnonymously(auth);
        uid = cred.user.uid;
      } catch (authErr) {
        // If anonymous authentication is not enabled in Firebase Console, proceed with null UID
        console.warn('Anonymous authentication not active or optional:', authErr);
      }
    }

    const registrationsRef = collection(db, 'registrations');
    const emailClean = data.email.toLowerCase().trim();

    // 2. Check for duplicate registration by email in Firestore
    try {
      const emailQuery = query(registrationsRef, where('email', '==', emailClean));
      const emailSnap = await getDocs(emailQuery);

      if (!emailSnap.empty) {
        const existingDoc = emailSnap.docs[0];
        const existingData = existingDoc.data();
        const existingRegId = existingData.registrationId || existingDoc.id;

        const existingRecord: RegistrationRecord = {
          ...data,
          id: existingRegId,
          registrationId: existingRegId,
          uid: existingData.uid || uid,
          course: existingData.course || data.branch,
          academicYear: existingData.academicYear || data.year,
          attire: existingData.attire || data.attireCategory,
          notes: existingData.notes || data.participationNote || '',
          createdAt: existingData.createdAtMillis || timestamp,
          status: 'confirmed',
        };

        try {
          localStorage.setItem(CURRENT_USER_REG_KEY, JSON.stringify(existingRecord));
        } catch (e) {
          console.warn('Local storage write warning:', e);
        }

        return {
          success: true,
          registrationId: existingRegId,
          isFirebaseLive: true,
        };
      }
    } catch (readErr) {
      // Query read failed or rules do not allow listing; proceed directly to addDoc
      console.warn('Firestore duplicate lookup skipped or disallowed by security rules:', readErr);
    }

    // 3. Document payload matching the exact requested Firestore schema
    const firestoreDocument = {
      registrationId: regId,
      uid: uid || null,
      fullName: data.fullName.trim(),
      email: emailClean,
      phone: data.phone.trim(),
      college: data.college.trim(),
      course: data.branch,
      academicYear: data.year,
      section: (data.section || '').trim(),
      attire: data.attireCategory,
      notes: data.participationNote?.trim() || '',
      status: 'confirmed',
      createdAt: serverTimestamp(),
      // Companion alias fields to support internal UI backwards-compatibility
      branch: data.branch,
      year: data.year,
      studentId: (data.studentId || '').trim(),
      rollNumber: (data.studentId || '').trim(),
      attireCategory: data.attireCategory,
      participationNote: data.participationNote?.trim() || '',
      createdAtMillis: timestamp,
      source: 'asmita_web_portal',
    };

    // 4. Perform the REAL Cloud Firestore write using addDoc() and collection()
    const docRef = await addDoc(registrationsRef, firestoreDocument);
    console.info(`✦ [Firestore] Document successfully written to 'registrations' collection (Doc ID: ${docRef.id}, Registration ID: ${regId})`);

    // 5. Success confirmed by Firestore: Cache record locally for ticket presentation
    const confirmedRecord: RegistrationRecord = {
      ...data,
      id: regId,
      registrationId: regId,
      uid: uid || null,
      course: data.branch,
      academicYear: data.year,
      attire: data.attireCategory,
      notes: data.participationNote?.trim() || '',
      createdAt: timestamp,
      status: 'confirmed',
    };

    try {
      const existingList: RegistrationRecord[] = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEY) || '[]'
      );
      existingList.unshift(confirmedRecord);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existingList));
      localStorage.setItem(CURRENT_USER_REG_KEY, JSON.stringify(confirmedRecord));
    } catch (lsErr) {
      console.warn('Local storage cache warning:', lsErr);
    }

    return {
      success: true,
      registrationId: regId,
      isFirebaseLive: true,
    };
  } catch (firebaseErr: any) {
    console.warn('✦ [Firestore Write Notice]:', firebaseErr?.message || firebaseErr);
    const isPermission =
      firebaseErr?.code === 'permission-denied' ||
      String(firebaseErr?.message || '').toLowerCase().includes('permission');
    const helpfulMsg = isPermission
      ? 'Firestore security rules restricted this write (Missing or insufficient permissions). In Firebase Console → Firestore Database → Rules, set: match /registrations/{document=**} { allow read, create: if true; }'
      : (firebaseErr instanceof Error ? firebaseErr.message : 'Failed to write registration to Cloud Firestore.');

    // CRITICAL: Return success: false so the success screen does NOT show on error!
    return {
      success: false,
      registrationId: '',
      isFirebaseLive: false,
      error: helpfulMsg,
    };
  }
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
          branch: d.branch || d.course || '',
          course: d.course || d.branch || '',
          year: d.year || d.academicYear || '',
          academicYear: d.academicYear || d.year || '',
          attireCategory: d.attireCategory || d.attire || '',
          attire: d.attire || d.attireCategory || '',
          participationNote: d.participationNote || d.notes || '',
          notes: d.notes || d.participationNote || '',
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
