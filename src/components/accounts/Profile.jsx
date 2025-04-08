
import React, { Suspense } from "react";

const Navbar = React.lazy(() => import("../common/Navbar"));

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
        <Suspense><Navbar /> </Suspense>
        <div className="container mt-3">
     
            <h1>Hello man</h1>
      
        </div>
    </>







    )
};

export default Profile;