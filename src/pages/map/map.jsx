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
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

  
        const fetchLocations = async () => {
          const locationsCol = collection(db, "buoys");
          const locationsSnapshot = await getDocs(locationsCol);
          const locationsList = locationsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            coordinates: [doc.data().location.lat, doc.data().location.lon]
          }));
          setLocations(locationsList);
          setFilteredLocations(locationsList);
          setLatitude(locationsList[0].coordinates[0]);
          setLongitude(locationsList[0].coordinates[1]);
        };
        
    

    
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
        <Marker key={location.id} position={location.coordinates}>
            <Popup>
            ID: {location.id} <br />
            Fish: {location.fish}
            </Popup>
        </Marker>
        ))}
      </MapContainer>
      <input type="text" className='w-full ' value={searchValue} onChange={handleSearch} placeholder="Search..." />
    </div>
  );
};

export default MapComponent;