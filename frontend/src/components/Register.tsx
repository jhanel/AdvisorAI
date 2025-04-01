import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import "./LoginCSS.css";
import FallingLeaves from "./FallingLeaves";

const app_name = 'studentadvisorai.xyz';

function buildPath(route:string) : string{
    if (process.env.NODE_ENV != 'development')
    {
    return 'http://' + app_name + ':5002/' + route;
    }
    else
    {
    return 'http://localhost:5002/' + route;
    }
}

function Register()
{
    const [message,setMessage] = useState('');
    const [registerFirstName,setRegisterFirstName] = React.useState('');
    const [registerLasttName,setRegisterLasttName] = React.useState('');
    const [registerEmail,setRegisterEmail] = React.useState('');
    const [registerPassword,setRegisterPassword] = React.useState('');

    function handleSetRegisterFirstName( e: any ) : void{
        setRegisterFirstName( e.target.value );
    }

    function handleSetRegisterLastName( e: any ) : void{
        setRegisterLasttName( e.target.value );
    }

    function handleSetRegisterEmail( e: any ) : void{
        setRegisterEmail( e.target.value );
    }

    function handleSetRegisterPassword( e: any ) : void{
        setRegisterPassword( e.target.value );
    }

    async function doRegister(event: any): Promise<void> {
        event.preventDefault();
        
        var obj = {
            firstname: registerFirstName, 
            lastname: registerLasttName, 
            email: registerEmail, 
            password: registerPassword
        };
        
        var js = JSON.stringify(obj);
    
        try {
            const response = await fetch(buildPath('api/schedule/register'),
            {method:'POST',body:js,headers:{'Content-Type':
            'application/json'}});
            // const response = await fetch('http://localhost:5002/api/schedule/register', {
            //     method: 'POST',
            //     body: js,
            //     headers: { 'Content-Type': 'application/json' }
            // });
    
            var res = await response.json();
    
            if (!response.ok) {
                setMessage(res.error || 'Registration failed.');
                return;
            }

            setMessage(res.message || 'Registration success');
            // Save user data in localStorage
            var user = {
                firstName: res.firstname, 
                lastName: res.lastname, 
                id: res.userID, 
                email: res.email
            };
            localStorage.setItem('user_data', JSON.stringify(user));
    
            setMessage(res.message || 'User Registered');
            window.location.href = '/login';
    
        } catch (error: any) {
            alert('Error: ' + error.toString());
        }
    }

    return(
        <div id="registerDiv" className= "loginBox">
            <div className='background'></div>
            <FallingLeaves/>
            <h2 id="inner-title" className = "title">Enter Information to Sign-Up:</h2>
             <input type="text" className = "input-container" id="registerFName" placeholder="First Name" onChange={handleSetRegisterFirstName}/><br />
             <input type="text" className = "input-container" id="registerLName" placeholder="Last Name" onChange={handleSetRegisterLastName}/><br />
             <input type="text" className = "input-container" id="registerEmail" placeholder="Email" onChange={handleSetRegisterEmail}/><br />
             <input type="password" className = "input-container" id="registerPassword" placeholder="Password" onChange={handleSetRegisterPassword}/><br />
             <br/>
             <input type="submit" id="loginButton" className="custom-button" value = "Register"
                 onClick={doRegister} /><br />
             <span id="registerResult">{message}</span><br/>
            <br></br>
            <span>Already have an account?<br/>
                <Link to = "/login"> 
                <button className="custom-button">Login</button></Link>
            </span>
        </div>
    );
};
export default Register;