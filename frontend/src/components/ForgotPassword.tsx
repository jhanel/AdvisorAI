import { useState } from 'react';
import { Link } from 'react-router-dom';
import FallingLeaves from './FallingLeaves';
import './LoginCSS.css';

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
      const response = await fetch(buildPath('api/schedule/passwordreset'), {
        method: 'POST',
        body: js,
        headers: { 'Content-Type': 'application/json' },
      });

      const res = await response.json();

      if (res.success) {
        setMessage('📬 Password reset instructions sent to your email.');
      } else {
        setMessage(res.error || '❌ Unable to process request. Try again.');
      }
    } catch (error: any) {
      setMessage('⚠️ Could not reach server.');
      console.error(error);
    }
  }

  return (
    <div>
      <div className="background"></div>
      <FallingLeaves />

      {/* Logo */}
      <div className="logo-place">
        <img src="/public/advisorLogo.png" alt="Logo" className="logo" />
      </div>

      {/* Nav Bar */}
      <nav className="navBar">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><a href="https://github.com/jhanel/AdvisorAI" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
        </ul>
      </nav>

      {/* Forgot Password Box */}
      <div className="loginBox">
        <h2 className="title">Forgot Your Password?</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-container"
          />
          <input
            type="submit"
            value="Send Reset Link"
            className="custom-button"
          />
        </form>

        <h3>{message}</h3>
        <br />
        <span>Return to <Link to="/login">Login</Link></span>
      </div>
    </div>
  );
}

export default ForgotPassword;
