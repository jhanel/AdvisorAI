import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const app_name = 'studentadvisorai.xyz';

function buildPath(route: string): string {
  if (process.env.NODE_ENV !== 'development') {
    return 'http://' + app_name + ':5002/' + route;
  } else {
    return 'http://localhost:5002/' + route;
  }
}

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: any) {
    e.preventDefault();

    const obj = { email };
    const js = JSON.stringify(obj);

    try {
      const response = await fetch(buildPath('api/schedule/forgot-password'), {
        method: 'POST',
        body: js,
        headers: { 'Content-Type': 'application/json' },
      });

      const res = JSON.parse(await response.text());

      if (res.success) {
        setMessage('📬 Password reset instructions sent to your email.');
      } else {
        setMessage('❌ Unable to process request. Try again.');
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

        <span style={{ textShadow: '1px 1px 4px black', display: 'block', marginBottom: '15px' }}>
          Forgot Your Password?
        </span>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '5px',
            width: '250px',
          }}
        /><br />

        <input
          type="submit"
          value="Send Reset Link"
          onClick={handleSubmit}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            marginBottom: '10px'
          }}
        />

        <span style={{ display: 'block', marginTop: '10px', textShadow: '1px 1px 4px black' }}>
          {message}
        </span>

        <br />

        <span style={{ textShadow: '1px 1px 4px black' }}>
          Return to <Link to="/" style={{ color: '#00aaff',textDecoration: 'underline' }}>Login</Link>
        </span>
      </div>
    </div>
  );
}

export default ForgotPassword;