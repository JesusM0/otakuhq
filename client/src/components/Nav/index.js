import React from 'react';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';

function Nav() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <div>
          <ul className=''>
            <li className=''>
              {/* Link Goes Here */}
              <Link to></Link>
            </li>
            <li className=''>
              <a href='/' onClick={() => Auth.logout}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      );
    } else {
      return (
        <div className='container-tabs'>
          <ul className='nav'>
            <li className=''>
              <Link to='/signup'>Signup</Link>
            </li>
            <li className=''>
              <Link to='/login'>Login</Link>
            </li>
          </ul>
        </div>
      );
    }
  }
  return (
    <header className=''>
      <h1>
        <Link to='/'>OtakuHQ</Link>
      </h1>
      <nav>{showNavigation()}</nav>
    </header>
  );
}

export default Nav;
