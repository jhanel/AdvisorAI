import { Link } from 'react-router-dom';
import "./HomeCSS.css";
import FallingLeaves from "./FallingLeaves";

function Home(){


    return(
    <div>
        <div className = "background"></div>
        <FallingLeaves/>
        <h2>Your Blueprint for Academic Excellence</h2>
        <br/>
        <Link to = '/login'>
        <div className = "custom-button">Login</div></Link>
        <br/>
        <h3>New here? Jump straight to registration:</h3>
        <Link to = '/register'>
        <div className = "custom-button">Register</div></Link>
    </div>
    );
};

export default Home;