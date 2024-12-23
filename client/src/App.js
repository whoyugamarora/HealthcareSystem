import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Map from "./Pages/Map/map";
import AddLocation from "./Pages/AddLocation/AddLocation";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import firebase from "./Components/Authentication/firebase";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Optionally, show a spinner or loading indicator
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/dashboard' element ={user ? <Dashboard user={user} /> : <Login/> } />
          <Route path="/map" element={<Map user={user} />} />
          <Route path="/addlocation" element={<AddLocation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
