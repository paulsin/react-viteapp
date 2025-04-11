
import React, { useState } from "react";

import axios from "axios";
import { Url } from "../../constants/global";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import logo_agentfree from '../../images/logo_agentfree.jpeg';


var newUrl = Url + 'accounts/logInFunction';
var logoutUrl = Url + 'accounts/logoutUser';
var loggedCheckUrl = Url + 'accounts/loggedInUser';

function Navbar(props) {
  const [loggedUserMenu, setLoggedUserMenu] = useState();
  const [loggedUserRole, setLoggedUserRole] = useState();
  //const [loggedUserID, setLoggedUserID] = useState();

  ///   For navigate function
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

  useEffect(() => {
    //console.log('i fire once');
    //fetchData();
    fetchLoggedData();
  }, []);

  return(

    <>
     <nav className="navbar navbar-expand-md">
  <div className="container-fluid">
    {/* Logo */}
    <a className="navbar-brand" href="/">
      <img src={logo_agentfree} width="80px" height="50px" alt="Logo" />
    </a>

    {/* Toggle button for small screens */}
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    {/* Collapsible menu */}
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
        <li className="nav-item"><a className="nav-link" href="/test">Test</a></li>
        <li className="nav-item"><a className="nav-link" href="/frontend/login">Login</a></li>
        <li className="nav-item"><a className="nav-link" href="/frontend/addProperty/new/new">Add property</a></li>
        <li className="nav-item"><a className="nav-link" href="/frontend/properties">Properties</a></li>
        <li className="nav-item"><a className="nav-link" href="/frontend/propertyCustomerRequestForOwner/table/table">Requests</a></li>
        <li className="nav-item"><a className="nav-link" href="/frontend/listOwners">Owners</a></li>
        <li className="nav-item"><a className="nav-link" href="/frontend/history">History</a></li>
        <li className="nav-item"><a className="nav-link" href="/frontend/location/statesList/india">Location</a></li>

        {loggedUserRole === "owner" && (
          <>
            <li className="nav-item"><a className="nav-link" href="/frontend/signupCheck">Register</a></li>
            <li className="nav-item"><a className="nav-link" href="/frontend/listusersowntable">Users</a></li>
          </>
        )}
      </ul>

      {/* Dropdown user menu */}
      {loggedUserMenu && (
        <div className="d-flex">
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              {loggedUserMenu}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/">Home</Dropdown.Item>
              <Dropdown.Item>{loggedUserMenu}</Dropdown.Item>
              <Dropdown.Item href="/frontend/profile">Profile</Dropdown.Item>
              <Dropdown.Item onClick={logOut}>Log out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )}
    </div>
  </div>
</nav>

    </>

    )
}

export default Navbar;