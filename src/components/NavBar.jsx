import React, { useContext } from 'react';
import { Link, useLocation } from "react-router-dom";
import { UserLogin } from '../lib/Context';

function NavBar () {
  const {userLogin} = useContext(UserLogin);
  const location = useLocation();

    return (
      <div>
        <nav className="navbar navbar-dark justify-content-between">
          <ul className='d-flex list-unstyled'>
              <li><Link to="/home" className={`btn btn-outline-secondary m-2 border-0 ${location.pathname === "/home" || location.pathname === "/" ? "text-white" : ""}`}>Home</Link></li>
              <li><Link to="/profile" className={`btn btn-outline-secondary m-2 border-0 ${location.pathname === "/profile" ? "text-white" : ""}`}>Profile</Link></li>
          </ul>
          {userLogin && <h5 className='mx-3'>Welcome, {userLogin}</h5>}
        </nav>      
      </div>
    );
  }


export default NavBar;