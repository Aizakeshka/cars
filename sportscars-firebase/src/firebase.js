import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDPkPVLwPG02OJ6aaW88uuNxn08ef3xclo",
  authDomain: "sports-cars-e1eac.firebaseapp.com",
  projectId: "sports-cars-e1eac",
  storageBucket: "sports-cars-e1eac.firebasestorage.app",
  messagingSenderId: "25435291127",
  appId: "1:25435291127:web:347a1c099dfa70acfc82f2"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;