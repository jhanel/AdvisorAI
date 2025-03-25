// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './pages/LoginPage.tsx';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage.tsx';
import DashboardPage from './pages/DashboardPage.tsx';
import CalendarPage from './pages/CalendarPage.tsx';


function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />}/>
        <Route path='/dashboard' element={<DashboardPage />}/>
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
    </div>
  );
}

export default App
