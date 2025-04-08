
import React, { Suspense } from "react";
const Navbar = React.lazy(() => import("../common/Navbar"));


import { useState, useEffect } from "react";

import { ClipLoader } from "react-spinners";

var newUrl = Url + 'accounts/logInFunction';
var loggedCheckUrl = Url + 'accounts/loggedInUser';

function NotAuthorized() {

    return(
        <div>
      <Suspense><Navbar/></Suspense>
      <div class="container d-flex justify-content-center">
        <h1>
            Not authorized
        </h1>
      </div>
      </div>
    )
};

export default NotAuthorized;