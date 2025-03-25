import React from 'react';
import { useNavigate } from 'react-router-dom';

type LogoutButtonProps = {
  styleOverride?: React.CSSProperties;
};

const LogoutButton = ({ styleOverride = {} }: LogoutButtonProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/'); // ✅ navigate to login page
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        position: 'absolute',
        top: '30px',
        right: '30px',
        backgroundColor: '#ff4d4f',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: 'bold',
        boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
        ...styleOverride
      }}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
