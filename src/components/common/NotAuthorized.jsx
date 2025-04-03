
import React from "react";
import background from "../../images/background.jpg";
import Navbar from "./Navbar";
import { Url } from "../../constants/global";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";

var newUrl = Url + 'accounts/logInFunction';
var loggedCheckUrl = Url + 'accounts/loggedInUser';

function NotAuthorized() {

    return(
        <div>
      <Navbar />
      <div class="container d-flex justify-content-center">
        <h1>
            Not authorized
        </h1>
      </div>
      </div>
    )
};

export default NotAuthorized;