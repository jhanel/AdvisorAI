//import React, { useState } from 'react';
import { Link } from 'react-router-dom';
//require('dotenv').config({ path: './.env' });
import "./HomeCSS.css";
import FallingLeaves from "./FallingLeaves";

function Home(){


    return(
    <div>
        <div className = "background"></div>
        <FallingLeaves/>
        <h2>Your Blueprint for Academic Excellence</h2>
        <Link to = '/login'>
        <div className = "custom-button">Login</div></Link>
    </div>
    );
};

export default Home;