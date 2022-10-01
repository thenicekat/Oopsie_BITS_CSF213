import './App.css';
import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Login from './Pages/Login';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Navbar from './Components/Navbar';
import Shopping from './Pages/Shopping';
import data from './data'
import { useState } from 'react';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
      </div>
      
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
