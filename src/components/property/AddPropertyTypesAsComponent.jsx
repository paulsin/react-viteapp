
import React, { useState, useEffect } from "react";
import { propertyTypes } from "../../constants/global";
import Select from 'react-select';

const AddPropertyTypesAsComponent = ({setPropertyTypeSelected,propertyTypeSelected,operation}) => {
   // const [propertyTypeSelected, setPropertyTypeSelected] = useState("");
//  const [isDisabled, setIsDisabled] = useState(false);
    const handlePropertySelection = (e) => {
        setPropertyTypeSelected(e.value);
    
       
    }
if(operation==="new"){
    var propertywidget=<Select
    options={propertyTypes}
    onChange={handlePropertySelection}
  />
}
else if(operation==="edit"){

    var propertywidget=<Select
    options={propertyTypes}
    onChange={handlePropertySelection}
    value={{ value: propertyTypeSelected, label: propertyTypeSelected}}
  />
}
  return (
    
    <div>{propertywidget}</div>
  )
}

export default AddPropertyTypesAsComponent