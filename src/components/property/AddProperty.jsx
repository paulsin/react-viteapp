import React, { Suspense } from "react";
import background from "../../images/background.jpg";
const AppNavbar = React.lazy(() => import("../common/AppNavbar"));
import { Url } from "../../constants/global";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { propertyTypes } from "../../constants/global";
import { transactionType } from "../../constants/global";
import { PropertyStatusOptions } from "../../constants/global";

import { ProgressBar } from "react-bootstrap";
import Compressor from 'compressorjs';
const AddPropertyTypesAsComponent = React.lazy(() => import("./AddPropertyTypesAsComponent"));
const AddPropertyTransactionTypeAsComponent = React.lazy(() => import("./AddPropertyTransactionTypeAsComponent"));
const AddPropertyStatesAsComponent = React.lazy(() => import("./AddPropertyStatesAsComponent"));
const AddPropertyDistrictsAsComponent = React.lazy(() => import("./AddPropertyDistrictsAsComponent"));
const AddPropertyTownsAsComponent = React.lazy(() => import("./AddPropertyTownsAsComponent"));
const AddPropertyAttributesAsComponent  = React.lazy(() => import("./AddPropertyAttributesAsComponent"));


// import { setSubmissionErrors } from "react-admin";
import { neworOldType } from "../../constants/global";
import { fetchLoggedDataCommon } from "../common/Functions";


var newUrl = Url + 'location/state';
var addDistrictUrl = Url + 'location/district';
var addTownUrl = Url + 'location/town';

var getStateUrl = Url + 'location/states';
var getDistrictUrl = Url + 'location/districts';
var getTownUrl = Url + 'location/towns';

var addPropertyURL = Url + 'property/addProperty';
var addPropertyImagesURL = Url + 'addPropertyImages';
var getownerdetailsurl=Url+'property/ownersandbuilders';
var loggedCheckUrl = Url + 'accounts/loggedInUser';

const AddProperty = (props) => {

    const [stateName, setStateName] = useState("");
    const [stateCode, setStateCode] = useState("");

     const [propertyTypeSelected, setPropertyTypeSelected] = useState("");
    const [transactionTypeSelected, setTransactionTypeSelected] = useState("");
    // setNeworOld,newOrOld,
    const [newOrOld,setNeworOld]=useState("");
    const [stateNameSelectedID, setStateNameSelectedID] = useState("");
    const [districtNameSelectedID, setDistrictNameSelectedID] = useState("");
    const [townNameSelectedID, setTownNameSelectedID] = useState("");

    const [districtName, setDistrictName] = useState("");
    const [districtCode, setDistrictCode] = useState("");

    const [townName, setTownName] = useState("");
    const [townCode, setTownCode] = useState("");

    const [localityName, setLocalityName] = useState("");
    const [cost, setCost] = useState("");
    const [costtype, setCosttype] = useState("");

    const [stateOptions, setStateOptions] = useState([]);
    const [districtOptions, setDistrictOptions] = useState([]);
    const [districtOptionsOriginal, setDistrictOptionsOriginal] = useState([]);
    const [townOptions, setTownOptions] = useState([]);
    const [townOptionsOriginal, setTownOptionsOriginal] = useState([]);

    const [addStateButtonStatus, setAddStateButtonStatus] = useState("Add state");
    const [addDistrictButtonStatus, setAddDistrictButtonStatus] = useState("Add district");
    const [addTownButtonStatus, setAddTownButtonStatus] = useState("Add town");

    const [alertClass, setAlertClass] = useState("alert alert-info");
    const [alertContent, setAlertContent] = useState("Enter the property details");
    const [compressedFile, setCompressedFile] = useState(null);

    const [uploadProgressValue, setUploadProgressValue] = useState(0);
    const [imageUrl, setImageUrl] = useState();
    const [progressBar, setProgressBar] = useState(0);
    const presetKey = "";
    const [files, setFiles] = useState([]);
      const[loggedinusername,setLoggedusername]=useState("");
      const[loggedinuserid,setLoggeduserId]=useState("");
      const[loggedinuserRole,setLoggeduserRole]=useState("");

   

     const [stateOptionsNew,setStateoptionsnew]=useState("");   
            //state
        const [stateSelectedLabel,setStateSelectedLabel]=useState("");
        const [stateSelectedValue,setStateSelectedValue]=useState("");
        
        const [districtOptionsNew,setDistrictoptionsnew]=useState("");            //district
        const [districtSelectedLabel,setDistrictSelectedLabel]=useState("");
        const [districtSelectedValue,setDistrictSelectedValue]=useState(""); 
    
        const [townOptionsNew,setTownoptionsnew]=useState("");            //town
        const [townSelectedLabel,setTownSelectedLabel]=useState("");
        const [townSelectedValue,setTownSelectedValue]=useState(""); 
    
    
        const [property_Type, setPropertyType] = useState("");
        const [transactiontype, setTransactionType] = useState("");

        const [selectedDefaultOption, setSelectedDefaultOption] = useState(false);
        const [selectedpercentCostOption, setSelectedPercentOption] = useState(false);
        const [selectedPersquarefeetCostOption, setSelectedPersquarefeetOption] = useState(false);
        const[costtypeStatusChecked,setCosttypeStatusChecked]=useState("default");

           const [facing, setFacingPolarity] = useState("");
           const [totalNumberOfFloors, setTotalNumberOfFloors] = useState("");
           const [plotarea, setPlotArea] = useState("");
           const [builtArea, setBuiltArea] = useState("");
           const [totalVillas, setTotalVillas] = useState("");
           const [floorNumber, setFloorNumber] = useState("");
           const [bedRooms, setBedRooms] = useState("");
           const [bedRoomsWithToilet, setBedRoomsWithToilet] = useState("");
           const [toilets, setToilets] = useState("");
        
           const [carPorch, setCarPorch] = useState(false);
           const [carParking, setCarParking] = useState("");
           const [sitOut, setSitOut] = useState(false);
           const [livingArea, setLivingArea] = useState(false);
           const [diningHall, setDiningHall] = useState(false);
           const [kitchen, setKitchen] = useState(false);
           const [workArea, setWorkArea] = useState(false);
           const [upperLivingArea, setUpperLivingArea] = useState(false);
           const [balcony, setBalcony] = useState(false);
           const [openTerrace, setOpenTerrace] = useState(false);
           const [waterWell, setWaterWell] = useState(false);
           const [waterConnection, setWaterConnection] = useState(false);
          

           const[carporchStatusChecked,setCarporchStatusChecked]=useState(false);
           const[sitoutStatusChecked,setSitoutStatusChecked]=useState(false);
           const[livingareaStatusChecked,setLivingareaStatusChecked]=useState(false);
           const[dininghallStatusChecked,setDininghallStatusChecked]=useState(false);
           const[kitchenStatusChecked,setKitchenStatusChecked]=useState(false);
           const[workareaStatusChecked,setWorkareaStatusChecked]=useState(false);
           const[upperlivingareaStatusChecked,setUpperlivingareaStatusChecked]=useState(false);
           const[balconyStatusChecked,setBalconyStatusChecked]=useState(false);
           const[openterraceStatusChecked,setOpenterraceStatusChecked]=useState(false);
           const[waterwellStatusChecked,setWaterwellStatusChecked]=useState(false);
           const[waterconnectionStatusChecked,setWaterconnectionStatusChecked]=useState(false);

           const[googlemap,setGooglemap]=useState("");
           const[videolink,setVideolink]=useState("");
           const[propertyTitle,setPropertyTitle]=useState("");
           const[propertyfeature1,setPropertyFeature1]=useState("");
           const[propertyfeature2,setPropertyFeature2]=useState("");
           const[propertyfeature3,setPropertyFeature3]=useState("");
           const[propertyfeature4,setPropertyFeature4]=useState("");

           const[owneroptions,setOwneroptions]=useState("");
           const[ownerSelectedValue,setOwnerselectedValue]=useState("");
           const[ownerSelectedLabel,setOwnerselectedLabel]=useState("");

           const [propertyStatus,setPropertystatus]=useState("Public");
           const[numbercount,setNumberCount]=useState("")
     

    const stateOptionsArray = [];
    const districtOptionsArray = [];
    const townOptionsArray = [];
    
    const {operation} =useParams();
    const {uniqueID} = useParams();
    const navigate = useNavigate();

    //const now = 80;

    //const data = JSON.parse(fs.readFileSync("../../json/places.json"));

// alert(uniqueID)
const fetchLoggedDataForPropertySubmission = (e) => {

  //Functions();

  //alert("Paulsin");

  const response = axios.get(loggedCheckUrl,
    {withCredentials:true }
  )
  .then(function (response) {
    //alert(response.data.userID);
    setLoggedusername(response.data.username);
    setLoggeduserRole(response.data.userRole)
    setLoggeduserId(response.data.userID);
    if(response.data.username && response.data.password) {
      //alert("Logged In");
      //navigate('/frontend/profile');
      //setSelectedDIV(loginDIV);

      
      //alert(response.data.userID);

      //setLoggedUserMenu(response.data.username);
      //setLoggedUserRole(response.data.userRole);
      // setLoggedUserIDforPropertySubmission(response.data.userID);
    }
    //setUsername(response.data.username);
  })
  .catch(function (error) {
    console.log(error);
  }); 

}




    const addState = async (e) => {
      //ssalert("Paulsin");

      setAddStateButtonStatus("Adding state");

      if(stateName && stateCode) {
        try {
          //alert("Paulsin");
          const response = await axios.post(
            newUrl,
            {
              "stateName": stateName,    
              "stateCode": stateCode,
              "donebyUserId":loggedinuserid,
            "donebyUserName":loggedinusername,
            "donebyUserrole":loggedinuserRole
            }     
          );  

          //alert(response.data);

          if(response.data == "both_exists") {
            setAlertContent("State name and code exist");
            setAlertClass("alert alert-danger");
          }
          else if(response.data == "name_exists") {
            setAlertContent("State name exists");
            setAlertClass("alert alert-danger");
          }
          else if(response.data == "code_exists") {
            setAlertContent("State code exists");
            setAlertClass("alert alert-danger");
          }
          else if(response.status == 200) {
            setAddStateButtonStatus("Add state");
            setStateName("");
            setStateCode("");
          }

          fetchStates();
          
        } catch(error) {
          console.error("Error posting data:", error);
        }
      }
      else if (!stateName){
        setAlertContent("Enter state name");
        setAlertClass("alert alert-danger");
      }
      else if(!stateCode) {
        setAlertContent("Enter state code");
        setAlertClass("alert alert-danger");
      }
    };

    const fetchStates =  async (e) => {
      //alert(getStateUrl);
      try {
        const response = await axios.get(getStateUrl,   
            { withCredentials: true }
          )
          .then(function (response) {
            //alert(response.data[0].stateName);

            response.data.map(key => {
                stateOptionsArray.push({ value: key._id, label: key.stateName });           
            });

            stateOptionsArray.sort((a, b) => (a.label > b.label) ? 1 : -1)
            
            setStateOptions(stateOptionsArray);
          })
          .catch(function (error) {
            console.log(error);
          }); 

        
      } catch(error) {
        console.error("Error posting data:", error);
      }
    };


    // const handleTownSelection = (e) => {
    //   //alert(e.value);
    //   setTownNameSelectedID(e.value);
    //   setTownSelectedLabel(e.label)
    //   setTownSelectedValue(e.value)
    // }

    const addDistrict = async (e) => {
      //alert("Paulsin");
      
      if(stateNameSelectedID) {
        if(districtName && districtCode) {
          try {
            //alert("Paulsin");
            const response = await axios.post(
              addDistrictUrl,
              {
                "stateID": stateNameSelectedID,
                "districtName": districtName,    
                "districtCode": districtCode,
                "donebyUserId":loggedinuserid,
          "donebyUserName":loggedinusername,
          "donebyUserrole":loggedinuserRole
              }     
            );  

            //alert(response.data);

            if(response.data == "both_exists") {
              setAlertContent("District name and code exist");
              setAlertClass("alert alert-danger");
            }
            else if(response.data == "name_exists") {
              setAlertContent("District name exists");
              setAlertClass("alert alert-danger");
            }
            else if(response.data == "code_exists") {
              setAlertContent("District code exists");
              setAlertClass("alert alert-danger");
            }
            else if(response.status == 200) {
              setAddTownButtonStatus("Add district");
              setAlertContent("District added succesffully");
              setAlertClass("alert alert-success");
              setDistrictName("");
              setDistrictCode("");
            }

            fetchDistricts();
            
          } catch(error) {
            console.error("Error posting data:", error);
          }
        }
        else if (!districtName){
          setAlertContent("Enter district name");
          setAlertClass("alert alert-danger");
        }
        else if(!districtCode) {
          setAlertContent("Enter district code");
          setAlertClass("alert alert-danger");
        }
      }
      else {
        setAlertContent("Select state");
        setAlertClass("alert alert-danger");
      }
    };

    const addTown = async (e) => {
      //alert(districtNameSelectedID);
      
      if(stateNameSelectedID && districtNameSelectedID) {
        if(townName && townCode) {
          try {
            //alert("Paulsin");
            const response = await axios.post(
              addTownUrl,
              {
                "stateID": stateNameSelectedID,
                "districtID": districtNameSelectedID,
                "townName": townName,    
                "townCode": townCode,
                "donebyUserId":loggedinuserid,
          "donebyUserName":loggedinusername,
          "donebyUserrole":loggedinuserRole
              }     
            );  

            //alert(response.data);

            if(response.data == "both_exists") {
              setAlertContent("Town name and code exist");
              setAlertClass("alert alert-danger");
            }
            else if(response.data == "name_exists") {
              setAlertContent("Town name exists");
              setAlertClass("alert alert-danger");
            }
            else if(response.data == "code_exists") {
              setAlertContent("Town code exists");
              setAlertClass("alert alert-danger");
            }
            else if(response.status == 200) {
              setAddDistrictButtonStatus("Add town");
              setAlertContent("Town added succesffully");
              setAlertClass("alert alert-success");
              setDistrictName("");
              setDistrictCode("");
            }

            fetchTowns();
            
          } catch(error) {
            console.error("Error posting data:", error);
          }
        }
        else if (!townName){
          setAlertContent("Enter town name");
          setAlertClass("alert alert-danger");
        }
        else if(!townCode) {
          setAlertContent("Enter town code");
          setAlertClass("alert alert-danger");
        }
      }
      else if (!stateName) {
        setAlertContent("Select state");
        setAlertClass("alert alert-danger");
      }
      else if (!districtName) {
        setAlertContent("Select district");
        setAlertClass("alert alert-danger");
      }
    };

    const fetchDistricts =  async (e) => {
      try {
        const response = await axios.get(getDistrictUrl,   
            { withCredentials: true }
          )
          .then(function (response) {
            //alert(response.data[1].districtName);

            response.data.map(key => {
                districtOptionsArray.push({ value: key._id, label: key.districtName, stateID : key.stateID });           
            });

            if(operation === "new") {
              setDistrictOptions(districtOptionsArray);
            }
            
            setDistrictOptionsOriginal(districtOptionsArray);
          })
          .catch(function (error) {
            console.log(error);
          }); 
        
      } catch(error) {
        console.error("Error posting data:", error);
      }
    };

    const fetchTowns =  async (e) => {
      try {
        const response = await axios.get(getTownUrl,   
            { withCredentials: true }
          )
          .then(function (response) {
            //alert(response.data[1].districtName);

            response.data.map(key => {
                townOptionsArray.push({ value: key._id, label: key.townName, stateID : key.stateID, districtID : key.districtID });           
            });
            if(operation === "new") {
              setTownOptions(townOptionsArray);
            }
            setTownOptionsOriginal(townOptionsArray);
          })
          .catch(function (error) {
            console.log(error);
          }); 

        
      } catch(error) {
        console.error("Error posting data:", error);
      }
    };

    // const handlePropertySelection = (e) => {
    //   setPropertyTypeSelected(e.value);
    // }

    // const handleTransactionTypeSelection = (e) => {
    //   setTransactionTypeSelected(e.value);
    // }

      
    function getPropertyData(){
   
      //  alert(uniqueID)
      let districtOptionsload=[];
      let townOptionsload=[];
      axios.get(Url+"property/individualProperty/"+uniqueID)
      .then((res)=>{
        //alert(res.data.propertyStatus)
          
          setTransactionTypeSelected(res.data.transactionType)
          setPropertyTypeSelected(res.data.propertyType)
          setSelectedStateFunction(res.data.stateID)
          setNeworOld(res.data.newOrOld);
          setStateNameSelectedID(res.data.stateID);
          setDistrictNameSelectedID(res.data.districtID);
          setSelectedDistrictFunction(res.data.districtID)
          setSelectedTownFunction(res.data.townID)
          setTownNameSelectedID(res.data.townID)
          setLocalityName(res.data.locality)
          setCost(res.data.cost)
          setCosttype(res.data.costtype)
          setFacingPolarity(res.data.facing)
          setTotalNumberOfFloors(res.data.numberOfFloors)
          setPlotArea(res.data.plotArea)
          setBuiltArea(res.data.builtArea)
          setTotalVillas(res.data.totalVillas)
          setFloorNumber(res.data.floorNumber)
          setBedRooms(res.data.bedrooms)
          setBedRoomsWithToilet(res.data.bedroomsWithToilet)
          setToilets(res.data.toilets)
          
          setCarPorch(res.data.carPorch)
          setCarParking(res.data.carParking)
          setSitOut(res.data.sitout)
          setLivingArea(res.data.livingArea)
          setDiningHall(res.data.diningHall)
          setKitchen(res.data.kitchen)
          setWorkArea(res.data.workArea)
          setUpperLivingArea(res.data.upperLivingArea)
          setBalcony(res.data.balcony)
          setOpenTerrace(res.data.openTerrace)
          setWaterWell(res.data.waterWell)
          setWaterConnection(res.data.waterConnection)

          setGooglemap(res.data.googleMap)
          setVideolink(res.data.youtubeVideoLink)
          setPropertyTitle(res.data.propertyTitle)
          setPropertyFeature1(res.data.propertyFeature1)
          setPropertyFeature2(res.data.propertyFeature2)
          setPropertyFeature3(res.data.propertyFeature3)
          setPropertyFeature4(res.data.propertyFeature4)

          setPropertystatus(res.data.propertyStatus)

          // setOwnerselectedID(res.data.ownerOrBuilderID)
          // alert(res.data.ownerOrBuilderID)
          setSelectedOwnerFunction(res.data.ownerOrBuilderID)
          setPropertycount(res.data.ownerOrBuilderID)
          

          if(res.data.costType==="persquarefeet")
          {
            // alert("hhhhh")
            setCosttypeStatusChecked("persquarefeet")
          }
         
          else if(res.data.costType==="percent")
          {
            // alert("1111")
            setCosttypeStatusChecked("percent")

          }
          
          else if(res.data.costType==="default")
          {
            setCosttypeStatusChecked("default")

          }
           
            
          res.data.carPorch===true?setCarporchStatusChecked(true):setCarporchStatusChecked(false)
          res.data.sitout===true?setSitoutStatusChecked(true):setSitoutStatusChecked(false)
          res.data.livingArea===true?setLivingareaStatusChecked(true):setLivingareaStatusChecked(false)
          res.data.diningHall===true?setDininghallStatusChecked(true):setDininghallStatusChecked(false)
          res.data.kitchen===true?setKitchenStatusChecked(true):setKitchenStatusChecked(false)
          res.data.workArea===true?setWorkareaStatusChecked(true):setWorkareaStatusChecked(false)
          res.data.upperLivingArea===true?setUpperlivingareaStatusChecked(true):setUpperlivingareaStatusChecked(false)
          res.data.balcony===true?setBalconyStatusChecked(true):setBalconyStatusChecked(false)
          res.data.openTerrace===true?setOpenterraceStatusChecked(true):setOpenterraceStatusChecked(false)
          res.data.waterWell===true?setWaterwellStatusChecked(true):setWaterwellStatusChecked(false)
          res.data.waterConnection===true?setWaterconnectionStatusChecked(true):setWaterconnectionStatusChecked(false)
          axios
          .get(Url+"location/districts",
          )
        .then((res1) => {
          // alert(res1.data.districtID)
          res1.data.map(key => {
            // alert(stateid)
            //alert(key.stateID)
              if(key.stateID ===res.data.stateID) {
               //alert(key.label);
                districtOptionsload.push({ value: key._id, label:key.districtName,stateID:key.stateID });
              }
              //stateOptionsArray.push({ value: key._id, label: key.stateName });           
            });
        })
          
        setDistrictOptions(districtOptionsload); 
        
        axios
        .get(Url+"location/towns",
        )
        .then((res2) => {
          res2.data.map(key => {
              //alert(key.stateID)
            if(key.stateID == res.data.stateID && key.districtID === res.data.districtID) {
                //alert(key.label);
              townOptionsload.push({ value: key._id, label: key.townName, districtID:key.districtID,stateID:key.stateID });
            }
              //stateOptionsArray.push({ value: key._id, label: key.stateName });           
          });
        })
        setTownOptions(townOptionsload);    
      })
    }

    function  setPropertycount(selectedOwnerFuncount){
      var count=0;
      // alert(selectedOwnerFunParam)
      axios.get(Url+"property/properties")
      .then((res)=>{
        
        // alert(res.data)
      //  alert(res.data[0].ownerOrBuilderID)
        res.data.map(row=>{
        //  alert(row.ownerOrBuilderID)
          if(row.ownerOrBuilderID===selectedOwnerFuncount){
            // alert("123")
            count=count+1
        
          }
        })
        setNumberCount(count)
      })
    }

    function  setSelectedOwnerFunction(selectedOwnerFunParam){
      // alert(selectedOwnerFunParam)
        axios
        .get(Url+"property/ownersandbuilders",
        )
        .then((res) => {
          // let batchNumberOptionsInitial = "";
          // alert("anu")
          res.data.map(data => {
            //alert(data.ownerStatus)
              if(data._id === selectedOwnerFunParam && data.ownerStatus!="Draft") {
                  // alert("hjjj")
              setOwnerselectedLabel(data.contactNumber + "   " + data.name);
              setOwnerselectedValue(data._id);
              }
        });
    
      });
    }
  function setSelectedStateFunction(selectedStateFunParam) {
    var districtOptionsArrayTemp=[];
    //  alert(selectedStateFunParam);
    axios
      .get(Url+"location/states",
    )
      .then((res) => {
        // let batchNumberOptionsInitial = "";
        // alert("anu")
        res.data.map(data => {
            if(data._id === selectedStateFunParam) {
                // alert("hjjj")
            setStateSelectedLabel(data.stateName);
            setStateSelectedValue(data._id);
            }
      });
      
  
    });


}

function  setSelectedDistrictFunction(selectedDistrictFunParam){
  // alert(selectedDistrictFunParam)
    axios
    .get(Url+"location/districts",
    )
    .then((res) => {
      // let batchNumberOptionsInitial = "";
      // alert("anu")
      res.data.map(data => {
          if(data._id === selectedDistrictFunParam) {
              // alert("hjjj")
          setDistrictSelectedLabel(data.districtName);
          setDistrictSelectedValue(data._id);
          }
    });

  });
}

function  setSelectedTownFunction(selectedTownFunParam){
    // alert(selectedTownFunParam)
    axios
    .get(Url+"location/towns",
    )
    .then((res) => {
      // let batchNumberOptionsInitial = "";
      // alert("anu")
      res.data.map(data => {
          if(data._id === selectedTownFunParam) {
              // alert("hjjj")
          setTownSelectedLabel(data.townName);
          setTownSelectedValue(data._id);
          }
    });

  });
}
// function getDistrictsonload(){
//   const districtOptionsload=[]
 
// }

useEffect(() => {
  //console.log('i fire once');
  //setItems(data);

  fetchStates();

  fetchDistricts();
  fetchTowns(); 
  fetchLoggedDataForPropertySubmission();

  // fetchOwnerdetails();


  if(operation=="edit"){
    getPropertyData();
  }
  //test();

}, []);

// function handleradioChange(event) {
// //alert(event.target.value)
//   setCosttypeStatusChecked(event.target.value);
// }


    if(operation=="new"){


      var addstatelabelwidget= <label for="inputPassword3" class="col-sm-2 col-form-label">Add a state</label>
      var addstatenamewidget= <input type="name" class="form-control" id="name" placeholder="Enter state name" name="name" value={stateName} required onChange={(e) => setStateName(e.target.value)}/>
      var addstatecodewidget=<input type="name" class="form-control" id="name" placeholder="Enter state code" name="name" value={stateCode} required onChange={(e) => setStateCode(e.target.value)}/>
      var addstatebuttonwidget=<button type="submit" class="btn btn-primary" onClick={addState}>{addStateButtonStatus}</button>

      // var districtwidget=  <Select

      //   onChange={handleDistrictSelection}
      //   options={districtOptions}
      // />
      var adddistrictlabelwidget=  <label for="inputPassword3" class="col-sm-2 col-form-label">Add a district</label>
      var adddistrictnamewidget=  <input type="name" class="form-control" value={districtName} placeholder="Enter district name" name="name" required onChange={(e) => setDistrictName(e.target.value)}/>
      var adddistrictcodewidget=  <input type="name" class="form-control" value={districtCode} placeholder="Enter district code" name="name" required onChange={(e) => setDistrictCode(e.target.value)}/>
      var adddistrictbuttonwidget=<button type="submit" class="btn btn-primary" onClick={addDistrict}>{addDistrictButtonStatus}</button>

      // var townwidget=  <Select
      // //defaultValue={{ value: 'Rent', label: 'Rent' }}
      // //onChange={handleSubmit}
      //   onChange={handleTownSelection}
      //   options={townOptions}
      // />

      var addtownlabelwidget= <label for="inputPassword3" class="col-sm-2 col-form-label">Add a town</label>
      var addtownnamewidget= <input type="text" class="form-control" value={townName} placeholder="Enter town name" required onChange={(e) => setTownName(e.target.value)}/>
      var addtowncodewidget=<input type="text" class="form-control" value={townCode} placeholder="Enter town code" required onChange={(e) => setTownCode(e.target.value)}/>
      var addtownbuttonwidget=<button type="submit" class="btn btn-primary" onClick={addTown}>{addTownButtonStatus}</button>

      var localitywidget= <input type="text" class="form-control" placeholder="Enter locality name" value={localityName} required onChange={(e) => setLocalityName(e.target.value)}/>
      var costwidget=<input type="text" class="form-control" placeholder="Enter cost" required onChange={(e) => setCost(e.target.value)}/>
      var costradio1=<input type="radio" value="default"    onChange={(e) =>setCosttypeStatusChecked(e.target.value)} checked={costtypeStatusChecked==="default"}/>
      var costradio2=<input type="radio" value="percent"  onChange={(e) =>setCosttypeStatusChecked(e.target.value)} checked={costtypeStatusChecked==="percent"} />
      var costradio3=<input type="radio" value="persquarefeet"   onChange={(e) =>setCosttypeStatusChecked(e.target.value)} checked={costtypeStatusChecked==="persquarefeet"} />
    //selectedRadioCostOption === 'percent'

    }

    else if(operation=="edit"){
     


      var addstatelabelwidget= <label for="inputPassword3" class="col-sm-2 col-form-label">Add a state</label>
      var addstatenamewidget= <input type="name" class="form-control" id="name" placeholder="Enter state name" name="name" value={stateName} required onChange={(e) => setStateName(e.target.value)}/>
      var addstatecodewidget=<input type="name" class="form-control" id="name" placeholder="Enter state code" name="name" value={stateCode} required onChange={(e) => setStateCode(e.target.value)}/>
      var addstatebuttonwidget=<button type="submit" class="btn btn-primary" onClick={addState}>{addStateButtonStatus}</button>
      // var districtwidget= <Select

      //   value={{label:districtSelectedLabel, value:districtSelectedValue}}
      //   onChange={handleDistrictSelection}
      //   options={districtOptions}
      // />
      var adddistrictlabelwidget=  <label for="inputPassword3" class="col-sm-2 col-form-label">Add a district</label>
      var adddistrictnamewidget=  <input type="name" class="form-control" value={districtName} placeholder="Enter district name" name="name" required onChange={(e) => setDistrictName(e.target.value)}/>
      var adddistrictcodewidget=  <input type="name" class="form-control" value={districtCode} placeholder="Enter district code" name="name" required onChange={(e) => setDistrictCode(e.target.value)}/>
      var adddistrictbuttonwidget=<button type="submit" class="btn btn-primary" onClick={addDistrict}>{addDistrictButtonStatus}</button>
      // var townwidget= <Select
      // //defaultValue={{ value: 'Rent', label: 'Rent' }}
      // //onChange={handleSubmit}
      //   onChange={handleTownSelection}
      //   value={{label:townSelectedLabel, value:townSelectedValue}}
      //   options={townOptions}
      // />
      var addtownlabelwidget= <label for="inputPassword3" class="col-sm-2 col-form-label">Add a town</label>
      var addtownnamewidget= <input type="text" class="form-control" value={townName} placeholder="Enter town name" required onChange={(e) => setTownName(e.target.value)}/>
      var addtowncodewidget=<input type="text" class="form-control" value={townCode} placeholder="Enter town code" required onChange={(e) => setTownCode(e.target.value)}/>
      var addtownbuttonwidget=<button type="submit" class="btn btn-primary" onClick={addTown}>{addTownButtonStatus}</button>

      var localitywidget= <input type="text" class="form-control"  value={localityName} required onChange={(e) => setLocalityName(e.target.value)}/>
      var costwidget=<input type="text" class="form-control"  value={cost} required onChange={(e) => setCost(e.target.value)}/>
      var costradio1=<input type="radio" value="default"  onChange={(e) =>setCosttypeStatusChecked(e.target.value)}  checked={costtypeStatusChecked==="default"} />
      var costradio2=<input type="radio" value="percent" onChange={(e) =>setCosttypeStatusChecked(e.target.value)} checked={costtypeStatusChecked==="percent"} />
      var costradio3=<input type="radio" value="persquarefeet"  onChange={(e) =>setCosttypeStatusChecked(e.target.value)} checked={costtypeStatusChecked==="persquarefeet"} />
      
    }
    return(

    <div>
         <Suspense><AppNavbar /></Suspense>

        <div class="container mt-3">

            <h3>Property details</h3>
            <br/>

            <div class={alertClass} role="alert">
              {alertContent}
            </div>

            <div class="row mb-3">
                <label for="inputPassword3" class="col-sm-2 col-form-label">Property type</label>

                <div class="col-sm-5">
                  <Suspense>
                    <AddPropertyTypesAsComponent setPropertyTypeSelected={setPropertyTypeSelected} propertyTypeSelected={propertyTypeSelected} operation={operation} />
                  </Suspense> 
                </div>

            </div>


            <div class="row mb-3">
                <label for="inputPassword3" class="col-sm-2 col-form-label">Sale / Rent</label>

                <div class="col-sm-5">
                  <Suspense>
                    <AddPropertyTransactionTypeAsComponent setTransactionTypeSelected={setTransactionTypeSelected} transactionTypeSelected={transactionTypeSelected} operation={operation}/>
                  </Suspense> 
                </div>
            </div>
       
            <div class="row mb-3">
                <label for="inputPassword3" class="col-sm-2 col-form-label">State</label>

                <div class="col-sm-5">
                  <Suspense>
                    <AddPropertyStatesAsComponent stateOptions={stateOptions} setStateNameSelectedID={setStateNameSelectedID} setStateSelectedLabel={setStateSelectedLabel} 
                    setStateSelectedValue={setStateSelectedValue} stateSelectedLabel={stateSelectedLabel} stateSelectedValue={stateSelectedValue}
                    districtOptionsOriginal={districtOptionsOriginal} setDistrictOptions={setDistrictOptions} operation={operation} setDistrictSelectedLabel={setDistrictSelectedLabel} 
                    setDistrictSelectedValue={setDistrictSelectedValue} setTownSelectedLabel={setTownSelectedLabel} setTownSelectedValue={setTownSelectedValue} />
                  </Suspense> 

                </div>
            </div>

            <div class="row mb-3">
               {addstatelabelwidget}

                <div class="col-sm-5">
                 {addstatenamewidget}
                </div>

                <div class="col-sm-3">
                  {addstatecodewidget}
                </div>

                <div class="col-sm-2">
                  {addstatebuttonwidget}
                </div>
            </div>


            <div class="row mb-3">
                <label for="inputPassword3" class="col-sm-2 col-form-label">District</label>
             
                <div class="col-sm-5">
                {/* {districtwidget} */}
                <Suspense>
                  <AddPropertyDistrictsAsComponent districtOptions={districtOptions} setDistrictNameSelectedID={setDistrictNameSelectedID} setDistrictSelectedLabel={setDistrictSelectedLabel} setDistrictSelectedValue={setDistrictSelectedValue}
                  townOptionsOriginal={townOptionsOriginal} setTownOptions={setTownOptions} setStateNameSelectedID={setStateNameSelectedID} stateNameSelectedID={stateNameSelectedID} operation={operation} districtSelectedLabel={districtSelectedLabel}
                   districtSelectedValue={districtSelectedValue} setTownSelectedLabel={setTownSelectedLabel} setTownSelectedValue={setTownSelectedValue}
                   />
                </Suspense>
                </div>
            </div>

            <div class="row mb-3">
              {adddistrictlabelwidget}

                <div class="col-sm-5">
                  {adddistrictnamewidget}
                </div>

                <div class="col-sm-3">
                  {adddistrictcodewidget}
                </div>

                <div class="col-sm-2">
                  {adddistrictbuttonwidget}
                </div>
            </div>

            <div class="row mb-3">
                <label for="inputPassword3" class="col-sm-2 col-form-label">Town</label>

                <div class="col-sm-5">
                  {/* {townwidget} */}
                  <Suspense>
                    <AddPropertyTownsAsComponent townOptions={townOptions} setTownNameSelectedID={setTownNameSelectedID} setTownSelectedLabel={setTownSelectedLabel} setTownSelectedValue={setTownSelectedValue}
                    operation={operation} townSelectedLabel={townSelectedLabel} townSelectedValue={townSelectedValue}/>
                  </Suspense>
                </div>
            </div>

            <div class="row mb-3">
                {addtownlabelwidget}

                <div class="col-sm-5">
                  {addtownnamewidget}
                </div>

                <div class="col-sm-3">
                  {addtowncodewidget}
                </div>

                <div class="col-sm-2">
                  {addtownbuttonwidget}
                </div>
            </div>

            <div class="row mb-3">
                <label for="inputPassword3" class="col-sm-2 col-form-label">Locality</label>

                <div class="col-sm-5">
                 
                  {localitywidget}
                </div>
            </div>
            <div class="row mb-3">
                <label for="inputPassword3" class="col-sm-2 col-form-label">Cost</label>

                <div class="col-sm-3">
                  {costwidget}
                </div>

                <div class="col-sm-2">
                  {costradio1}&nbsp;Default
                </div>

                <div class="col-sm-2">
                  {costradio2}&nbsp;Per Cent
                </div>
                <div class="col-sm-2">
                  {costradio3}&nbsp; Per Squarefeet
                </div>
            </div>
   
      
            <Suspense>
              <AddPropertyAttributesAsComponent setPropertyTypeSelected={setPropertyTypeSelected} propertyTypeSelected={propertyTypeSelected} operation={operation} 
              setAlertContent={setAlertContent } setAlertClass={setAlertClass} transactionTypeSelected={transactionTypeSelected} newOrOld={newOrOld} setNeworOld={setNeworOld} stateNameSelectedID={stateNameSelectedID} districtNameSelectedID={districtNameSelectedID} 
              townNameSelectedID={townNameSelectedID} localityName={localityName} cost={cost} stateSelectedValue={stateSelectedValue} districtSelectedValue={districtSelectedValue} townSelectedValue={townSelectedValue} uniqueID={uniqueID}
              setFacingPolarity={setFacingPolarity} setTotalNumberOfFloors={setTotalNumberOfFloors} setPlotArea={setPlotArea} setBuiltArea={setBuiltArea}
              setTotalVillas={setTotalVillas} setFloorNumber={setFloorNumber} setBedRooms={setBedRooms} setBedRoomsWithToilet={setBedRoomsWithToilet}
              setToilets={setToilets} setCarPorch={setCarPorch} setCarParking={setCarParking} setSitOut={setSitOut} setLivingArea={setLivingArea}
              setDiningHall={setDiningHall} setKitchen={setKitchen} setWorkArea={setWorkArea} setUpperLivingArea={setUpperLivingArea} setBalcony={setBalcony}
              setOpenTerrace={setOpenTerrace} setWaterWell={setWaterWell} setWaterConnection={setWaterConnection} facing={facing} totalNumberOfFloors={totalNumberOfFloors} plotarea={plotarea} builtArea={builtArea}
              totalVillas={totalVillas} floorNumber={floorNumber} bedRooms={bedRooms} bedRoomsWithToilet={bedRoomsWithToilet} toilets={toilets} carPorch={carPorch} carParking={carParking}
              sitOut={sitOut} livingArea={livingArea} diningHall={diningHall} kitchen={kitchen} workArea={workArea} upperLivingArea={upperLivingArea}
              balcony={balcony} openTerrace={openTerrace} waterWell={waterWell} waterConnection={waterConnection}
              setCarporchStatusChecked={setCarporchStatusChecked}  setSitoutStatusChecked={setSitoutStatusChecked} setLivingareaStatusChecked={setLivingareaStatusChecked} setDininghallStatusChecked={setDininghallStatusChecked}
              setKitchenStatusChecked={setKitchenStatusChecked} setWorkareaStatusChecked={setWorkareaStatusChecked} setUpperlivingareaStatusChecked={setUpperlivingareaStatusChecked} setBalconyStatusChecked={setBalconyStatusChecked}
              setOpenterraceStatusChecked={setOpenterraceStatusChecked} setWaterwellStatusChecked={setWaterwellStatusChecked} setWaterconnectionStatusChecked={setWaterconnectionStatusChecked}
              carporchStatusChecked={carporchStatusChecked} sitoutStatusChecked={sitoutStatusChecked} livingareaStatusChecked={livingareaStatusChecked} dininghallStatusChecked={dininghallStatusChecked}
              kitchenStatusChecked={kitchenStatusChecked} workareaStatusChecked={workareaStatusChecked} upperlivingareaStatusChecked={upperlivingareaStatusChecked}
              balconyStatusChecked={balconyStatusChecked} openterraceStatusChecked={openterraceStatusChecked} waterwellStatusChecked={waterwellStatusChecked} waterconnectionStatusChecked={waterconnectionStatusChecked}
              costtypeStatusChecked={costtypeStatusChecked} setCosttypeStatusChecked={setCosttypeStatusChecked} googlemap={googlemap} videolink={videolink} propertyTitle={propertyTitle} propertyfeature1={propertyfeature1} propertyfeature2={propertyfeature2}
              propertyfeature3={propertyfeature3} propertyfeature4={propertyfeature4} setGooglemap={setGooglemap} setVideolink={setVideolink} setPropertyTitle={setPropertyTitle} setPropertyFeature1={setPropertyFeature1}
              setPropertyFeature2={setPropertyFeature2} setPropertyFeature3={setPropertyFeature3} setPropertyFeature4={setPropertyFeature4} owneroptions={owneroptions}
              ownerSelectedLabel={ownerSelectedLabel} ownerSelectedValue={ownerSelectedValue} setOwnerSelectedLabel={setOwnerselectedLabel} setOwnerSelectedValue={setOwnerselectedValue} setOwneroptions={setOwneroptions}
              propertyStatus={propertyStatus} setPropertystatus={setPropertystatus} numbercount={numbercount} setNumberCount={setNumberCount} 
              />  
            </Suspense>

          
        </div>

         
    </div>

    )
};

export default AddProperty;