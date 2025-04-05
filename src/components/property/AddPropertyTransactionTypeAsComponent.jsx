import React, { useState, useEffect } from "react";
import { propertyTypes } from "../../constants/global";
import Select from 'react-select';
import { transactionType } from "../../constants/global";

const AddPropertyTransactionTypeAsComponent = ({setTransactionTypeSelected,transactionTypeSelected,operation}) => {
    
    const handleTransactionTypeSelection = (e) => {
        setTransactionTypeSelected(e.value);
      }
  
    if(operation==="new"){
        var transactiontypewidget= <Select
        options={transactionType}
        onChange={handleTransactionTypeSelection}
      />
    }
    else if(operation==="edit"){
        var transactiontypewidget= <Select
        options={transactionType}
        onChange={handleTransactionTypeSelection}
        value={{ value: transactionTypeSelected, label: transactionTypeSelected }}
      />  
    }

    
  return (
    <div>{transactiontypewidget}</div>
  )
}

export default AddPropertyTransactionTypeAsComponent