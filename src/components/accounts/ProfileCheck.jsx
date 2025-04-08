
import React, { Suspense } from "react";


import { Url } from "../../constants/global";
import axios from "axios";
import { useState, useEffect } from "react";
import {   Link,useNavigate, useParams } from "react-router-dom";

const Profile = React.lazy(() => import("./Profile"));
const Loading = React.lazy(() => import("../common/Loading"));

var newUrl = Url + 'accounts/loggedInUser';


const ProfileCheck = () => {

  const [selectedDIV, setSelectedDIV] = useState(<Suspense><Loading/></Suspense>);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

//    const [dataCheckFlag, setDataCheckFlag] = useState(0);

    ///   For navigate function
    const navigate = useNavigate();

    const {newID} = useParams();

    //alert(newID);


    const fetchLoggedData = (e) => {

      const response = axios.get( newUrl,   
        { withCredentials: true }
      )
      .then(function (response) {
        //console.log(response);
        //alert(response.data);
        if(response.data.username && response.data.password) {
          //setUsername(response.data.username);
          setSelectedDIV(<Suspense><Profile /></Suspense>);
        }
        else {
          navigate('/frontend/login');
        }
      })
      .catch(function (error) {
        console.log(error);
      }); 

    }


    useEffect(() => {
      fetchLoggedData();
    }, []);



    return(

      <div>

        {selectedDIV}

      </div>

    )
};

export default ProfileCheck;