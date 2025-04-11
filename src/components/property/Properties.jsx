
import React, { Suspense } from "react";


// import AppNavbar from "../common/AppNavbar";
const AppNavbar = React.lazy(() => import("../common/AppNavbar"));
import { Url } from "../../constants/global";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


import { useConfirm } from "material-ui-confirm";
const PaginationforProperties= React.lazy(() => import("./PaginationforProperties"));

import { NoImage } from "../../constants/global";

var newUrl = Url + 'location/state';
var addDistrictUrl = Url + 'location/district';

var getPropertiesUrl = Url + 'property/properties';
var getDistrictUrl = Url + 'location/districts';


var deleteStateUrl = Url + 'location/deleteState/';
var updateStateUrl = Url + 'location/updateState/';

var  deletePropertyUrl = Url + 'property/deleteProperty/';

const Properties = (props) => {

    const [propertiesTable, setPropertiesTable] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    let currentpageno=1;
    let recordsperpageno=20;
    const [currentPage, setCurrentPage] = useState(currentpageno);
    const [recordsPerPage,setRecordsperpage]=useState(recordsperpageno);
    const navigate = useNavigate();
    
    const lastpostIndex=currentPage*recordsPerPage; 
  //const lastpostIndex=currentPage * recordsPerPage > propertydetails.length ? propertydetails.length + 1 : currentPage * recordsPerPage; 
    const firstpostIndex=lastpostIndex-recordsPerPage;
  //alert(firstpostIndex);
  //alert(lastpostIndex);
    const currentposts=propertiesTable.slice(firstpostIndex,lastpostIndex);
  // const npage=Math.ceil(propertydetails.length/recordsPerPage);
    function createrows(row,statedata,districtdata,towndata){
      var slno =1;
      let temparrayfornames=[]
      row.map(row => {
        if(row.propertyStatus==="Draft"){
      
          var setPropertyClass="btn btn-danger mr-2"
         }
         else{
        
           var setPropertyClass="btn btn-success mr-2"
         }
        statedata.map(statetemp=>{
          if(statetemp['_id']===row.stateID){
            districtdata.map(districttemp=>{
              if(districttemp['_id']===row.districtID){
                towndata.map(towntemp=>{
                  if(towntemp['_id']===row.townID){
                    temparrayfornames.push({
                      'slno':slno++,
                      '_id':row._id,
                      'id':row.id,
                      'propertyType':row.propertyType,
                      'imageUrl':row.thumbnailImageName ? Url+"assets/"+ row._id + "/" + row.thumbnailImageName : NoImage,
                      'state':statetemp['stateName'],
                      'district':districttemp['districtName'],
                      'town':towntemp['townName'],
                      'propertyStatus':row.propertyStatus,
                      'propertystatusclass':setPropertyClass
                      
                    })
                  }
                })
              }
            }) 
          }
        });
      });
      setPropertiesTable(temparrayfornames);
      setOriginalData(temparrayfornames);
    }
    function fetchProperties () {
      //alert("anu");
      axios
        .get(Url+"property/properties",
      )
      .then((res) => {
        axios
          .get(Url+"location/states",
        )
        .then((res2) => {
          axios
            .get(Url+"location/districts",
          )
          .then((res3) => {
            axios
            .get(Url+"location/towns",
            )
            .then((res4) => {
              createrows(res.data,res2.data,res3.data,res4.data);
            })
          })
       
        })
      })
    }

    const filteredData = currentposts.filter(
      (item) =>
        (item.id && item.id.toLowerCase().includes(searchTerm.toLowerCase())) || 
        (item.id && item.id.toUpperCase().includes(searchTerm.toUpperCase())) ||
        (item.propertyType && item.propertyType.toLowerCase().includes(searchTerm.toLowerCase())) || 
        (item.propertyType && item.propertyType.toUpperCase().includes(searchTerm.toUpperCase())) ||
        (item.state && item.state.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.state && item.state.toUpperCase().includes(searchTerm.toUpperCase())) ||
        (item.district && item.district.toLowerCase().includes(searchTerm.toLowerCase())) || 
        (item.district && item.district.toUpperCase().includes(searchTerm.toUpperCase())) ||
        (item.town && item.town.toLowerCase().includes(searchTerm.toLowerCase())) || 
        (item.town && item.town.toUpperCase().includes(searchTerm.toUpperCase())) ||
        (item.propertyStatus && item.propertyStatus.toLowerCase().includes(searchTerm.toLowerCase())) || 
        (item.propertyStatus && item.propertyStatus.toUpperCase().includes(searchTerm.toUpperCase())) 
    
    );
    function addImagesFunction(propertyID) {
      navigate('/frontend/addimages/'+propertyID);
    }
    const handleDelete =(_id)=>{
      var dataafterdeletetemp=[];
      if (window.confirm('Do you want to delete this Property?')) {
      var deletetempurl=deletePropertyUrl+_id; 
      // alert(deletetempurl)
      const response=axios.get(deletetempurl);
      originalData.map(key=>{
        // alert(key._id)
        // alert("id",_id)
        if(key._id!=_id){
          // alert("hhjj")
          dataafterdeletetemp.push(key);
        }
      });
      setOriginalData(dataafterdeletetemp)
      setPropertiesTable(dataafterdeletetemp)
      fetchProperties();
      }
    }
    useEffect(() => {
        fetchProperties();
    }, []);
    const navigateToEditPage = (uniqueID) => {
      navigate("/frontend/addProperty/edit/"+uniqueID);
    };
    
    
    return(
      <div>

       <Suspense><AppNavbar /></Suspense>
        {/* <AppNavbar/> */}
          <div>
            <div class="row mb-3 p-4">
    
              <div class="col-sm-4">
              </div>
      
              <div class="col-sm-4">
              <h2>Properties</h2>
            
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
                    ID
                    </th>
                    <th>
                    Image
                    </th>
                    <th>
                    Property type
                    </th>
                    <th>
                        state
                    </th>

                    <th>
                        District
                    </th>

                    <th>
                        Town
                    </th>
                    <th>
                    Property Status
                    </th>
                    <th>
                        Delete
                    </th>
                    <th>
                        Edit
                    </th>
                    <th>
                        Add images
                    </th>
                    </tr>
                </thead>
                <tbody>
                
                    {filteredData.map(key =>  (
                    <tr >
                        <td>
                        {key.slno}
                        </td>
                        <td>
                        {key.id}
                        </td>
                        <td>
                    
                        <img src={key.imageUrl} width="120px" height="80px" />
                        {/* {key._id} */}
                        </td>
                        <td>
                        {key.propertyType}
                        </td>
                        <td>
                        {key.state}
                        </td>
                        <td>
                        {key.district}
                        </td>
                        <td>
                        {key.town}
                        </td>
                        <td>
                        <button className={key.propertystatusclass}>{key.propertyStatus}</button> 
                        </td>
                        <td>
                        <button className="btn btn-danger" onClick={()=>handleDelete(key._id)}>Delete</button>
                        </td>
                        <td>
                        <button className="btn btn-secondary" onClick={()=>navigateToEditPage(key._id)}>Edit</button> 
                        </td> 
                        <td>
                        <button className="btn btn-primary" onClick={()=>addImagesFunction(key._id)}>Add images</button>
                        </td> 
                    </tr>
                    ))} 
                    <td>
                    </td>
                </tbody>
                </table>  
            </div>
            <Suspense><PaginationforProperties totalPosts={propertiesTable.length} recordsPerPage={recordsPerPage} setCurrentPage={setCurrentPage} 
            currentPage={currentPage} firstpostIndex={firstpostIndex} lastpostIndex={lastpostIndex}/> </Suspense>
          </div>
      </div>
    )
};

export default Properties;