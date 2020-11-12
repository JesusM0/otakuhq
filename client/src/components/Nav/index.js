import React from 'react';
import Auth from '../../utils/auth';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../imgs/otakuhq-logo.png';

function Nav() {
  const location = useLocation();
  if (Auth.loggedIn()) {
    return (
      <nav>
        <div className="logo-box">
          <img src={logo} alt="logo" className="logo" />
        </div>
        <ul className="nav">
          {location.pathname === '/saved' ? (
            <li>
              <Link to="/">Back To Home</Link>
            </li>
          ) : (
            <li>
              <Link as={Link} to="/saved">
                See Your Anime List
              </Link>
            </li>
          )}
          <li>
            <a href="/" onClick={Auth.logout}>
              Logout
            </a>
          </li>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav>
        <div className="logo-box">
          <img src={logo} alt="logo" className="logo" />
        </div>
        <ul className="nav">
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
