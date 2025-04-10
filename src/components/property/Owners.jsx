import React, { Suspense } from "react";
const Navbar = React.lazy(() => import("../common/Navbar"));
import { Url } from "../../constants/global";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";

//import Functions from "../common/Functions";



const PaginationforOwnersList = React.lazy(() => import("./PaginationforOwnersList"));


var newUrl = Url + 'accounts/logInFunction';
var loggedCheckUrl = Url + 'accounts/loggedInUser';
var  deleteRequestUrl = Url + 'property/deleteOwnerOrBuilder/';

const Owners = () => {
    const [ownersTable, setOwnersTable] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [ownerid,setOwnerId]=useState("");
    const [name,setName]=useState("");
    const [ownerStatus,setOwnerstatus]=useState("");
    const [address,setAddress]=useState("");
    const [alertClass, setAlertClass] = useState("alert alert-info");
    const [alertContent, setAlertContent] = useState("Enter the data for editing");
    const[loggedinusername,setLoggedusername]=useState("");
    const[loggedinuserid,setLoggeduserId]=useState("");
    const[loggedinuserRole,setLoggeduserRole]=useState("");
    const navigate = useNavigate();
    let currentpageno=1;
      let recordsperpageno=20;
      const [currentPage, setCurrentPage] = useState(currentpageno);
      const [recordsPerPage,setRecordsperpage]=useState(recordsperpageno);
      const lastpostIndex=currentPage*recordsPerPage; 
      //const lastpostIndex=currentPage * recordsPerPage > propertydetails.length ? propertydetails.length + 1 : currentPage * recordsPerPage; 
        const firstpostIndex=lastpostIndex-recordsPerPage;
      //alert(firstpostIndex);
      //alert(lastpostIndex);
        const currentposts=ownersTable.slice(firstpostIndex,lastpostIndex);
    function createdata(ownerdatas){
        //  alert(data)
          var slno=1;
    
          let temparrayfornames=[]
       
                ownerdatas.map((data)=>{
                  //alert(data.ownerAddDate)
                     if(data.ownerStatus!="Draft"){
                        temparrayfornames.push({
                            'slno':slno++,
                            '_id':data._id,
                            'ownerContact1':data.contactNumber,
                            'ownerContact2':data.secondNumber,
                            'ownerOrBuilder':data.ownerOrBuilder,
                            'name':data.name,
                            'address':data.address,
                            'ownerStatus':data.ownerStatus,
                            'ownerAddDate':data.ownerAddDate
            
                          })

                     }
                     //alert("haii")
                  
             
                 
                })
            //     // alert("haiii")
        
          setOwnersTable(temparrayfornames);
          setOriginalData(temparrayfornames);
        }
    function FetchOwners(){
        
            axios
            .get(Url+"property/ownersandbuilders",
            )
            .then((res) => {
              createdata(res.data)
            })
    }
    useEffect(() => {

      FetchOwners();
     
    }, []);

    const formatDate = (timestamp) => {
         //alert(timestamp)
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
          
          (item._id && item._id.toLowerCase().includes(searchTerm.toLowerCase())) || 
          (item._id && item._id.toUpperCase().includes(searchTerm.toUpperCase())) ||
          (item.ownerContact1 && item.ownerContact1.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.ownerContact1 && item.ownerContact1.toUpperCase().includes(searchTerm.toUpperCase())) ||
          (item.ownerContact2 && item.ownerContact2.toLowerCase().includes(searchTerm.toLowerCase())) || 
          (item.ownerContact2 && item.ownerContact2.toUpperCase().includes(searchTerm.toUpperCase())) ||
          (item.ownerOrBuilder && item.ownerOrBuilder.toLowerCase().includes(searchTerm.toLowerCase())) || 
          (item.ownerOrBuilder && item.ownerOrBuilder.toUpperCase().includes(searchTerm.toUpperCase()))||
          (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) || 
          (item.name && item.name.toUpperCase().includes(searchTerm.toUpperCase())) ||
          (item.address && item.address.toLowerCase().includes(searchTerm.toLowerCase())) || 
          (item.address && item.address.toUpperCase().includes(searchTerm.toUpperCase())) ||
          (item.ownerStatus && item.ownerStatus.toLowerCase().includes(searchTerm.toLowerCase())) || 
          (item.ownerStatus && item.ownerStatus.toUpperCase().includes(searchTerm.toUpperCase()))||
          
          formatDate(item.ownerAddDate).includes(searchTerm) ||
          formatTime(item.ownerAddDate).toLowerCase().includes(searchTerm)||
          formatTime(item.ownerAddDate).toUpperCase().includes(searchTerm)
    
            
      
      );
      const handleEdit =(_id)=>{
        //alert(_id);
        setAlertClass("alert alert-info");
        setAlertContent("Enter the data for editing");
        setOwnerId(_id)
         axios.get(Url+"property/individualOwnerOrBuilder/"+_id)
              .then((res)=>{
                setAddress(res.data.address);
                setName(res.data.name);
                setOwnerstatus(res.data.ownerStatus)
              })
      }

      const handleSubmit = () => {

     
            axios.post(Url+"property/editOwnerOrBuilder",
                {
                    "id":ownerid,
                    "name":name,
                    "address":address,
                    "donebyUserId":loggedinuserid,
                    "donebyUserName":loggedinusername,
                    "donebyUserrole":loggedinuserRole
                   // "ownerStatus":"Public"
                }
            )
            .then((res)=>{
                //alert('haiiii')
                FetchOwners();
            })
            setAlertClass("alert alert-success");
            setAlertContent("Data Updated Successfully");
            
      
    }

      const handleDelete =(_id)=>{
          //alert(_id)
          var dataafterdeletetemp=[];
          if (window.confirm('Do you want to delete this Owner?')) {
          var deletetempurl=deleteRequestUrl+_id; 
          // alert(deletetempurl)
          const response=axios.get(deletetempurl);
        //   originalData.map(key=>{
        //      //alert(key._id)
        //     // alert("id",_id)
        //     if(key._id!=_id){
        //       // alert("hhjj")
        //       dataafterdeletetemp.push(key);
        //     }
        //   });
          setOriginalData(dataafterdeletetemp)
          setOwnersTable(dataafterdeletetemp)
          FetchOwners();
          }
        }
        
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
    

      
      fetchLoggedDataForPropertySubmission();
     
    
    
    
      //test();
    
    }, []);
    return(

        <div>
        <Suspense><Navbar/></Suspense>

        <div>
          <div class="row mb-3 p-4">
    
            <div class="col-sm-4">
            </div>

            <div class="col-sm-4">
              <h2>Owners</h2>
          
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
                  Owner Id
                  </th>
                  <th>
                    Builder/Owner
                  </th>
                  <th>
                    Owner Contact
                  </th>
                  <th>
                    Another Contact
                  </th>
                  <th>
                    Name
                  </th>
                  <th>
                    Address
                  </th>
                  <th>
                    Added Date
                  </th>
                  <th>
                   Added Time
                  </th>

                  
                  <th>
                      Status
                  </th>
                   <th>
                    Edit
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
                      {key._id} 
                       {/* <button class = "btn btn-outline" onClick={()=>sendRequestedPropertyID(key.propertyID)}><img src={key.imageUrl} width="120px" height="80px" />
                      </button> */}

                    </td>
                    <td>
                        {key.ownerOrBuilder}
                    </td>
                    <td>
                      {key.ownerContact1}
                    </td>
                    <td>
                      {key.ownerContact2}
                    </td>
                    <td>
                      {key.name}
                    </td>
                    <td>
                      {key.address}
                    </td>
                   
                    <td>
                     {formatDate(key.ownerAddDate)}
                    </td>
                    <td>
                     {formatTime(key.ownerAddDate)}
                    </td>
                    
                   <td>
                    {key.ownerStatus}</td>
                    <td>
                      <button class="btn btn-primary" data-toggle="modal" data-target="#myModal" onClick={()=>handleEdit(key._id)}> Edit</button> <br/>
                     
                      {/* <button type="button" class="btn btn-primary" onClick={()=>handleStatusChange(key._id)}>
                      Change Status
                      </button> */}
                    
                      <div class="modal fade" id="myModal" role="dialog">
                        <div class="modal-dialog">
                          <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Update Owner Data</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                            <div class="modal-body">
                            <div class={alertClass} role="alert">
                                {alertContent}
                            </div>
                            <div class="row mb-3">
                                <label for="inputPassword3" class="col-sm-2 col-form-label">Name</label>

                                <div class="col-sm-5">
                                    <input type="text" className="form-control" value={name} onChange={(e) =>  setName(e.target.value)}/>
                                            
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="inputPassword3" class="col-sm-2 col-form-label">Address</label>

                                <div class="col-sm-5">
                                <textarea className="form-control" value={address} onChange={(e) =>  setAddress(e.target.value)}></textarea>
                                            
                                </div>
                            </div>
                       

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
                        <button className="btn btn-danger" onClick={()=>handleDelete(key._id)}>Delete</button>
                    </td>
                    
                 
                 
                   
                  </tr>
                ))} 
                <td>
                </td>
              </tbody>
          </table>  
          <Suspense><PaginationforOwnersList totalPosts={ownersTable.length} recordsPerPage={recordsPerPage} setCurrentPage={setCurrentPage} 
            currentPage={currentPage} firstpostIndex={firstpostIndex} lastpostIndex={lastpostIndex}/></Suspense>
        </div>
      </div>
    
        )
    };

export default Owners;