import { Link } from 'react-router-dom';
import React, { useState } from 'react';

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

    async function doRegister(event:any) : Promise<void>
    {
        event.preventDefault();
        var obj = {firstname:registerFirstName, lastName:registerLasttName, 
            email:registerEmail, password:registerPassword
        };
        var js = JSON.stringify(obj);

        try{

            const response = await fetch(buildPath('api/schedule/register'),
                {method:'POST',body:js,headers:{'Content-Type':
                'application/json'}});
            // const response = await fetch('http://localhost:5002/api/schedule/register',
            //     {method:'POST', body:js, headers:{'Content-Type': 'application/json'}
            //     });
            var res = JSON.parse(await response.text());

            if( res.id <= 0 ){
                setMessage('User/Password combination incorrect');
            }else{
                var user =
                {firstName:res.firstname, lastName:res.lName, id:res.id, 
                    email:res.email, password: res.password
                };
                localStorage.setItem('user_data', JSON.stringify(user));
                setMessage('');
                window.location.href = '/';
            }
            }
            catch(error:any)
            {
            alert(error.toString());
            return;
        }
    };

    return(
        <div id="registerDiv">
            <span id="inner-title">PLEASE SIGN UP</span><br />
            <input type="text" id="registerFName" placeholder="First Name" onChange={handleSetRegisterFirstName}/><br />
            <input type="text" id="registerLName" placeholder="Last Name" onChange={handleSetRegisterLastName}/><br />
            <input type="text" id="registerEmail" placeholder="Email" onChange={handleSetRegisterEmail}/><br />
            <input type="password" id="registerPassword" placeholder="Password" onChange={handleSetRegisterPassword}/><br />
            <input type="submit" id="registerButton" className="buttons" value = "Do It"
                onClick={doRegister} />
            <span id="registerResult">{message}</span>
            <br></br>
            <span>Already have an account?
                <Link to = "/"> Login</Link>
            </span>
        </div>
    );
};
export default Register;