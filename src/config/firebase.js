import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCXjpnfn0_Ni0OrlvikZzYyY4AeYCUeozA",
  authDomain: "taxwise-25d3b.firebaseapp.com",
  projectId: "taxwise-25d3b",
  storageBucket: "taxwise-25d3b.firebasestorage.app",
  messagingSenderId: "466214871803",
  appId: "1:466214871803:web:8928e7c68b2a010a59865e",
  measurementId: "G-LYZ4E6E2FD"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
