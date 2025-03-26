import { Link } from 'react-router-dom';
import React, { useState } from 'react';

const app_name = 'studentadvisorai.xyz';

function buildPath(route: string): string {
  if (process.env.NODE_ENV !== 'development') {
    return 'http://' + app_name + ':5002/' + route;
  } else {
    return 'http://localhost:5002/' + route;
  }
}

function Register() {
  const [message, setMessage] = useState('');
  const [registerFirstName, setRegisterFirstName] = useState('');
  const [registerLasttName, setRegisterLasttName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  function handleSetRegisterFirstName(e: any): void {
    setRegisterFirstName(e.target.value);
  }

  function handleSetRegisterLastName(e: any): void {
    setRegisterLasttName(e.target.value);
  }

  function handleSetRegisterEmail(e: any): void {
    setRegisterEmail(e.target.value);
  }

  function handleSetRegisterPassword(e: any): void {
    setRegisterPassword(e.target.value);
  }

  async function doRegister(event: any): Promise<void> {
    event.preventDefault();

    const obj = {
      firstname: registerFirstName,
      lastName: registerLasttName,
      email: registerEmail,
      password: registerPassword,
    };
    const js = JSON.stringify(obj);

    try {
      const response = await fetch(buildPath('api/schedule/register'), {
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
          lastName: res.lName,
          id: res.id,
          email: res.email,
          password: res.password,
        };
        localStorage.setItem('user_data', JSON.stringify(user));
        setMessage('');
        window.location.href = '/';
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
        <h1 style={{ textShadow: '1px 1px 4px black', marginBottom: '10px' }}>
          Advisor AI
        </h1>

        <span
          id="inner-title"
          style={{
            textShadow: '1px 1px 4px black',
            display: 'block',
            marginBottom: '10px',
          }}
        >
          PLEASE SIGN UP
        </span>

        <input
          type="text"
          id="registerFName"
          placeholder="First Name"
          onChange={handleSetRegisterFirstName}
          style={{
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '5px',
            width: '250px',
          }}
        /><br />

        <input
          type="text"
          id="registerLName"
          placeholder="Last Name"
          onChange={handleSetRegisterLastName}
          style={{
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '5px',
            width: '250px',
          }}
        /><br />

        <input
          type="text"
          id="registerEmail"
          placeholder="Email"
          onChange={handleSetRegisterEmail}
          style={{
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '5px',
            width: '250px',
          }}
        /><br />

        <input
          type="password"
          id="registerPassword"
          placeholder="Password"
          onChange={handleSetRegisterPassword}
          style={{
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '5px',
            width: '250px',
          }}
        /><br />

        <input
          type="submit"
          id="registerButton"
          className="buttons"
          value="Do It"
          onClick={doRegister}
          style={{
            padding: '10px 20px',
            cursor: 'pointer',
            borderRadius: '6px',
            marginBottom: '10px',
          }}
        />

        <span
          id="registerResult"
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
          Already have an account?{' '}
          <Link to="/" style={{ color: '#00aaff' }}>
            Login
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Register;
