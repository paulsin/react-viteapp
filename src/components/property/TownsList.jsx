
import React from "react";

import { Url } from "../../constants/global";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useConfirm } from "material-ui-confirm";


var newUrl = Url + 'location/state';
var addDistrictUrl = Url + 'location/district';

var getDistrictUrl = Url + 'location/districts';
var getTownUrl = Url + 'location/towns';

var deleteTownUrl = Url + 'location/deleteTown/';
var updateTownUrl = Url + 'location/updateTown/';

var getStateUrl = Url + 'location/states';
var districtsUrl = "/frontend/location/districtsList/india/";

var fetchStateNameFromIDurl = "/location/stateNameFromID/";

const TownsList= (props) => {


    const [townOptions, setTownOptions] = useState([]);
    
    const [modalTownID, setModalTownID] = useState("");

    const [modalTownName, setModalTownName] = useState("");
    const [modalTownCode, setModalTownCode] = useState("");

    const [modalAlertContent, setModalAlertContent] = useState("Enter the data");
    const [modalAlertClass, setModalAlertClass] = useState("alert alert-info");

    const [updateButtonLabel, setUpdateButtonLabel] = useState("Update");

    const [stateNameInTable, setStateNameInTable] = useState();
    const [districtNameInTable, setDistrictNameInTable] = useState();
     const [searchTerm, setSearchTerm] = useState("");

    const districtOptionsArray = [];
    const townOptionsArray = [];

    const navigate = useNavigate();
    const confirm = useConfirm();

    //const data = JSON.parse(fs.readFileSync("../../json/places.json"));

    //alert(props.locationType);

    const {countryName} = useParams();
    const {stateID} = useParams();
    const {districtID} = useParams();

    //alert(stateID);

    const fetchTowns =  async (e) => {
      try {
        const response = await axios.get(getTownUrl,   
            { withCredentials: true }
          )
          .then(function (response) {
            //alert(response.data[0].stateName);

            response.data.map(key => {
              //alert(key.districtID);
              //alert(districtID);
              //alert(stateName);
              if(key.stateID == stateID && key.districtID == districtID) {
                  townOptionsArray.push({ id: key._id, townName: key.townName, townCode: key.townCode, stateID : key.stateID, districtID : key.districtID });           
              }
            });
            
            townOptionsArray.sort((a, b) => (a.townName > b.townName) ? 1 : -1)

            setTownOptions(townOptionsArray);
          })
          .catch(function (error) {
            console.log(error);
          }); 

        
      } catch(error) {
        console.error("Error posting data:", error);
      }
    };

    const handleTownDelete = async (_id) => {
      var dataTemp = [];
      confirm({ description: "This action is permanent!" })
        .then(() => {
          var deleteUrlTemp = deleteTownUrl + _id;
          //alert(_id);
          
          const response = axios.get(deleteUrlTemp);
  
          townOptions.map(key => {
            if (key.id != _id) {
              //alert(key.value);
              dataTemp.push(key);            
            }
          });
  
          setTownOptions(dataTemp);
  
        })
        .catch(() => {
          /* ... */
        });
    };

    const handleDistrictEdit = async (_id) => {
      var tempLabel;
      var tempCode;
      var updateDistrictUrlTemp = updateTownUrl + _id;
      //alert(updateStateUrlTemp);

      //alert();
      
      setModalAlertContent("Enter the data");
      setModalAlertClass("alert alert-info");

      townOptions.map(key => {
            
        if (key.id == _id) {
          //alert(key.stateID);
          //dataTemp.push(key);   
          setModalTownID(key.id);
          setModalTownName(key.townName);
          setModalTownCode(key.townCode);
        }
      });

    };

    const saveTownEdit = async (_id) => {
      var tempLabel;
      var tempCode;
      var updateTownUrlTemp = updateTownUrl + _id;
      //alert(updateStateUrlTemp);

      //alert("Paulsin");
      
      try {
        const response = await axios.post(
        updateTownUrlTemp,
        {
          "stateID" : stateID,
          "districtID" : districtID,
          "townName": modalTownName,    
          "townCode": modalTownCode
        }     
      ); 

            //alert(response.data);
            if(response.status == 200) {
              setUpdateButtonLabel("Update");
              setModalAlertContent("Saved changes");
              setModalAlertClass("alert alert-success");
              fetchTowns();
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

    const fetchDistrictsToGetStateNameFromID =  async (e) => {
      try {
        const response = await axios.get(getDistrictUrl,   
            { withCredentials: true }
          )
          .then(function (response) {
            response.data.map(key => {
              //alert(key._id);
              //stateOptionsArray.push({ id: key._id, stateName: key.stateName, stateCode: key.stateCode });    
              if(key._id == districtID) {
                //alert(key.districtID);
                setDistrictNameInTable(key.districtName);
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
      fetchTowns();
      //fetchStateNameFromID(stateID);
      fetchStatesToGetStateNameFromID();
      fetchDistrictsToGetStateNameFromID();

    }, []);

    var slno =1;
    const filteredData =  townOptions.filter(
      (item) =>
        
        (item.id && item.id.toLowerCase().includes(searchTerm.toLowerCase())) || 
        (item.id && item.id.toUpperCase().includes(searchTerm.toUpperCase()))|| 
        (item.townName && item.townName.toLowerCase().includes(searchTerm.toLowerCase())) || 
        (item.townName && item.townName.toUpperCase().includes(searchTerm.toUpperCase()))|| 
        (item.townCode && item.townCode.toLowerCase().includes(searchTerm.toLowerCase())) || 
        (item.townCode && item.townCode.toUpperCase().includes(searchTerm.toUpperCase()))
);

    return(

    <div >

      <div class="row mb-3 p-4">
    
        <div class="col-sm-4">
        </div>

        <div class="col-sm-4">
          <h2>Towns</h2>
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
                Town name
                </th>
                <th>
                Town code
                </th>

                <th>
                State name
                </th>
                <th>
                District name
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
                    {key.townName}
                </td>

                <td>
                    {key.townCode}
                </td>

                <td>
                    {stateNameInTable}
                </td>

                <td>
                    {districtNameInTable}
                </td>

                <td>
                    <button className="btn btn-danger" onClick={()=>handleDistrictEdit(key.id)} data-toggle="modal" data-target="#myModal">{updateButtonLabel}</button>
                </td>

                <td>
                    <button className="btn btn-secondary" onClick={()=>handleTownDelete(key.id)}>Delete</button>
                </td> 

                <td>
                    <a href=""><button className="btn btn-primary" onClick={()=>displayDistricts(key.value)}>Villages</button></a>
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
          <h4 class="modal-title">Edit town</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>

        <div class="modal-body">

            <div class={modalAlertClass} role="alert">
              {modalAlertContent}
            </div>

            <div class="mb-3 mt-3">
              <label for="password">Town ID</label>
              <input type="text" class="form-control" placeholder="Town ID" disabled
              value={modalTownID} />
            </div>

            <div class="mb-3 mt-3">
              <label for="password">Town name</label>
              <input type="text" class="form-control" placeholder="Town name"  
              value={modalTownName} onChange={(e) => setModalTownName(e.target.value)}/>
            </div>

            <div class="mb-3 mt-3">
              <label for="confirmPassword">Town code</label>
              <input type="text" class="form-control" placeholder="Town code"  
              value={modalTownCode} onChange={(e) => setModalTownCode(e.target.value)}/>
            </div>
            
            <button type="submit" class="btn btn-primary" onClick={()=>saveTownEdit(modalTownID)}>Save</button>
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

export default TownsList;