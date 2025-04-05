import React, { useState, useEffect } from "react";

import Select from 'react-select';

const AddPropertyStatesAsComponent = ({stateOptions,setStateNameSelectedID,setStateSelectedLabel,setStateSelectedValue,stateSelectedLabel,stateSelectedValue,
    districtOptionsOriginal,setDistrictOptions,operation,setDistrictSelectedLabel, setDistrictSelectedValue,setTownSelectedLabel,setTownSelectedValue}) => {

    const handleStateSelection = (e) => {
        // setDistrictOptions("")
        setDistrictSelectedLabel("");
        setDistrictSelectedValue("");
        setTownSelectedLabel("");
        setTownSelectedValue("");

        setStateNameSelectedID(e.value);
        setStateSelectedLabel(e.label)
        setStateSelectedValue(e.value)
        var districtOptionsArrayTemp = [];
  
        //alert(stateNameSelectedID);
  
        districtOptionsOriginal.map(key => {
          if(key.stateID == e.value) {
            //alert(key.label);
            districtOptionsArrayTemp.push({ value: key.value, label: key.label });
          }
          //stateOptionsArray.push({ value: key._id, label: key.stateName });           
        });
  
        setDistrictOptions(districtOptionsArrayTemp);
  
      }
    if(operation==="new"){
      
        var statewidget= <Select
        //defaultValue={{ value: 'Rent', label: 'Rent' }}
          onChange={handleStateSelection}
          options={stateOptions}
        />
    }
    else if(operation==="edit"){
    
        var statewidget=  <Select
        //defaultValue={{ value: 'Rent', label: 'Rent' }}
  onChange={handleStateSelection}
  options={stateOptions} value={{label:stateSelectedLabel, value:stateSelectedValue}}
/>
    }
  return (
    <div>{statewidget}</div>
  )
}

export default AddPropertyStatesAsComponent