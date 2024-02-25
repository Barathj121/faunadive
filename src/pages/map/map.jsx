import React, { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import FishIcon from './Fish_trap.png';
import Header_map from '../../components/header_map';
import './map_advauth.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import {icon} from 'leaflet';
import {db} from '../../config';
import { collection, getDocs } from 'firebase/firestore';

const MapComponent = () => {
  const [searchValue, setSearchValue] = useState('');
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [shiplocations, setshipLocations] = useState([]);

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [shiploc, setShiploc] = useState([]);
  const [borderalert,setborderalert]=useState(0);

  
  const fetchLocations = async () => {
    const locationsCol = collection(db, "buoys");
    const locationsSnapshot = await getDocs(locationsCol);
    const locationsList = locationsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      coordinates: [doc.data().location.lat, doc.data().location.lon]
    }));
    const shipscol = collection(db, "ships");
    const shipsnap = await getDocs(shipscol);
    const shiplist = shipsnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      coordinates: [doc.data().location.lat, doc.data().location.lon]
    }));
    console.log(shiplist);
    setshipLocations(shiplist);
     
    setLocations(locationsList);
            const filtered = locationsList.filter((location) =>
                location.fish.toLowerCase().includes(searchValue.toLowerCase())
            );
            setFilteredLocations(filtered);


          
    }
    const handleShipClick = (ship) => {
      console.log(ship.alert.status);
      if (ship.alert.status === 1) { 
        window.alert('Alert You are nearing the border from buoy_id : '+ ship.alert.buoy_id); 
      }

    }

    
      const handleSearch = (event) => {
        const { value } = event.target;
        setSearchValue(value);
    
        const filtered = locations.filter((location) =>
          location.fish.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredLocations(filtered);
      };

  const customIcon = L.icon({
    iconUrl: FishIcon,
    iconSize: [50, 50]
  });

  return (
    <div>
      <Header_map getloc={fetchLocations} />
      <MapContainer center={[latitude, longitude]} zoom={5}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredLocations.map((location, index) => (
        <Marker key={location.id} icon={customIcon} position={location.coordinates}>
            <Popup>
            ID: {location.id} <br />
            Fish: {location.fish}
            </Popup>
        </Marker>
        ))}
         {shiplocations.map((ship, index) => (
        <Marker  key={ship.id} position={ship.coordinates}  eventHandlers={{click: ()=>{handleShipClick(ship)}}}>
            <Popup>
            ID: {ship.id} <br />
            Fish: {ship.alert.status}
            </Popup>
        </Marker>
        
        ))}
      </MapContainer>
      <input type="text" className='w-full ' value={searchValue} onChange={handleSearch} placeholder="Search..." />
    </div>
  );
};

export default MapComponent;