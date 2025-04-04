import React, { useState, useEffect } from "react";

import Select from 'react-select';
import { Url } from "../../constants/global";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { ToWords } from 'to-words';

const IndividualPropertyDetailsComponent = (props) => {

    const[propertydetails,setPropertydetails]=useState([]);
    var propertyID=props.propertyID
    // alert(propertyID)
    
    function createrows(row,statedata,districtdata,towndata){
   
        //  alert(row.cost)
        let temparrayfornames=[]
         const toWords = new ToWords();
         const date = new Date(row.propertyEditDate);
        //  var cost=row.cost;
        // var costinwords = toWords.convert(cost);
      
          statedata.map(statetemp=>{
            if(statetemp['_id']===row.stateID){
              districtdata.map(districttemp=>{
                if(districttemp['_id']===row.districtID){
                  towndata.map(towntemp=>{
                    if(towntemp['_id']===row.townID){
                     
                      temparrayfornames.push({
                       
                        'propertyType':row.propertyType,
                        'id':row.id,
                        // 'propertyeditdate':date.toLocaleString(),
                        'propertyeditdate':date.toLocaleDateString(),
                        'transactionType':row.transactionType,
                        'state':statetemp['stateName'],
                        'district':districttemp['districtName'],
                        'town':towntemp['townName'],
                        'location':row.locality,
                        'plotarea':row.plotArea,
                        'builtArea':row.builtArea,
                        'price':row.cost===undefined?row.cost:toWords.convert(row.cost),
                        'bedrooms':row.bedrooms,
                        "bedroomsWithToilet":row.bedroomsWithToilet,
                        "toilets":row.toilets,
                        'carporch':row.carPorch ===false ?"No":"Yes",
                        'carParking':row.carParking ==="" ?"":row.carParking,
                        'sitout':row.sitout ===false ?"No":"Yes",
                        'livingArea':row.livingArea ===false?"No":"Yes",
                        'diningHall':row.diningHall ===false ?"No":"Yes",
                        'kitchen':row.kitchen ===false ?"No":"Yes",
                        'workArea':row.workArea ===false ?"No":"Yes",
                        'upperLivingArea':row.upperLivingArea ===false ?"No":"Yes",
                        'balcony':row.balcony===false ?"No":"Yes",
                        'openTerrace':row.openTerrace ===false ?"No":"Yes",
                        'waterWell':row.waterWell ===false ?"No":"Yes",
                        'waterConnection':row.waterConnection ===false ?"No":"Yes",
                        'feature1': row.propertyFeature1==="" ?"":row.propertyFeature1,
                        'feature2':row.propertyFeature2==="" ?"":row.propertyFeature2,
                        'feature3':row.propertyFeature3==="" ?"":row.propertyFeature3,
                        'feature4':row.propertyFeature4==="" ?"":row.propertyFeature4,
                    


                      })
                    }
                  })
                }
              }) 
            }
          });
        //  });
     setPropertydetails(temparrayfornames)
      
      }
      function fetchProperties () {

        // alert("anu");
        let temparrayfornames=[];
        let statename=[]
        let districtname=[]
        axios
        .get(Url+"property/individualProperty/"+propertyID,
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
    
    useEffect(() => {
        fetchProperties();
    }, []);
  
  return (
    <>
    <div class="container  text-center p-1" id="properties_container ">
      {propertydetails.map(key=>  
        <div class="table-responsive">
          <table class="table">
          
            <thead class="thead-dark">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">{key.id}</th>
                <th scope="col">Date</th>
                <th scope="col">{key.propertyeditdate}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Property Type</th>
                <td>{key.propertyType}</td>
                <th>Plot Area</th>
                <td>{key.plotarea} cents</td>
              </tr>
              <tr class="table-secondary">
                <th scope="row">State</th>
                <td>{key.state}</td>
                <th>Coverage Area</th>
                <td>{key.builtArea} sq ft</td>
              </tr>
              <tr>
                <th scope="row">Sale/Rent</th>
                <td>{key.transactionType}</td>
                <th>Price</th>
                <td>{key.price}</td>
              </tr>
              <tr class="table-secondary">
                <th scope="row">District</th>
                <td>{key.district}</td>
                <th>BedRooms</th>
                <td>{key.bedrooms}</td>
              </tr>
              <tr>
                <th scope="row">Location</th>
                <td>{key.location}</td>
                <th>Town</th>
                <td>{key.town}</td>
              </tr>
              <tr class="table-secondary">
                <th scope="row">Bedrooms With Toilet</th>
                <td>{key.bedroomsWithToilet}</td>
                <th>Toilets</th>
                <td>{key.toilets}</td>
              </tr>
              <tr>
                <th scope="row">Carporch</th>
                <td>{key.carporch}</td>
                <th>Car Parking</th>
                <td>{key.carParking}</td>
              </tr>
              <tr class="table-secondary">
                <th scope="row">Sitout</th>
                <td>{key.sitout}</td>
                <th>LivingArea</th>
                <td>{key.livingArea}</td>
              </tr>
              <tr >
                <th scope="row">DiningHall</th>
                <td>{key.diningHall}</td>
                <th>kitchen</th>
                <td>{key.kitchen}</td>
              </tr>
              <tr class="table-secondary">
                <th scope="row">workArea</th>
                <td>{key.workArea}</td>
                <th>upperLivingArea</th>
                <td>{key.upperLivingArea}</td>
              </tr>
              <tr >
                <th scope="row">balcony</th>
                <td>{key.balcony}</td>
                <th>openTerrace</th>
                <td>{key.openTerrace}</td>
              </tr>
              <tr class="table-secondary">
                <th scope="row">waterWell</th>
                <td>{key.waterWell}</td>
                <th>waterConnection</th>
                <td>{key.waterConnection}</td>
              </tr>
           
              
            </tbody>
          </table> 
       
        </div>

      )}  

    </div>
    
      <div class="features-container p-0" >
      
      {propertydetails.map(key=> 
      <div>
        <h6 className="features">{key.feature1}</h6>
        <h6 className="features">{key.feature2}</h6>
        <h6  className="features">{key.feature3}</h6>
        <h6  className="features">{key.feature4}</h6>
         {/* <div class="row mb-3">
         <h6 for="inputPassword3" class="col-sm-2 col-form-label">Features</h6>
   
         <div class="col-sm-8">
          <textarea className="textarea-features" value={key.feature1} disabled={true}> </textarea>
        
                    
         </div>
       </div>
        <div class="row mb-3">
        <label for="inputPassword3" class="col-sm-2 col-form-label"></label>
  
        <div class="col-sm-5">
        <textarea className="textarea-features" value={key.feature2} disabled={true}> </textarea>
                   
        </div>
      </div>
      <div class="row mb-3">
        <label for="inputPassword3" class="col-sm-2 col-form-label"></label>
  
        <div class="col-sm-5">
        <textarea className="textarea-features" value={key.feature3} disabled={true}> </textarea>
                   
        </div>
      </div>
      <div class="row mb-3">
        <label for="inputPassword3" class="col-sm-2 col-form-label"></label>
  
        <div class="col-sm-5">
        <textarea className="textarea-features" value={key.feature4} disabled={true}> </textarea>
                   
        </div>
      </div> */}
      </div>
       

      // <p>
      // <h6 className="features">{key.feature1}</h6>
      //  <h6 className="features">{key.feature2}</h6>
      //  <p className="features">{key.feature3}</p>
      //  <p className="features">{key.feature4}</p>
      // </p>
   
      
   
  
       
)}
</div>
</>




    // <div class="container  text-center p-1" id="properties_container ">
    //   {propertydetails.map(key=>  
    //     <div class="table-responsive">
    //       <table class="table">
          
    //         <thead class="thead-dark">
    //           <tr>
    //             <th scope="col">Property ID</th>
    //             <th scope="col">{propertyID}</th>
    //             <th scope="col">Date</th>
    //             <th scope="col"></th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           <tr>
    //             <th scope="row">Property Type</th>
    //             <td>{key.propertyType}</td>
    //             <th>Plot Area</th>
    //             <td>{key.plotarea} cents</td>
    //           </tr>
    //           <tr class="table-secondary">
    //             <th scope="row">State</th>
    //             <td>{key.state}</td>
    //             <th>Coverage Area</th>
    //             <td>{key.builtArea} sq ft</td>
    //           </tr>
    //           <tr>
    //             <th scope="row">Sale/Rent</th>
    //             <td>{key.transactionType}</td>
    //             <th>Price</th>
    //             <td>{key.price}</td>
    //           </tr>
    //           <tr class="table-secondary">
    //             <th scope="row">District</th>
    //             <td>{key.district}</td>
    //             <th>BedRooms</th>
    //             <td>{key.bedrooms}</td>
    //           </tr>
    //           <tr>
    //             <th scope="row">Location</th>
    //             <td>{key.location}</td>
    //             <th>Town</th>
    //             <td>{key.town}</td>
    //           </tr>
    //           <tr class="table-secondary">
    //             <th scope="row">Feature</th>
    //             <td>{key.feature1}</td>
    //             <th>Feature2</th>
    //             <td>{key.feature2}</td>
    //           </tr>
    //         </tbody>

    //       </table>
    //     </div>
    //   )}  
    // </div>
    
  )
}

export default IndividualPropertyDetailsComponent