import React,{useState,useEffect} from "react";
import { collection, addDoc,getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import { auth,db } from "../../config";
import {onAuthStateChanged} from "firebase/auth";


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
            <h1>Buyer Home</h1>
            <br/>
            <br/>
            <div>
                <button onClick={toggleadd} className=" border-2 ">Add offer</button>
                <div id="addoffer" name="add offer page" className={`${isHidden ? 'hidden' : ''}`}>
                    <form >
                        <input  onChange={(e) => setFishName(e.target.value)} type="text" placeholder="Enter fish name" />
                        <input  onChange={(e) => setQuantity(e.target.value)} type="text" placeholder="Enter quantity" />
                        <input  onChange={(e) => setPrice(e.target.value)} type="text" placeholder="Enter price" />
                        
                        <div name="view sellers" className="hidden">
                            <h2>look for available sellers of the fish type</h2>
                            <div>
                                
                            </div>
                        </div>
                        <button  onClick={addOffer} className="border-2" >Submit</button>    
                        
                    </form>                    
                    
                </div>

                <br>
                </br>
                <br>
                </br>
                <br/>
                <div>
                    <h2 className="">edit/update your offers</h2>
                    <br></br>
                    <button className="border-2" onClick={fetchMyOffers}>
                        update my offers
                    </button>
                   <div className="flex flex-wrap  h-full w-full border-2 gap-2" >
                   {myOffers.map((offer) => (
                <div key={offer.id} className="flex-wrap flex-col">
                    {editOfferId === offer.id ? (
                    <div className="flex-col flex-wrap">
                        <form onSubmit={handleUpdateOffer} >
                        <input type="text" value={editFishName} className="border-2" onChange={(e) => setEditFishName(e.target.value)} />
                        <br/>
                        <input type="text" value={editQuantity} className="border-2" onChange={(e) => setEditQuantity(e.target.value)} /><br/>
                        <input type="text" value={editPrice} className="border-2" onChange={(e) => setEditPrice(e.target.value)} /><br/>
                        <select  onChange={(e)=>setstatus(e.target.value)} >
                            <option value="open">Open</option>
                            <option value="closed">Closed</option>

                        </select><br></br>
                        <button className="border-2 " type="submit">Update</button>
                    </form>
                    </div>
                    ) : (
                    <>
                        <div className="flex-wrap flex-row">
                        <h2>{offer.buyername}</h2>
                        <h2>{offer.fishname}</h2>
                        <p>{offer.quantity}</p>
                        <p>{offer.price}</p>
                        <button  className="border-2" onClick={() => {
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
                <button className="border-2" onClick={fetchOffers}>View offers</button>
                <div name="view offers page" className="flex flex-wrap  h-full w-full border-2">

                
                { viewOffers.map((offers,index)=>(

                    
                    <div key={index} className="h-[20%] w-[10%]  border-2">
                        <h2>
                            {offers.buyername||"guest"}
                        </h2>
                        <h2>
                            {offers.fishname||"Touna fish"}
                        </h2>
                        <p>{offers.quantity||"100kg"}</p>
                        <p>{offers.price||"$100"}</p>
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




