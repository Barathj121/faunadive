import React, { useState } from 'react';
import logo from './logo.svg';

import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import locations from './location.json';
import {icon} from 'leaflet';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [filteredLocations, setFilteredLocations] = useState(locations.hotspots);
  const latitude = locations.hotspots[0].coordinates[0];
  const longitude = locations.hotspots[0].coordinates[1];

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchValue(value);

    const filtered = locations.hotspots.filter((location) =>
      location.fish.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredLocations(filtered);
  };

  const ICON = icon({
    iconUrl: './Fish_trap.png',
    iconSize: [50, 50]
  });
  

  return (
    <div>
      <MapContainer center={[latitude, longitude]} zoom={5}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredLocations.map((location, index) => (
          <Marker  key={location.fish} position={location.coordinates}>
            <Popup>{location.fish}</Popup>
          </Marker>
          
        ))}
      </MapContainer>
      <input type="text" value={searchValue} onChange={handleSearch} placeholder="Search..." />
    </div>
  );
}

export default App;
