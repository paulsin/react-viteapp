
import 'bootstrap/dist/css/bootstrap.min.css';

import logo_agentfree from '../../images/logo_agentfree.jpeg';
import { Url } from "../../constants/global";

import React, { useState ,useEffect} from 'react';


import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
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
        <Navbar expand="lg" bg="danger" variant="dark" sticky="top">
        <Container fluid className="px-3">
          {/* Logo */}
          <Navbar.Brand href="/" className="logo-brand me-4">
            <img src={logo_agentfree} width="80px" height="50px" alt="Logo" />
          </Navbar.Brand>
  
          {/* Toggle Button */}
          <Navbar.Toggle aria-controls="main-navbar-nav" />
  
          {/* Nav Links */}
          <Navbar.Collapse id="main-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/test">Test</Nav.Link>
              <Nav.Link href="/frontend/login">Login</Nav.Link>
              <Nav.Link href="/frontend/addProperty/new/new">Add Property</Nav.Link>
              <Nav.Link href="/frontend/properties">Properties</Nav.Link>
              <Nav.Link href="/frontend/propertyCustomerRequestForOwner/table/table">Requests</Nav.Link>
              <Nav.Link href="/frontend/listOwners">Owners</Nav.Link>
              <Nav.Link href="/frontend/history">History</Nav.Link>
              <Nav.Link href="/frontend/location/statesList/india">Location</Nav.Link>
              {loggedUserRole === 'owner' && (
                <>
                  <Nav.Link href="/frontend/signupCheck">Register</Nav.Link>
                  <Nav.Link href="/frontend/listusersowntable">Users</Nav.Link>
                </>
              )}
            </Nav>
  
            {loggedUserMenu && (
              <NavDropdown title={loggedUserMenu} id="user-dropdown" className="ms-3">
                <NavDropdown.Item href="/home">Home</NavDropdown.Item>
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logOut}>Log out</NavDropdown.Item>
              </NavDropdown>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      );
}

export default AppNavbar;
    