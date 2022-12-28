// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { getDatabase, ref } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: 'AIzaSyBVAKO31QyNga_jXtisec6gGhQ-js24PG4',
  authDomain: 'react-10-22-c8a5a.firebaseapp.com',
  databaseURL:
    'https://react-10-22-c8a5a-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'react-10-22-c8a5a',
  storageBucket: 'react-10-22-c8a5a.appspot.com',
  messagingSenderId: '325800175910',
  appId: '1:325800175910:web:6532f5fa424fd235a379e7',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);

export const signUp = async (email: string, password: string) =>
  await createUserWithEmailAndPassword(firebaseAuth, email, password);

export const signIn = async (email: string, password: string) =>
  await signInWithEmailAndPassword(firebaseAuth, email, password);

export const logOut = async () => await signOut(firebaseAuth);

export const db = getDatabase(app);

export const getChats = () => ref(db, 'chats');
