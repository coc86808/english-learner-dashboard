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
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  onAuthStateChanged 
} from 'firebase/auth';
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

// Initialize Firebase Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

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
// Authentication Helper Functions
// -------------------------------------------------------------

/**
 * 1-Click Sign in with Google
 */
export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    if (user) {
      const emailLower = (user.email || '').toLowerCase();
      const isAdmin =
        emailLower === 'sakin@gmail.com' ||
        emailLower === 'sakin7112@gmail.com' ||
        emailLower === 'admin@learnerhub.com' ||
        emailLower === 'sakinadmin' ||
        emailLower.includes('sakin');

      const docId = `usr-${user.uid}`;
      let studentProfile;
      let needsOnboarding = true;

      try {
        const userRef = doc(db, 'users', docId);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          studentProfile = docSnap.data();
          if (isAdmin) studentProfile.role = 'admin';
          if (studentProfile.college && studentProfile.college !== 'HSC College' && studentProfile.hscBatch) {
            needsOnboarding = false;
          }
        }
      } catch (err) {
        console.warn('Firestore profile check error:', err);
      }

      if (!studentProfile) {
        studentProfile = {
          id: docId,
          uid: user.uid,
          name: user.displayName || 'HSC Candidate',
          email: user.email,
          phone: user.phoneNumber || user.email,
          college: '',
          hscBatch: 'HSC 2026',
          avatar: user.photoURL || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop`,
          role: isAdmin ? 'admin' : 'student',
          streak: 0,
          points: 0,
          testsCompleted: 0,
          masteredWordsCount: 0,
          status: 'Active',
          joinedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
        };
        await saveUserToFirestore(studentProfile);
      }

      return { success: true, user: studentProfile, needsOnboarding };
    }
  } catch (error) {
    console.error('Google Sign-In Error:', error);
    return { success: false, error: error.message };
  }
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

/**
 * Save word performance & weak words learning state to Firestore for a user
 */
export async function saveLearningStateToFirestore(userId, { wordPerformance, weakWords, examHistory }) {
  if (!userId) return false;
  try {
    const userRef = doc(db, 'users', userId);
    const updates = {
      updatedAt: serverTimestamp()
    };
    if (wordPerformance) updates.wordPerformance = JSON.stringify(wordPerformance);
    if (weakWords) updates.weakWords = JSON.stringify(weakWords);
    if (examHistory) updates.examHistory = JSON.stringify(examHistory.slice(0, 50));

    await setDoc(userRef, updates, { merge: true });
    return true;
  } catch (error) {
    console.warn('Firestore learning state save failed:', error);
    return false;
  }
}

/**
 * Fetch and hydrate user's cloud learning state from Firestore into LocalStorage
 */
export async function fetchAndHydrateUserLearningState(userId) {
  if (!userId) return null;
  try {
    const userRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      const data = docSnap.data();

      // Hydrate word performance
      if (data.wordPerformance) {
        try {
          const parsedPerf = typeof data.wordPerformance === 'string' ? JSON.parse(data.wordPerformance) : data.wordPerformance;
          const localPerfRaw = localStorage.getItem('hsc_word_performance');
          const localPerf = localPerfRaw ? JSON.parse(localPerfRaw) : {};
          const mergedPerf = { ...parsedPerf, ...localPerf };
          localStorage.setItem('hsc_word_performance', JSON.stringify(mergedPerf));
        } catch (e) {}
      }

      // Hydrate weak words
      if (data.weakWords) {
        try {
          const parsedWeak = typeof data.weakWords === 'string' ? JSON.parse(data.weakWords) : data.weakWords;
          if (Array.isArray(parsedWeak)) {
            localStorage.setItem('hsc_weak_words', JSON.stringify(parsedWeak));
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('hsc_weak_words_updated'));
            }
          }
        } catch (e) {}
      }

      // Hydrate exam history
      if (data.examHistory) {
        try {
          const parsedHistory = typeof data.examHistory === 'string' ? JSON.parse(data.examHistory) : data.examHistory;
          if (Array.isArray(parsedHistory)) {
            const localHistRaw = localStorage.getItem('hsc_exam_history');
            const localHist = localHistRaw ? JSON.parse(localHistRaw) : [];
            const map = new Map();
            parsedHistory.forEach(h => map.set(h.id, h));
            localHist.forEach(h => map.set(h.id, h));
            const mergedHist = Array.from(map.values()).sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
            localStorage.setItem('hsc_exam_history', JSON.stringify(mergedHist));
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('hsc_leaderboard_updated'));
            }
          }
        } catch (e) {}
      }

      return data;
    }
    return null;
  } catch (error) {
    console.warn('Firestore learning state fetch error:', error);
    return null;
  }
}

