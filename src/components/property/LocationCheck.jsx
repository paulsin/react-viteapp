
import React, { Suspense } from "react";
const Navbar = React.lazy(() => import("../common/Navbar"));
import { Url } from "../../constants/global";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
const Loading = React.lazy(() => import("../common/Loading"));

const StatesList = React.lazy(() => import("./StatesList"));
const DistrictsList  = React.lazy(() => import("./DistrictsList"));
const TownsList= React.lazy(() => import("./TownsList"));




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
    const [selectedDIV, setSelectedDIV] = useState(<Suspense><Loading/></Suspense>);

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
            setSelectedDIV(<Suspense><StatesList countryName={countryName} /></Suspense>);
          }
          else if(locationType == "districtsList") {
            setSelectedDIV(<Suspense><DistrictsList countryName={countryName} stateName={stateName}/></Suspense>);
          }
          else if(locationType == "townsList") {
            setSelectedDIV(<Suspense><TownsList countryName={countryName} stateName={stateName} districtName={districtName}/></Suspense>);
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

      
        <Suspense><Navbar /></Suspense>


        <div>
            {/* <h2>Location</h2> */}
            <br/>

            {selectedDIV}
          
        </div>



      </div>

    )
};

export default LocationCheck;