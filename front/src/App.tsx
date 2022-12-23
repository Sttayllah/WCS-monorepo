import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Logo from './assets/logo-removebg-preview.png';
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import { UserScreen } from './pages/UserScreen';
import './App.css';

import Header from './layout/Header';
import Footer from './layout/Footer';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/userzzz" element={<UserScreen />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
