import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Dashboard from './Pages/Dashboard/Dashboard';
import Map from './Pages/Map/map';
import AddLocation from './Pages/AddLocation/AddLocation';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/map" element={<Map/>} />
          <Route path="/addlocation" element={<AddLocation />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
