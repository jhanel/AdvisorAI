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

function App() {
  return (
    <div className="App">
      <nav className = "navBar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><a href="https://github.com/jhanel/AdvisorAI">Github</a></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
      </ul>
      </nav>
      <div className ="logo-place">
        <img src="/public/advisorLogo.png" alt="Logo" className = "logo"></img>
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
        <Route path="/forgot" element={<ForgotPasswordPage />} />
      </Routes>
    </div>
  );
}

export default App
