import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const {
    VITE_FIREBSE_API_KEY,
    VITE_FIREBSE_AUTH_dOMAIN,
    VITE_FIREBSE_PROJECT_ID,
    VITE_FIREBSE_STORAGE_BUCKET,
    VITE_FIREBSE_MESSAGING_SENDER_ID,
    VITE_FIREBSE_APP_ID
} = import.meta.env

const firebaseConfig = {
  apiKey: VITE_FIREBSE_API_KEY,
  authDomain: VITE_FIREBSE_AUTH_dOMAIN,
  projectId: VITE_FIREBSE_PROJECT_ID,
  storageBucket: VITE_FIREBSE_STORAGE_BUCKET,
  messagingSenderId: VITE_FIREBSE_MESSAGING_SENDER_ID,
  appId: VITE_FIREBSE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
