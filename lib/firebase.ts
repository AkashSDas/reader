import { getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { collection, DocumentSnapshot, getDocs, getFirestore, limit, query, Timestamp, where } from "firebase/firestore";
import { getStorage } from "firebase/storage";

var firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FB_CONFIG_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FB_CONFIG_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FB_CONFIG_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FB_CONFIG_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FB_CONFIG_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_FB_CONFIG_APPID,
  measurementId: process.env.NEXT_PUBLIC_FB_CONFIG_MEASUREMENTID,
};

// To avoid Firebase initialization error
if (getApps().length == 0) {
  var firebaseApp = initializeApp(firebaseConfig);
}

// SDKs for Firebase products that are to be used

// Auth
export var auth = getAuth(firebaseApp);
export var googleAuthProvider = new GoogleAuthProvider();

// Firestore
export var firestore = getFirestore(firebaseApp);

export var storage = getStorage(firebaseApp);

// ============================
// Helper functions
// ============================

/**
 * Get a users/{uid} document from Firestore
 * @param {string} username
 */
export async function getUserWithUsername(username: string) {
  var ref = collection(firestore, "users");
  var q = query(ref, where("username", "==", username), limit(1));
  var snapshot = (await getDocs(q)).docs[0];
  return snapshot;
}

/**
 * Converts a firestore document to JSON
 * @param {DocumentSnapshot} doc
 */
export function postToJSON(doc: DocumentSnapshot) {
  var data = doc.data();

  return {
    ...data,
    // firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}
