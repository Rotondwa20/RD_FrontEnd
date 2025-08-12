// Import necessary Firebase SDK functions
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbIBhn0201Hh0MFUA3orwFLNFZbxh28PA",
  authDomain: "rideloop-517b3.firebaseapp.com",
  projectId: "rideloop-517b3",
  storageBucket: "rideloop-517b3.appspot.com",
  messagingSenderId: "808329582416",
  appId: "1:808329582416:web:d18c5ebc54daf8ee6e7e55",
  measurementId: "G-MR1RMN22YE"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Analytics if supported
let analytics;
try {
  analytics = getAnalytics(app);
} catch (e) {
  console.warn("Analytics not supported or failed to initialize:", e);
}

// Initialize Firebase Auth and Google provider
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Initialize Firestore database
const db = getFirestore(app);

/**
 * Checks if user document exists in Firestore.
 * If not, creates a new document with the default role.
 * @param {object} user - Firebase user object
 * @param {string} [role="renter"] - Role to assign if user document is created
 */
const checkAndAddUser = async (user, role = "renter") => {
  if (!user) return;

  const userRef = doc(db, "users", user.uid);

  try {
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName || "",
        email: user.email || "",
        role: user.role|| "", // assign the passed role or default to "renter"
        createdAt: new Date().toISOString(),
      });
      console.log(`User created with role: ${role} (uid: ${user.uid})`);
    } else {
      console.log(`User already exists (uid: ${user.uid})`);
    }
  } catch (error) {
    console.error("Error in checkAndAddUser:", error);
  }
};

export { auth, provider, db, checkAndAddUser };
