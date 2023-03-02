import { useApolloClient } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo-removebg-preview.png';
import { useUser } from '../contexts/UserContext';
import { User } from '../model/models';

function Header() {
  const { user } = useUser();
  const { resetStore } = useApolloClient();
  const { setLocalUser } = useUser();
  const navigate = useNavigate();

  const logout = () => {
    resetStore();
    localStorage.removeItem('token');
    setLocalUser({} as User);
    navigate('/');
  };
  return (
    <header className="header-wrapper">
      <div>
        <Link to={`/`}>
          <img src={Logo} alt="logo" className="h-14 cursor-pointer" />
        </Link>
      </div>
      <div className="header-btn-wrapper">
        {user.pseudo && (
          <>
            <Link to={`/userzzz`}>
              <button className="header-how">Profile</button>
            </Link>
            <button onClick={() => logout()} className="header-signup">
              Logout
            </button>
          </>
        )}
        {!user.pseudo && (
          <>
            <Link to={`/login`}>
              <button className="header-login">Log In</button>
            </Link>
            <Link to={`/registration`}>
              <button className="header-signup">Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
