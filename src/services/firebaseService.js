import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  addDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../config/firebase';

// User data management
export const createUserProfile = async (userId, userData) => {
  try {
    await setDoc(doc(db, 'users', userId), {
      ...userData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error creating user profile:', error);
    return { success: false, error: error.message };
  }
};

export const getUserProfile = async (userId) => {
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { success: true, data: docSnap.data() };
    } else {
      return { success: false, error: 'User not found' };
    }
  } catch (error) {
    console.error('Error getting user profile:', error);
    return { success: false, error: error.message };
  }
};

// Financial data management
export const saveFinancialData = async (userId, dataType, data) => {
  try {
    const docRef = doc(db, 'users', userId, 'financial_data', dataType);
    await setDoc(docRef, {
      data,
      dataType,
      userId,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error saving financial data:', error);
    return { success: false, error: error.message };
  }
};

export const getFinancialData = async (userId, dataType) => {
  try {
    const docRef = doc(db, 'users', userId, 'financial_data', dataType);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { success: true, data: docSnap.data().data };
    } else {
      return { success: false, error: 'Data not found' };
    }
  } catch (error) {
    console.error('Error getting financial data:', error);
    return { success: false, error: error.message };
  }
};

export const getAllFinancialData = async (userId) => {
  try {
    const q = query(collection(db, 'users', userId, 'financial_data'));
    const querySnapshot = await getDocs(q);
    
    const data = {};
    querySnapshot.forEach((doc) => {
      data[doc.id] = doc.data().data;
    });
    
    return { success: true, data };
  } catch (error) {
    console.error('Error getting all financial data:', error);
    return { success: false, error: error.message };
  }
};

// Credit score data management
export const saveCreditScoreData = async (userId, creditData) => {
  try {
    const docRef = doc(db, 'users', userId, 'credit_data', 'score');
    await setDoc(docRef, {
      ...creditData,
      userId,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error saving credit score data:', error);
    return { success: false, error: error.message };
  }
};

export const getCreditScoreData = async (userId) => {
  try {
    const docRef = doc(db, 'users', userId, 'credit_data', 'score');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { success: true, data: docSnap.data() };
    } else {
      return { success: false, error: 'Credit data not found' };
    }
  } catch (error) {
    console.error('Error getting credit score data:', error);
    return { success: false, error: error.message };
  }
};

// Tax data management
export const saveTaxData = async (userId, taxData) => {
  try {
    const docRef = doc(db, 'users', userId, 'tax_data', 'calculation');
    await setDoc(docRef, {
      ...taxData,
      userId,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error saving tax data:', error);
    return { success: false, error: error.message };
  }
};

export const getTaxData = async (userId) => {
  try {
    const docRef = doc(db, 'users', userId, 'tax_data', 'calculation');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { success: true, data: docSnap.data() };
    } else {
      return { success: false, error: 'Tax data not found' };
    }
  } catch (error) {
    console.error('Error getting tax data:', error);
    return { success: false, error: error.message };
  }
};

// File upload management
export const uploadFile = async (userId, file, path) => {
  try {
    const storageRef = ref(storage, `users/${userId}/${path}/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return { success: true, url: downloadURL };
  } catch (error) {
    console.error('Error uploading file:', error);
    return { success: false, error: error.message };
  }
};

export const deleteFile = async (userId, path) => {
  try {
    const fileRef = ref(storage, `users/${userId}/${path}`);
    await deleteObject(fileRef);
    return { success: true };
  } catch (error) {
    console.error('Error deleting file:', error);
    return { success: false, error: error.message };
  }
};

// Reports management
export const saveReport = async (userId, reportData) => {
  try {
    const docRef = await addDoc(collection(db, 'users', userId, 'reports'), {
      ...reportData,
      userId,
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving report:', error);
    return { success: false, error: error.message };
  }
};

export const getReports = async (userId) => {
  try {
    const q = query(
      collection(db, 'users', userId, 'reports'),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    const reports = [];
    querySnapshot.forEach((doc) => {
      reports.push({ id: doc.id, ...doc.data() });
    });
    
    return { success: true, data: reports };
  } catch (error) {
    console.error('Error getting reports:', error);
    return { success: false, error: error.message };
  }
};

// AI insights management
export const saveAIInsights = async (userId, insights) => {
  try {
    const docRef = doc(db, 'users', userId, 'ai_insights', 'current');
    await setDoc(docRef, {
      ...insights,
      userId,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error saving AI insights:', error);
    return { success: false, error: error.message };
  }
};

export const getAIInsights = async (userId) => {
  try {
    const docRef = doc(db, 'users', userId, 'ai_insights', 'current');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { success: true, data: docSnap.data() };
    } else {
      return { success: false, error: 'AI insights not found' };
    }
  } catch (error) {
    console.error('Error getting AI insights:', error);
    return { success: false, error: error.message };
  }
};
