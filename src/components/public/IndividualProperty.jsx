import React, { useState, useEffect } from "react";
import background from "../../images/background.jpg";

import Navbar from "../common/NavbarPublic";
import Footer from "../common/Footer";

import { FaSearch } from "react-icons/fa";

// import Multiselect from 'multiselect-react-dropdown';
import axios from "axios";
import { Url } from "../../constants/global";
import Select from 'react-select';
import { FaPhoneAlt } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { IoLocation } from "react-icons/io5";
import { CgMail } from "react-icons/cg";
import Pagination from "./Pagination";
import { propertyTypes } from "../../constants/global";
import { transactionType } from "../../constants/global";
import { NoImage } from "../../constants/global";
import { Link, useNavigate, useParams } from "react-router-dom";
import IndividualPropertyImagesasComponent from "./IndividualPropertyImagesasComponent";
import IndividualPropertyDetailsComponent from "./IndividualPropertyDetailsComponent";
import IndividualPropertymessageComponent from "./IndividualPropertymessageComponent";
import IndividualPropertyGoogleMap from "./IndividualPropertyGoogleMap";
import IndividualPropertyRelatedProperty from "./IndividualPropertyRelatedProperty";
var propertyImagesurl=Url+'propertyImages/';


function IndividualProperty() {
    


 
  // const {operation} =useParams();
  const {propertyID} = useParams();


  

  return(
      <div>
        <Navbar/>
        <IndividualPropertyImagesasComponent propertyID={propertyID}/>
       <IndividualPropertyDetailsComponent propertyID={propertyID}/>
        <IndividualPropertymessageComponent propertyID={propertyID}/>
        {/* <IndividualPropertyGoogleMap propertyID={propertyID}/> */}
        <IndividualPropertyRelatedProperty propertyID={propertyID}/>
           
        <Footer/>
      </div>
    )
}

export default IndividualProperty;