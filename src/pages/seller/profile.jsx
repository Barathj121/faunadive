
import React, { useState, useEffect } from 'react';
import { collection, addDoc,getDocs,getDoc, query, where, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { auth,db } from '../../config';
import {onAuthStateChanged} from "firebase/auth";






  
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
        <div>
            <h1>sellerprofile</h1>

            <br/>
            <br/>
            
            <button className=" border-2" onClick={()=>checklogin()}>checklogin</button>
            <br/>
            <div>
                <h1>name is {sellername||"sampleanme"}</h1>
                <br/>
                <div>
                  <h1>Community you are part of : {sellercommunity||"Not part of any"}</h1>
                  <button className='border-2' onClick={()=>fetchcommunity()}>show community</button>
                  <br/>
                  <div className={`${isHiddencomm ? 'hidden' : ''}`}>
                  <select onChange={(e)=>setSellerCommunity(e.target.value)}>
                    {communities.map((community, index) => (
                      <option  key={index} value={community.community_name}>
                        {community.community_name}
                      </option>
                    ))}
                  </select>
              
                  <button className='border-2' onClick={()=>community()}>Join</button>
                  </div>
                </div>

                <br/>
                <br/>
                <button onClick={() => scheduledetails(sellercommunity)} className=" border-2 ">Get Schedule</button>
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
                      <img src="./loading.gif" alt="Loading..." />
                    </div>
                  ) : (
                    <div>
                      <h2>Schedule</h2>
                      <ul className='flex flex-col gap-5'>
                        {Object.entries(schedule).map(([fish, gear]) => (
                          <li key={fish}>
                            <p>Fish name : {fish}</p>
                            <p>Gear : {gear}</p>
                            <input className="border-2" type="number" min="0" id="amount-input" />
                            <button className="border-2" onClick={() => handleInputSubmit(sellercommunity, fish, document.getElementById(`amount-input`).value)}>Submit</button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <br/>
                <br/>
            

              

               <div>
                <h1>working and overtime</h1>
                  {isEditing ? (
                      <div>
                        <input type="number" value={worktime} onChange={(e) => setWorktime(e.target.value)} />
                        <input type="number" value={overtime} onChange={(e) => setOvertime(e.target.value)} />
                        <button className='border-2' onClick={()=>updatetime()}>Save</button>
                      </div>
                    ) : (
                      <div>
                        <p>{worktime}</p>
                        <p>{overtime}</p>
                        <button className='border-2' onClick={() => setIsEditing(true)}>Edit</button>
                      </div>
                    )}
               </div>

              <br/>
              <br/>
              <div>
                <h1>Fishes you can catch</h1>
                <button  className='border-2' onClick={()=>fetchallFish()}>show fishes</button>
                
              

                  <br/>
                    <br/>
                    <br/>

                    <div>
                    <h1>Your fishes</h1>
                    {sellerFish.length===0 ?(
                      <h1>None</h1>
                    ):
                    (
                      <div>
                      {sellerFish.map((fish, index) => (
                        <div key={index}>
                          <p>{fish}</p>
                          
                        </div>
                      ))}
                      </div>
                    )
                  
                  }
                    <br/>
                    <button className='border-2' onClick={()=>updatefishcancatch()}>Update Now</button>
                  </div>

                  <h1>New fishes to add</h1>
                    {allFish.length===0 ? (
                      <div></div>
                    ):
                    (
                      <select onChange={(e) => setSelectedFish(e.target.value)}>
                      {allFish.filter(fish => !sellerFish.includes(fish.name)).map((fish, index) => (
                        <option key={index} value={fish.name}>
                          {fish.name}
                        </option>
                      ))}
                    </select>

                    )
                    }

                  
                  <br/>
                  <p>{selectedFish}</p>
                  <button onClick={addFishToSeller} className='border-2'>Add Fish to Seller</button>
                
              </div>
                
                <br/>
                <br/>

                

                

                
            

           
        </div>
        </div>
    )
}


export default Sellerprofile;