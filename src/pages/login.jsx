import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth,db,googleprovider} from "../config"; // import auth and firestore from your firebase file
import { signInWithPopup } from "firebase/auth";
import {  collection, doc, setDoc } from 'firebase/firestore';
import Schedule from '../components/schedule';
import logoImage from "../assets/22.jpg";
import back from "../assets/5096154.jpg";



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
        buyername: user.displayName,
        // add any other user data you want to save
      });

      navigate(`/${userType}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative h-screen ">
      <img src={back} alt="bg" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute top-1/2 left-1/2 mb-6 transform -translate-x-1/2 -translate-y-1/2 text-center flex  flex-col">
        <div className=" h-full w-full">
          <img src={logoImage} alt="Logo" className="w-[20%] h-[20%] object-cover mx-auto  rounded-full" /> 
        </div>
        <br/>
       <div>
       <h1 className="text-5xl font-bold mb-4  text-white  font-serif">Fauna Dive</h1>
       </div>
       <br/>
       <div className="">
       <select
          className="box-content h-[15%] w-[15%] border-2 text-3xl text-center bg-white bg-opacity-50 rounded-md mx-auto"
          onChange={(e) => setUserType(e.target.value)}
        >
          <option value="Buyers">Buyer</option>
          <option value="Sellers">Seller</option>
        </select>
       </div>
       <br/>
        <div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mt-3 text-2xl mx-auto"
          onClick={handleLogin}
        >
          Login
        </button>
        </div>
      </div>
    </div>
  );
  
  }  

export default Login;