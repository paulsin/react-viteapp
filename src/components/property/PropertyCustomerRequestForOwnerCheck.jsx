
import React from "react";
import background from "../../images/background.jpg";
import Navbar from "../common/Navbar";
import { Url } from "../../constants/global";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Loading from "../common/Loading";
//import Functions from "../common/Functions";
import { fetchLoggedDataCommon } from "../common/Functions";
import AddProperty from "./AddProperty";
import PropertyCustomerRequestForOwner from "./PropertyCustomerRequestForOwner";




var newUrl = Url + 'accounts/logInFunction';
var loggedCheckUrl = Url + 'accounts/loggedInUser';

const PropertyCustomerRequestForOwnerCheck = () => {

    const [mailOrMobile, setMailOrMobile] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [alertClass, setAlertClass] = useState("alert alert-secondary");
    const [alertContent, setAlertContent] = useState("Enter the following details for registration");
    const [userRole, setUserRole] = useState("");
    const [data, setData] = useState([]);
    const [buttonLabel, setButtonLabel] = useState("Submit");
//    const [dataCheckFlag, setDataCheckFlag] = useState(0);
    const [selectedDIV, setSelectedDIV] = useState(<Loading/>);

    ///   For navigate function
    const navigate = useNavigate();

    const {param1} = useParams();
    const {param2} =useParams();
    //const functionObj = Functions();

    //alert(newID);

    // alert(operation)
    const fetchLoggedData = (e) => {

      //Functions();
      // alert(operation)

      //alert(loggedCheckUrl);

      const response = axios.get(loggedCheckUrl,   
        { withCredentials: true }
      )
      .then(function (response) {
        //console.log(response);
        //alert(response.data);
        if(response.data.username && response.data.password) {
          // alert("Logged In");
          //navigate('/frontend/profile');
          //  alert(operation)
          // if(param1==="table" && param2==="table"){
            setSelectedDIV(<PropertyCustomerRequestForOwner param1={param1} param2={param2}/>);
          // }
          // else if(param1==="propertyID"){
          //   alert("jjjj")
          //   setSelectedDIV(<PropertyCustomerRequestForOwnerPropertyIDRequestHistory param2={param2}/>);
          // }
          // else if(param1==="phonenumber"){
          //   setSelectedDIV(<PropertyCustomerRequestForOwnerMobilenumberRequestHistory param2={param2}/>);
          // }
              
     
         
              
           
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

export default PropertyCustomerRequestForOwnerCheck;