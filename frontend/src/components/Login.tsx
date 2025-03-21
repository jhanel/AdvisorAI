import React, { useState } from 'react';
import { Link } from 'react-router-dom';
//require('dotenv').config({ path: './.env' });

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

function Login()
{
    const [message,setMessage] = useState('');
    const [loginName,setLoginName] = React.useState('');
    const [loginPassword,setPassword] = React.useState('');

    function handleSetLoginName( e: any ) : void{
        setLoginName( e.target.value );
    }

    function handleSetPassword( e: any ) : void{
        setPassword( e.target.value );
    }

    async function doLogin(event:any) : Promise<void>{
        event.preventDefault();

        var obj = {email:loginName, password:loginPassword};
        var js = JSON.stringify(obj);

        try{
            const response = await fetch(buildPath('api/schedule/login'),
                {method:'POST',body:js,headers:{'Content-Type':
                'application/json'}});
            // const response = await fetch('http://localhost:5002/api/schedule/login',
            //     {method:'POST', body:js, headers:{'Content-Type': 'application/json'}
            //     });
            var res = JSON.parse(await response.text());

            if( res.id <= 0 ){
                setMessage('User/Password combination incorrect');
            }else{
                var user =
                {firstName:res.firstname, lastName:res.lastname, id:res.id};
                localStorage.setItem('user_data', JSON.stringify(user));
                setMessage('');
                window.location.href = '/dashboard';
            }
        } catch(error:any){
            alert(error.toString());
            return;
        }
    };

    return(
        <div id="loginDiv">
            <span id="inner-title">PLEASE LOG IN</span><br />
            <input type="text" id="loginName" placeholder="Email" onChange={handleSetLoginName}/><br />
            <input type="password" id="loginPassword" placeholder="Password" onChange={handleSetPassword} /><br />
            <input type="submit" id="loginButton" className="buttons" value = "Do It"
                onClick={doLogin} />
            <span id="loginResult">{message}</span>
            <br></br>
            <span>Don't have an account ?
                <Link to = "/register">Register</Link>
            </span>
        </div>
        
    );
};

export default Login;