import React, { useState, useEffect, Profiler } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Map from "./Pages/Map/map";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import AddLocation from './Pages/AddLocation/AddLocation';
import firebase from "./Components/Authentication/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Profile from "./Pages/Profile/Profile";
import Appointments from "./Pages/Appointments/appointments";
import History from "./Pages/History/History";
import BulkUpload from "./Pages/BulkUpload/BulkUpload";

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
    return <div className="min-h-screen flex items-center justify-center"><FontAwesomeIcon icon={faSpinner} className="animate-spin text-4xl text-indigo-600"/></div>; // Optionally, show a spinner or loading indicator
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/dashboard' element ={user ? <Dashboard user={user} /> : <Login/> } />
          <Route path='/profile' element ={user ? <Profile user={user} /> : <Login/> } />
          <Route path='/appointments' element ={user ? <Appointments user={user} /> : <Login/> } />
          <Route path='/history' element ={user ? <History user={user} /> : <Login/> } />
          <Route path='/bulk' element ={user ? <BulkUpload user={user} /> : <Login/> } />
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
