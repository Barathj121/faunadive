"use client";
import React, { useState, useEffect } from 'react';
import L, { map } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import FishIcon from './Fish_trap.png';
import Header from '../../components/header';

const MapComponent = () => {
    const [searchInput, setSearchInput] = useState('');
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [userMarker, setUserMarker] = useState(null);

    useEffect(() => {
        const mapOptions = {
            center: [13.0827, 80.2707],
            zoom: 10
        };

        const mapInstance = L.map('map', mapOptions);
        setMap(mapInstance);

        const layer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
        mapInstance.addLayer(layer);

        const customIcon = L.icon({
            iconUrl: FishIcon,
            iconSize: [50, 50]
        });

        const locations = [
            [[13.210534384132387, 80.48446655273438], ["Salmon"]],
            [[13.039345099988836, 80.518798828125], ["Tuna"]],
            [[13.095529720741494, 80.419921875], ["Shark"]],
            [[12.973780249064331, 80.44601440429686], ["Swordfish"]]
        ];

        // Clear existing markers
        markers.forEach(marker => {
            marker.removeFrom(mapInstance);
        });

        // Add new markers
        const allMarkers = locations.map(location => {
            const [coords, name] = location;
            const marker = L.marker(coords, { title: name.toString(), icon: customIcon }).bindPopup(name);
            marker.addTo(mapInstance);
            return marker;
        });

        setMarkers(allMarkers);

        mapInstance.on('click', e => {
            const newUserMarker = L.marker(e.latlng).addTo(mapInstance);
            setUserMarker(newUserMarker);
        });

        return () => {
            mapInstance.remove();
        };
    }, []);

    const filterMarkers = () => {
        const input = searchInput.toLowerCase();
        markers.forEach(marker => {
            const title = marker.options.title.toLowerCase();
            if (title.includes(input)) {
                marker.addTo(map);
            } else {
                marker.removeFrom(map);
            }
        });
    };

    const closeUserMarker = () => {
        if (userMarker) {
            userMarker.removeFrom(map);
        }
    };

    return (
        <div>
            <Header/>
            <div id="map" style={{ width: '900px', height: '580px' }}></div>
            <input
                type="text"
                id="searchBar"
                placeholder="Search by title"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />
            <button onClick={filterMarkers}>Search</button>
            <button onClick={closeUserMarker}>Close Marker</button>
        </div>
    );
};

export default MapComponent;
