
import React from "react";
import background from "../../images/background.jpg";
import Navbar from "../common/Navbar";
import { Url } from "../../constants/global";
import axios from "axios";
import { useState, useEffect } from "react";
import {  Link,useNavigate, useParams } from "react-router-dom";

var newUrl = Url + 'accounts/loggedInUser';


const Profile = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

//    const [dataCheckFlag, setDataCheckFlag] = useState(0);

    ///   For navigate function
    const navigate = useNavigate();

    const {newID} = useParams();

    //alert(newID);



    useEffect(() => {
      
    }, []);



    return(
        <>
        <Navbar /> 
<div className="container mt-1">
     
      <h1>Hello man</h1>
      
    </div>
    </>







    )
};

export default Profile;