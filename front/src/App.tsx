import { BrowserRouter as Router, Route, Routes, Link  } from 'react-router-dom';
import Logo from './assets/logo-removebg-preview.png';
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import { UserScreen } from './pages/UserScreen';
import './App.css';
import { BsGoogle } from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa';
import { FiTwitter } from 'react-icons/fi';

function App() {
  return (
    <div className="App">
      <Router>
        <header className="header-wrapper">
          <div className="img-header">
            <Link to={`/`}><img src={Logo} alt="logo" /></Link>
          </div>
          <div className="header-btn-wrapper">
            <Link to={`/userzzz`}><button className="header-how">Profile</button></Link>
            <Link to={`/login`}><button className="header-login">Log In</button></Link>
            <Link to={`/registration`}><button className="header-signup">Sign Up</button></Link>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/userzzz" element={<UserScreen />} />
        </Routes>
        <footer className="footer-wrapper">
          <div className="footer-logo-wrapper">
            <div className="footer-icon-google"><BsGoogle /></div>
            <div className="footer-icon-facebook"><FaFacebookF /></div>
            <div className="footer-icon-twitter"><FiTwitter /></div>
          </div>
          <div className="footer-btn-wrapper">
            <button className="footer-home">Home</button>
            <button className="footer-services">Services</button>
            <button className="footer-about">About</button>
            <button className="footer-terms">Terms</button>
            <button className="footer-privacy">Privacy Policy</button>
          </div>
          <div className="footer-company-wrapper">
            <p>YeahBuddy © 2022</p>
          </div>
        </footer>
      </Router>
    </div>
  );
}

export default App;
