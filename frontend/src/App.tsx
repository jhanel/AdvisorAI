// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './pages/LoginPage.tsx';
import { Route, Routes, Link } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage.tsx';
import DashboardPage from './pages/DashboardPage.tsx';
import ClassInputPage from './pages/ClassInputPage.tsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.tsx';
import HomePage from './pages/HomePage.tsx'
import VerifyEmailPage from './pages/VerifyEmailPage.tsx';
import ResetPasswordPage from './pages/ResetPasswordPage.tsx';

function App() {
  return (
    <div className="App">
      <nav className = "navBar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><a href="https://github.com/jhanel/AdvisorAI">Github</a></li>
        <li><Link to= "/login">Logout</Link></li>
      </ul>
      </nav>
      <div className ="logo-place">
        <img src="/advisorLogo.png" alt="Logo" className = "logo"></img>
      </div>
      <h1>Advisor AI</h1>
      <h2>_______</h2>
      <br/><br/>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/register' element={<RegisterPage />}/>
        <Route path='/dashboard' element={<DashboardPage />}/>
        <Route path='/input' element={<ClassInputPage />} />
        <Route path="/passwordreset" element={<ForgotPasswordPage />} />
        <Route path="/reset" element={<ResetPasswordPage />} />
        <Route path="/verify" element={<VerifyEmailPage />} />
        <Route path="/verifyemail" element={<VerifyEmailPage />} />
      </Routes>
    </div>
  );
}

export default App
