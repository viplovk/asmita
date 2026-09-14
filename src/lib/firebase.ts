import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

// Environment variables configuration for Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Safely identify missing environment variables without throwing at module load time
const missingEnvVars: string[] = [];
if (!firebaseConfig.apiKey) missingEnvVars.push('VITE_FIREBASE_API_KEY');
if (!firebaseConfig.authDomain) missingEnvVars.push('VITE_FIREBASE_AUTH_DOMAIN');
if (!firebaseConfig.projectId) missingEnvVars.push('VITE_FIREBASE_PROJECT_ID');
if (!firebaseConfig.storageBucket) missingEnvVars.push('VITE_FIREBASE_STORAGE_BUCKET');
if (!firebaseConfig.messagingSenderId) missingEnvVars.push('VITE_FIREBASE_MESSAGING_SENDER_ID');
if (!firebaseConfig.appId) missingEnvVars.push('VITE_FIREBASE_APP_ID');

export const isFirebaseConfigured = missingEnvVars.length === 0;
export const firebaseMissingVariables = missingEnvVars;
export const firebaseConfigurationError =
  missingEnvVars.length > 0
    ? `Missing required Firebase environment variables: ${missingEnvVars.join(', ')}`
    : null;

// Development-safe console diagnostic: reports which variables are missing without exposing values
if (!isFirebaseConfigured) {
  console.warn(
    `[Firebase Diagnostic] Configuration incomplete. Missing variable(s): ${missingEnvVars.join(
      ', '
    )}. React rendering remains safe. Submissions will notify that registration service is temporarily unavailable.`
  );
}

// Safely initialize Firebase app and Firestore instance without module-load crashes
let appInstance: FirebaseApp | null = null;
let dbInstance: Firestore | null = null;

if (isFirebaseConfigured) {
  try {
    appInstance = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    dbInstance = getFirestore(appInstance);
  } catch (initErr) {
    console.error('[Firebase Initialization Error]:', initErr);
    appInstance = null;
    dbInstance = null;
  }
}

export const app = appInstance as FirebaseApp;
export const db = dbInstance as Firestore;
export const firebaseProjectId = firebaseConfig.projectId || 'asmita-01';




