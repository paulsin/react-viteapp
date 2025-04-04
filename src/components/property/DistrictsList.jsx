
import React from "react";
import background from "../../images/background.jpg";
import Navbar from "../common/Navbar";
import { Url } from "../../constants/global";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { propertyTypes } from "../../constants/global";
import { transactionType } from "../../constants/global";
import data from "../../json/places.json"
import { useConfirm } from "material-ui-confirm";
import LocationCheck from "./LocationCheck";

var newUrl = Url + 'location/state';
var addDistrictUrl = Url + 'location/district';

var getDistrictUrl = Url + 'location/districts';


var deleteDistrictUrl = Url + 'location/deleteDistrict/';
var updateDistrictUrl = Url + 'location/updateDistrict/';

var getStateUrl = Url + 'location/states';
var districtsUrl = "/frontend/location/districtsList/india/";

var fetchStateNameFromIDurl = "/location/stateNameFromID/";

var townsUrl = "/frontend/location/townsList/india/";

const DistrictsList= (props) => {


    const [districtOptions, setDistrictOptions] = useState([]);
    const [modalDistrictID, setModalDistrictID] = useState("");

    const [modalDistrictName, setModalDistrictName] = useState("");
    const [modalDistrictCode, setModalDistrictCode] = useState("");

    const [modalAlertContent, setModalAlertContent] = useState("Enter the data");
    const [modalAlertClass, setModalAlertClass] = useState("alert alert-info");

    const [updateButtonLabel, setUpdateButtonLabel] = useState("Update");

    const [stateNameInTable, setStateNameInTable] = useState();
    const [searchTerm, setSearchTerm] = useState("");

    const districtOptionsArray = [];

    const navigate = useNavigate();
    const confirm = useConfirm();

    //const data = JSON.parse(fs.readFileSync("../../json/places.json"));

    //alert(props.locationType);

    const {countryName} = useParams();
    const {stateID} = useParams();

    //alert(stateID);

    const fetchDistricts =  async (e) => {
      try {
        const response = await axios.get(getDistrictUrl,   
            { withCredentials: true }
          )
          .then(function (response) {
            //alert(response.data[0].stateName);

            response.data.map(key => {
              //alert(key.stateID);
              //alert(stateName);
              if(key.stateID == stateID) {
                  districtOptionsArray.push({ id: key._id, districtName: key.districtName, districtCode: key.districtCode, stateID : key.stateID });           
              }
            });
            
            districtOptionsArray.sort((a, b) => (a.districtName > b.districtName) ? 1 : -1)

            setDistrictOptions(districtOptionsArray);
          })
          .catch(function (error) {
            console.log(error);
          }); 

        
      } catch(error) {
        console.error("Error posting data:", error);
      }
    };

    const handleDistrictDelete = async (_id) => {
      var dataTemp = [];
      confirm({ description: "This action is permanent!" })
        .then(() => {
          var deleteUrlTemp = deleteDistrictUrl + _id;
          //alert(_id);
          
          const response = axios.get(deleteUrlTemp);
  
          districtOptions.map(key => {
            if (key.id != _id) {
              //alert(key.value);
              dataTemp.push(key);            
            }
          });
  
          setDistrictOptions(dataTemp);
  
        })
        .catch(() => {
          /* ... */
        });
    };

    const handleDistrictEdit = async (_id) => {
      var tempLabel;
      var tempCode;
      var updateDistrictUrlTemp = updateDistrictUrl + _id;
      //alert(updateStateUrlTemp);

      //alert();

      setModalAlertContent("Enter the data");
      setModalAlertClass("alert alert-info");
      
      districtOptions.map(key => {
            
        if (key.id == _id) {
          //alert(key.stateID);
          //dataTemp.push(key);   
          setModalDistrictID(key.id);
          setModalDistrictName(key.districtName);
          setModalDistrictCode(key.districtCode);
        }
      });

    };

    const saveDistrictEdit = async (_id) => {
      var tempLabel;
      var tempCode;
      var updateDistrictUrlTemp = updateDistrictUrl + _id;
      //alert(updateStateUrlTemp);

      //alert("Paulsin");
      
      try {
        const response = await axios.post(
        updateDistrictUrlTemp,
        {
          "stateID" : stateID,
          "districtName": modalDistrictName,    
          "districtCode": modalDistrictCode
        }     
      ); 

            //alert(response.data);
            if(response.status == 200) {
              setUpdateButtonLabel("Update");
              setModalAlertContent("Saved changes");
              setModalAlertClass("alert alert-success");
              fetchDistricts();
            }
            if(response.data == "both_exists") {
              setModalAlertContent("State name and code exist");
              setModalAlertClass("alert alert-danger");
            }
            else if(response.data == "name_exists") {
              setModalAlertContent("State name exists");
              setModalAlertClass("alert alert-danger");
            }
            else if(response.data == "code_exists") {
              setModalAlertContent("State code exists");
              setModalAlertClass("alert alert-danger");
            }

          }
          catch(error) {
            console.error("Error posting data:", error);
          } 

      
    };

    const displayDistricts = (stateID) => {
        //alert(stateID);
        //navigate("/frontend/location/districtsList/india/"+stateID);
    }

    const fetchStatesToGetStateNameFromID =  async (e) => {
      try {
        const response = await axios.get(getStateUrl,   
            { withCredentials: true }
          )
          .then(function (response) {
            response.data.map(key => {
              //alert(key._id);
              //stateOptionsArray.push({ id: key._id, stateName: key.stateName, stateCode: key.stateCode });    
              if(key._id == stateID) {
                //alert(key.stateName);
                setStateNameInTable(key.stateName);
              }       
            });

          })
          .catch(function (error) {
            console.log(error);
          }); 

        
      } catch(error) {
        console.error("Error posting data:", error);
      }
    };

    useEffect(() => {
      //console.log('i fire once');
      //setItems(data);
      //fetchStates();
      fetchDistricts();
      //fetchStateNameFromID(stateID);
      fetchStatesToGetStateNameFromID();

    }, []);
    const filteredData =  districtOptions.filter(
      (item) =>
        
        (item.id && item.id.toLowerCase().includes(searchTerm.toLowerCase())) || 
        (item.id && item.id.toUpperCase().includes(searchTerm.toUpperCase()))|| 
        (item.districtName && item.districtName.toLowerCase().includes(searchTerm.toLowerCase())) || 
        (item.districtName && item.districtName.toUpperCase().includes(searchTerm.toUpperCase()))|| 
        (item.districtCode && item.districtCode.toLowerCase().includes(searchTerm.toLowerCase())) || 
        (item.districtCode && item.districtCode.toUpperCase().includes(searchTerm.toUpperCase()))
);


    var slno =1;

    return(

    <div>

      <div class="row mb-3 p-4">
    
        <div class="col-sm-4">
        </div>

        <div class="col-sm-4">
          <h2>Districts</h2>
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
                District name
                </th>
                <th>
                District code
                </th>

                <th>
                State name
                </th>

                <th>
                Edit
                </th>
                <th>
                Delete
                </th>
                <th>
                Show districts
                </th>
            </tr>
            </thead>
            <tbody>
            {filteredData.map(key =>  (
                <tr>
                <td>
                    {slno++}
                </td>
                <td>
                    {key.id}
                </td>
                <td>
                    {key.districtName}
                </td>
                <td>
                    {key.districtCode}
                </td>

                <td>
                    {stateNameInTable}
                </td>

                <td>
                    <button className="btn btn-danger" onClick={()=>handleDistrictEdit(key.id)} data-toggle="modal" data-target="#myModal">{updateButtonLabel}</button>
                </td>
                <td>
                    <button className="btn btn-secondary" onClick={()=>handleDistrictDelete(key.id)}>Delete</button>
                </td> 
                <td>
                    <a href={townsUrl+stateID+"/"+key.id}><button className="btn btn-primary" >Towns</button></a>
                </td> 
                </tr>
            ))} 

            <td>


            </td>
            </tbody>
        </table>
    </div>
          


  <div class="modal" id="myModal">
    <div class="modal-dialog">
      <div class="modal-content">
      

        <div class="modal-header">
          <h4 class="modal-title">Edit district</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>

        <div class="modal-body">

            <div class={modalAlertClass} role="alert">
              {modalAlertContent}
            </div>

            <div class="mb-3 mt-3">
              <label for="password">District ID</label>
              <input type="text" class="form-control" placeholder="State ID" disabled
              value={modalDistrictID} />
            </div>

            <div class="mb-3 mt-3">
              <label for="password">District name</label>
              <input type="text" class="form-control" placeholder="State name"  
              value={modalDistrictName} onChange={(e) => setModalDistrictName(e.target.value)}/>
            </div>

            <div class="mb-3 mt-3">
              <label for="confirmPassword">District code</label>
              <input type="text" class="form-control" placeholder="State code"  
              value={modalDistrictCode} onChange={(e) => setModalDistrictCode(e.target.value)}/>
            </div>
            
            <button type="submit" class="btn btn-primary" onClick={()=>saveDistrictEdit(modalDistrictID)}>Save</button>
        </div>
        
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        </div>
        
      </div>
    </div>
  </div>


    </div>

    )
};

export default DistrictsList;