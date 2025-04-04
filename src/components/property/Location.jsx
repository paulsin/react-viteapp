
import React from "react";
import background from "../../images/background.jpg";
import Navbar from "../common/Navbar";
import { Url } from "../../constants/global";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { propertyTypes } from "../../constants/global";
import { transactionType } from "../../constants/global";
import data from "../../json/places.json"
import { useConfirm } from "material-ui-confirm";
import StatesList from "./StatesList";
import DistrictsList from "./DistrictsList";

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


        setSelectedLocation(<StatesList />);

    }, []);

    var slno =1;

    return(

    <div>

        <Navbar />


        <div class="container mt-3">
            {/* <h2>Location</h2> */}
            <br/>

            {selectedLocation}
          
        </div>



    </div>

    )
};

export default Location;