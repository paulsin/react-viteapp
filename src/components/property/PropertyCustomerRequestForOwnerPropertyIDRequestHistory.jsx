import React from 'react';
import { useState, useEffect } from "react";
import { Url } from "../../constants/global";
import axios from "axios";
import { NoImage } from "../../constants/global";

const PropertyCustomerRequestForOwnerPropertyIDRequestHistory = (props) => {
  const [requestsTable, setRequestsTable] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [id, setId] = useState("");
 
  var param2=props.param2;
  var param1State = props.param1State;
  var setParam1State = props.setParam1State;
  var propertyIdorMobileno=props.propertyIdorMobileno;
  var setPropertyidorMobileno=props.setPropertyidorMobileno;
  // alert(param1State)
  // alert(propertyIdormobileno)
  function createdata(data,propertydatas){
    var slno=1;
    let temparrayfornames=[]
    data.map((data1)=>{
      // alert(data1.propertyID)
      if(data1.propertyID===propertyIdorMobileno){
        propertydatas.map((data2)=>{
          // alert(data2.thumbnailImageName)
          if(data1.propertyID===data2._id){
            temparrayfornames.push({
              'slno':slno++,
              'id':data2.id,
              'propertyID':data1.propertyID,
              'requestTime':data1.requestTime,
              'requesterMobile':data1.requesterMobile,
              'requesterName':data1.requesterName,
              'requesterMessage':data1.requesterMessage,
              'imageUrl':data2.thumbnailImageName ? Url+"assets/"+ data2._id + "/" + data2.thumbnailImageName : NoImage,
            })
            setId(data2.id)

          }
        })
      }
      
      
    })
    setRequestsTable(temparrayfornames);
  }

  function fetchRequests(){
    axios
    .get(Url+"property/propertyCustomerRequestForOwnerAllRequests",
    )
    .then((res) => {
      axios
      .get(Url+"property/properties",
      )
      .then((res1) => {
        createdata(res.data,res1.data)
      })
    })
  }

  useEffect(() => {  
    fetchRequests();
  }, []);
  const formatDate = (timestamp) => {
    const date = new Date(Number(timestamp)); // Ensure it's a number
    return isNaN(date.getTime()) ? "Invalid Date" : 
    date.toLocaleDateString();
    //date.toISOString().split("T")[0]; 
  };
  const formatTime = (timestamp) => {
    const date = new Date(Number(timestamp)); // Ensure it's a number
    return isNaN(date.getTime()) ? "Invalid Time" : date.toLocaleTimeString();
    //date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }); 
  };
  const filteredData =  requestsTable.filter(
    (item) =>
      
      (item.id && item.id.toLowerCase().includes(searchTerm.toLowerCase())) || 
      (item.id && item.id.toUpperCase().includes(searchTerm.toUpperCase())) ||
      (item.ownerContact && item.ownerContact.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.ownerContact && item.ownerContact.toUpperCase().includes(searchTerm.toUpperCase())) ||
      (item.requesterMobile && item.requesterMobile.toLowerCase().includes(searchTerm.toLowerCase())) || 
      (item.requesterMobile && item.requesterMobile.toUpperCase().includes(searchTerm.toUpperCase())) ||
      (item.requesterName && item.requesterName.toLowerCase().includes(searchTerm.toLowerCase())) || 
      (item.requesterName && item.requesterName.toUpperCase().includes(searchTerm.toUpperCase()))||
      (item.requestAssessmentStatus && item.requestAssessmentStatus.toLowerCase().includes(searchTerm.toLowerCase())) || 
      (item.requestAssessmentStatus && item.requestAssessmentStatus.toUpperCase().includes(searchTerm.toUpperCase()))||
      
      formatDate(item.requestTime).includes(searchTerm) ||
      formatTime(item.requestTime).toLowerCase().includes(searchTerm)||
      formatTime(item.requestTime).toUpperCase().includes(searchTerm)

        
  
  );
  function backtoTable() {
    setParam1State("table");
  }

  return (

          <div>
            <div class="row mb-3 p-4">
        
              <div class="col-sm-4">
              <h2>History of {id}</h2>
              </div>
        
              <div class="col-sm-4">
               
            
              </div>
              <div class="col-sm-4">   
                <input
                  type="text"
                  placeholder="Search..."
                  className="p-2 border border-gray-300 rounded w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
         
            <table className="table table-striped" id="selectedTable">
              <thead>
                <tr>
                  <th>
                  Index
                  </th>
                  <th>
                  Property Id
                  </th>
                  <th>
                  Property Image
                  </th>
                  <th>
                    Request Date
                  </th>
                  <th>
                    Request Time
                  </th>
                  <th>
                   Requester Mobile
                  </th>

                  <th>
                    Requester Name
                  </th>

                  <th>
                   Requester Message
                  </th>
                   {/* <th>
                  Actions
                  </th> */}
                </tr>
              </thead>
              <tbody>
              
                {filteredData.map(key =>  (
                  <tr>
                    <td>
                      {key.slno}
                    </td>
                    <td> 
                      {key.id}
                  
                    </td>
                    <td> 
                      <img src={key.imageUrl} width="120px" height="80px" />
                    </td>
                    <td>
                     {formatDate(key.requestTime)}
                    </td>
                    <td>
                     {formatTime(key.requestTime)}
                    </td>
                    <td>
                      {key.requesterMobile}
                    </td>
                    <td>
                      {key.requesterName}
                    </td>
                    <td>
                      {key.requesterMessage}
                    </td>
                    {/* <td>
                      <button className="btn btn-danger" >Actions</button> 
                    </td> */}  
                  </tr>
                ))} 
                <td>
                </td>
              </tbody>
              <button class = "btn btn-primary" onClick={backtoTable}> Back </button>
            </table>
            
          </div>

  )
}

export default PropertyCustomerRequestForOwnerPropertyIDRequestHistory