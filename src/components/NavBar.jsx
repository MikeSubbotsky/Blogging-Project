import { getAuth, signOut } from 'firebase/auth';
import React, { useContext } from 'react';
import { Link, useLocation } from "react-router-dom";
import { IsLoggedIn, UserID } from '../lib/Context';
import { useNavigate } from 'react-router-dom';



function NavBar () {
  const { isLoggedIn, setIsLoggedIn } = useContext(IsLoggedIn);
  const { setUserID } = useContext(UserID);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const auth = getAuth();
  try {
    await signOut(auth);
    setIsLoggedIn(false);
    setUserID("");
    navigate('/login');
  } catch (error) {
    console.log(error);
  }
  };

  return (
    <div>
      <nav className="navbar navbar-dark justify-content-between">
        <div>
        {isLoggedIn && <ul className='d-flex list-unstyled'>
          <li><Link to="/home" className={`btn btn-outline-secondary m-2 border-0 ${location.pathname === "/home" || location.pathname === "/" ? "text-white" : ""}`}>Home</Link></li>
          <li><Link to="/profile" className={`btn btn-outline-secondary m-2 border-0 ${location.pathname === "/profile" ? "text-white" : ""}`}>Profile</Link></li>
        </ul>}
        </div>
        <div sx={{ right: '10px' }}>
        {isLoggedIn ? (
          <>
            <button className="btn btn-secondary m-2" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-secondary m-2">Login</Link>
            <Link to="/signup" className="btn btn-secondary m-2">Signup</Link>
          </>
        )}
        </div>
      </nav>
    </div>
  );
}

export default NavBar;