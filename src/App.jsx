import React from 'react';
import './App.css';
import Login from './pages/login';
import BuyerHome from './pages/buyer/buyerhome';
import SellerHome from './pages/seller/sellerhome';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Buyers" element={<BuyerHome />} />
        <Route path="/Sellers" element={<SellerHome />} />
      </Routes>
    </Router>
  );
}

export default App;
