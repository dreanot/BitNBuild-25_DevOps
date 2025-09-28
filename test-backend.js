// Test Firebase Backend
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCXjpnfn0_Ni0OrlvikZzYyY4AeYCUeozA",
  authDomain: "taxwise-25d3b.firebaseapp.com",
  projectId: "taxwise-25d3b",
  storageBucket: "taxwise-25d3b.firebasestorage.app",
  messagingSenderId: "466214871803",
  appId: "1:466214871803:web:8928e7c68b2a010a59865e",
  measurementId: "G-LYZ4E6E2FD"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Test function to save data
export const testSaveData = async () => {
  try {
    const docRef = await addDoc(collection(db, 'test'), {
      message: 'Hello from backend!',
      timestamp: new Date(),
      testData: {
        creditScore: 750,
        income: 500000,
        expenses: 300000
      }
    });
    console.log('✅ Data saved to backend:', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('❌ Backend error:', error);
    return { success: false, error: error.message };
  }
};

// Test function to read data
export const testReadData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'test'));
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    console.log('✅ Data read from backend:', data);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Backend error:', error);
    return { success: false, error: error.message };
  }
};

console.log('🔥 Firebase Backend Connected!');
console.log('📊 Database:', db);
console.log('🌐 Project:', firebaseConfig.projectId);
