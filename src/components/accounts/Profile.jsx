
import React, { Suspense } from "react";

const AppNavbar = React.lazy(() => import("../common/AppNavbar"));

import { Url } from "../../constants/global";

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
         <Suspense><AppNavbar /></Suspense>
        <div className="container mt-3">
     
            <h1>Hello man</h1>
      
        </div>
    </>







    )
};

export default Profile;