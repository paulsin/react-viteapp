
import React from "react";
import background from "../../images/background.jpg";
import { Url } from "../../constants/global";
import axios from "axios";
import { useState, useEffect } from "react";
import {  Link, useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";

var newUrl = Url + 'accounts/logInFunction';
var loggedCheckUrl = Url + 'accounts/loggedInUser';

function LoginDIV(props) {


    const [mailOrMobile, setMailOrMobile] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [alertClass, setAlertClass] = useState("alert alert-secondary");
    const [alertContent, setAlertContent] = useState("Enter the following details for registration");
    const [userRole, setUserRole] = useState("");
    const [data, setData] = useState([]);
    const [buttonLabel, setButtonLabel] = useState("Submit");
    
    ///   For navigate function
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        //alert("Paulsin");
        
        //e.preventDefault(); 
  
        console.log("Clicked");
  
        let dataCheckFlag = await dataCheckFunction(); 
  
        //alert(dataCheckFlag);
  
        if(dataCheckFlag == 1) {
          setAlertContent("Logging in");
          setAlertClass("alert alert-warning");
        
          newUrl = newUrl + "?username="+mailOrMobile+"&password="+password;
          //alert(newUrl);
          const response = axios.get( newUrl,   
            { withCredentials: true }
          )
          .then(function (response) {
            //console.log(response);
            //alert(response.data);
  
            if(response.data == 'bad_credentials') {
              setAlertContent("Invalid credentials");
              setAlertClass("alert alert-danger");
            }
            else if (response.data == 'logged_in') {
              //alert("Logged In");
              navigate('/frontend/profile');
            }
          })
          .catch(function (error) {
            console.log(error);
          }); 
        }
        //setDataCheckFlag(0);
      };


      const dataCheckFunction = (e) => {

        if(mailOrMobile == "") {
          setAlertContent("Enter the Email ID or Mobile number");
          setAlertClass("alert alert-danger");
        }
        else if(password == "") {
          setAlertContent("Enter the password");
          setAlertClass("alert alert-danger");
        }
        else {
          //alert("setting here");
          return(1);
        }
  
        return 0;
      }

      const buttonClickFunction = async (e) => {
        e.preventDefault(); 
        handleSubmit();
      }

    return(
                            <div class="container mt-2">
                                <h2>Log in</h2>
                              
                                <div class={alertClass} role="alert">
                                  {alertContent}
                                </div>

                                <div class="mb-3 mt-3">
                                  <label for="mailOrMobile">Mail / Mobile:</label>
                                  <input type="mailOrMobile" class="form-control" id="mailOrMobile" placeholder="Enter mobile number" name="name" required onChange={(e) => setMailOrMobile(e.target.value)}
                                  value={mailOrMobile}/>
                                </div>

                                <div class="mb-3 mt-3">
                                  <label for="password">Password:</label>
                                  <input type="password" class="form-control" id="password" placeholder="Enter password" name="password" 
                                  required onChange={(e) => setPassword(e.target.value)} value={password}/>
                                </div>
                                
                                <button type="submit" class="btn btn-primary" onClick={buttonClickFunction}>{buttonLabel}</button>
                              
                            </div>
    )
};

export default LoginDIV;