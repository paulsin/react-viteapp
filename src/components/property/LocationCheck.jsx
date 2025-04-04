
import React from "react";
import background from "../../images/background.jpg";
import Navbar from "../common/Navbar";
import { Url } from "../../constants/global";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Loading from "../common/Loading";
//import Functions from "../common/Functions";
import { fetchLoggedDataCommon } from "../common/Functions";
// import AddProperty from "./AddProperty";
import Location from "./Location";
import StatesList from "./StatesList";
import DistrictsList from "./DistrictsList";
import TownsList from "./TownsList";

var newUrl = Url + 'accounts/logInFunction';
var loggedCheckUrl = Url + 'accounts/loggedInUser';

const LocationCheck = (props) => {

    const [mailOrMobile, setMailOrMobile] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [alertClass, setAlertClass] = useState("alert alert-secondary");
    const [alertContent, setAlertContent] = useState("Enter the following details for registration");
    const [userRole, setUserRole] = useState("");
    const [data, setData] = useState([]);
    const [buttonLabel, setButtonLabel] = useState("Submit");
//    const [dataCheckFlag, setDataCheckFlag] = useState(0);
    const [selectedDIV, setSelectedDIV] = useState(<Loading/>);

    ///   For navigate function
    const navigate = useNavigate();

    const {locationType} = useParams();
    const {countryName} = useParams();
    const {stateName} = useParams();
    const {districtName} = useParams();

    //alert(locationType);

    const fetchLoggedData = (e) => {

      //Functions();

      

      const response = axios.get(loggedCheckUrl,   
        { withCredentials: true }
      )
      .then(function (response) {
      //alert(response.data.password)
        if(response.data.username && response.data.password) {
          if(locationType == "statesList") {
            setSelectedDIV(<StatesList countryName={countryName} />);
          }
          else if(locationType == "districtsList") {
            setSelectedDIV(<DistrictsList countryName={countryName} stateName={stateName}/>);
          }
          else if(locationType == "townsList") {
            setSelectedDIV(<TownsList countryName={countryName} stateName={stateName} districtName={districtName}/>);
          }
        }
        else {
          navigate('/frontend/login');
        }
        //setUsername(response.data.username);
      })
      .catch(function (error) {
        console.log(error);
      }); 

    }


    useEffect(() => {
      //fetchDataByID();
      fetchLoggedData();
      //alert(fetchLoggedDataCommon());
      //awaitFetchLoggedData();
      //const response = Functions();
      //alert(response);
    }, []);


    return(




      <div>

      <Navbar />


      <div>
          {/* <h2>Location</h2> */}
          <br/>

          {selectedDIV}
        
      </div>



      </div>

    )
};

export default LocationCheck;