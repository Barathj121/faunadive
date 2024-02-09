import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth,db,googleprovider} from "../config"; // import auth and firestore from your firebase file
import { signInWithPopup } from "firebase/auth";
import {  collection, doc, setDoc } from 'firebase/firestore';

function Login(){
  const [userType, setUserType] = useState('Buyers');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // const provider = new firebase.auth.GoogleAuthProvider();
      const result = await signInWithPopup(auth,googleprovider);
      const user = result.user;

      // Update Firestore based on user type
      const userRef = doc(db, userType, user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        // add any other user data you want to save
      });

      navigate(`/${userType}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <select onChange={(e) => setUserType(e.target.value)}>
        <option value="Buyers">Buyer</option>
        <option value="Sellers">Seller</option>
      </select>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;