
import React, { useState } from "react";
import background from "../../images/background.jpg";
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
      <nav class="navbar navbar-expand-md" id="navbarPublic">
        <a class="navbar-brand" href="#"><img src={logo_agentfree} width="80px" height="50px"/></a>
        <button class="navbar-toggler navbar-dark" type="button" data-toggle="collapse" data-target="#main-navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="main-navigation">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="/">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/test">Test</a>
            </li>
 
          </ul>
        </div>
      </nav>

    </>

    )
}

export default NavbarPublic;