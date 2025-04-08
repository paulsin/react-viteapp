import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import logo_agentfree from '../../images/logo_agentfree.jpeg';
import { Url } from "../../constants/global";

import React, { useState ,useEffect} from 'react';


import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";

var newUrl = Url + 'accounts/logInFunction';
var logoutUrl = Url + 'accounts/logoutUser';
var loggedCheckUrl = Url + 'accounts/loggedInUser';

function AppNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const [loggedUserMenu, setLoggedUserMenu] = useState();
  const [loggedUserRole, setLoggedUserRole] = useState();

  const navigate = useNavigate();

  function logOut() {
    //alert("Paulsin");


      const response = axios.get(logoutUrl,   
        { withCredentials: true }
      )
      .then(function (response) {
        //console.log(response);
        //alert(response.data);
        if(response.data == "session_destroyed") {
          navigate('/frontend/login');
        }
      })
      .catch(function (error) {
        console.log(error);
      }); 
  }


  const fetchLoggedData = (e) => {

    //Functions();

    const response = axios.get(loggedCheckUrl,   
      { withCredentials: true }
    )
    .then(function (response) {
      //console.log(response);
      //alert(response.data);
      if(response.data.username && response.data.password) {
        //alert("Logged In");
        //navigate('/frontend/profile');
        //setSelectedDIV(loginDIV);

        //alert(response.data.userID);

        setLoggedUserMenu(response.data.username);
        setLoggedUserRole(response.data.userRole);
        //setLoggedUserID(response.data.userID);
      }
      else {
        //setSelectedDIV(<LoginDIV />);
        setLoggedUserMenu("");
      }
      //setUsername(response.data.username);
    })
    .catch(function (error) {
      console.log(error);
    }); 

  }


  React.useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
    fetchLoggedData();
  }, [location]);
      return (
        <nav className="navbar" id="homenav">
        <div className="logo"><img src={logo_agentfree} width="80px" height="50px"/></div>
  
        <button className="toggle-btn" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
  
        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
     
          <li><Link to="/">Home</Link></li>
          <li><Link to="/test">Test</Link></li>
           {/* <li><Link to="/frontend/login">Login</Link></li>
          <li><Link to="/frontend/addProperty/new/new">Add Property</Link></li>
          <li><Link to="/frontend/properties">Properties</Link></li>
          <li><Link to="/frontend/propertyCustomerRequestForOwner/table/table">Requests</Link></li>
          <li><Link to="/frontend/listOwners">Owners</Link></li>
          <li><Link to= "/frontend/location/statesList/india">Location</Link></li> */}
          {/* { loggedUserRole == "owner" ? <li><Link to="/frontend/signupCheck">Register</Link></li> 
          :""}

         
          { loggedUserRole == "owner" ? <li><Link to="/frontend/listusersowntable">Users</Link></li>
          :""}
        

          { loggedUserRole == "owner" ?  
              <li className="dropdown">
                <button onClick={() => setDropdownOpen(!dropdownOpen)}>
                {loggedUserMenu} ▼
                </button>
                <ul className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
                  <li><Link to="/services/web">Home</Link></li>
                  <li><Link to="/services/design">{loggedUserMenu}</Link></li>
                  <li><Link to="/services/design">Profile</Link></li>
                  <li><Link onClick={logOut}>Log out</Link></li>
                </ul>
              </li>
          :""} */}
           
        </ul>
      </nav>
      );
}

export default AppNavbar;
    