import React,{Suspense ,useState, useEffect } from "react";


const Footer = React.lazy(() => import('../common/Footer'));
const AppNavbar= React.lazy(() => import("../common/AppNavbar"));

const IndividualPropertyImagesasComponent= React.lazy(() => import("./IndividualPropertyImagesasComponent"));
const IndividualPropertyDetailsComponent= React.lazy(() => import("./IndividualPropertyDetailsComponent"));
const IndividualPropertymessageComponent= React.lazy(() => import("./IndividualPropertymessageComponent"));
const IndividualPropertyGoogleMap= React.lazy(() => import("./IndividualPropertyGoogleMap"));
const IndividualPropertyRelatedProperty= React.lazy(() => import("./IndividualPropertyRelatedProperty"));



// import Multiselect from 'multiselect-react-dropdown';
import axios from "axios";
import { Url } from "../../constants/global";
import Select from 'react-select';


import { Link, useNavigate, useParams } from "react-router-dom";

var propertyImagesurl=Url+'propertyImages/';


function IndividualProperty() {
    


 
  // const {operation} =useParams();
  const {propertyID} = useParams();


  

  return(
      <div>
        <Suspense> <AppNavbar /></Suspense>
        <Suspense><IndividualPropertyImagesasComponent propertyID={propertyID}/></Suspense>
        <Suspense><IndividualPropertyDetailsComponent propertyID={propertyID}/></Suspense>
        <Suspense><IndividualPropertymessageComponent propertyID={propertyID}/></Suspense>
        {/* <Suspense><IndividualPropertyGoogleMap propertyID={propertyID}/></Suspense> */}
        <Suspense><IndividualPropertyRelatedProperty propertyID={propertyID}/></Suspense> 
         <Suspense><Footer/></Suspense> 
      </div>
    )
}

export default IndividualProperty;