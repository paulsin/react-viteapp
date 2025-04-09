
import React, { useMemo ,Suspense} from "react";


const Navbar = React.lazy(() => import("../common/Navbar"));
import { Url } from "../../constants/global";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


import { useConfirm } from "material-ui-confirm";


const Loading = React.lazy(() => import("../common/Loading"));
const PropertyCustomerRequestForOwnerMobilenumberRequestHistory = React.lazy(() => import("./PropertyCustomerRequestForOwnerMobilenumberRequestHistory"));
const PropertyCustomerRequestForOwnerPropertyIDRequestHistory= React.lazy(() => import("./PropertyCustomerRequestForOwnerPropertyIDRequestHistory"));
const PropertyCustomerRequestForOwnerTable = React.lazy(() => import("./PropertyCustomerRequestForOwnerTable"));



var newUrl = Url + 'location/state';
var addDistrictUrl = Url + 'location/district';

var getPropertiesUrl = Url + 'property/properties';
var getDistrictUrl = Url + 'location/districts';


var deleteStateUrl = Url + 'location/deleteState/';
var updateStateUrl = Url + 'location/updateState/';

var  deletePropertyUrl = Url + 'property/deleteProperty/';

const PropertyCustomerRequestForOwner = (props) => {
  const [requestsTable, setRequestsTable] = useState([]);
  const [selectedDIV, setSelectedDIV] = useState(<Suspense><Loading/></Suspense>);
  const [param1State, setParam1State] = useState("table");
  const [propertyIdorMobileno, setPropertyidorMobileno] = useState("");

  var param1=props.param1;
  var param2=props.param2;
 // alert(param1)
  // alert(param2)

  useMemo(() => {
    if(param1State === "table"){
     // alert("hjjj")
      setSelectedDIV(<Suspense><PropertyCustomerRequestForOwnerTable param2={param2} param1={param1} param1State = {param1State} setParam1State = {setParam1State} propertyIdorMobileno={propertyIdorMobileno} setPropertyidorMobileno ={setPropertyidorMobileno}/></Suspense>);
    }
              
    if(param1State==="propertyID"){
      // alert("jjjj")
      setSelectedDIV(<Suspense><PropertyCustomerRequestForOwnerPropertyIDRequestHistory  param1={param1} param1State = {param1State} setParam1State = {setParam1State} propertyIdorMobileno={propertyIdorMobileno} setPropertyidorMobileno ={setPropertyidorMobileno}/></Suspense>);
    }
    else if(param1State==="phonenumber"){
      setSelectedDIV(<Suspense><PropertyCustomerRequestForOwnerMobilenumberRequestHistory  param1={param1} param1State = {param1State} setParam1State = {setParam1State} propertyIdorMobileno={propertyIdorMobileno} setPropertyidorMobileno ={setPropertyidorMobileno}/></Suspense>);
    }
  }, [param1State]);

    //useEffect(() => {


      //fetchRequests();
    //}, []);
    
    return(
      <div>

        <Suspense> <Navbar /></Suspense>
        {selectedDIV}

      </div>
    )
};

export default PropertyCustomerRequestForOwner;