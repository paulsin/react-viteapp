
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

function Loading() {

    return(
      <div class="container d-flex justify-content-center">
        <ClipLoader

          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    )
};

export default Loading;