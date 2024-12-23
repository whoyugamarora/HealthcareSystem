import React, {useEffect, useState} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Components/Authentication/firebase";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";


const Dashboard = ({user}) => {

    return (
        <div>
            <Navbar />
        </div>
    );
};

export default Dashboard;