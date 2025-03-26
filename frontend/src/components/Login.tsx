import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const app_name = 'studentadvisorai.xyz';

function buildPath(route: string): string {
  if (process.env.NODE_ENV !== 'development') {
    return 'http://' + app_name + ':5002/' + route;
  } else {
    return 'http://localhost:5002/' + route;
  }
}

function Login() {
  const navigate = useNavigate();

  const [message, setMessage] = useState('');
  const [loginName, setLoginName] = useState('');
  const [loginPassword, setPassword] = useState('');

  function handleSetLoginName(e: any): void {
    setLoginName(e.target.value);
  }

  function handleSetPassword(e: any): void {
    setPassword(e.target.value);
  }

  async function doLogin(event: any): Promise<void> {
    event.preventDefault();

    const obj = { email: loginName, password: loginPassword };
    const js = JSON.stringify(obj);

    try {
      const response = await fetch(buildPath('api/schedule/login'), {
        method: 'POST',
        body: js,
        headers: { 'Content-Type': 'application/json' },
      });

      const res = JSON.parse(await response.text());

      if (res.id <= 0) {
        setMessage('User/Password combination incorrect');
      } else {
        const user = {
          firstName: res.firstname,
          lastName: res.lastname,
          id: res.id,
        };
        localStorage.setItem('user_data', JSON.stringify(user));
        setMessage('');
        window.location.href = '/dashboard';
      }
    } catch (error: any) {
      alert(error.toString());
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <div
        style={{
          color: 'white',
          textAlign: 'center',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          padding: '40px',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          maxWidth: '400px',
          width: '90%',
        }}
      >
        <h1 style={{ textShadow: '1px 1px 4px black', marginBottom: '10px' }}>Advisor AI</h1>

        <span
          id="inner-title"
          style={{
            textShadow: '1px 1px 4px black',
            display: 'block',
            marginBottom: '10px',
          }}
        >
          PLEASE LOG IN
        </span>

        <input
          type="text"
          id="loginName"
          placeholder="Email"
          onChange={handleSetLoginName}
          style={{
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '5px',
            width: '250px',
          }}
        /><br />

        <input
          type="password"
          id="loginPassword"
          placeholder="Password"
          onChange={handleSetPassword}
          style={{
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '5px',
            width: '250px',
          }}
        /><br />

        <input
          type="submit"
          id="loginButton"
          className="buttons"
          value="Do It"
          onClick={doLogin}
          style={{
            padding: '10px 20px',
            cursor: 'pointer',
            borderRadius: '6px',
            marginBottom: '10px',
          }}
        />

        <div>
          <button
            onClick={() => navigate('/forgot')}
            style={{
              background: 'none',
              border: 'none',
              color: '#00aaff',
              textDecoration: 'underline',
              cursor: 'pointer',
              textShadow: '1px 1px 4px black',
              marginTop: '5px',
            }}
          >
            Forgot Password?
          </button>
        </div>

        <span
          id="loginResult"
          style={{
            display: 'block',
            marginTop: '10px',
            textShadow: '1px 1px 4px black',
          }}
        >
          {message}
        </span>

        <br />

        <span style={{ textShadow: '1px 1px 4px black' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#00aaff',textDecoration: 'underline' }}>
            Register
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Login;
