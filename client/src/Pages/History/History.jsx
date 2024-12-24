import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import HomeNavbar from "../../Components/Navbar/HomeNavbar";

const History = ({user}) => {

    return (
        <div>
            {user ? <Navbar /> : <HomeNavbar />}

        </div>
    );
};

export default History;