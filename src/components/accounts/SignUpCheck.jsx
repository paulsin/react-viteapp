
import React from "react";
import background from "../../images/background.jpg";
import Navbar from "../common/Navbar";
import { Url } from "../../constants/global";
import axios from "axios";
import { useState, useEffect } from "react";
import {   Link,useNavigate, useParams } from "react-router-dom";
import Loading from "../common/Loading";
import SignUp from "./SignUp";
//import { Login } from "react-admin";
import NotAuthorized from "../common/NotAuthorized";

var newUrl = Url + 'accounts/person';

var loggedCheckUrl = Url + 'accounts/loggedInUser';

const SignUpCheck = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [alertClass, setAlertClass] = useState("alert alert-secondary");
    const [alertContent, setAlertContent] = useState("Enter the following details for registration");
    const [userRole, setUserRole] = useState("");
    const [data, setData] = useState([]);
    const [buttonLabel, setButtonLabel] = useState("Submit");
    const [emailBoxStatus, setEmailBoxStatus] = useState(false);
//    const [dataCheckFlag, setDataCheckFlag] = useState(0);

    const [selectedDIV, setSelectedDIV] = useState(<Loading/>);
    

    ///   For navigate function
    const navigate = useNavigate();

    const {newID} = useParams();

    //alert(newID);


    const fetchLoggedData = (e) => {

        //Functions();
        //alert("Paulsin");
        const response = axios.get(loggedCheckUrl,   
        { withCredentials: true }
        )
        .then(function (response) {
          //console.log(response);
          //alert(response.data);
          if(response.data.username && response.data.password) {
              //alert("Logged In");
              //navigate('/frontend/profile');
            if(response.data.userRole == "owner") {
              if(newID) {
                setSelectedDIV(<SignUp newID={newID}/>);
              }
              else {
                setSelectedDIV(<SignUp newID=""/>);
              }
            }
            else {
              setSelectedDIV(<NotAuthorized />);
            }
          }
          else {
            navigate('/frontend/login');
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

      //alert(newID);

      fetchLoggedData();

    }, []);



    return(

    <div>

        {selectedDIV}

    </div>

    )
};

export default SignUpCheck;