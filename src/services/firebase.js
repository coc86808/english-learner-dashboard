import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  serverTimestamp 
} from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBh9mnvutZ-Tar8lkPhPp1l7wzXPnyS3kI",
  authDomain: "sakin86808-e7863.firebaseapp.com",
  projectId: "sakin86808-e7863",
  storageBucket: "sakin86808-e7863.firebasestorage.app",
  messagingSenderId: "276291022314",
  appId: "1:276291022314:web:9a76ee9d20e98157989693",
  measurementId: "G-R88HMSMHM6"
};

// Initialize Firebase App
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore
export const db = getFirestore(app);

// Optional Analytics (browser only)
export let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {});
}

// -------------------------------------------------------------
// Cloud Firestore Helper Functions
// -------------------------------------------------------------

/**
 * Automatically save newly registered user into Cloud Firestore
 */
export async function saveUserToFirestore(user) {
  if (!user || !user.email) return;
  try {
    const docId = user.id || `usr-${user.email.replace(/[^a-zA-Z0-9]/g, '_')}`;
    const userRef = doc(db, 'users', docId);
    await setDoc(userRef, {
      ...user,
      id: docId,
      updatedAt: serverTimestamp(),
      createdAt: user.createdAt || serverTimestamp()
    }, { merge: true });
    return true;
  } catch (error) {
    console.warn('Firestore user save fallback:', error);
    return false;
  }
}

/**
 * Real-time listener for all registered users
 */
export function listenToFirestoreUsers(callback) {
  try {
    const usersCol = collection(db, 'users');
    return onSnapshot(usersCol, (snapshot) => {
      const users = [];
      snapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      if (callback) callback(users);
    }, (error) => {
      console.warn('Firestore listen error:', error);
    });
  } catch (error) {
    console.warn('Firestore subscription failed:', error);
    return () => {};
  }
}

/**
 * Fetch all users once from Firestore
 */
export async function fetchUsersFromFirestore() {
  try {
    const usersCol = collection(db, 'users');
    const snapshot = await getDocs(usersCol);
    const users = [];
    snapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    return users;
  } catch (error) {
    console.warn('Firestore fetch failed:', error);
    return [];
  }
}

/**
 * Update user status, role, or points in Firestore
 */
export async function updateUserInFirestore(userId, updates) {
  if (!userId) return false;
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.warn('Firestore user update failed:', error);
    return false;
  }
}

/**
 * Delete a user from Firestore
 */
export async function deleteUserFromFirestore(userId) {
  if (!userId) return false;
  try {
    const userRef = doc(db, 'users', userId);
    await deleteDoc(userRef);
    return true;
  } catch (error) {
    console.warn('Firestore user delete failed:', error);
    return false;
  }
}

/**
 * Save exam / test result to Firestore
 */
export async function saveExamResultToFirestore(result) {
  if (!result) return false;
  try {
    const resId = `exam-${Date.now()}`;
    const examRef = doc(db, 'exam_results', resId);
    await setDoc(examRef, {
      ...result,
      id: resId,
      timestamp: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.warn('Firestore exam save failed:', error);
    return false;
  }
}
