"use client";
import React,{useState,useEffect} from "react";
import { collection, addDoc,getDocs,getDoc, query, where, doc, updateDoc } from "firebase/firestore";
import { auth,db } from "../../config";
import Header from "../../components/header";
import {onAuthStateChanged} from "firebase/auth";
import lohh from "../../assets/bgbb.jpg"




function buyerhome() {

// Buyer page 
// I) add demand or need edit , update , insert 
// II) look other demands (market)
// III) look for available sellers for that offer
// IV) accept offers or reject from sellers


const [Selleroffish, setSelleroffish] = useState([]);
const [viewOffers, setViewOffers] = useState([]);
const [sellers, setSellers] = useState([]);

//once logged in get the user id from the firebase auth how to check if he's logged in or not 
const id=auth.currentUser.uid;
const bname=auth.currentUser.displayName;

useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, you can get the user ID with user.uid
        console.log("User is signed in with ID: ", user.uid);
        setUserId(user.uid);
      } else {
        // User is signed out
        console.log("User is signed out");
      }
    });
  
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);


// fields to be in market table userid, fishname, quantity, price, status,sellerid



//view all the offers from table market firebase db

const fetchOffers = async () => {
    const offerscollection=collection(db,'market');
    const offersSnapshot = await getDocs(offerscollection);
    const offersList = offersSnapshot.docs.map(doc => doc.data());
    setViewOffers(offersList);


};
const [isHidden, setIsHidden] = useState(true);

const toggleadd = () => {
  setIsHidden(!isHidden);
};

// const [inputValue, setInputValue] = useState({
//     fishname: "",
//     price: "",
//     quantity: "",
    
    
   
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setInputValue((prevValues) => ({ ...prevValues, [name]: value }));
//   };
const [userid, setUserId] = useState('');
const [buyername, setBuyerName] = useState('');
const [fishname, setFishName] = useState('');
const [quantity, setQuantity] = useState('');
const [price, setPrice] = useState('');

const addOffer = async (e) => {
    e.preventDefault();
  
    const buyerid = id;
    const buyer = bname;
    const status = "open";
    
    const marketCollection = collection(db, 'market');
    
    try {
      const docRef = await addDoc(marketCollection, {
        buyerid: buyerid,
        buyername: buyer,
        fishname: fishname,
        quantity: quantity,
        price: price,
        status: status,
      });
  
      console.log("market doc added with id", docRef.id);
      
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  


//   const editOffer = async (e) => {
//   };
// const userRef = doc(db, userType, user.uid);
//       await setDoc(userRef, {
//         uid: user.uid,
//         email: user.email,
//         buyername: user.displayName,
//         // add any other user data you want to save
//       });
    
const [myOffers, setMyOffers] = useState([]);
const [editOfferId, setEditOfferId] = useState(null);
const [editFishName, setEditFishName] = useState('null');
const [editQuantity, setEditQuantity] = useState('null');
const [editPrice, setEditPrice] = useState('null');
const [editstatus,setstatus]=useState('');

const fetchMyOffers = async () => {
    const offersQuery = query(collection(db, 'market'), where('buyerid', '==', userid));
    const offersSnapshot = await getDocs(offersQuery);
    const offersList = offersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setMyOffers(offersList);
   
    console.log(communities);
    
  };

  const handleUpdateOffer = async (event) => {
    event.preventDefault();
  
    const offerRef = doc(db, 'market', editOfferId);
    await updateDoc(offerRef, {
      fishname: editFishName,
      quantity: editQuantity,
      price: editPrice,
      status: editstatus,
    });
  
    // Fetch the offers
    fetchMyOffers();
    
  
    setEditOfferId(null);
  };

  const [communities, setCommunities] = useState([]);
  const fetchCommunitiesWithFish = async (fishName) => {
    const communitiesRef = collection(db, 'fishcaught');
    const q = query(communitiesRef, where('fish_name', 'array-contains', fishName));
    const querySnapshot = await getDocs(q);
    const communitiesList = querySnapshot.docs.map(doc => doc.data());
    setCommunities(communitiesList);
    console.log(communities);
  };

  const handleBuyFish = async (community, fishName, quantity) => {
    // Subtract the quantity from the amount_caught of the fish in the community
    const fishIndex = community.fish_name.indexOf(fishName);
    if (fishIndex !== -1) {
      community.amount_caught[fishIndex] =community.amount_caught[fishIndex]- quantity;
  

  
      // Add a new document to the storage collection
      const storageCollection = collection(db, 'storage');
      await addDoc(storageCollection, {
        fishname: fishName,
        community_name: community.community_name,
        storage_amount: community.amount_caught[fishIndex],
      });
    }
  };
  const [communitiesWithStorage, setCommunitiesWithStorage] = useState([]);
  const [storagesub, setstoragesub] = useState(0);
  const fetchCommunitiesWithStorage = async (fishName) => {
    const storageRef = collection(db, 'storage');
    const q = query(storageRef, where('fishname', '==', fishName));
    const querySnapshot = await getDocs(q);
    const communitiesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setCommunitiesWithStorage(communitiesList);
    console.log(communitiesWithStorage);
  };

  const handleTakeFish = async (communityId, amount) => {
    // Subtract the amount from the storage_amount of the community
    const communityRef = doc(db, 'storage', communityId);
    const communitySnapshot = await getDoc(communityRef);
    const community = communitySnapshot.data();
  
    if (community.storage_amount >= amount) {
      community.storage_amount -= amount;
  
      // Update the community in the storage collection
      await updateDoc(communityRef, { storage_amount: community.storage_amount });
    }
  };
  


    return (
        <div className=" bg-[#FFF7F1]">
          <Header/>
          
            <h1 className=" font-serif text-4xl mt-6 ml-5 b ">Buyer Page</h1>
            <br/>
            <br/>
            <div>
            <button className=" underline decoration-4 underline-offset-8 decoration-[#E78895] ml-2 text-2xl mt-3 mb-3   text-black w-60 h-19" onClick={fetchOffers}>View offers</button>
                <div name="view offers page" className="flex flex-wrap  h-full w-full border-2">

                
                { viewOffers.map((offers,index)=>(

                    
                    <div key={index} className="h-[20%] w-[10%]  border-2 bg-[#FFE4C9] text-black rounded-lg ml-7 font-mono">
                      <br></br>
                        <h2 className="ml-3">
                            {offers.buyername||"guest"}
                        </h2>
                        <h2 className="ml-3">
                            {offers.fishname||"Touna fish"}
                        </h2>
                        <p className="ml-3">{offers.quantity||"100kg"}</p>
                        <p className="ml-3">{offers.price||"$100"}</p>
                        <br></br>
                       {/* <button onClick={viewseller(offers.price)}>View sellers for this fish</button>
                         */}

                    </div>
                    
                ))}
                </div>
            </div>
            <br></br>
            <div>
                <button onClick={toggleadd} className="  ml-1    text-2xl  text-black w-60 h-19 underline decoration-4 underline-offset-8 decoration-[#E78895]">Add offer</button>
                <div id="addoffer" name="add offer page"  className={`${isHidden ? 'hidden' : ''}` }>
                    <form  className="ml-7 mt-4 font-serif text-black  ">
                        <input  onChange={(e) => setFishName(e.target.value)} type="text" placeholder="Enter fish name" className="border-2 rounded-lg text-black bg-[#BED1CF] border-#bg-[#BED1CF]  border-[#BED1CF]" />
                        <t></t>
                        <input  onChange={(e) => setQuantity(e.target.value)} type="text" placeholder="Enter quantity" className="border-2 rounded-lg ml-8 text-black bg-[#BED1CF]  border-[#BED1CF]" />
                        <t></t>
                        <input  onChange={(e) => setPrice(e.target.value)} type="text" placeholder="Enter price"  className="border-2 rounded-lg ml-8 text-black bg-[#BED1CF]  border-[#BED1CF]"/>
                        
                        
                        <button  onClick={addOffer} className="border-2 rounded-lg  text-black w-20 ml-8 bg-[#E78895] border-[#E78895]" >Submit</button>    
                        
                    </form>                    
                    
                </div>

                <br>
                </br>
                <br>
                </br>
                <br/>
                <div>
                    <h2 className="ml-7 text-2xl">Edit/Update your offers</h2>
                    <br></br>
                    <button className=" ml-12 text-2xl underline decoration-4 underline-offset-8 decoration-[#E78895] decoration-{40}  text-black w-60 h-18" onClick={fetchMyOffers}>
                        Update my offers
                    </button>
                   <div className="flex flex-wrap  h-full w-full border-2 gap-2 " >
                   {myOffers.map((offer) => (
                <div key={offer.id} className="flex-wrap flex-col ">
                    {editOfferId === offer.id ? (
                    <div className="flex-col flex-wrap border-2 bg-[#FFE4C9] border-[#FFE4C9] rounded-lg mt-3 ml-7">
                        <form onSubmit={handleUpdateOffer}  >
                        <input type="text" value={editFishName} className="border-2 rounded-lg bg-[#BED1CF]" onChange={(e) => setEditFishName(e.target.value)} />
                        <br/>
                        <input type="text" value={editQuantity} className="border-2 rounded-lg bg-[#BED1CF]" onChange={(e) => setEditQuantity(e.target.value)} /><br/>
                        <input type="text" value={editPrice} className="border-2 rounded-lg bg-[#BED1CF]" onChange={(e) => setEditPrice(e.target.value)} /><br/>
                        <select  onChange={(e)=>setstatus(e.target.value)} className="bg-[#BED1CF] rounded-lg" >
                            <option value="open">Open</option>
                            <option value="closed">Closed</option>

                        </select><br></br>
                        <br/>
                        <div className="flex flex-row gap-8 ">
                        <div >
                          <h2>look for suggested sellers </h2>
                          <div className="border-2 rounded-lg bg-[#BED1CF]">
                            <ul className="ml-3">
                              {communities.map((community, index) => (
                                <li key={index}>
                                  {community.community_name}
                                  <br/>
                                  {community.fish_name.map((fish, index) => (
                                    fish === editFishName ? community.amount_caught[index] : null
                                  ))}
                                  <br/>
                                  <button onClick={() => handleBuyFish(community, editFishName, editQuantity)} className="border-2 bg-white text-black w-20 rounded-lg border-white">Buy</button>
                                
                                </li>

                              ))}
                            </ul>
                          </div>
                        </div>
                          <div>
                              <h1>storage to buy immediately</h1>
                              {communitiesWithStorage.map((community) => (
                                <div key={community.id} className="border-2 rounded-lg bg-[#BED1CF]" >
                                  <h2 className="ml-3">{community.community_name}</h2>
                                  <p className="ml-3">{community.storage_amount}</p>
                                  <input className="ml-3" type="number" min="0" max={community.storage_amount} defaultValue="0" id={`amount-${community.id}`} onChange={(e)=>setstoragesub(e.target.value)} />
                                  
                                  <button onClick={() => handleTakeFish(community.id, storagesub)} className=" border-2 bg-white border-white rounded-lg w-20 ml-4">Take Fish</button>
                                </div>
                              ))}

                          </div>
                        </div>
                        <br/>
                        <button className="border-2 text-black rounded-lg bg-[#E78895] border-[#E78895] w-20 ml-40" type="submit">Update</button>
                    </form>
                    </div>
                    ) : (
                    <>
                        <div className="flex-wrap flex-row ml-7 mt-3 mb-3 border-2 border-[#FFE4C9] bg-[#FFE4C9] rounded-lg" >
                        <h2 className="ml-3 mb-3 mr-3 mt-3 ">{offer.buyername}</h2>
                        <h2 className="ml-3 mb-3 mr-3 mt-3">{offer.fishname}</h2>
                        <p className="ml-3 mb-3 mr-3 mt-3">{offer.quantity}</p>
                        <p className="ml-3 mb-3 mr-3 mt-3">{offer.price}</p>
                        <button  className="border-2 rounded-lg bg-[#BED1CF] border-[#BED1CF] h-15 w-60" onClick={() => {
                        setEditOfferId(offer.id);
                        setEditFishName(offer.fishname);
                        setEditQuantity(offer.quantity);
                        setEditPrice(offer.price);
                        fetchCommunitiesWithFish(offer.fishname);
                        fetchCommunitiesWithStorage(offer.fishname);
                        }}>Edit</button>
                        <br />
                        </div>
                    </>
                    
                    )}
                </div>
                ))}
                   </div>

                </div>
                <br/>
                
                
                
            </div>
        </div>
    )
}

export default buyerhome;




