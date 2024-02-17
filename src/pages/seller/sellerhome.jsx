import { list } from 'postcss';
import React, { useState, useEffect } from 'react';
import { collection, addDoc,getDocs,getDoc, query, where, doc, updateDoc } from "firebase/firestore";
import { auth,db } from "../../config";
import {onAuthStateChanged} from "firebase/auth";
import Sellerprofile from './profile';

function Sellerhome() {

    // Sellers page 
    // I)PROFILE PAGE 
    // under that 
    // a) fields to enter worktime , overtime , fish he can catch  (done)
    // b) schedule for the week, recommended fish and net type 
    // c) join community or allot a community (done)
    // d) profile , sale , finance report 
    
// const apiurl="https://example-to9v.onrender.com/add/10";


// useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(apiurl);
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const json = await response.json();
//         console.log(response);
//         setSellers(json);
//       } catch (error) {
//         console.error('There was an error!', error);
//       } finally {
//         console.log('finally');
//       }
//     };
//     fetchData();
//   }, []);



const [communityName, setCommunityName] = useState('');

useEffect(() => {
  const fetchSellerProfile = async () => {
    const sellerProfileRef = doc(db, 'Sellers', auth.currentUser.uid);
    const sellerProfileDoc = await getDoc(sellerProfileRef);

    if (sellerProfileDoc.exists()) {
      setCommunityName(sellerProfileDoc.data().community);
      console.log(communityName);
    } else {
      console.log('No such document!');
    }
  };

  fetchSellerProfile();
}, []);











      const [isHiddenprofile, setIsHiddenprofile] = useState(true);
      const toggleprofile = () => {
        setIsHiddenprofile(!isHiddenprofile);
      };


    
    


    return (
        <div>
            <h1>Seller Home</h1>
            
            
            
            <br/>
            <br/>
            <div>
              <div className='flex gap-2'>
              <h1>profile page</h1>
              <button onClick={()=>toggleprofile()} className='border-2'>Click to view profile</button>
              </div>
              <div className={`${isHiddenprofile ? 'hidden' : ''}`}>
                <Sellerprofile/>
              </div>
            </div>

        </div>

    )
}

export default Sellerhome;

//i/p:
//[commmunity1,commmunity2,commmunity3,commmunity4,commmunity5,commmunity6,commmunity7]

//o/p:
//{
//   schedule:
//   {community1:["SATURDAY","salon","net1"]},
//   {community2:["SATURDAY","salon","net1"]},
//   {community3:["SATURDAY","salon","net1"]},
//   {community4:["SATURDAY","salon","net1"]},
//   {community5:["SATURDAY","salon","net1"]
//   {community6:["SATURDAY","salon","net1"]},
//   {community7:["SUNDAY","touna","net1"]},
// }
