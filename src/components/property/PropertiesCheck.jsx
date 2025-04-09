
import React, { Suspense } from "react";

import { Url } from "../../constants/global";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
const Loading = React.lazy(() => import("../common/Loading"));
const Properties = React.lazy(() => import("./Properties"));

// import AddProperty from "./AddProperty";



var newUrl = Url + 'accounts/logInFunction';
var loggedCheckUrl = Url + 'accounts/loggedInUser';

const PropertiesCheck = () => {

    const [mailOrMobile, setMailOrMobile] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [alertClass, setAlertClass] = useState("alert alert-secondary");
    const [alertContent, setAlertContent] = useState("Enter the following details for registration");
    const [userRole, setUserRole] = useState("");
    const [data, setData] = useState([]);
    const [buttonLabel, setButtonLabel] = useState("Submit");
//    const [dataCheckFlag, setDataCheckFlag] = useState(0);
    const [selectedDIV, setSelectedDIV] = useState(<Suspense><Loading/></Suspense>);

    ///   For navigate function
    const navigate = useNavigate();

    const {newID} = useParams();

    //const functionObj = Functions();

    //alert(newID);


    const fetchLoggedData = (e) => {

      //Functions();

      //alert(loggedCheckUrl);

      const response = axios.get(loggedCheckUrl,   
        { withCredentials: true }
      )
      .then(function (response) {
        //console.log(response);
        //alert(response.data);
        if(response.data.username && response.data.password) {
          //alert("Logged In");
          //navigate('/frontend/profile');
          setSelectedDIV(<Suspense><Properties /></Suspense>);
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
      //fetchDataByID();
      fetchLoggedData();
      //alert(fetchLoggedDataCommon());
      //awaitFetchLoggedData();
      //const response = Functions();
      //alert(response);
    }, []);




    return(

    <div>

      {selectedDIV}

    </div>

    )
};

export default PropertiesCheck;