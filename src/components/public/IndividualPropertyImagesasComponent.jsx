import React, { useState, useEffect } from "react";
import background from "../../images/background.jpg";
import housebackground from "../../images/housebackground.jpg";
import sunrise from "../../images/sunrise.jpg";

import Navbar from "../common/NavbarPublic";
import Footer from "../common/Footer"
import NavbarPublic from "../common/NavbarPublic";

// import { MultiSelect } from "react-multi-select-component";
// import Multiselect from 'multiselect-react-dropdown';
import axios from "axios";
import { Url } from "../../constants/global";
import { baseUrl} from "../../constants/global";
import Select from 'react-select';

import Pagination from "./Pagination";
import { propertyTypes } from "../../constants/global";
import { transactionType } from "../../constants/global";
import { NoImage } from "../../constants/global";
import { Link, useNavigate, useParams } from "react-router-dom";
import QRCode from 'react-qr-code';


var propertyImagesurl=Url+'propertyImages/'
  
const IndividualPropertyImagesasComponent = (props) => {
    var individualurl=baseUrl+"frontend/individualProperty/"+props.propertyID;
  let temparrayfornames=[];
   
  const [propertyimages, setPropertyImages] = useState([]);
 
  var propertyID=props.propertyID


  function createdata(data){
    // alert(data)
 
     
          data.map((row, index)=>{
          //  alert(row.propertyID)
            if(index == 0) {
              temparrayfornames.push({
                'propertyID':row.propertyID,
                'id':row.id,
                'imageName':row.imageName,
                'slideShowClass' : "carousel-item active",
                'imageurl':Url+"assets/"+ propertyID + "/" + row.imageName
              })
            } else {
              temparrayfornames.push({
                'propertyID':row.propertyID,
                'id':row.id,
                'imageName':row.imageName,
                'slideShowClass' : "carousel-item",
                'imageurl':Url+"assets/"+ propertyID + "/" + row.imageName
              })
            }
       
            })
        setPropertyImages(temparrayfornames)

        //alert(propertyimages[0].imageName)
  }

function fetchPropertyImages(){
  axios
  .get(Url+"propertyImages/"+propertyID,
  )
  .then((res)=>{
    createdata(res.data)
  })
}

  let temparray=[background,housebackground,sunrise]
  
  useEffect(() => {
    fetchPropertyImages();
  }, []);
  var qrcodewidget= <QRCode
  title="GeeksForGeeks"
  value={individualurl}
  size={180}
  />

  return (

    
    <div>

      <div class="container p-3 ">
        <div class="row mb-1">
          <div class="col-sm-8 p-2 ">
            <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">  
              <div class="carousel-inner">
                
                {propertyimages.map((key, index) => 
                      <div class= {key.slideShowClass}>
                        <img class="d-block img-fluid w-100" src={key.imageurl} alt="First slide" id="individualpropertyimages" />
                      </div> 
                )} 


              </div>
              <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
              </a>
              <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
              </a>  
            </div> 
          </div>

          <div class="col-sm-4 p-0 pl-2 text-center" style={{margin: "auto"}}>
            <h3 class="qrcodelabel">Not easy to remember property ID?</h3>
            <br/>
            {qrcodewidget}
            <br/><br/>
            <h6 class="qrcodelabel">Save or take a photo of this QR Code to refer this property later, instead of remembering the property ID</h6>
          </div>
        </div>
      </div>   
    </div>
  )
}

export default IndividualPropertyImagesasComponent