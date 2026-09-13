import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Environment variables configuration with safe fallbacks for asmita-01
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDBjLQQY_JKy_F1VlFUrGxg5JtS9T01C5Y',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'asmita-01.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'asmita-01',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'asmita-01.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '801780338235',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:801780338235:web:82daba6ba6cfe6d918561e',
};

// Initialize Firebase app exactly once
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Cloud Firestore database instance
const db = getFirestore(app);

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId
);

export const firebaseProjectId = firebaseConfig.projectId;

export { app, db };

