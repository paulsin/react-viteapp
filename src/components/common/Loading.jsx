
import React from "react";

import axios from "axios";
import { Url } from "../../constants/global";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";

var newUrl = Url + 'accounts/logInFunction';
var loggedCheckUrl = Url + 'accounts/loggedInUser';

function Loading() {

    return(
      <div className="container d-flex justify-content-center">
        <ClipLoader

          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    )
};

export default Loading;