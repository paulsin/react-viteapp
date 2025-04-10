
import React, { Suspense } from "react";

const Navbar = React.lazy(() => import("../common/Navbar"));

import { Url } from "../../constants/global";

import { useState, useEffect } from "react";
import {  Link,useNavigate, useParams } from "react-router-dom";
import axios from "axios";

var newUrl = Url + 'accounts/loggedInUser';
var loggedCheckUrl = Url + 'accounts/loggedInUser';


const History = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [historyTable, setHistoryTable] = useState([]);
    const [originalData, setOriginalData] = useState([]);
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
    const currentposts=historyTable.slice(firstpostIndex,lastpostIndex);
 
    const[loggedinuserid,setLoggeduserId]=useState("");


//    const [dataCheckFlag, setDataCheckFlag] = useState(0);

    ///   For navigate function
    const navigate = useNavigate();

    const {newID} = useParams();

    //alert(newID);



    function createrows(row){
        alert(loggedinuserid)
        var slno =1;
        let temparrayfornames=[]
        
         
                  row.map(row1=>{
                    // console.log("row1 ID:", row1.donebyUserId, "| Length:", row1.donebyUserId.length);
                    //alert(row1.donebyUserId)
                    // if (row1.donebyUserId.trim().toString() === loggedinuserid.trim().toString()) {
                        // alert("haiii")
                        temparrayfornames.push({
                            'slno':slno++,
                          
                       
                            'donebyUserId':row1.donebyUserId,
                            'donebyUserName':row1.donebyUserName,
                            
                            'dateOperation':row1.dateOperation,
                            'donebyUserrole':row1.donebyUserrole,
                            'operation':row1.operation,
                      
                            
                          })

                    // }
                    
                    })
         
 
        setHistoryTable(temparrayfornames);
        setOriginalData(temparrayfornames);
      }
      function fetchHistory () {
        //alert("anu");
        axios
          .get(Url+"property/history",
        )

        .then((res) => {
            createrows(res.data);
        })
      
      }

    const fetchLoggedDataForPropertySubmission = (e) => {

        //Functions();
      
        //alert("Paulsin");
      
        const response = axios.get(loggedCheckUrl,
          {withCredentials:true }
        )
        .then(function (response) {
        //   alert(response.data.userID);
       
          setLoggeduserId(response.data.userID);
        //   console.log("loggedinuserid:", loggedinuserid, "| Length:", loggedinuserid.length);
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
    useEffect(() => {
        //console.log('i fire once');
         fetchLoggedDataForPropertySubmission();
        fetchHistory();
       
        //alert("Paulsin");
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
    const filteredData = currentposts.filter(
        (item) =>
          (item.donebyUserId && item.donebyUserId.toLowerCase().includes(searchTerm.toLowerCase())) || 
          (item.donebyUserId && item.donebyUserId.toUpperCase().includes(searchTerm.toUpperCase())) ||
          (item.donebyUserName && item.donebyUserName.toLowerCase().includes(searchTerm.toLowerCase())) || 
          (item.donebyUserName && item.donebyUserName.toUpperCase().includes(searchTerm.toUpperCase())) ||
          (item.donebyUserrole && item.donebyUserrole.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.donebyUserrole && item.donebyUserrole.toUpperCase().includes(searchTerm.toUpperCase())) ||
          (item.operation && item.operation.toLowerCase().includes(searchTerm.toLowerCase())) || 
          (item.operation && item.operation.toUpperCase().includes(searchTerm.toUpperCase())) ||
          formatDate(item.dateOperation).includes(searchTerm) ||
          formatTime(item.dateOperation).toLowerCase().includes(searchTerm)||
          formatTime(item.dateOperation).toUpperCase().includes(searchTerm)
      
      );


    return(
        <>
        <Suspense><Navbar /> </Suspense> 
              <div>
              <div class="row mb-3 p-4">
    
                <div class="col-sm-4">
                </div>

                <div class="col-sm-4">
                <h2>History</h2>
            
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
              
                <div className="table-responsive pl-3 pb-3 pr-3">
                  <table className="table table-striped" id="selectedTable">
                    <thead>
                      <tr>
                        <th>
                          Index
                        </th>
                   
                        <th>
                          User Id
                        </th>
                        <th>
                         User Name
                        </th>
                        <th>
                          Date
                        </th>
                        <th>
                          Time
                        </th>
                        <th>
                          User role
                        </th>
                        <th>
                          Operation
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
                            {key.donebyUserId}
                          </td>
                          <td>
                            {key.donebyUserName}
                          </td>
                          <td>
                          {formatDate(key.dateOperation)}
                          </td> 
                          <td>
                            {formatTime(key.dateOperation)}
                         </td>
                          <td>
                            {key.donebyUserrole}
                          </td> 
                          <td>
                           {key.operation}
                          </td>
                          
                        </tr>
                      ))} 
        
                    </tbody>
                  </table>
                </div>
              </div>
    </>







    )
};

export default History;