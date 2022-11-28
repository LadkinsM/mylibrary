import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

function Nav({user, handleSignOut, isLoggedIn}) {
  // const user = props.user;
  // const handleSignOut = props.handleSignOut;
  // const[user, setUser] = React.useState({});
  // const navigate = useNavigate();

  // useEffect(() => {
  //   fetch('/user')
  //     .then((response) => response.text())
  //     .then((user_id) => {setUser(user_id)});
  // }, []);

  // const handleSignOut = evt => {
  //   fetch('/logout')
  //     .then((response) => response.text())
  //     .then((updateLogin) => {setUser(updateLogin)});
  // };
  
  // if (user == "False"){
  //   return (
  //     <React.Fragment>
  //       <nav key={user}>
  //         <h3>Site Name</h3>
  //         <ul>
  //           <li>
  //             <Link to="/search">Search</Link>
  //           </li>
  //           <li>
  //             <Link to="/login">Login</Link>
  //           </li>
  //         </ul>
  //       </nav>
  //     </React.Fragment>
  //   );}
  // else {
    return (
      <React.Fragment>
        <nav key={user}>
          <h3>Site Name</h3>
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
        </nav>
      </React.Fragment>
    );
  }
  
// };

export default Nav;