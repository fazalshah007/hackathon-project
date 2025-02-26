import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "",
  authDomain: "react-hackathon-05.firebaseapp.com",
  projectId: "react-hackathon-05",
  storageBucket: "react-hackathon-05.firebasestorage.app",
  messagingSenderId: "111935827576",
  appId: "1:111935827576:web:d423da86a88ab9cfbf878d"
};


const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
const db = getFirestore(app)

export { auth, db };

