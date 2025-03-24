// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './pages/LoginPage.tsx';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage.tsx';
import DashboardPage from './pages/DashboardPage.tsx';
import ClassInput from './components/ClassInput.tsx';

function App() {
  return (
    <div className="App">
      <h1>Advisor AI app</h1>
      <Routes>
        <Route path='/' element={<LoginPage />}/>
        <Route path='/register' element={<RegisterPage />}/>
        <Route path='/dashboard' element={<DashboardPage />}/>
        <Route path='/input' element={<ClassInput />} />
      </Routes>
    </div>
  );
}

export default App
