// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6J-KFPqgplEib8UjigjV6I2rCs9HgsyE",
  authDomain: "solutions-78900.firebaseapp.com",
  projectId: "solutions-78900",
  storageBucket: "solutions-78900.appspot.com",
  messagingSenderId: "330331456951",
  appId: "1:330331456951:web:63fc1acbf01de687f05432",
  measurementId: "G-VHG0CZ86C5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth(app);
export const googleprovider=new GoogleAuthProvider();
export const db=getFirestore(app);
export const storage=getStorage(app);
