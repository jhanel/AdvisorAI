import './App.css';
import { Route, Routes, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import DashboardPage from './pages/DashboardPage.tsx';
import ClassInputPage from './pages/ClassInputPage.tsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.tsx';
import ResetPasswordPage from './pages/ResetPasswordPage.tsx';
import HomePage from './pages/HomePage.tsx';
import VerifyEmailPage from './pages/VerifyEmailPage.tsx';

function App() {
  return (
    <div className="App">
      {/* Navigation Bar (no buttons, just links) */}
      <nav className="navBar">
        <ul>
          <li>
            <Link to="/" className="nav-button">Home</Link>
          </li>
          <li>
            <a href="https://github.com/jhanel/AdvisorAI" target="_blank" rel="noopener noreferrer" className="nav-button">
              GitHub
            </a>
          </li>
          <li>
            <Link to="/dashboard" className="nav-button">Dashboard</Link>
          </li>
        </ul>
      </nav>

      {/* Logo */}
      <div className="logo-place">
        <img src="/public/advisorLogo.png" alt="Logo" className="logo" />
      </div>

      {/* Header */}
      <h1>Advisor AI</h1>
      <h2>_______</h2>
      <br /><br />

      {/* Routes */}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/input' element={<ClassInputPage />} />
        <Route path="/forgot" element={<ForgotPasswordPage />} />
        <Route path="/reset" element={<ResetPasswordPage />} />
        <Route path="/verify" element={<VerifyEmailPage />} />
        <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
        <Route path="/verifyemail" element={<VerifyEmailPage />} />
      </Routes>
    </div>
  );
}

export default App;
