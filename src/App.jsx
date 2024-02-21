"use client";
import React from 'react';
import './App.css';
import Login from './pages/login';
import BuyerHome from './pages/buyer/buyerhome';
import SellerHome from './pages/seller/sellerhome';
import Sellerprofile from './pages/seller/profile';
import MapComponent from './pages/map/map';
import Header from './components/header';
import Map_server from './pages/map/map_server';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



function App() {

  // II) market details , put a sell offer to the buyer so if buyer satisfies he can accept offer 

  // III) chatbot integration that answers regarding fishes

  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route path="/Buyers" element={<BuyerHome />} />
        <Route path="/Sellers" element={<SellerHome />} />
        <Route path="/Map" element={<MapComponent />} />
        <Route path="/Map_server" element={<Map_server />} />
        {/* <Route path="/sellerprofile" element={<Sellerprofile />}/> */}
      </Routes>
      
    </Router>
    
  );
}

export default App;
