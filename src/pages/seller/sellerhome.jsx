"use client";
import { list } from 'postcss';
import React, { useState, useEffect } from 'react';
import { collection, addDoc,getDocs,getDoc, query, where, doc, updateDoc } from "firebase/firestore";
import { auth,db } from "../../config";
import Header from '../../components/header';
import {onAuthStateChanged} from "firebase/auth";
import Sellerprofile from './profile';
import profileimage from './profile.png';
import refreshicon from './refresh.png';

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
        <div className='bg-[#FFF7F1] h-[100]%'>
            
            
            
            <Header/>
            <br/>
            <br/>
            <div>
              <h1 className='text-2xl'>News and market Analysis</h1>
              
              <div>
                
              <div className="h-1 w-[23%] rounded bg-[#E78895]"></div>
              </div>
              <br/>
              <div className='flex flex-row gap-6  ml-6'>
                <div className='bg-[#FFE4C9] rounded-lg h-[20%] w-[15%] flex flex-col gap-2 pd-2 mt-2'>
                  <h1 className='h-full w-[100%] mt-2 text-center'>Fish Name :    Salmon</h1>
                  <h1 className='h-full w-[100%] mb-2 text-center'>Demand  :  1800kg</h1>
                </div>
                <div className='bg-[#FFE4C9] rounded-lg h-[20%] w-[15%] flex flex-col gap-2 pd-2 mt-2'>
                  <h1 className='h-full w-[100%] mt-2 text-center'>Fish Name :    Touna</h1>
                  <h1 className='h-full w-[100%] mb-2 text-center'>Demand  :  2000kg</h1>
              </div>
              <div className='bg-[#FFE4C9] rounded-lg h-[20%] w-[15%] flex flex-col gap-2 pd-2 mt-2'>
                  <h1 className='h-full w-[100%] mt-2 text-center'>Fish Name :    Touna</h1>
                  <h1 className='h-full w-[100%] mb-2 text-center'>Demand  :  2000kg</h1>
              </div>

      
                
                
              </div>
            </div>
            <br/>
            <br/>
            
            <div className='flex-col flex items-center justify-center'>
              <div className='flex flex-row '>
              <img src={profileimage} className='h-[50px] w-[50px]'></img>
              <button onClick={()=>toggleprofile()} className=' border-2 bg-[#E78895] text-center h-[40px] rounded-lg w-[200px] w-full'>Click to view profile</button>
              </div>
              <br/>
              <br/>
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
