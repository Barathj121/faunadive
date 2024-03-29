"use client";
"use client";
import React, { useState, useEffect } from 'react';
import { collection, addDoc,getDocs,getDoc, query, where, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { auth,db } from '../../config';
import {onAuthStateChanged} from "firebase/auth";
import refreshicon from './refresh.png';
import profilegif from './loading.gif';






  
//1) for each fish each fish demand he can meet approx from seller
//2) after gointg to fish he has to update how much he caught based on schedule
//3) get a new schedule
//4)update finances based on his sells and stuff
  




function Sellerprofile() {


    
    

    const [sellername,setSellerName]=useState("");
    const [worktime,setWorktime]=useState(0);
    const [overtime,setOvertime]=useState(0);
    const [sellercommunity,setSellerCommunity]=useState("");
    
    const [sellerData, setSellerData] = useState({
      name: "",
      community: "",
      worktime: 0,
      overtime: 0,
      fishcancatch: [],
      
  });
    function checklogin() {

      
    

      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          // User is signed in, you can get the user ID with user.uid
          console.log("User is signed in with ID: ", user.uid);
          setSellerName(user.displayName);
    
          // Fetch the seller's community
          const userRef = doc(db, 'Sellers', user.uid);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            
            setSellerData(userDoc.data());
            console.log(sellerData);
            
            setSellerCommunity(sellerData.community);
            setWorktime(sellerData.worktime);
            setOvertime(sellerData.overtime);
            setFishDemand(sellerData.fishcancatch);
            console.log(sellerData);
            console.log(sellername);
            console.log(sellercommunity);
            console.log(worktime);
          }
        } else {
          // User is signed out
          console.log("User is signed out");
        }
      });
    
      // Cleanup subscription
      return () => unsubscribe();
    };

    const [isEditing, setIsEditing] = useState(false);
    // const [editWorktime, setEditWorktime] = useState(worktime);
    // const [editOvertime, setEditOvertime] = useState(overtime);


    
      async function updatetime() {

        const userRef = doc(db, 'Sellers', auth.currentUser.uid);
        await updateDoc(userRef, {
          overtime: overtime,
          worktime: worktime,
        });
        setIsEditing(!isEditing);
      }

 
      // const [fishcancatch,setFishcancatch]=useState([]);
      // const [meetdemand,setMeetdemand]=useState([]);

      
      const [communities, setCommunities] = useState([]);

      

      const [isHiddencomm, setIsHiddencomm] = useState(true);

      async function fetchcommunity() {

        setIsHiddencomm(!isHiddencomm);
      
          const communitiesCollection = collection(db, 'communities');
          const communitiesSnapshot = await getDocs(communitiesCollection);
          const communitiesList = communitiesSnapshot.docs.map(doc => doc.data());
          setCommunities(communitiesList);
      
      }


  

      async function community() {
        const userRef = doc(db, 'Sellers', auth.currentUser.uid);
        await updateDoc(userRef, {
          community: sellercommunity,
        });
      }
    

  

    const [sellerFish, setSellerFish] = useState([]);
    const [fishDemand, setFishDemand] = useState([]);
    const [allFish, setAllFish] = useState([]);
    const [selectedFish, setSelectedFish] = useState([]);
 

    const [editdemand,seteditdemand]=useState(false);

      function savedemand(){
          seteditdemand(!editdemand);

      }

      async function fetchallFish() {
        const fishCollection = collection(db, 'fish_data');
        const fishSnapshot = await getDocs(fishCollection);
        const fishList = fishSnapshot.docs.map(doc => doc.data());
        setAllFish(fishList);
        console.log(allFish);
      }

      const addFishToSeller = async () => {
        
        setSellerFish(prevSellerFish => [...prevSellerFish, selectedFish]);
        
      };

      const updatefishcancatch = async () => {
        const sellerRef = doc(db, 'Sellers', auth.currentUser.uid);
        await updateDoc(sellerRef, {
          fishcancatch: arrayUnion(selectedFish), 
        });

      }
      const scheduleapi="https://samplefauna.onrender.com/schedule/?community_data=";
      const [schedule, setSchedule] = useState([]);
      const [isLoading, setIsLoading] = useState(false);
      
      function scheduledetails(community) {
        const fetchData = async () => {
          setIsLoading(true);
          try {
            const response = await fetch(`${scheduleapi}${community}`);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const json = await response.json();
            setSchedule(json.schedule);
          } catch (error) {
            console.error('There was an error!', error);
          } finally {
            setIsLoading(false);
          }
        };
        fetchData();
      }

      const handleInputSubmit = async (communityName, fishName, amount) => {
        // Query the fishcaught collection to find the community document
        const fishCaughtRef = collection(db, 'fishcaught');
        const q = query(fishCaughtRef, where('community_name', '==', communityName));
        const querySnapshot = await getDocs(q);
      
        // If a matching document is found
        if (!querySnapshot.empty) {
          const communityDoc = querySnapshot.docs[0];
          const community = communityDoc.data();
      
          // Find the index of the fish name
          const fishIndex = community.fish_name.indexOf(fishName);
      
          if (fishIndex !== -1) {
            // Add the amount to the amount_caught at the corresponding index
            amount=Number(amount);
            community.amount_caught[fishIndex] += amount;
      
            // Update the amount_caught array in the community document
            await updateDoc(communityDoc.ref, { amount_caught: community.amount_caught });
            alert("update done");
          }
        }
      };

      
    
      
      



    return (
        <div className='bg-[#FFE4C9] rounded-lg h-full w-[1260px]   flex flex-col'>
 
          <div className='flex flex-row gap-2 ml-2 ml-auto mt-2'>
            <img src={refreshicon} className='h-[35px] w-[35px]'></img>
            <button className=" border-2 bg-[#BED1CF] rounded-[100px] h-[40px] w-[230px]" onClick={()=>checklogin()}>Click to Update details</button>
            
          </div>

            <br/>
            <div>
                <h1 className='border-2 bg-[#BED1CF] w-[20%] h-[10%] rounded-[200px] ml-2 text-center'>Name : {sellername}</h1>
                <br/>
                <div >
                  <div className='flex flex-row gap-2'> 
                  <h1 className='  gap-2 border-2 bg-[#BED1CF] w-[19%] h-[10%] rounded-[200px] ml-2 text-center'>Your Community  : {sellercommunity}</h1>
                  <button className='border-2 bg-[#E78895] w-[15%] h-[10%] rounded-[200px] ml-2 text-center' onClick={()=>fetchcommunity()}>Load community</button>
                  </div>
                  <br/>
                  <div className={`${isHiddencomm ? 'hidden' : ''} ml-5 flex flex-row gap-3`} >
                  <select onChange={(e)=>setSellerCommunity(e.target.value)} className='bg-[#FFF7F1] h-[15%] w-[17%] text-center rounded-lg'>
                    {communities.map((community, index) => (
                      <option  key={index} value={community.community_name}>
                        {community.community_name}
                      </option>
                    ))}
                  </select>
              
                  <button className='bg-[#FFF7F1] h-[15%] w-[10%] text-center rounded-lg' onClick={()=>community()}>Join</button>
                  </div>
                </div>

                <br/>
                {/* <div>
                <h1>working and overtime</h1>
                  {isEditing ? (
                      <div>
                        <input type="number" value={worktime} onChange={(e) => setWorktime(e.target.value)} />
                        <input type="number" value={overtime} onChange={(e) => setOvertime(e.target.value)} />
                        <button className='border-2 bg-[#FFF7F1]' onClick={()=>updatetime()}>Save</button>
                      </div>
                    ) : (
                      <div>
                        <p>{worktime}</p>
                        <p>{overtime}</p>
                        <button className='border-2' onClick={() => setIsEditing(true)}>Edit</button>
                      </div>
                    )}
               </div> */}

                <br/>

                <div className='flex flex-row gap-[500px]'>
                      <div className='flex flex-col items-center ml-10  gap-6'>
                          <h1 className='text-2xl '>
                            Your Schedule
                          </h1>
                        
                          <div>
                          <button onClick={() => scheduledetails(sellercommunity)} className="  bg-[#E78895] rounded-lg h-[30px] w-[200px]">Get Schedule</button>
                <div>
                  {isLoading ? (
                    <div style={{
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      zIndex: 9999,
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                      <img src={profilegif} alt="Loading..." />
                    </div>
                  ) : (
                    <div >
                      <br/>
                      <ul className='flex flex-col gap-5 items-center justify-center'>
                        {Object.entries(schedule).map(([fish, gear]) => (
                          <li key={fish} className='bg-[#BED1CF] w-[250px] h-[200px] rounded-lg items-center justify-center text-center mt-2 mb-2 flex flex-col gap-2'>
                            <p>Fish name : {fish}</p>
                            <p>Gear : {gear}</p>
                            <input className="border-2 w-[150px]  rounded-lg bg-[#FFF7F1]"  type="number" min="0" id="amount-input" />
                            <button className="  border-2 rounded-lg bg-[#FFF7F1] rounded-lg h-[30px] w-[135px]" onClick={() => handleInputSubmit(sellercommunity, fish, document.getElementById(`amount-input`).value)}>Submit</button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                          </div>
                      </div>
                      
  <div className=' w-[500px] flex flex-col gap-5 mb-5'>
    <h1 className='text-2xl '>Fishes you can catch</h1>
    <div>
    <div>
      
      



<br/>
                    
<div style={{ display: 'flex', justifyContent: 'space-between' }}>
  <div>
    {/* Content of the first column */}
    <div className='bg-[#D9D9D9] w-[200px] rounded-lg flex flex-col items-center text-center mt-5 mr-6'>
      <br></br>
      <h1 className=' text-2xl'>Your Fishes</h1>
      <br></br>
      {sellerFish.length === 0 ? (
        <h1>None</h1>
      ) : (
        <div>
          {sellerFish.map((fish, index) => (
            <div key={index}>
              <p>{fish}</p>
            </div>
          ))}
        </div>
      )}
      <br/>
      <button className='h-[30px] w-[160px] rounded-lg bg-[#E78895]' onClick={()=>updatefishcancatch()}>Update Now</button>
    <br></br>
    </div>
  </div>
  <div className='border-4 rounded-lg bg-[#D9D9D9] border-[#D9D9D9] ml-[1%] h-[100%] w-[50%] mt-5' style={{ marginLeft: '20px' }}>
  {/* Content of the second column */}
  <br/>
  <button className='h-[30px] w-[240px] rounded-lg bg-[#E78895]' onClick={()=>fetchallFish()}>Show Fishes</button>
  <br/>
  <br/>
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
  {allFish.length===0 ? (
    <div></div>
  ) : (
    <select onChange={(e) => setSelectedFish(e.target.value)} className='rounded-lg' style={{ marginRight: '20px' }}>
      {allFish.filter(fish => !sellerFish.includes(fish.name)).map((fish, index) => (
        <option key={index} value={fish.name}>
          {fish.name}
        </option>
      ))}
    </select>
  )}
  <button onClick={addFishToSeller} className='border h-[30px] w-[120px] rounded-lg bg-[#ffffff]'>Add to Fishes</button>
</div>
  <br/>
  </div>
</div>
                       
                  
                
              </div>
                        </div>
                      </div>


                </div>
                
           
                
                <br/>
                <br/>

                

                

                
            

           
        </div>
        </div>
    )
}


export default Sellerprofile;