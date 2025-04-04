
import React from "react";
import background from "../../images/background.jpg";
import Navbar from "../common/Navbar";
import { Url } from "../../constants/global";
import axios from "axios";
import { useState, useEffect } from "react";
import {   Link,useNavigate, useParams } from "react-router-dom";
import Profile from "./Profile";
import Loading from "../common/Loading";

var newUrl = Url + 'accounts/loggedInUser';


const ProfileCheck = () => {

  const [selectedDIV, setSelectedDIV] = useState(<Loading/>);

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
          setSelectedDIV(<Profile />);
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