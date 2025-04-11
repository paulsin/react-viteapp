
import React, { useState } from "react";
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';

import axios from "axios";
import { Url } from "../../constants/global";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import logo_agentfree from '../../images/logo_agentfree.jpeg';

var newUrl = Url + 'accounts/logInFunction';
var logoutUrl = Url + 'accounts/logoutUser';
var loggedCheckUrl = Url + 'accounts/loggedInUser';

function NavbarPublic(props) {
  const [loggedUserMenu, setLoggedUserMenu] = useState();
  const [loggedUserRole, setLoggedUserRole] = useState();

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
        setLoggedUserMenu(response.data.username);
        setLoggedUserRole(response.data.userRole);
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
       <Navbar expand="lg"  style={{ backgroundColor:" #26617c" }} sticky="top" >
              <Container fluid className="px-3">
                {/* Logo */}
                <Navbar.Brand href="/" className="logo-brand me-auto">
                  <img src={logo_agentfree} width="80px" height="50px" alt="Logo" />
                </Navbar.Brand>
        
                {/* Toggle Button */}
                <Navbar.Toggle aria-controls="main-navbar-nav" />
        
                {/* Nav Links */}
                <Navbar.Collapse id="main-navbar-nav" style={{ backgroundColor:" #26617c" }} >
                  <Nav className="ms-auto" >
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/test">Test</Nav.Link>
                    
                  </Nav>
        
                </Navbar.Collapse>
              </Container>
            </Navbar>

    </>

    )
}

export default NavbarPublic;