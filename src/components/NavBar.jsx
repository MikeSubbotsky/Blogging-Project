import React from 'react';
import { Link } from "react-router-dom"

function NavBar () {

    return (
      <>
      <nav className="navbar navbar-light bg-light">
        <ul className='d-flex list-unstyled'>
            <li><Link to="/main_page" className='btn btn-warning m-2'>Blog</Link></li>
        </ul>
      </nav>
      </>
    );
  }


export default NavBar;