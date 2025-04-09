
import React from "react";
import { Url } from "../../constants/global";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";


import { useConfirm } from "material-ui-confirm";


var newUrl = Url + 'location/state';
var addDistrictUrl = Url + 'location/district';

var getStateUrl = Url + 'location/states';
var getDistrictUrl = Url + 'location/districts';


var deleteStateUrl = Url + 'location/deleteState/';
var updateStateUrl = Url + 'location/updateState/';

var districtsUrl = "/frontend/location/districtsList/india/";

const StatesList= (props) => {


    const [stateOptions, setStateOptions] = useState([]);
    const [modalStateID, setModalStateID] = useState("");

    const [modalStateName, setModalStateName] = useState("");
    const [modalStateCode, setModalStateCode] = useState("");

    const [modalAlertContent, setModalAlertContent] = useState("Enter the data");
    const [modalAlertClass, setModalAlertClass] = useState("alert alert-info");

    const [updateButtonLabel, setUpdateButtonLabel] = useState("Update");
    const [searchTerm, setSearchTerm] = useState("");

    const stateOptionsArray = [];

    const navigate = useNavigate();
    const confirm = useConfirm();

    //const data = JSON.parse(fs.readFileSync("../../json/places.json"));

    //alert(props.locationType);


    const fetchStates =  async (e) => {
      try {
        const response = await axios.get(getStateUrl,   
            { withCredentials: true }
          )
          .then(function (response) {
            //alert(response.data[0].stateName);

            response.data.map(key => {
                stateOptionsArray.push({ id: key._id, stateName: key.stateName, stateCode: key.stateCode });           
            });
            
            stateOptionsArray.sort((a, b) => (a.stateName > b.stateName) ? 1 : -1)

            setStateOptions(stateOptionsArray);
          })
          .catch(function (error) {
            console.log(error);
          }); 

        
      } catch(error) {
        console.error("Error posting data:", error);
      }
    };

    const handleStateDelete = async (_id) => {
      var dataTemp = [];
      confirm({ description: "This action is permanent!" })
        .then(() => {
          var deleteUrlTemp = deleteStateUrl + _id;
          //alert(_id);
          
          const response = axios.get(deleteUrlTemp);
  
          stateOptions.map(key => {
            
            if (key.id != _id) {
              //alert(key.value);
              dataTemp.push(key);            
            }
          });
  
          setStateOptions(dataTemp);
  
        })
        .catch(() => {
          /* ... */
        });
    };

    const handleStateEdit = async (_id) => {
      var tempLabel;
      var tempCode;
      var updateStateUrlTemp = updateStateUrl + _id;
      //alert(updateStateUrlTemp);

      //alert();

      setModalAlertContent("Enter the data");
      setModalAlertClass("alert alert-info");
      
      stateOptions.map(key => {
            
        if (key.id == _id) {
          //alert(key.stateCode);
          //dataTemp.push(key);   
          setModalStateID(key.id);
          setModalStateName(key.stateName);
          setModalStateCode(key.stateCode);

        }
      });

    };

    const saveStateEdit = async (_id) => {
      var tempLabel;
      var tempCode;
      var updateStateUrlTemp = updateStateUrl + _id;
      //alert(updateStateUrlTemp);

      //alert("Paulsin");
      
      try {
        const response = await axios.post(
        updateStateUrlTemp,
        {
          "stateName": modalStateName,    
          "stateCode": modalStateCode
        }     
      ); 

            //alert(response.data);
            if(response.status == 200) {
              setUpdateButtonLabel("Update");
              setModalAlertContent("Saved changes");
              setModalAlertClass("alert alert-success");
              fetchStates();
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

    useEffect(() => {
      //console.log('i fire once');
      //setItems(data);
      fetchStates();
      //fetchDistricts();

    }, []);

    var slno =1;
    const filteredData =  stateOptions.filter(
      (item) =>
        
        (item.id && item.id.toLowerCase().includes(searchTerm.toLowerCase())) || 
        (item.id && item.id.toUpperCase().includes(searchTerm.toUpperCase()))|| 
        (item.stateName && item.stateName.toLowerCase().includes(searchTerm.toLowerCase())) || 
        (item.stateName && item.stateName.toUpperCase().includes(searchTerm.toUpperCase()))|| 
        (item.stateCode && item.stateCode.toLowerCase().includes(searchTerm.toLowerCase())) || 
        (item.stateCode && item.stateCode.toUpperCase().includes(searchTerm.toUpperCase()))
);

    return(

    <div >

      <div class="row mb-3 p-4">
    
        <div class="col-sm-4">
        </div>

        <div class="col-sm-4">
          <h2>Location</h2>
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
                State name
                </th>
                <th>
                State code
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
                    {key.stateName}
                </td>
                <td>
                    {key.stateCode}
                </td>

                <td>
                    <button className="btn btn-danger" onClick={()=>handleStateEdit(key.id)} data-toggle="modal" data-target="#myModal">{updateButtonLabel}</button>
                </td>
                <td>
                    <button className="btn btn-secondary" onClick={()=>handleStateDelete(key.id)}>Delete</button>
                </td> 
                <td>
                    <a href={districtsUrl+key.id}><button className="btn btn-primary" onClick={()=>displayDistricts(key.value)}>Districts</button></a>
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
          <h4 class="modal-title">Edit state</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>

        <div class="modal-body">

            <div class={modalAlertClass} role="alert">
              {modalAlertContent}
            </div>

            <div class="mb-3 mt-3">
              <label for="password">State ID</label>
              <input type="text" class="form-control" placeholder="State ID" disabled
              value={modalStateID} />
            </div>

            <div class="mb-3 mt-3">
              <label for="password">State name</label>
              <input type="text" class="form-control" placeholder="State name"  
              value={modalStateName} onChange={(e) => setModalStateName(e.target.value)}/>
            </div>

            <div class="mb-3 mt-3">
              <label for="confirmPassword">State code</label>
              <input type="text" class="form-control" placeholder="State code"  
              value={modalStateCode} onChange={(e) => setModalStateCode(e.target.value)}/>
            </div>
            
            <button type="submit" class="btn btn-primary" onClick={()=>saveStateEdit(modalStateID)}>Save</button>
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

export default StatesList;