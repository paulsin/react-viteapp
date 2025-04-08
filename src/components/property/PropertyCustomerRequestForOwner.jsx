
import React, { useMemo } from "react";
import background from "../../images/background.jpg";
import Navbar from "../common/Navbar";
import { Url } from "../../constants/global";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams} from "react-router-dom";
import Select from "react-select";
import { propertyTypes } from "../../constants/global";
import { transactionType } from "../../constants/global";

import { useConfirm } from "material-ui-confirm";
import StatesList from "./StatesList";
import DistrictsList from "./DistrictsList";
import PaginationforProperties from "./PaginationforProperties";
import { NoImage } from "../../constants/global";
import Loading from "../common/Loading";
import PropertyCustomerRequestForOwnerMobilenumberRequestHistory from "./PropertyCustomerRequestForOwnerMobilenumberRequestHistory";
import PropertyCustomerRequestForOwnerPropertyIDRequestHistory from "./PropertyCustomerRequestForOwnerPropertyIDRequestHistory";
import PropertyCustomerRequestForOwnerTable from "./PropertyCustomerRequestForOwnerTable";


var newUrl = Url + 'location/state';
var addDistrictUrl = Url + 'location/district';

var getPropertiesUrl = Url + 'property/properties';
var getDistrictUrl = Url + 'location/districts';


var deleteStateUrl = Url + 'location/deleteState/';
var updateStateUrl = Url + 'location/updateState/';

var  deletePropertyUrl = Url + 'property/deleteProperty/';

const PropertyCustomerRequestForOwner = (props) => {
  const [requestsTable, setRequestsTable] = useState([]);
  const [selectedDIV, setSelectedDIV] = useState(<Loading/>);
  const [param1State, setParam1State] = useState("table");
  const [propertyIdorMobileno, setPropertyidorMobileno] = useState("");

  var param1=props.param1;
  var param2=props.param2;
 // alert(param1)
  // alert(param2)

  useMemo(() => {
    if(param1State === "table"){
     // alert("hjjj")
      setSelectedDIV(<PropertyCustomerRequestForOwnerTable param2={param2} param1={param1} param1State = {param1State} setParam1State = {setParam1State} propertyIdorMobileno={propertyIdorMobileno} setPropertyidorMobileno ={setPropertyidorMobileno}/>);
    }
              
    if(param1State==="propertyID"){
      // alert("jjjj")
      setSelectedDIV(<PropertyCustomerRequestForOwnerPropertyIDRequestHistory  param1={param1} param1State = {param1State} setParam1State = {setParam1State} propertyIdorMobileno={propertyIdorMobileno} setPropertyidorMobileno ={setPropertyidorMobileno}/>);
    }
    else if(param1State==="phonenumber"){
      setSelectedDIV(<PropertyCustomerRequestForOwnerMobilenumberRequestHistory  param1={param1} param1State = {param1State} setParam1State = {setParam1State} propertyIdorMobileno={propertyIdorMobileno} setPropertyidorMobileno ={setPropertyidorMobileno}/>);
    }
  }, [param1State]);

    //useEffect(() => {


      //fetchRequests();
    //}, []);
    
    return(
      <div>

        <Navbar />
        {selectedDIV}

      </div>
    )
};

export default PropertyCustomerRequestForOwner;