import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import "./LoginCSS.css";
import FallingLeaves from "./FallingLeaves";

const app_name = 'studentadvisorai.xyz';

function buildPath(route: string): string {
  if (process.env.NODE_ENV !== 'development') {
    return 'http://' + app_name + ':5002/' + route;
  } else {
    return 'http://localhost:5002/' + route;
  }
}

function ResetPassword() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: any) {
    e.preventDefault();

    if (!token) {
      setMessage('❌ Invalid or missing token.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('❌ Passwords do not match.');
      return;
    }

    const obj = { token, newPassword };
    const js = JSON.stringify(obj);

    try {
      const response = await fetch(buildPath('api/schedule/resetpassword'), {
        method: 'POST',
        body: js,
        headers: { 'Content-Type': 'application/json' },
      });

      const res = await response.json();

      if (res.success) {
        setMessage('✅ Password updated successfully!');
      } else {
        setMessage('❌ Failed to reset password. Try again.');
      }
    } catch (error: any) {
      setMessage('⚠️ Could not reach server.');
      console.error(error);
    }
  }

  return (
    <div id="loginDiv" className="loginBox">
      <div className="background"></div>
      <FallingLeaves />

      <h2 id="inner-title" className="title">Reset Your Password</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="input-container"
        /><br />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="input-container"
        /><br />

        <input
          type="submit"
          value="Update Password"
          className="custom-button"
        />
      </form>

      <h3 id="loginResult">{message}</h3>

      <h3>Back to login?<br />
        <Link to="/login">
          <button className="custom-button">Login</button>
        </Link>
      </h3>
    </div>
  );
}

export default ResetPassword;