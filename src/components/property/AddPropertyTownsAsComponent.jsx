import React, { useState, useEffect } from "react";

import Select from 'react-select';

const AddPropertyTownsAsComponent = ({townOptions,setTownNameSelectedID,setTownSelectedLabel,setTownSelectedValue,
    operation,townSelectedLabel,townSelectedValue}) => {
    const handleTownSelection = (e) => {
        //alert(e.value);
        setTownNameSelectedID(e.value);
        setTownSelectedLabel(e.label)
        setTownSelectedValue(e.value)
      }
    if(operation==="new"){
        var townwidget= <Select
          onChange={handleTownSelection}
          options={townOptions}
        />
    }
    else if(operation==="edit"){
        var townwidget= <Select
          onChange={handleTownSelection}
          value={{label:townSelectedLabel, value:townSelectedValue}}
          options={townOptions}
        />
    }
  return (
    <div>{townwidget}</div>
  )
}

export default AddPropertyTownsAsComponent