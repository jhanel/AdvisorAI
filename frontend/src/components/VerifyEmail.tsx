import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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

function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const [message, setMessage] = useState('Verifying email...');

  useEffect(() => {
    async function verifyToken() {
      if (!token) {
        setMessage('❌ Invalid or missing token.');
        return;
      }

      try {
        const response = await fetch(buildPath('api/schedule/verifyemail'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        const res = await response.json();

        if (response.ok && res.success) {
          setMessage('✅ Email successfully verified! Redirecting to login...');
          setTimeout(() => navigate('/login'), 3000);
        } else {
          setMessage('❌ Verification failed. Please try again.');
        }
      } catch (error) {
        setMessage('⚠️ Could not reach server.');
        console.error(error);
      }
    }

    verifyToken();
  }, [token, navigate]);

  return (
    <div>
      <div className="background"></div>
      <FallingLeaves />

      {/* Styled Box */}
      <div className="loginBox">
        <h2 className="title">Email Verification</h2>
        <p style={{ marginTop: '20px', textShadow: '1px 1px 4px black' }}>{message}</p>
      </div>
    </div>
  );
}

export default VerifyEmail;