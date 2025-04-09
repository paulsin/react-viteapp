
import React, { Suspense } from "react";

import { Url } from "../../constants/global";
import axios from "axios";
import { useState, useEffect } from "react";
import Select from "react-select";



import { NoImage } from "../../constants/global";
const Loading = React.lazy(() => import("../common/Loading"));
const PropertyCustomerRequestForOwnerMobilenumberRequestHistory = React.lazy(() => import("./PropertyCustomerRequestForOwnerMobilenumberRequestHistory"));
const PropertyCustomerRequestForOwnerPropertyIDRequestHistory = React.lazy(() => import("./PropertyCustomerRequestForOwnerPropertyIDRequestHistory"));
const PaginationforPropertyCustomerRequest = React.lazy(() => import("./PaginationforPropertyCustomerRequest"));



var newUrl = Url + 'location/state';
var addDistrictUrl = Url + 'location/district';

var getPropertiesUrl = Url + 'property/properties';
var getDistrictUrl = Url + 'location/districts';


var deleteStateUrl = Url + 'location/deleteState/';
var updateStateUrl = Url + 'location/updateState/';

var  deleteRequestUrl = Url + 'property/deletePropertyCustomerRequestForOwner/';

const PropertyCustomerRequestForOwnerTable = (props) => {
  
const statusoptions = [
    { value: '', label: 'Status' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Completed', label: 'Completed' },
  
  ];
  const [requestsTable, setRequestsTable] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [requestedStatusChange, setRequestedStatusChange] = useState("");
  const [requestedStatusID, setRequestedStatusID] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  let currentpageno=1;
  let recordsperpageno=20;
  const [currentPage, setCurrentPage] = useState(currentpageno);
  const [recordsPerPage,setRecordsperpage]=useState(recordsperpageno);
  const lastpostIndex=currentPage*recordsPerPage; 
  //const lastpostIndex=currentPage * recordsPerPage > propertydetails.length ? propertydetails.length + 1 : currentPage * recordsPerPage; 
    const firstpostIndex=lastpostIndex-recordsPerPage;
  //alert(firstpostIndex);
  //alert(lastpostIndex);
    const currentposts=requestsTable.slice(firstpostIndex,lastpostIndex);

  const [selectedDIV, setSelectedDIV] = useState(<Suspense><Loading/></Suspense>);
  var param1=props.param1;
   var param2=props.param2;

  var param1State = props.param1State;
  var setParam1State = props.setParam1State;
  var propertyIdorMobileno=props.propertyIdorMobileno
  var setPropertyidorMobileno=props.setPropertyidorMobileno
  //alert(param1State);

 // alert(param1)
  //alert(param2)
  function createdata(requestdatas,propertydatas,ownerdatas){
  //  alert(data)
    var slno=1;
    var classname;
    let temparrayfornames=[]
    requestdatas.map((data1)=>{
      //alert(data1.requestTime)
      //const date = new Date(data1.requestTime);
      propertydatas.map((data2)=>{
      //   // alert(data2._id)
        if(data1.propertyID===data2._id){
          ownerdatas.map((data3)=>{
            //alert(data3)
            if(data3._id===data2.ownerOrBuilderID){
               //alert("haii")
              temparrayfornames.push({
                'slno':slno++,
                '_id':data1._id,
                'id':data2.id,
                'propertyID':data1.propertyID,
                // 'requestDate':date.toLocaleDateString(),
                'requestTime':data1.requestTime,
                'requesterMobile':data1.requesterMobile,
                'requesterName':data1.requesterName,
                'requesterMessage':data1.requesterMessage,
                'requestAssessmentStatus':data1.requestAssessmentStatus,
                'classnameofbutton':data1.requestAssessmentStatus==="Pending"? "btn btn-danger":"btn btn-success",
                'disablingofbutton':data1.requestAssessmentStatus==="Completed"? false:false,
                'imageUrl':data2.thumbnailImageName ? Url+"assets/"+ data2._id + "/" + data2.thumbnailImageName : NoImage,
                'ownerContact':data3.contactNumber

              })
            }

           
          })
      //     // alert("haiii")
        
        }
       
      })  
      
    })
    setRequestsTable(temparrayfornames);
    setOriginalData(temparrayfornames);
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
        axios
        .get(Url+"property/ownersandbuilders",
        )
        .then((res2) => {
          createdata(res.data,res1.data,res2.data)
        })
      })
    })
  }
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
  const filteredData =  currentposts.filter(
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
  const handleDelete =(_id)=>{
    //alert(_id)
    var dataafterdeletetemp=[];
    if (window.confirm('Do you want to delete this Request?')) {
    var deletetempurl=deleteRequestUrl+_id; 
    // alert(deletetempurl)
    const response=axios.get(deletetempurl);
    originalData.map(key=>{
       //alert(key._id)
      // alert("id",_id)
      if(key._id!=_id){
        // alert("hhjj")
        dataafterdeletetemp.push(key);
      }
    });
    setOriginalData(dataafterdeletetemp)
    setRequestsTable(dataafterdeletetemp)
    fetchRequests();
    }
  }
    useEffect(() => {
        // if(param1==="table" && param2==="table"){
                  //setSelectedDIV(<PropertyCustomerRequestForOwner param1={param1} param2={param2}/>);
                // }
                
                if(param1==="propertyID"){
                  // alert("jjjj")
                  setSelectedDIV(<Suspense><PropertyCustomerRequestForOwnerPropertyIDRequestHistory param2={param2} /></Suspense>);
                }
                else if(param1==="phonenumber"){
                  setSelectedDIV(<Suspense><PropertyCustomerRequestForOwnerMobilenumberRequestHistory param2={param2} /></Suspense>);
                }
      fetchRequests();
    }, []);
    

    const sendRequestedPropertyID = (propertyID) => {
      //alert(propertyID)
        setParam1State("propertyID");
        //  alert(pid)
        setPropertyidorMobileno(propertyID)
        
    }
    const sendRequestedMobilenumber = (phonenumber) => {
      setParam1State("phonenumber");
      setPropertyidorMobileno(phonenumber)

  }
  const handleStatusChange =(_id)=>{
    //  alert(_id)
    setRequestedStatusID(_id)
  }
  const statusChange = (e) => {
     //alert(e.value)
    setRequestedStatusChange(e.value); 
    
  }
  const handleSubmit = () => {
    //  alert(_id)
   //setRequestedStatusChange(e.value); 
   axios.post(Url+"property/editPropertyCustomerRequestForOwner",
    {
        "id":requestedStatusID,
        "requestAssessmentStatus":requestedStatusChange,
        
        


    }
)
.then((res)=>{
  fetchRequests();
})
   
 }


 

    return(
      <div>


        <div>
          <div class="row mb-3 p-4">
    
            <div class="col-sm-4">
            </div>

            <div class="col-sm-4">
              <h2>Requests</h2>
          
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
                  Property Image & ID
                  </th>
                  <th>
                    Builder Number
                  </th>
                  <th>
                    Message To Owner
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
                  <th>
                      Status
                  </th>
                   <th>
                      Message To Buyer
                  </th>
                  <th>
                      Delete
                  </th> 
                </tr>
              </thead>
              <tbody>
              
                {filteredData.map(key =>  (
                  <tr>
                    <td>
                      {key.slno}
                    </td>
                    
                    <td>
                    
                      {/* {key.propertyID} 
                      <Link to={`/frontend/propertyCustomerRequestForOwner/propertyID/${key.propertyID}`}>{key.propertyID}</Link>
                      */}
                      {key.id} 
                       <button class = "btn btn-outline" onClick={()=>sendRequestedPropertyID(key.propertyID)}><img src={key.imageUrl} width="120px" height="80px" />
                      </button>

                    </td>
                    <td>
                      {key.ownerContact}
                    </td>
                    <td>
                      <textarea id="textareainrequestermobile">{`Enquiry about your property from this number : ${key.requesterMobile}`}</textarea>
                    </td>
                    <td>
                     {formatDate(key.requestTime)}
                    </td>
                    <td>
                     {formatTime(key.requestTime)}
                    </td>
                    <td>
                      {key.requesterMobile}
                    
                    <button class="btn btn-primary" onClick={()=>sendRequestedMobilenumber(key.requesterMobile)}>Log</button>
                      {/* <Link to={`/frontend/propertyCustomerRequestForOwner/phonenumber/${key.requesterMobile}`}>{key.requesterMobile} </Link> */}
                    </td>
                    <td>
                      {key.requesterName}
                    </td>
                    <td>
                      {key.requesterMessage}
                    </td>
                    <td>
                      <button class={key.classnameofbutton} data-toggle="modal" data-target="#myModal" onClick={()=>handleStatusChange(key._id)} disabled={key.disablingofbutton}> {key.requestAssessmentStatus}</button> <br/>
                     
                      {/* <button type="button" class="btn btn-primary" onClick={()=>handleStatusChange(key._id)}>
                      Change Status
                      </button> */}
                    
                      <div class="modal fade" id="myModal" role="dialog">
                        <div class="modal-dialog">
                          <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Change Status</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                            <div class="modal-body">
                              <p><Select onChange={statusChange} options={statusoptions}>
                                </Select></p>
                                <button type="submit" class="btn btn-success" onClick={handleSubmit}>Submit</button>
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                          </div>
      
                        </div>
                      </div>

                    </td>
                    <td>
                      <textarea id="textareainrequestpage">{`The contact number of the owner, that you requested is : ${key.ownerContact}`}</textarea>
  
                    </td> 
                    <td>
                        <button className="btn btn-danger" onClick={()=>handleDelete(key._id)}>Delete</button>
                    </td>
                    <td>
              
                    {/* <Select onChange={()=>handleStatusChange(key._id)} options={statusoptions}>
                     
                    </Select>
                 */}
                        {/* <button className="btn btn-danger" onClick={()=>handleStatusChange(key._id)}>Pending</button> */}
                    </td>
                 
                 
                   
                  </tr>
                ))} 
                <td>
                </td>
              </tbody>
          </table>  
         <Suspense> <PaginationforPropertyCustomerRequest totalPosts={requestsTable.length} recordsPerPage={recordsPerPage} setCurrentPage={setCurrentPage} 
            currentPage={currentPage} firstpostIndex={firstpostIndex} lastpostIndex={lastpostIndex}/></Suspense>
        </div>
      </div>
    )
};

export default PropertyCustomerRequestForOwnerTable;