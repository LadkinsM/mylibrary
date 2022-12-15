import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

function Nav({user, handleSignOut, isLoggedIn, loading}) {
  // Display navigation bar
    return (
      <React.Fragment>
        {loading ? (<p>Loading...</p>) : (
        <nav key={user}>
          <h3>MyLibrary</h3>
          <ul>
            <li>
              <Link to="/search">Search</Link>
            </li>
              {isLoggedIn
                ? <li><a href="" onClick={handleSignOut}>Logout</a></li>
                : <li><Link to="/login">Login</Link></li>
              }
              {isLoggedIn
              && <li><Link to={`/user/${user.user_id}/profile`}>MyProfile</Link></li>
              }
          </ul>
        </nav>)}
      </React.Fragment>
    );
  }
  
// };

export default Nav;