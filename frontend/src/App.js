import './App.css';
import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import { useState, useRef, useEffect } from 'react';

import Login from './Pages/User/Login';
import Home from './Pages/Home';
import Register from './Pages/User/Register';
import Navbar from './Components/Navbar';
import Shopping from './Pages/User/Shopping';
import Cart from './Pages/Cart';
import Wallet from './Pages/Wallet';
import Inventory from './Pages/Inventory';

import data from './data/data'
import ManagerLogin from './Pages/Manager/ManagerLogin';
import AdminLogin from './Pages/Admin/AdminLogin';
import Managers from './Pages/Admin/Managers';
import AddProduct from './Pages/AddProduct';

function App() {
  return (
    <Router>
      <div className='justify-center items-center text-center align-middle bg-gray-900'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/managerLogin" element={<ManagerLogin />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/managers" element={<Managers />} />
          <Route path="/register" element={<Register />} />
          <Route path="/shopping" element={<Shopping data={data} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/inventory" element={<Inventory data={data} />} />
          <Route path="/addproduct" element={<AddProduct />} />
        </Routes>
      </div>

    </Router>
  );
}

export default App;
