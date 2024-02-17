import React,{useState,useEffect} from "react";
import { collection, addDoc,getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import { auth,db } from "../../config";
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



    return (
        <div>
          
            <h1 className=" font-serif text-4xl mt-6 ml-5 b ">Buyer Page</h1>
            <br/>
            <br/>
            <div>
                <button onClick={toggleadd} className=" border-2  ml-7 bg-orange-600 border-black rounded-lg  text-2xl text-cyan-50 w-60 h-19">Add offer</button>
                <div id="addoffer" name="add offer page"  className={`${isHidden ? 'hidden' : ''}` }>
                    <form  className="ml-7 mt-4 font-serif  text-gray-600">
                        <input  onChange={(e) => setFishName(e.target.value)} type="text" placeholder="Enter fish name" />
                        <input  onChange={(e) => setQuantity(e.target.value)} type="text" placeholder="Enter quantity" />
                        <input  onChange={(e) => setPrice(e.target.value)} type="text" placeholder="Enter price" />
                        
                        <div name="view sellers" className="hidden">
                            <h2>look for available sellers of the fish type</h2>
                            <div>
                                
                            </div>
                        </div>
                        <button  onClick={addOffer} className="border-2 rounded-lg border-gray-400 text-black w-20" >Submit</button>    
                        
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
                    <button className="border-2 ml-7 text-2xl  bg-black rounded-lg border-black  text-stone-50 w-60 h-18" onClick={fetchMyOffers}>
                        Update my offers
                    </button>
                   <div className="flex flex-wrap  h-full w-full border-2 gap-2" >
                   {myOffers.map((offer) => (
                <div key={offer.id} className="flex-wrap flex-col">
                    {editOfferId === offer.id ? (
                    <div className="flex-col flex-wrap ">
                        <form onSubmit={handleUpdateOffer}  >
                        <input type="text" value={editFishName} className="border-2" onChange={(e) => setEditFishName(e.target.value)} />
                        <br/>
                        <input type="text" value={editQuantity} className="border-2" onChange={(e) => setEditQuantity(e.target.value)} /><br/>
                        <input type="text" value={editPrice} className="border-2" onChange={(e) => setEditPrice(e.target.value)} /><br/>
                        <select  onChange={(e)=>setstatus(e.target.value)} >
                            <option value="open">Open</option>
                            <option value="closed">Closed</option>

                        </select><br></br>
                        <button className="border-2 text-black rounded-lg border-gray-400 " type="submit">Update</button>
                    </form>
                    </div>
                    ) : (
                    <>
                        <div className="flex-wrap flex-row ml-7 mt-3 mb-3 border-2 border-black " >
                        <h2 className="ml-3 mb-3 mr-3 mt-3">{offer.buyername}</h2>
                        <h2 className="ml-3 mb-3 mr-3 mt-3">{offer.fishname}</h2>
                        <p className="ml-3 mb-3 mr-3 mt-3">{offer.quantity}</p>
                        <p className="ml-3 mb-3 mr-3 mt-3">{offer.price}</p>
                        <button  className="border-2 rounded-lg bg-yellow-300 border-black h-15 w-50" onClick={() => {
                        setEditOfferId(offer.id);
                        setEditFishName(offer.fishname);
                        setEditQuantity(offer.quantity);
                        setEditPrice(offer.price);
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
                <br></br>
                <button className="border-2 ml-7 text-2xl mt-3 mb-3 rounded-lg border-black bg-cyan-400 text-white w-60 h-19" onClick={fetchOffers}>View offers</button>
                <div name="view offers page" className="flex flex-wrap  h-full w-full border-2">

                
                { viewOffers.map((offers,index)=>(

                    
                    <div key={index} className="h-[20%] w-[10%]  border-2 bg-black text-blue-500 rounded-lg ml-3 font-mono">
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
        </div>
    )
}

export default buyerhome;




