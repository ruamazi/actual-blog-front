import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "actualblog.firebaseapp.com",
  projectId: "actualblog",
  storageBucket: "actualblog.appspot.com",
  messagingSenderId: "114863352765",
  appId: "1:114863352765:web:261e1fb6cfd307871ac0d4",
};

export const app = initializeApp(firebaseConfig);
