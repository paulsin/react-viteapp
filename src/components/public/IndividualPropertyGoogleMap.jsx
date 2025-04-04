import React, { useState, useEffect } from "react";
import { OwnerorBuilderorDeveloper } from "../../constants/global";
import Select from 'react-select';
import { Url } from "../../constants/global";
import axios from "axios";
import PhoneInput from 'react-phone-number-input'



const IndividualPropertyGoogleMap = (props) => {
    var propertyID=props.propertyID;
    const[mapUrl,setMapUrl]=useState([]);
        function fetchProperties(){
            axios
            .get(Url+"property/individualProperty/"+propertyID,
            )
            .then((res)=>{
            //alert(res.data.googleMap)
              setMapUrl(res.data.googleMap);
            })
        } 
        useEffect(() => {
            fetchProperties(); 
        }, []);
        var googlemapwidget=
  
        <iframe
            src={mapUrl}
            width="880"
            height="400"
            style={{ border: 1 }}
            allowFullScreen
            loading="lazy"
        ></iframe>
    return (
        <>
         <div class="center-container p-2" style={{margin: "auto"}}>
                    {googlemapwidget} 
                </div> 
        
          </>
  )
}

export default IndividualPropertyGoogleMap