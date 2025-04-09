
import React, { Suspense } from "react";
const Navbar = React.lazy(() => import("../common/Navbar"));
import { Url } from "../../constants/global";

import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { propertyTypes } from "../../constants/global";
import { transactionType } from "../../constants/global";
;
const StatesList = React.lazy(() => import("./StatesList"));



var newUrl = Url + 'location/state';
var addDistrictUrl = Url + 'location/district';

var getStateUrl = Url + 'location/states';
var getDistrictUrl = Url + 'location/districts';


var deleteStateUrl = Url + 'location/deleteState/';
var updateStateUrl = Url + 'location/updateState/';

const Location = (props) => {


    const [selectedLocation, setSelectedLocation] = useState();

    //const data = JSON.parse(fs.readFileSync("../../json/places.json"));

    const {countryName} = useParams();
    const {stateName} = useParams();

    //alert(stateName);

    useEffect(() => {


        setSelectedLocation(<Suspense><StatesList /></Suspense>);

    }, []);

    var slno =1;

    return(

    <div>

        <Suspense><Navbar /></Suspense>


        <div class="container mt-3">
            {/* <h2>Location</h2> */}
            <br/>

            {selectedLocation}
          
        </div>



    </div>

    )
};

export default Location;