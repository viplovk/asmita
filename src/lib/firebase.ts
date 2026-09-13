import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';

// Environment variables configuration for Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Validate whether all necessary keys are present
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.apiKey !== 'YOUR_API_KEY' &&
  !firebaseConfig.apiKey.startsWith('MY_')
);

export const firebaseProjectId = firebaseConfig.projectId || null;

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    console.info('✦ [Firebase Cloud Firestore] Active & connected to project:', firebaseConfig.projectId);
  } catch (error) {
    console.warn('✦ [Firebase Cloud Firestore] Initialization error:', error);
    db = null;
    auth = null;
  }
} else {
  if (import.meta.env.DEV) {
    console.info(
      '✦ [Firebase Notice] Awaiting Firebase credentials. Configure VITE_FIREBASE_* in your environment to link your Firestore database at console.firebase.google.com'
    );
  }
}

export { app, db, auth };

