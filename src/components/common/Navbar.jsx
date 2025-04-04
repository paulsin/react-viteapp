
import React, { useState } from "react";
import background from "../../images/background.jpg";
import axios from "axios";
import { Url } from "../../constants/global";
import { useNavigate, useParams } from "react-router-dom";
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
        <a className="navbar-brand" href="#"><img src={logo_agentfree} width="80px" height="50px"/></a>
        <button className="navbar-toggler navbar-dark" type="button" data-toggle="collapse" data-target="#main-navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="main-navigation">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/test">Test</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/frontend/login">Login</a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/frontend/addProperty/new/new">Add property</a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/frontend/properties">Properties</a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/frontend/propertyCustomerRequestForOwner/table/table">Requests</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/frontend/listOwners">Owners</a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/frontend/location/statesList/india">Location</a>
            </li>
            
            { loggedUserRole == "owner" ?

            <li className="nav-item">
              <a className="nav-link" href="/frontend/signupCheck">Register</a>
            </li> : ""

            }

            { loggedUserRole == "owner" ?

            <li className="nav-item">
              <a className="nav-link" href="/frontend/listusersowntable">Users</a>
            </li> : ""

            }


            {
              loggedUserMenu ? 
              <li>

                <Dropdown>
                  <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    {loggedUserMenu}
        
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Home</Dropdown.Item>
                    <Dropdown.Item href="#/action-1">{loggedUserMenu}</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Profile</Dropdown.Item>
                    <Dropdown.Item onClick={logOut}>Log out</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

{/*

                <div class="dropdown">
                  <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown">
                    {loggedUserMenu}
                  </button>
                  <ul class="dropdown-menu">
                    <li><h5 class="dropdown-header">Dropdown header 1</h5></li>
                    <li><a class="dropdown-item" href="/frontend/profile">Profile</a></li>
                    <li><a class="dropdown-item" href="#">Link 2</a></li>
                    <li><a class="dropdown-item" href="#">Link 3</a></li>
                    <li><h5 class="dropdown-header">Dropdown header 2</h5></li>
                    <li><a class="dropdown-item" href="#" onClick={logOut}>Log out</a></li>
                  </ul>
                </div>
*/}
              </li> : ""
            }

            
          </ul>
        </div>
      </nav>

    </>

    )
}

export default Navbar;