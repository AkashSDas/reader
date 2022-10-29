import { getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
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

export var firestore = getFirestore(firebaseApp);
export var storage = getStorage(firebaseApp);
