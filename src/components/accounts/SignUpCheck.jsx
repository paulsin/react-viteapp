
import React, { Suspense } from "react";

import { Url } from "../../constants/global";
import axios from "axios";

import { useState, useEffect } from "react";
import {   Link,useNavigate, useParams } from "react-router-dom";
const Loading = React.lazy(() => import("../common/Loading"));
const SignUp = React.lazy(() => import("./SignUp"));


const NotAuthorized = React.lazy(() => import("../common/NotAuthorized"));


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

    const [selectedDIV, setSelectedDIV] = useState(<Suspense><Loading/></Suspense>);
    

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
                setSelectedDIV(<Suspense><SignUp newID={newID}/></Suspense>);
              }
              else {
                setSelectedDIV(<Suspense><SignUp newID=""/></Suspense>);
              }
            }
            else {
              setSelectedDIV(<Suspense><NotAuthorized/></Suspense>);
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