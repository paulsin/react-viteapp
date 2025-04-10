
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { facingPolarity } from "../../constants/global";
import { PropertyStatusOptions } from "../../constants/global";
import { neworOldType } from "../../constants/global";
import Select from 'react-select';
import axios from "axios";
import { Url } from "../../constants/global";
import { OwnerorBuilderorDeveloper } from "../../constants/global";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
var addPropertyURL = Url + 'property/addProperty';
var addOwnerURL = Url + 'property/addOwnerOrBuilder';
var getownerdetailsurl=Url + 'property/ownersandbuilders';

var loggedCheckUrl = Url + 'accounts/loggedInUser';
 
const AddPropertyAttributesAsComponent = ({setPropertyTypeSelected,propertyTypeSelected, operation,setAlertContent,setAlertClass,
  transactionTypeSelected,newOrOld,setNeworOld,stateNameSelectedID,districtNameSelectedID,townNameSelectedID,localityName,cost,stateSelectedValue,districtSelectedValue,townSelectedValue,uniqueID,
  setFacingPolarity, setTotalNumberOfFloors,setPlotArea, setBuiltArea,setTotalVillas, setFloorNumber,setBedRooms, setBedRoomsWithToilet,
  setToilets,setCarPorch,setCarParking,setSitOut,setLivingArea,setDiningHall,setKitchen,setWorkArea,setUpperLivingArea,setBalcony,setOpenTerrace,setWaterWell,
  setWaterConnection,facing,totalNumberOfFloors,plotarea,builtArea,totalVillas,floorNumber,bedRooms,bedRoomsWithToilet,toilets,carPorch,carParking,
  sitOut,livingArea,diningHall,kitchen,workArea, upperLivingArea,balcony,openTerrace, waterWell,waterConnection,setCarporchStatusChecked,setSitoutStatusChecked,setLivingareaStatusChecked,setDininghallStatusChecked,
  setKitchenStatusChecked,setWorkareaStatusChecked,setUpperlivingareaStatusChecked,setBalconyStatusChecked,
  setOpenterraceStatusChecked, setWaterwellStatusChecked,setWaterconnectionStatusChecked,carporchStatusChecked,sitoutStatusChecked,livingareaStatusChecked, dininghallStatusChecked,
  kitchenStatusChecked,workareaStatusChecked,upperlivingareaStatusChecked,balconyStatusChecked,openterraceStatusChecked,waterwellStatusChecked,waterconnectionStatusChecked,
  costtypeStatusChecked,setCosttypeStatusChecked,googlemap,videolink,propertyTitle, propertyfeature1,propertyfeature2,propertyfeature3,propertyfeature4,setGooglemap,setVideolink,setPropertyTitle,
  setPropertyFeature1,setPropertyFeature2,setPropertyFeature3,setPropertyFeature4,owneroptions,ownerSelectedLabel,ownerSelectedValue,setOwnerSelectedLabel, setOwnerSelectedValue,setOwneroptions,
  propertyStatus,setPropertystatus,numbercount,setNumberCount
}) => {
 

   const [isNeworOldDisabled, setIsNeworOldDisabled] = useState(false);
   const [isFacingPolarityDisabled, setIsFacingPolarityDisabled] = useState(false);
   const [isTotalNumberOfFloorsDisabled, setIsTotalNumberOfFloorsDisabled] = useState(false);
   const [isBuiltAreaDisabled, setIsBuiltAreaDisabled] = useState(false);
   const [isPlotAreaDisabled, setIsPlotAreaDisabled] = useState(false);
   const [isTotalVillasDisabled, setIsTotalVillasDisabled] = useState(false);
   const [isFloorNumberDisabled, setIsFloorNumberDisabled] = useState(false);
   const [isBedRoomsDisabled, setIsBedRoomsDisabled] = useState(false);
   const [isBedRoomsWithToiletDisabled, setIsBedRoomsWithToiletDisabled] = useState(false);
   const [isToiletsDisabled, setIsToiletsDisabled] = useState(false);

   const [isCarPorchDisabled, setIsCarPorchDisabled] = useState(false);
   const [isCarParkingDisabled, setIsCarParkingDisabled] = useState(false);
   const [isSitOutDisabled, setIsSitOutDisabled] = useState(false);
   const [isLivingAreaDisabled, setIsLivingAreaDisabled] = useState(false);
   const [isDiningHallDisabled, setIsDiningHallDisabled] = useState(false);
   const [isKitchenDisabled, setIsKitchenDisabled] = useState(false);
   const [isWorkAreaDisabled, setIsWorkAreaDisabled] = useState(false);
   const [isUpperLivingAreaDisabled, setIsUpperLivingAreaDisabled] = useState(false);
   const [isBalconyDisabled, setIsBalconyDisabled] = useState(false);
   const [isOpenTerraceDisabled, setIsOpenTerraceDisabled] = useState(false);
   const [isWaterWellDisabled, setIsWaterWellDisabled] = useState(false);
   const [isWaterConnectionDisabled, setIsWaterConnectionDisabled] = useState(false);
  
   const [phonenumber1,setPhonenumber1]=useState("");
   const [phonenumber2,setPhonenumber2]=useState("");
   const [ownerorbuilderselection,setOwnerorBuilderselection]=useState("");
   const [ownername,setOwnername]=useState("");
   const [owneraddress,setOwneraddress]=useState("");
   const [alertownerclass, setAlertOwnerClass] = useState("alert alert-info");
  const [alertOwnerContent, setAlertOwnerContent] = useState("Enter the owner details");
  const [loggedUserIDforPropertySubmission, setLoggedUserIDforPropertySubmission] = useState("");
  const[loggedinusername,setLoggedusername]=useState("");
  const[loggedinuserid,setLoggeduserId]=useState("");
  const[loggedinuserRole,setLoggeduserRole]=useState("");
  //const [selectedOption, setSelectedOption] = useState(propertyStatus[1]); 
    

  var owneroptionsarray=[];

   

    // var owneroptionsarray=[];
    const handleFacingSelection = (e) => {
      // alert(e.value)
      setFacingPolarity(e.value); 
      
    }
    const handlePropertyStatusSelection = (e) => {
      //alert(e.value)
      setPropertystatus(e.value); 
      
    }
    
    const handleOwnerorDeveloperSelection = (e) => {
      //  alert(e.value)
      var counter=0;
      setOwnerSelectedValue(e.value)
      setOwnerSelectedLabel(e.label)
     
      axios.get(Url+"property/properties")
      .then((res)=>{
        
        // alert(res.data)
        // alert(res.data[0].ownerOrBuilderID)
        res.data.map(row=>{
          // alert(row.ownerOrBuilderID)
          if(row.ownerOrBuilderID===e.value){
            // alert("123")
            counter=counter+1
         
          }
        })
        setNumberCount(counter)
      })
   
    }
    
    const handleBuilderorDeveloperSelection = (e) => {
     //alert(e.value)
     setOwnerorBuilderselection(e.value); 
      
    }
    



    useMemo(() => {
      // alert("haiii")
      // alert(propertyTypeSelected)
      if(propertyTypeSelected === "Villa") {
        setFloorNumber("");
        setIsFloorNumberDisabled(true);
        setIsNeworOldDisabled(false);
        setIsFacingPolarityDisabled(false);
        setIsTotalNumberOfFloorsDisabled(false);
        setIsBuiltAreaDisabled(false);
        setIsPlotAreaDisabled(false);
        setIsTotalVillasDisabled(false);
        setIsBedRoomsDisabled(false);
        setIsBedRoomsWithToiletDisabled(false);
        setIsToiletsDisabled(false);
        setIsCarPorchDisabled(false);
        setIsCarParkingDisabled(false);
        setIsSitOutDisabled(false);
        setIsLivingAreaDisabled(false);
        setIsDiningHallDisabled(false);
        setIsKitchenDisabled(false);
        setIsWorkAreaDisabled(false);
        setIsUpperLivingAreaDisabled(false);
        setIsBalconyDisabled(false);
        setIsOpenTerraceDisabled(false);
        setIsWaterWellDisabled(false);
        setIsWaterConnectionDisabled(false);

      }
      else if(propertyTypeSelected === "House") {
        setFloorNumber("");
        setTotalVillas("");
        setIsFloorNumberDisabled(true);
        setIsNeworOldDisabled(false);
        setIsFacingPolarityDisabled(false);
        setIsTotalNumberOfFloorsDisabled(false);
        setIsBuiltAreaDisabled(false);
        setIsPlotAreaDisabled(false);
        setIsTotalVillasDisabled(true);
        setIsBedRoomsDisabled(false);
        setIsBedRoomsWithToiletDisabled(false);
        setIsToiletsDisabled(false);
        setIsCarPorchDisabled(false);
        setIsCarParkingDisabled(false);
        setIsSitOutDisabled(false);
        setIsLivingAreaDisabled(false);
        setIsDiningHallDisabled(false);
        setIsKitchenDisabled(false);
        setIsWorkAreaDisabled(false);
        setIsUpperLivingAreaDisabled(false);
        setIsBalconyDisabled(false);
        setIsOpenTerraceDisabled(false);
        setIsWaterWellDisabled(false);
        setIsWaterConnectionDisabled(false);
      }
      else if(propertyTypeSelected === "Apartment") {
        setPlotArea("");
        setTotalVillas("");
        setCarporchStatusChecked(false)
        setWaterconnectionStatusChecked(false);
        setWaterwellStatusChecked(false);

        setIsFloorNumberDisabled(false);
        setIsNeworOldDisabled(false);
        setIsFacingPolarityDisabled(false);
        setIsTotalNumberOfFloorsDisabled(false);
        setIsBuiltAreaDisabled(false);
        setIsPlotAreaDisabled(true);
        setIsTotalVillasDisabled(true);
        setIsBedRoomsDisabled(false);
        setIsBedRoomsWithToiletDisabled(false);
        setIsToiletsDisabled(false);
        setIsCarPorchDisabled(true);
        setIsCarParkingDisabled(false);
        setIsSitOutDisabled(false);
        setIsLivingAreaDisabled(false);
        setIsDiningHallDisabled(false);
        setIsKitchenDisabled(false);
        setIsWorkAreaDisabled(false);
        setIsUpperLivingAreaDisabled(false);
        setIsBalconyDisabled(false);
        setIsOpenTerraceDisabled(false);
        setIsWaterWellDisabled(true);
        setIsWaterConnectionDisabled(true);

      }
      else if(propertyTypeSelected === "Flat") {
        setPlotArea("");
        setTotalVillas("");
        setCarporchStatusChecked(false)
        setWaterconnectionStatusChecked(false);
        setWaterwellStatusChecked(false);

        setIsFloorNumberDisabled(false);
        setIsNeworOldDisabled(false);
        setIsFacingPolarityDisabled(false);
        setIsTotalNumberOfFloorsDisabled(false);
        setIsBuiltAreaDisabled(false);
        setIsPlotAreaDisabled(true);
        setIsTotalVillasDisabled(true);
        setIsBedRoomsDisabled(false);
        setIsBedRoomsWithToiletDisabled(false);
        setIsToiletsDisabled(false);
        setIsCarPorchDisabled(true);
        setIsCarParkingDisabled(false);
        setIsSitOutDisabled(false);
        setIsLivingAreaDisabled(false);
        setIsDiningHallDisabled(false);
        setIsKitchenDisabled(false);
        setIsWorkAreaDisabled(false);
        setIsUpperLivingAreaDisabled(false);
        setIsBalconyDisabled(false);
        setIsOpenTerraceDisabled(false);
        setIsWaterWellDisabled(true);
        setIsWaterConnectionDisabled(true);
      }
      else if(propertyTypeSelected === "Plot") {
        setBuiltArea("");
        setTotalNumberOfFloors("");
        setTotalVillas("");
        setFloorNumber("");
        setBedRooms("");
        setBedRoomsWithToilet("");
        setToilets("");
        setCarporchStatusChecked(false)
        setCarParking("");
        setNeworOld("");
       
        setSitoutStatusChecked(false);
        setLivingareaStatusChecked(false);
        setDininghallStatusChecked(false);
        setKitchenStatusChecked(false);
        setWorkareaStatusChecked(false);
        setUpperlivingareaStatusChecked(false);
        setBalconyStatusChecked(false);
        setOpenterraceStatusChecked(false);

       
        setIsFacingPolarityDisabled(false);
        setIsTotalNumberOfFloorsDisabled(true);
        setIsNeworOldDisabled(true);
        setIsBuiltAreaDisabled(true);
        setIsTotalVillasDisabled(true);
        setIsPlotAreaDisabled(false);
        setIsFloorNumberDisabled(true);
        setIsBedRoomsDisabled(true);
        setIsBedRoomsWithToiletDisabled(true);
        setIsToiletsDisabled(true);
        setIsCarPorchDisabled(true);
        setIsCarParkingDisabled(true);
        setIsSitOutDisabled(true);
        setIsLivingAreaDisabled(true);
        setIsDiningHallDisabled(true);
        setIsKitchenDisabled(true);
        setIsWorkAreaDisabled(true);
        setIsUpperLivingAreaDisabled(true);
        setIsBalconyDisabled(true);
        setIsOpenTerraceDisabled(true);
        setIsWaterWellDisabled(false);
        setIsWaterConnectionDisabled(false);
      }
      else if(propertyTypeSelected === "Land") {

        setBuiltArea("");
        setTotalNumberOfFloors("");
        setTotalVillas("");
        setFloorNumber("");
        setBedRooms("");
        setBedRoomsWithToilet("");
        setToilets("");
        setCarporchStatusChecked(false);
        setCarParking("");
        setNeworOld("");
        setSitoutStatusChecked(false);
        setLivingareaStatusChecked(false);
        setDininghallStatusChecked(false);
        setKitchenStatusChecked(false);
        setWorkareaStatusChecked(false);
        setUpperlivingareaStatusChecked(false);
        setBalconyStatusChecked(false);
        setOpenterraceStatusChecked(false);
        
        setIsNeworOldDisabled(true);
        setIsFacingPolarityDisabled(false);
        setIsTotalNumberOfFloorsDisabled(true);
        setIsBuiltAreaDisabled(true);
        setIsTotalVillasDisabled(true);
        setIsPlotAreaDisabled(false);
        setIsFloorNumberDisabled(true);
        setIsBedRoomsDisabled(true);
        setIsBedRoomsWithToiletDisabled(true);
        setIsToiletsDisabled(true);
        setIsCarPorchDisabled(true);
        setIsCarParkingDisabled(true);
        setIsSitOutDisabled(true);
        setIsLivingAreaDisabled(true);
        setIsDiningHallDisabled(true);
        setIsKitchenDisabled(true);
        setIsWorkAreaDisabled(true);
        setIsUpperLivingAreaDisabled(true);
        setIsBalconyDisabled(true);
        setIsOpenTerraceDisabled(true);
        setIsWaterWellDisabled(false);
        setIsWaterConnectionDisabled(false);

       
      }
    }, [propertyTypeSelected])

    
    const submitOwnerdata = async (e) => {
      var addressflag=true;
      var ownerorbuilderflag=true;
      var ownernameflag=true;
      var contactnumberflag=true;

      if(owneraddress===""){
        setAlertOwnerClass("alert alert-danger");
        setAlertOwnerContent("Enter Address Of Owner");
        addressflag = false;
      }
      if(ownername===""){
        setAlertOwnerClass("alert alert-danger");
        setAlertOwnerContent("Enter Name Of Owner");
        ownernameflag = false;
      }
      if(ownerorbuilderselection===""){
        setAlertOwnerClass("alert alert-danger");
        setAlertOwnerContent("Select Owner Or Builder Or Developer");
        ownerorbuilderflag = false;
      }
      if(phonenumber1===""){
        setAlertOwnerClass("alert alert-danger");
        setAlertOwnerContent("Enter Contact Number Of Owner");
        contactnumberflag= false;
      }
      if(addressflag &&ownernameflag && ownerorbuilderflag && contactnumberflag
      )
      {
          // 
        try {
          // alert(bedRoomsWithToilet);
      
      
            const response = await axios.post(
              addOwnerURL,
              {
                "contactNumber": phonenumber1,    
                "secondNumber": phonenumber2,
                "ownerOrBuilder": ownerorbuilderselection,
                "name": ownername,
                "address": owneraddress,
                "donebyUserId":loggedinuserid,
                "donebyUserName":loggedinusername,
                "donebyUserrole":loggedinuserRole
              }     
            );  
             if(response.data == "both_exists") {
                setAlertOwnerContent("First Number and Second Number exists");
                setAlertOwnerClass("alert alert-danger");
              }
            else if(response.data == "firstnumber_exists") {
              setAlertOwnerContent("First Number exists");
              setAlertOwnerClass("alert alert-danger");
            }
            else if(response.data == "secondnumber_exists") {
              setAlertOwnerContent("Second Number exists");
              setAlertOwnerClass("alert alert-danger");
            }
            else  {
             
              setAlertOwnerClass("alert alert-success");
              setAlertOwnerContent("Data Submitted Successfully");
             
            }
            
            fetchOwnerdetails();
            //alert(response.data);

        } catch(error) {
            console.error("Error posting data:", error);
        }
        // setAlertOwnerClass("alert alert-success");
        // setAlertOwnerContent("Data Submitted Successfully");
      }
    }
    const submitProperty = async (e) => {
      //alert("Paulsin");
      //alert(stateNameSelectedID);
      //alert(districtNameSelectedID);
      //alert(townNameSelectedID);
      //alert();
      var postflag=false

      var propertyAttrbutesFlag = true;
      var propertyTypeSelectedFlag = true;
      var stateNameSelectedIDFlag = true;
      var districtNameSelectedIDFlag = true;
      var townNameSelectedIDFlag = true;
      var transactionTypeSelectedFlag = true;
      var neworoldSelectedFlag =true;
      var localityFlag =true;
      var costFlag=true;
      var facingPolarityFlag=true;

      var plotareaFlag = true;
      var builtAreaFlag = true;
      var totalNumberOfFloorsFlag = true;
      var totalVillasFlag = true;
      var bedroomFlag =true;
      var bedroomwithToiletFlag=true;
      var toiletsFlag=true;
      var carParkingFlag=true;
      var floorNumberFlag=true;
      var propertytitleflag=true;
      var propertyfeature1flag=true;
      var propertybuilderflag=true;

      if(ownerSelectedValue===""){
        setAlertClass("alert alert-danger");
        setAlertContent("Enter Property Buildername");
        propertybuilderflag = false;
      }
     if(propertyfeature1 === "") {
        //alert("Paulsin");
        setAlertClass("alert alert-danger");
        setAlertContent("Enter Property Feature");
        propertyfeature1flag = false;
    }  
    if(propertyTitle === "") {
        //alert("Paulsin");
        setAlertClass("alert alert-danger");
        setAlertContent("Enter Property Title");
        propertytitleflag = false;
    }
  
    if(propertyTypeSelected === "House") {
      if(carParking === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter CarParking");
        carParkingFlag = false;
      }


      if(toilets === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter Toilet Number");
        toiletsFlag = false;
      }

      
      if(bedRoomsWithToilet === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter Bedroom With Toilet Number");
        bedroomwithToiletFlag = false;
      }

      
      if(bedRooms === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter Bedroom Number");
        bedroomFlag = false;
      }

      if(plotarea === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter plot area");
        plotareaFlag = false;
      }

      if(builtArea === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter built area");
        builtAreaFlag = false;
      }

      if(totalNumberOfFloors === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter number of floors");
        totalNumberOfFloorsFlag = false;
      }
        if(newOrOld === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Select Wheather It Is Old Or Not");
        neworoldSelectedFlag= false;
      }


      if(!carParkingFlag || !toiletsFlag || !bedroomwithToiletFlag || !bedroomFlag || !plotareaFlag || !builtAreaFlag || !totalNumberOfFloorsFlag || !neworoldSelectedFlag) {
        propertyAttrbutesFlag = false;
      }

    }
    else if(propertyTypeSelected === "Villa") {
      if(carParking === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter CarParking");
        carParkingFlag = false;
      }


      if(toilets === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter Toilet Number");
        toiletsFlag = false;
      }

      
      if(bedRoomsWithToilet === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter Bedroom With Toilet Number");
        bedroomwithToiletFlag = false;
      }

      
      if(bedRooms === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter Bedroom Number");
        bedroomFlag = false;
      }

      if(totalVillas === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter number of villas");
        totalVillasFlag = false;
      }
      if(plotarea === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter plot area");
        plotareaFlag = false;
      }

      if(builtArea === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter built area");
        builtAreaFlag = false;
      }

      if(totalNumberOfFloors === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter number of floors");
        totalNumberOfFloorsFlag = false;
      }
      if(newOrOld === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Select Wheather It Is Old Or Not");
        neworoldSelectedFlag= false;
      }

      

      if(!carParkingFlag || !toiletsFlag || !bedroomwithToiletFlag || !bedroomFlag ||!totalVillasFlag || !plotareaFlag || !builtAreaFlag || !totalNumberOfFloorsFlag || !neworoldSelectedFlag ) {
        propertyAttrbutesFlag = false;
      }
    }
    else if(propertyTypeSelected === "Apartment") {
      if(carParking === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter CarParking");
        carParkingFlag = false;
      }


      if(toilets === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter Toilet Number");
        toiletsFlag = false;
      }

      
      if(bedRoomsWithToilet === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter Bedroom With Toilet Number");
        bedroomwithToiletFlag = false;
      }

      
      if(bedRooms === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter Bedroom Number");
        bedroomFlag = false;
      }

      if(floorNumber === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter Floor Number");
        floorNumberFlag = false;
      }

      
      if(builtArea === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter built area");
        builtAreaFlag = false;
      }

      if(totalNumberOfFloors === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter number of floors");
        totalNumberOfFloorsFlag = false;
      }
      if(newOrOld === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Select Wheather It Is Old Or Not");
        neworoldSelectedFlag= false;
      }

      if(!carParkingFlag || !toiletsFlag || !bedroomwithToiletFlag || !bedroomFlag || !floorNumberFlag ||  !builtAreaFlag || !totalNumberOfFloorsFlag || !neworoldSelectedFlag ) {
        propertyAttrbutesFlag = false;
      }
    }
    else if(propertyTypeSelected === "Flat") {
 

      if(carParking === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter CarParking");
        carParkingFlag = false;
      }


      if(toilets === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter Toilet Number");
        toiletsFlag = false;
      }

      
      if(bedRoomsWithToilet === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter Bedroom With Toilet Number");
        bedroomwithToiletFlag = false;
      }

      
      if(bedRooms === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter Bedroom Number");
        bedroomFlag = false;
      }

      if(floorNumber === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter Floor Number");
        floorNumberFlag = false;
      }

      
      if(builtArea === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter built area");
        builtAreaFlag = false;
      }

      if(totalNumberOfFloors === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter number of floors");
        totalNumberOfFloorsFlag = false;
      }
      if(newOrOld === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Select Wheather It Is Old Or Not");
        neworoldSelectedFlag= false;
      }

      if(!carParkingFlag || !toiletsFlag || !bedroomwithToiletFlag || !bedroomFlag || !floorNumberFlag ||  !builtAreaFlag || !totalNumberOfFloorsFlag ||!neworoldSelectedFlag ) {
        propertyAttrbutesFlag = false;
      }
    }
    else if(propertyTypeSelected === "Plot") {
      if(plotarea === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter plot area");
        plotareaFlag = false;
      }
      if(!plotareaFlag ) {
        propertyAttrbutesFlag = false;
      }

    }
    else if(propertyTypeSelected === "Land") {
      if(plotarea === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter plot area");
        plotareaFlag = false;
      }
      if(!plotareaFlag ) {
        propertyAttrbutesFlag = false;
      }

    }
    if(facing === "") {
      //alert("Paulsi");
      setAlertClass("alert alert-danger");
      setAlertContent("Select Facing Polarity");
      facingPolarityFlag = false;
    }
    if(cost === "") {
      //alert("Paulsi");
      setAlertClass("alert alert-danger");
      setAlertContent("Enter Cost");
      costFlag = false;
    }
    if(localityName === "") {
      //alert("Paulsi");
      setAlertClass("alert alert-danger");
      setAlertContent("Enter Locality Name");
      localityFlag = false;
    }
    if(townNameSelectedID === "") {
      //alert("Paulsi");
      setAlertClass("alert alert-danger");
      setAlertContent("Select town");
      townNameSelectedIDFlag = false;
    }

    if(districtNameSelectedID === "") {
        //alert("Paulsi");
        setAlertClass("alert alert-danger");
        setAlertContent("Select district");
        districtNameSelectedIDFlag = false;
    }

    if(stateNameSelectedID === "") {
        //alert("Paulsi");
        setAlertClass("alert alert-danger");
        setAlertContent("Select state");
        stateNameSelectedIDFlag = false;
    }
  //   if(newOrOld === "") {
  //     setAlertClass("alert alert-danger");
  //     setAlertContent("Select Wheather Property Is New Or Old");
  //     neworoldSelectedFlag = false;
  // }
    if(transactionTypeSelected === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Select transaction type");
        transactionTypeSelectedFlag = false;
    }

    if(propertyTypeSelected === "") {
      //alert("Paulsin");
      setAlertClass("alert alert-danger");
      setAlertContent("Select property type");
      propertyTypeSelectedFlag = false;
    }

    
  
   
     if(propertybuilderflag && propertyfeature1flag && propertytitleflag && propertyAttrbutesFlag && townNameSelectedIDFlag && districtNameSelectedIDFlag && stateNameSelectedIDFlag && transactionTypeSelectedFlag && propertyTypeSelectedFlag
      && costFlag && localityFlag && facingPolarityFlag
     ){
      // alertarray=[];
      // setAlertContent(alertarray)
        // alert(selectedRadioCostOption)
      //  if(propertyTypeSelected=="Villa") {
         // googleMap : String,
      // youtubeVideoLink : String,
      // propertyTitle : String,
      // propertyFeature1 : String,
      // propertyFeature2 : String,
      // propertyFeature3 : String,
      // propertyFeature4 : String
          try {
            // alert(propertyStatus)
           const response = await axios.post(
             addPropertyURL,
             {
               "propertyType": propertyTypeSelected,    
               "transactionType": transactionTypeSelected,
               "newOrOld":newOrOld,
               "stateID": stateNameSelectedID,
               "districtID": districtNameSelectedID,
               "townID": townNameSelectedID,
               "locality":localityName,
               "cost":cost,
               "costType":costtypeStatusChecked,
               "facing":facing,
               "numberOfFloors":totalNumberOfFloors,
               "builtArea":builtArea,
               "plotArea":plotarea,
               "totalVillas":totalVillas,
                "floorNumber":floorNumber,
              "bedrooms":bedRooms,
               "bedroomsWithToilet":bedRoomsWithToilet,
               "toilets":toilets,
               "carPorch":carporchStatusChecked,
               "carParking":carParking,
               "sitout":sitoutStatusChecked,
               "livingArea":livingareaStatusChecked,
               "diningHall":dininghallStatusChecked,
               "kitchen":kitchenStatusChecked,
               "workArea":workareaStatusChecked,
               "upperLivingArea":upperlivingareaStatusChecked,
               "balcony":balconyStatusChecked,
               "openTerrace":openterraceStatusChecked,
               "waterWell":waterwellStatusChecked,
               "waterConnection":waterconnectionStatusChecked,
               "googleMap":googlemap,
               "youtubeVideoLink":videolink,
               "propertyTitle":propertyTitle,
               "propertyFeature1":propertyfeature1,
               "propertyFeature2":propertyfeature2,
               "propertyFeature3":propertyfeature3,
               "propertyFeature4":propertyfeature4,
               "ownerOrBuilderID":ownerSelectedValue,
               "propertyStatus":propertyStatus,
               "savedBy" : loggedUserIDforPropertySubmission,
               "donebyUserId":loggedinuserid,
                "donebyUserName":loggedinusername,
                "donebyUserrole":loggedinuserRole
                    




             }     
           );  
        
         } catch(error) {
           console.error("Error posting data:", error);
         }

      //  }
       
         setAlertClass("alert alert-success");
      setAlertContent("Data submitted Successfully");
        
      }


    };
    // function getownerdata(){

    // }
  
    const fetchLoggedDataForPropertySubmission = (e) => {

      //Functions();
  
      //alert("Paulsin");

      const response = axios.get(loggedCheckUrl,
        {withCredentials:true }
      )
      .then(function (response) {
        //console.log(response);
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
          setLoggedUserIDforPropertySubmission(response.data.userID);
        }
        //setUsername(response.data.username);
      })
      .catch(function (error) {
        console.log(error);
      }); 
  
    }


useEffect(() => {
  //console.log('i fire once');
  //setItems(data);

  fetchOwnerdetails();
  
  fetchLoggedDataForPropertySubmission();
 



  //test();

}, []);
    const editProperty= async (e) => {
      // alert(uniqueID)
      // alert(propertyTypeSelected)
      // alert(transactionTypeSelected)
      // alert(stateSelectedValue)
      // alert(districtSelectedValue)
      // alert(townSelectedValue)
    //   var postflag=false

      var propertyAttrbutesFlag = true;
      var propertyTypeSelectedFlag = true;
      var stateNameSelectedIDFlag = true;
      var districtNameFlag = true;
      var townNameSelectedIDFlag = true;
      var transactionTypeSelectedFlag = true;
      var localityFlag =true;
      var costFlag=true;
      var facingPolarityFlag=true;

      var plotareaFlag = true;
      var builtAreaFlag = true;
      var totalNumberOfFloorsFlag = true;
      var totalVillasFlag = true;
      var bedroomFlag =true;
      var bedroomwithToiletFlag=true;
      var toiletsFlag=true;
      var carParkingFlag=true;
      var floorNumberFlag=true;
      var propertytitleflag=true;
      var propertyfeature1flag=true;
      var propertybuilderflag=true;
      var neworoldSelectedFlag=true;

      if(ownerSelectedValue===""){
        // alert("fgvfd")
        setAlertClass("alert alert-danger");
        setAlertContent("Enter Property Buildername");
        propertybuilderflag = false;
      }

     if(propertyfeature1 === "") {
        //alert("Paulsin");
        setAlertClass("alert alert-danger");
        setAlertContent("Enter Property Feature");
        propertyfeature1flag = false;
    }  
    if(propertyTitle === "") {
        //alert("Paulsin");
        setAlertClass("alert alert-danger");
        setAlertContent("Enter Property Title");
        propertytitleflag = false;
    }
  
    if(propertyTypeSelected === "House") {
      if(carParking === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter CarParking");
        carParkingFlag = false;
      }


      if(toilets === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter Toilet Number");
        toiletsFlag = false;
      }

      
      if(bedRoomsWithToilet === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter Bedroom With Toilet Number");
        bedroomwithToiletFlag = false;
      }

      
      if(bedRooms === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter Bedroom Number");
        bedroomFlag = false;
      }

      if(plotarea === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter plot area");
        plotareaFlag = false;
      }

      if(builtArea === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter built area");
        builtAreaFlag = false;
      }

      if(totalNumberOfFloors === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter number of floors");
        totalNumberOfFloorsFlag = false;
      }
      if(newOrOld === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Select Wheather It Is Old Or Not");
        neworoldSelectedFlag= false;
      }

      if(!carParkingFlag || !toiletsFlag || !bedroomwithToiletFlag || !bedroomFlag || !plotareaFlag || !builtAreaFlag || !totalNumberOfFloorsFlag || !neworoldSelectedFlag) {
        propertyAttrbutesFlag = false;
      }

    }
    else if(propertyTypeSelected === "Villa") {
      if(carParking === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter CarParking");
        carParkingFlag = false;
      }


      if(toilets === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter Toilet Number");
        toiletsFlag = false;
      }

      
      if(bedRoomsWithToilet === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter Bedroom With Toilet Number");
        bedroomwithToiletFlag = false;
      }

      
      if(bedRooms === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter Bedroom Number");
        bedroomFlag = false;
      }

      if(totalVillas === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter number of villas");
        totalVillasFlag = false;
      }
      if(plotarea === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter plot area");
        plotareaFlag = false;
      }

      if(builtArea === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter built area");
        builtAreaFlag = false;
      }

      if(totalNumberOfFloors === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter number of floors");
        totalNumberOfFloorsFlag = false;
      }
      if(newOrOld === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Select Wheather It Is Old Or Not");
        neworoldSelectedFlag= false;
      }
      

      if(!carParkingFlag || !toiletsFlag || !bedroomwithToiletFlag || !bedroomFlag ||!totalVillasFlag || !plotareaFlag || !builtAreaFlag || !totalNumberOfFloorsFlag || !neworoldSelectedFlag) {
        propertyAttrbutesFlag = false;
      }
    }
    else if(propertyTypeSelected === "Apartment") {
      if(carParking === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter CarParking");
        carParkingFlag = false;
      }


      if(toilets === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter Toilet Number");
        toiletsFlag = false;
      }

      
      if(bedRoomsWithToilet === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter Bedroom With Toilet Number");
        bedroomwithToiletFlag = false;
      }

      
      if(bedRooms === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter Bedroom Number");
        bedroomFlag = false;
      }

      if(floorNumber === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter Floor Number");
        floorNumberFlag = false;
      }

      
      if(builtArea === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter built area");
        builtAreaFlag = false;
      }

      if(totalNumberOfFloors === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter number of floors");
        totalNumberOfFloorsFlag = false;
      }
      if(newOrOld === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Select Wheather It Is Old Or Not");
        neworoldSelectedFlag= false;
      }

      if(!carParkingFlag || !toiletsFlag || !bedroomwithToiletFlag || !bedroomFlag || !floorNumberFlag ||  !builtAreaFlag || !totalNumberOfFloorsFlag || !neworoldSelectedFlag) {
        propertyAttrbutesFlag = false;
      }
    }
    else if(propertyTypeSelected === "Flat") {
      if(carParking === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter CarParking");
        carParkingFlag = false;
      }


      if(toilets === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter Toilet Number");
        toiletsFlag = false;
      }

      
      if(bedRoomsWithToilet === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter Bedroom With Toilet Number");
        bedroomwithToiletFlag = false;
      }

      
      if(bedRooms === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter Bedroom Number");
        bedroomFlag = false;
      }

      if(floorNumber === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter Floor Number");
        floorNumberFlag = false;
      }

      
      if(builtArea === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter built area");
        builtAreaFlag = false;
      }

      if(totalNumberOfFloors === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter number of floors");
        totalNumberOfFloorsFlag = false;
      }
      if(newOrOld === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Select Wheather It Is Old Or Not");
        neworoldSelectedFlag= false;
      }

      if(!carParkingFlag || !toiletsFlag || !bedroomwithToiletFlag || !bedroomFlag || !floorNumberFlag ||  !builtAreaFlag || !totalNumberOfFloorsFlag || !neworoldSelectedFlag) {
        propertyAttrbutesFlag = false;
      }
    }
    else if(propertyTypeSelected === "Plot") {
      if(plotarea === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter plot area");
        plotareaFlag = false;
      }
      if(!plotareaFlag ) {
        propertyAttrbutesFlag = false;
      }

    }
    else if(propertyTypeSelected === "Land") {
      if(plotarea === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Enter plot area");
        plotareaFlag = false;
      }
      if(!plotareaFlag ) {
        propertyAttrbutesFlag = false;
      }

    }
    if(facing === "") {
      //alert("Paulsi");
      setAlertClass("alert alert-danger");
      setAlertContent("Select Facing Polarity");
      facingPolarityFlag = false;
    }
    if(cost === "") {
      //alert("Paulsi");
      setAlertClass("alert alert-danger");
      setAlertContent("Enter Cost");
      costFlag = false;
    }
     //alert(localityName)
    if(localityName === "") {
      // alert("Paulsi");
      setAlertClass("alert alert-danger");
      setAlertContent("Enter Locality Name");
      localityFlag = false;
    }
    if(townNameSelectedID === "") {
      //alert("Paulsi");
      setAlertClass("alert alert-danger");
      setAlertContent("Select town");
      townNameSelectedIDFlag = false;
    }

    if(districtNameSelectedID === "") {
        //alert("Paulsi");
        setAlertClass("alert alert-danger");
        setAlertContent("Select district");
        districtNameFlag = false;
    }
   
    if(stateNameSelectedID === "") {
        //alert("Paulsi");
        setAlertClass("alert alert-danger");
        setAlertContent("Select state");
        stateNameSelectedIDFlag = false;
    }

    if(transactionTypeSelected === "") {
        setAlertClass("alert alert-danger");
        setAlertContent("Select transaction type");
        transactionTypeSelectedFlag = false;
    }

    if(propertyTypeSelected === "") {
      // alert("Paulsin");
      setAlertClass("alert alert-danger");
      setAlertContent("Select property type");
      propertyTypeSelectedFlag = false;
    }
    if(propertybuilderflag && propertyfeature1flag && propertytitleflag &&propertyAttrbutesFlag && townNameSelectedIDFlag && districtNameFlag && stateNameSelectedIDFlag && transactionTypeSelectedFlag && propertyTypeSelectedFlag
      && costFlag && localityFlag && facingPolarityFlag
     ){
  
   
       axios.post(Url+"property/editproperty",
           {
             
               "propertyID":uniqueID,
               "propertyType":propertyTypeSelected,
               "transactionType":transactionTypeSelected,
               "newOrOld":newOrOld,
               "stateID":stateSelectedValue,
               "districtID":districtSelectedValue,
               "townID":townSelectedValue,
               "locality":localityName,
               "cost":cost,
               "costType":costtypeStatusChecked,
               "facing":facing,
               "numberOfFloors":totalNumberOfFloors,
               "builtArea":builtArea,
               "plotArea":plotarea,
               "totalVillas":totalVillas,
               "floorNumber":floorNumber,
               "bedrooms":bedRooms,
               "bedroomsWithToilet":bedRoomsWithToilet,
               "toilets":toilets,
               "carPorch":carporchStatusChecked,
               "carParking":carParking,
               "sitout":sitoutStatusChecked,
               "livingArea":livingareaStatusChecked,
               "diningHall":dininghallStatusChecked,
               "kitchen":kitchenStatusChecked,
               "workArea":workareaStatusChecked,
               "upperLivingArea":upperlivingareaStatusChecked,
               "balcony":balconyStatusChecked,
               "openTerrace":openterraceStatusChecked,
               "waterWell":waterwellStatusChecked,
               "waterConnection":waterconnectionStatusChecked,
               "googleMap":googlemap,
               "youtubeVideoLink":videolink,
               "propertyTitle":propertyTitle,
               "propertyFeature1":propertyfeature1,
               "propertyFeature2":propertyfeature2,
               "propertyFeature3":propertyfeature3,
               "propertyFeature4":propertyfeature4,
               "ownerOrBuilderID":ownerSelectedValue,
               "propertyStatus":propertyStatus,
               "savedBy" : loggedUserIDforPropertySubmission,
               "donebyUserId":loggedinuserid,
                "donebyUserName":loggedinusername,
                "donebyUserrole":loggedinuserRole
               
    
    
           }
       )
       .then((res)=>{
           //alert('haiiii')
       })
       setAlertClass("alert alert-success");
       setAlertContent("Data Updated Successfully");
      }
    }
 
    
    const fetchOwnerdetails =  async (e) => {
      try {
        const response = await axios.get(getownerdetailsurl)
          .then(function (response) {
            //alert(response.data[1].districtName);

            response.data.map(key => {
              if(key.ownerStatus!="Draft"){
                var testLabel = <div>{key.contactNumber}</div>
                owneroptionsarray.push({ value: key._id, label: key.contactNumber + "   " + key.name});  

              }
              // alert(key._id)
              //var testLabel = <div>{key.contactNumber}<br></br>{key.name}</div>;
                  
            });

            // if(operation === "new") {
              setOwneroptions(owneroptionsarray);
            // }
            
            // setDistrictOptionsOriginal(owneroptionsarray);
          })
          .catch(function (error) {
            console.log(error);
          }); 
        
      } catch(error) {
        console.error("Error posting data:", error);
      }
    };

    // const handleNeworoldSelection = (e) => {
    //   // alert(e.target.value)
    //   setNeworOld(e.target.value);
    // }

    if(operation==="new"){
        //   var neworoldwidget= <Select
        //   options={neworOldType}
        //   onChange={handleNeworoldSelection}
        //   disabled={isNeworOldDisabled}
        // />
        
        var neworoldwidget= <select disabled={isNeworOldDisabled} className="form-control" onChange={(e) => setNeworOld(e.target.value)}>
          <option value="">New/Old</option>
          <option value="New">New</option>
          <option value="Old">Old</option>
         
        </select>
 
        var facingPolarityWidget=<Select
          options={facingPolarity}
          onChange={handleFacingSelection}
        />

        var totalNumberOfFloorsWidget = <input type="text" class="form-control" required onChange={(e) =>  setTotalNumberOfFloors(e.target.value)} disabled={isTotalNumberOfFloorsDisabled}/>;
        var builtAreaWidget=<input type="text" class="form-control" required onChange={(e) =>  setBuiltArea(e.target.value)} disabled={isBuiltAreaDisabled}/>;
        var plotAreaWidget=<input type="text" class="form-control" required onChange={(e) =>  setPlotArea(e.target.value)} disabled={isPlotAreaDisabled}/>;
        var totalVillasWidget=<input type="text" class="form-control" required onChange={(e) =>  setTotalVillas(e.target.value)} disabled={isTotalVillasDisabled}/>;
        var floorNumberWidget=<input type="text" class="form-control" required onChange={(e) =>  setFloorNumber(e.target.value)} disabled={isFloorNumberDisabled}/>;
        var bedRoomsWidget=<input type="text" class="form-control" required onChange={(e) =>  setBedRooms(e.target.value)} disabled={isBedRoomsDisabled}/>;
        var bedRoomsWithToiletWidget=<input type="text" class="form-control" required onChange={(e) =>  setBedRoomsWithToilet(e.target.value)} disabled={isBedRoomsWithToiletDisabled}/>;
        var toiletsWidget=<input type="text" class="form-control" required onChange={(e) =>  setToilets(e.target.value)} disabled={isToiletsDisabled}/>;
        
        var carPorchWidget=<input type="checkbox" class="form-check-input" disabled={isCarPorchDisabled}  onChange={() => setCarporchStatusChecked(!carporchStatusChecked)} />;
        var carParkingWidget=<input type="text" class="form-control" onChange={(e) =>  setCarParking(e.target.value)} disabled={isCarParkingDisabled} />;
        var sitOutWidget=<input type="checkbox" class="form-check-input" required disabled={isSitOutDisabled} onChange={() => setSitoutStatusChecked(!sitoutStatusChecked)}   />;
        var livingAreaWidget=<input type="checkbox"class="form-check-input" required disabled={isLivingAreaDisabled} onChange={() => setLivingareaStatusChecked(!livingareaStatusChecked)}   />;
        var diningHallWidget=<input type="checkbox"class="form-check-input" required disabled={isDiningHallDisabled} onChange={() => setDininghallStatusChecked(!dininghallStatusChecked)}/>;
        var kitchenWidget=<input type="checkbox" class="form-check-input" required disabled={isKitchenDisabled}  onChange={() => setKitchenStatusChecked(!kitchenStatusChecked)}/>;
        var workAreaWidget=<input type="checkbox" class="form-check-input" required disabled={isWorkAreaDisabled} onChange={() => setWorkareaStatusChecked(!workareaStatusChecked)}/>;
        var upperLivingAreaWidget=<input type="checkbox" class="form-check-input" required disabled={isUpperLivingAreaDisabled} onChange={() => setUpperlivingareaStatusChecked(!upperlivingareaStatusChecked)}/>;
        var balconyWidget=<input type="checkbox" class="form-check-input" required disabled={isBalconyDisabled} onChange={() => setBalconyStatusChecked(!balconyStatusChecked)}/>;
        var openTerraceWidget=<input type="checkbox" class="form-check-input" required disabled={isOpenTerraceDisabled} onChange={() => setOpenterraceStatusChecked(!openterraceStatusChecked)} />;
        var waterWellWidget=<input type="checkbox"class="form-check-input" required disabled={isWaterWellDisabled} onChange={() => setWaterwellStatusChecked(!waterwellStatusChecked)}/>;
        var waterConnectionWidget=<input type="checkbox" class="form-check-input" required disabled={isWaterConnectionDisabled} onChange={() => setWaterconnectionStatusChecked(!waterconnectionStatusChecked)}   />;
        
        var googlemapwidget=<input type="text" class="form-control" onChange={(e) =>  setGooglemap(e.target.value)} />
        var videolinkwidget=<input type="text" class="form-control" onChange={(e) =>  setVideolink(e.target.value)} />
        var titlewidget=<input type="text" class="form-control" onChange={(e) =>  setPropertyTitle(e.target.value)} />
        var feature1widget=<textarea class="form-control" onChange={(e) =>  setPropertyFeature1(e.target.value)} />
        var feature2widget=<textarea class="form-control" onChange={(e) =>  setPropertyFeature2(e.target.value)} />
        var feature3widget=<textarea class="form-control" onChange={(e) =>  setPropertyFeature3(e.target.value)} />
        var feature4widget=<textarea class="form-control" onChange={(e) =>  setPropertyFeature4(e.target.value)} />
        
        var ownernameswidget=  <Select
        
                // value={{label:districtSelectedLabel, value:districtSelectedValue}}
                onChange={handleOwnerorDeveloperSelection}
                options={owneroptions}
              />
        var propertystatusWidget=<Select
        options={PropertyStatusOptions}
        onChange={handlePropertyStatusSelection}
        value={{label:propertyStatus, value:propertyStatus}}
      />
      var propertycountlabelwidget= <label for="inputPassword3" class="col-sm-2 col-form-label">Number of Properties </label>
      var propertycountwidget=<h6>{numbercount} </h6>
        var savebuttonwidget=<button type="submit" class="btn btn-primary" onClick={submitProperty}>Submit property</button>
        var contactheadingwidget=<h3 class="form-label">Owner Details</h3>
        var phoneno1widget=<PhoneInput className="number"  value={phonenumber1} onChange={setPhonenumber1}/>
        var phoneno2widget=<PhoneInput className="number"  value={phonenumber2} onChange={setPhonenumber2}/>
        var ownerorbuilderordeveloperwidget=<Select
          options={OwnerorBuilderorDeveloper}
          onChange={handleBuilderorDeveloperSelection}
        />
        var namewidget=<input type="text" class="form-control" required onChange={(e) =>  setOwnername(e.target.value)}/> 
        var addresswidget=<textarea class="form-control" onChange={(e) =>  setOwneraddress(e.target.value)} /> 
        var ownerdatasavebuttonwidget=<button type="submit" class="btn btn-primary" onClick={submitOwnerdata}>Submit Owner Details</button>                                  
    }
    else if(operation==="edit"){
      // alert(carporchtrue)
      //   var neworoldwidget= <Select
      //   options={neworOldType}
      //   onChange={handleNeworoldSelection}
      //   disabled={isNeworOldDisabled}
      //   value={{ value: newOrOld, label: newOrOld }}
      // /> 
     
      var neworoldwidget= <select value={newOrOld} disabled={isNeworOldDisabled} className="form-control" onChange={(e) => setNeworOld(e.target.value)}>
          <option value="">New/Old</option>
          <option value="New">New</option>
          <option value="Old">Old</option>
    </select>

        var facingPolarityWidget=<Select
        options={facingPolarity}
        onChange={handleFacingSelection}
        value={{ value: facing, label: facing }}
      />

      var totalNumberOfFloorsWidget = <input type="text" class="form-control" required onChange={(e) =>  setTotalNumberOfFloors(e.target.value)} disabled={isTotalNumberOfFloorsDisabled} value={totalNumberOfFloors}/>;
        var builtAreaWidget=<input type="text" class="form-control" required onChange={(e) =>  setBuiltArea(e.target.value)} disabled={isBuiltAreaDisabled} value={builtArea}/>;
        var plotAreaWidget=<input type="text" class="form-control" required onChange={(e) =>  setPlotArea(e.target.value)} disabled={isPlotAreaDisabled} value={plotarea}/>;
        var totalVillasWidget=<input type="text" class="form-control" required onChange={(e) =>  setTotalVillas(e.target.value)} disabled={isTotalVillasDisabled} value={totalVillas}/>;
        var floorNumberWidget=<input type="text" class="form-control" required onChange={(e) =>  setFloorNumber(e.target.value)} disabled={isFloorNumberDisabled} value={floorNumber}/>;
        var bedRoomsWidget=<input type="text" class="form-control" required onChange={(e) =>  setBedRooms(e.target.value)} disabled={isBedRoomsDisabled} value={bedRooms}/>;
        var bedRoomsWithToiletWidget=<input type="text" class="form-control" required onChange={(e) =>  setBedRoomsWithToilet(e.target.value)} disabled={isBedRoomsWithToiletDisabled} value={bedRoomsWithToilet}/>;
        var toiletsWidget=<input type="text" class="form-control" required onChange={(e) =>  setToilets(e.target.value)} disabled={isToiletsDisabled} value={toilets}/>;
        
        var carPorchWidget=<input type="checkbox" class="form-check-input" disabled={isCarPorchDisabled}  checked={carporchStatusChecked} onChange={() => setCarporchStatusChecked(!carporchStatusChecked)} />;
        var carParkingWidget=<input type="text" class="form-control" onChange={(e) =>  setCarParking(e.target.value)} disabled={isCarParkingDisabled} value={carParking}  />;
        var sitOutWidget=<input type="checkbox" class="form-check-input" required disabled={isSitOutDisabled} checked={sitoutStatusChecked}  onChange={() => setSitoutStatusChecked(!sitoutStatusChecked)}/>;
        var livingAreaWidget=<input type="checkbox"class="form-check-input" required disabled={isLivingAreaDisabled}  onChange={() => setLivingareaStatusChecked(!livingareaStatusChecked)} checked={livingareaStatusChecked}/>;
        var diningHallWidget=<input type="checkbox"class="form-check-input" required disabled={isDiningHallDisabled}  onChange={() => setDininghallStatusChecked(!dininghallStatusChecked)} checked={dininghallStatusChecked}/>;
        var kitchenWidget=<input type="checkbox" class="form-check-input" required disabled={isKitchenDisabled}  onChange={() => setKitchenStatusChecked(!kitchenStatusChecked)} checked={kitchenStatusChecked}/>;
        var workAreaWidget=<input type="checkbox" class="form-check-input" required disabled={isWorkAreaDisabled}  onChange={() => setWorkareaStatusChecked(!workareaStatusChecked)} checked={workareaStatusChecked}/>;
        var upperLivingAreaWidget=<input type="checkbox" class="form-check-input" required disabled={isUpperLivingAreaDisabled}  onChange={() => setUpperlivingareaStatusChecked(!upperlivingareaStatusChecked)} checked={upperlivingareaStatusChecked}/>;
        var balconyWidget=<input type="checkbox" class="form-check-input" required disabled={isBalconyDisabled}  onChange={() => setBalconyStatusChecked(!balconyStatusChecked)} checked={balconyStatusChecked}/>;
        var openTerraceWidget=<input type="checkbox" class="form-check-input" required disabled={isOpenTerraceDisabled}  onChange={() => setOpenterraceStatusChecked(!openterraceStatusChecked)} checked={openterraceStatusChecked}/>;
        var waterWellWidget=<input type="checkbox"class="form-check-input" required disabled={isWaterWellDisabled}  onChange={() => setWaterwellStatusChecked(!waterwellStatusChecked)} checked={waterwellStatusChecked}/>;
        var waterConnectionWidget=<input type="checkbox" class="form-check-input" required disabled={isWaterConnectionDisabled}  onChange={() => setWaterconnectionStatusChecked(!waterconnectionStatusChecked)} checked={waterconnectionStatusChecked}/>;
        var googlemapwidget=<input type="text" class="form-control" onChange={(e) =>  setGooglemap(e.target.value)} value={googlemap}/>
        var videolinkwidget=<input type="text" class="form-control" onChange={(e) =>  setVideolink(e.target.value)} value={videolink}/>
        var titlewidget=<input type="text" class="form-control" onChange={(e) =>  setPropertyTitle(e.target.value)} value={propertyTitle}/>
        var feature1widget=<textarea class="form-control" onChange={(e) =>  setPropertyFeature1(e.target.value)} value={propertyfeature1} />
        var feature2widget=<textarea class="form-control" onChange={(e) =>  setPropertyFeature2(e.target.value)} value={propertyfeature2}/>
        var feature3widget=<textarea class="form-control" onChange={(e) =>  setPropertyFeature3(e.target.value)} value={propertyfeature3}/>
        var feature4widget=<textarea class="form-control" onChange={(e) =>  setPropertyFeature4(e.target.value)} value={propertyfeature4}/>
        var ownernameswidget=  <Select
        
         value={{label:ownerSelectedLabel, value:ownerSelectedValue}}
          onChange={handleOwnerorDeveloperSelection}
          options={owneroptions}
        />
        var propertycountlabelwidget= <label for="inputPassword3" class="col-sm-2 col-form-label">Number of Properties </label>
      var propertycountwidget=<h6>{numbercount} </h6>
      var propertystatusWidget=<Select
        options={PropertyStatusOptions}
        onChange={handlePropertyStatusSelection}
        value={{label:propertyStatus, value:propertyStatus}}
      />
      var contactheadingwidget=<h3 class="form-label">Owner Details</h3>
      var phoneno1widget=<PhoneInput className="number"  value={phonenumber1} onChange={setPhonenumber1}/>
      var phoneno2widget=<PhoneInput className="number"  value={phonenumber2} onChange={setPhonenumber2}/>
      var ownerorbuilderordeveloperwidget=<Select
        options={OwnerorBuilderorDeveloper}
        onChange={handleBuilderorDeveloperSelection}
      />
      var namewidget=<input type="text" class="form-control" required onChange={(e) =>  setOwnername(e.target.value)}/> 
      var addresswidget=<textarea class="form-control" onChange={(e) =>  setOwneraddress(e.target.value)} /> 
      var ownerdatasavebuttonwidget=<button type="submit" class="btn btn-primary" onClick={submitOwnerdata}>Submit Owner Details</button> 
      var savebuttonwidget=<button type="submit" class="btn btn-primary" onClick={editProperty}>Edit property</button>

    }
  return (
  <>
     

   <div class="row mb-3">
      <label for="inputPassword3" class="col-sm-2 col-form-label">Facing</label>

      <div class="col-sm-5">
        {facingPolarityWidget}
                  
      </div>
    </div>

    <div class="row mb-3">
      <label for="inputPassword3" class="col-sm-2 col-form-label">New/Old</label>
      <div class="col-sm-3">
        {neworoldwidget}
      </div>
      <label for="inputPassword3" class="col-sm-2 col-form-label">Number of floors</label>
      <div class="col-sm-3">
        {totalNumberOfFloorsWidget}
      </div>
    </div>
    
    <div class="row mb-3">
      <label for="inputPassword3" class="col-sm-2 col-form-label">Built Area</label>
      <div class="col-sm-3">
        {builtAreaWidget}
      </div>
      <label for="inputPassword3" class="col-sm-2 col-form-label">Plot Area</label>
      <div class="col-sm-3">
        {plotAreaWidget}
      </div>
    </div>

    <div class="row mb-3">
      <label for="inputPassword3" class="col-sm-2 col-form-label">Total Villas</label>
      <div class="col-sm-3">
        {totalVillasWidget}
      </div>
      <label for="inputPassword3" class="col-sm-2 col-form-label">Floor Number</label>
      <div class="col-sm-3">
        {floorNumberWidget}
      </div>
    </div>

    <div class="row mb-3">
      <label for="inputPassword3" class="col-sm-2 col-form-label">Bedrooms</label>
      <div class="col-sm-3">
        {bedRoomsWidget}
      </div>
      <label for="inputPassword3" class="col-sm-2 col-form-label">Bedrooms With Toilets</label>
      <div class="col-sm-3">
        {bedRoomsWithToiletWidget}
      </div>
    </div>

    <div class="row mb-3">
      <label for="inputPassword3" class="col-sm-2 col-form-label">Toilets</label>
      <div class="col-sm-3">
        {toiletsWidget}
      </div>
      <label for="inputPassword3" class="col-sm-2 col-form-label">Car Parking</label>
      <div class="col-sm-3">
        {carParkingWidget}
      </div>  
    </div>

    <div class="row mb-3">
      <label for="inputPassword3" class="col-sm-2 col-form-label">Carporch</label>
      <div class="col-sm-2">
        {carPorchWidget}
      </div>
      <label for="inputPassword3" class="col-sm-2 col-form-label">Sitout</label>
      <div class="col-sm-2">
        {sitOutWidget}
      </div>
      <label for="inputPassword3" class="col-sm-2 col-form-label">Living Area</label>
      <div class="col-sm-2">
        {livingAreaWidget}
      </div>
    </div>

    <div class="row mb-3"> 
      <label for="inputPassword3" class="col-sm-2 col-form-label">Dining Hall</label>
      <div class="col-sm-2">
        {diningHallWidget}
      </div>
      <label for="inputPassword3" class="col-sm-2 col-form-label">Kitchen</label>
      <div class="col-sm-2">
        {kitchenWidget}
      </div>
      <label for="inputPassword3" class="col-sm-2 col-form-label">Workarea</label>
      <div class="col-sm-2">
        {workAreaWidget}
      </div>
    </div>

    <div class="row mb-3">
      <label for="inputPassword3" class="col-sm-2 col-form-label">Upper Living Area</label>
      <div class="col-sm-2">
        {upperLivingAreaWidget}
      </div>
      <label for="inputPassword3" class="col-sm-2 col-form-label">Balcony</label>
      <div class="col-sm-2">
        {balconyWidget}
      </div>
      <label for="inputPassword3" class="col-sm-2 col-form-label">Open Terrace</label>
      <div class="col-sm-2">
        {openTerraceWidget}
      </div>
    </div>

    <div class="row mb-3">
      <label for="inputPassword3" class="col-sm-2 col-form-label">Water Well</label>
      <div class="col-sm-2">
        {waterWellWidget}
      </div>
      <label for="inputPassword3" class="col-sm-2 col-form-label">Water Connection</label>
      <div class="col-sm-2">
        {waterConnectionWidget}
      </div>
      <div class="col-sm-2">
      </div>
    </div>

    <div class="row mb-3">
      <label for="inputPassword3" class="col-sm-2 col-form-label">Google Map</label>
      <div class="col-sm-10">
        {googlemapwidget}
      </div>
    </div>

    <div class="row mb-3">
      <label for="inputPassword3" class="col-sm-2 col-form-label">Video Link</label>
      <div class="col-sm-10">
        {videolinkwidget}
      </div>
    </div>

    <div class="row mb-3">
      <label for="inputPassword3" class="col-sm-2 col-form-label">Title</label>
      <div class="col-sm-10">          
        {titlewidget}
      </div>
    </div>
 
    <div class="row mb-3">
      <label for="inputPassword3" class="col-sm-2 col-form-label">Feature1</label>
      <div class="col-sm-10">
        {feature1widget}
      </div>
    </div>

    <div class="row mb-3">
      <label for="inputPassword3" class="col-sm-2 col-form-label">Feature2</label>
      <div class="col-sm-10">
        {feature2widget}
      </div>
    </div>

    <div class="row mb-3">
      <label for="inputPassword3" class="col-sm-2 col-form-label">Feature3</label>
      <div class="col-sm-10">
        {feature3widget}
      </div>
    </div>

    <div class="row mb-3">
      <label for="inputPassword3" class="col-sm-2 col-form-label">Feature4</label>
      <div class="col-sm-10">
        {feature4widget}
      </div>
    </div>

    <div class="row mb-3">
      <label for="inputPassword3" class="col-sm-2 col-form-label">Select Owner,Builder or Developer</label>
      <div class="col-sm-5">
        {ownernameswidget}
      </div>
      {propertycountlabelwidget}
      <div class="col-sm-3">
        {propertycountwidget}
      </div>
    </div>
    
    <div class="row mb-3">
      <label for="inputPassword3" class="col-sm-2 col-form-label">Property Status</label>
      <div class="col-sm-10">
        {propertystatusWidget}
      </div>
    </div>
    
    {savebuttonwidget}
    <br/><br/>

    <div class="row mb-3"> 
      <div class="col-4"> 
        {contactheadingwidget}  
      </div>
     <div class="col-4"> 
     </div>
     <div class="col-4">  
     </div>
   </div>
 
    <div class={alertownerclass} role="alert">
      {alertOwnerContent}
    </div>
    <div class="row mb-3">
      <label for="inputPassword3" class="col-sm-2 col-form-label">Phone Number1</label>
      <div class="col-sm-5">
        {phoneno1widget}
      </div>
    </div>

    <div class="row mb-3">
      <label for="inputPassword3" class="col-sm-2 col-form-label">Phone Number2</label>
      <div class="col-sm-5">
        {phoneno2widget}
      </div>
    </div>

    <div class="row mb-3">
      <label for="inputPassword3" class="col-sm-2 col-form-label">Owner or Builder or Developer</label>
      <div class="col-sm-5">
        {ownerorbuilderordeveloperwidget}
      </div>
    </div>

    <div class="row mb-3">
      <label for="inputPassword3" class="col-sm-2 col-form-label">Name Of Owner or Builder or Developer</label>
      <div class="col-sm-5">
        {namewidget}
      </div>
    </div>

    <div class="row mb-3">
      <label for="inputPassword3" class="col-sm-2 col-form-label">Address Of Owner or Builder or Developer</label>
      <div class="col-sm-5">
        {addresswidget}
      </div>
    </div>

    {ownerdatasavebuttonwidget}
    <br/>
    <br/>
  </>
    
  )
}

export default AddPropertyAttributesAsComponent;