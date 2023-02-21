import { getApp, getApps, initializeApp } from 'firebase/app'
import {getFirestore} from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAw8qisIN9R7WYmpkVAzWZcEML2iRbn9YU",
  authDomain: "chatgpt-messenger-624ae.firebaseapp.com",
  projectId: "chatgpt-messenger-624ae",
  storageBucket: "chatgpt-messenger-624ae.appspot.com",
  messagingSenderId: "608124791099",
  appId: "1:608124791099:web:5e1df38c57387cedaa6f1e"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };