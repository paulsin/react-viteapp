
import React from "react";
import background from "../../images/background.jpg";
import Navbar from "../common/Navbar";
import { Url } from "../../constants/global";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { propertyTypes } from "../../constants/global";
import { transactionType } from "../../constants/global";
import data from "../../json/places.json"
import { ProgressBar } from "react-bootstrap";
import Compressor from 'compressorjs';
import { Alert } from "bootstrap";

var newUrl = Url + 'location/state';
var addDistrictUrl = Url + 'location/district';
var addTownUrl = Url + 'location/town';

var getStateUrl = Url + 'location/states';
var getDistrictUrl = Url + 'location/districts';
var getTownUrl = Url + 'location/towns';

var addPropertyURL = Url + 'property/addProperty';
var addPropertyImagesURL = Url + 'addPropertyImages';
var deletePropertyImagesURL = Url + 'deletePropertyImages/';


const AddImages = (props) => {

    const [uploadProgressValue, setUploadProgressValue] = useState(0);
    const [imageUrl, setImageUrl] = useState();
    const [progressBar, setProgressBar] = useState(0);
    const presetKey = "";
    const [files, setFiles] = useState([]);
    const [originalData, setOriginalData] = useState([]);

    const [propertyImagesArray, setPropertyImagesArray] = useState([]);
    const [thumbnailid, setThumbnailId] = useState([]);
    const [saveButtonText_state, setSaveButtonText_state] = useState("Set Image As Thumbnail");
    const [saveButtonColour_state, setSaveButtonColour_state] = useState("btn btn-warning mr-2");
    // const [saveButtonMode_state, setSaveButtonMode_state] = useState(false);
    const [saveButtonThumbnail_state, setSaveButtonThumbnail_state] = useState("Thumbnail");
    const stateOptionsArray = [];

    const navigate = useNavigate();


    const {propertyID} = useParams();

    //alert(propertyID);

    //const now = 80;

    //const data = JSON.parse(fs.readFileSync("../../json/places.json"));


    const handleImageChange = async (event) => {
      //alert("Paulsin");
      //alert(event.target.files);
      //setFiles(event.target.files);

      let fileTemp = [];

      //alert(event.target.files.length);

      setUploadProgressValue(0);

      for(let i=0;i<event.target.files.length;i++) {

        new Compressor(event.target.files[i], {
          quality: 0.8, // 0.6 can also be used, but its not recommended to go below.
          width: 640,
          success: (compressedResult) => {
            // compressedResult has the compressed file.
            // Use the compressed file to upload the images to your server.        
            //setCompressedFile(compressedResult);
            //alert(compressedResult);
            fileTemp.push(compressedResult);
          },
        });

        setFiles(fileTemp);
      }

      /*
      const formData = new FormData();
      formData.append("file", file);

      await axios
      .post(addPropertyImagesURL, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
      })
      .then((response) => {
		// handle the response
        console.log(response);
      })
      .catch((error) => {
        // handle errors
        console.log(error);
      });
*/
      /*

      const file = e.target.files[0];
      alert(file);
      const formData = new FormData();
      formData.append('file', file);
      formData.append("upload_preset", presetKey);
      axios.post(addPropertyImagesURL,
        formData, {
        headers : {
          "enctype":"multipart/form-data"
        },
        onUploadProgress: e => {
          alert(Math.round((e.loaded/e.total)*100));
          setUploadProgressValue(Math.round((e.loaded/e.total)*100));
        }
      }
      ).then(res => setImageUrl(res.data.secure_url))
      .catch(err => console.log(err));
*/
    }

    const uploadImageSubmit =  async (e) => {
      const formData = new FormData();

      

      //alert(files.length);
      for (let i = 0; i < files.length; i++) {
        formData.append('image', files[i], files[i].name);
      }

      formData.append('propertyID', propertyID);

      //formData.append('image', compressedFile, compressedFile.name);
      //formData.append('image', files);

      await axios.post(addPropertyImagesURL,
        formData, {
          headers : {
            "Content-Type":"multipart/form-data"
          },
          onUploadProgress: e => {
            //alert(Math.round((e.loaded/e.total)*100));
            setUploadProgressValue(Math.round((e.loaded/e.total)*100));
          }
        }
      ).then(res => {
        
        fetchImages();
        
    })
      .catch(err => console.log(err));
    }

    function createrows(images, thumbnailimage){
      var tempArray = [];
      let slno=1;

  
      images.map(row => {
//         if(row._id==thumbnailimage){
// // alert("ioppp")
         
//         }
        if(row._id===thumbnailimage){
         var thumbnail=true;
         var setThumbnailButtonClass="btn btn-warning mr-2"
        }
        else{
          var thumbnail=false;
          var setThumbnailButtonClass="btn btn-primary mr-2"
        }
  
        tempArray.push({
          'slno':slno++,
          '_id':row._id,
          'imageName':row.imageName,
          "updateTime" :row.updateTime,
          "index" : row.index,
          "imageUrl" : Url+"assets/"+ propertyID + "/" + row.imageName,
          "thumbnail":thumbnail,
          "thumbnailbuttonclass":setThumbnailButtonClass
        })
      })
      // })
      setPropertyImagesArray(tempArray);
      setOriginalData(tempArray);
    }

  function fetchImages() {
      //alert(propertyID);
    
    axios
        .get(Url+"propertyImages/"+propertyID,
      )
      .then((res) => {
        axios
          .get(Url+"property/individualProperty/" + propertyID,
          )
          .then((res1) => {
            //alert(res1.data.thumbnailImage);
            createrows(res.data, res1.data.thumbnailImage);
        });
       
      });
      
    }
    // function fetchpropertydata() {
    //   //alert(propertyID);
    
    //   axios
    //   .get(Url+"property/properties",
    //   )
    //   .then((res) => {

    //      createrows(res.data)
       
    //   });
      
    // }
    const handleDelete=(_id,imageName)=>{
      var dataimgagesafterdeleting=[];
      if(window.confirm("Do you want to delete this image?")){
        var deletetempurl=deletePropertyImagesURL+_id+"/"+propertyID+"/"+imageName;
        //alert(deletetempurl)
        const response=axios.get(deletetempurl);
        originalData.map(key=>{
          if(key._id!=_id){
            dataimgagesafterdeleting.push(key)
          }
        })
        setOriginalData(dataimgagesafterdeleting);
        setPropertyImagesArray(dataimgagesafterdeleting);
        fetchImages();
      }
    }

    useEffect(() => {

      //test();
      fetchImages();
      // fetchpropertydata();

    }, []);

    
  const setThumbnailfunction = (_id,imageName) => {
    // e.preventDefault();
    // alert(_id)
    // alert(propertyID)
    axios
    .get(Url+"setThumbnailPropertyImages/"+_id+"/"+propertyID+"/"+imageName,
  )
  .then((res) => {
     if(res.data==="OK"){
      // setSaveButtonText_state("Thumbnail")
      // setSaveButtonMode_state(true)
      // alert("jjjjjj")
      axios
      .get(Url+"property/individualProperty/"+propertyID,
    )
    .then((res1) => {
      // alert(res1.data.thumbnailImage)
      setThumbnailId(res1.data.thumbnailImage)
    })
  //   alert(res1.data[0].thumbnailImage)
  //     if(res1.data[0].thumbnailImage!=" ")
  //     {
    fetchImages();
  //     }
  //   })
   }
   });
  }
  var slno = 0;
    return(

    <div>

        <Navbar />
        <h2 className="text-center pt-4" id="addimagecaption">Add Images</h2>

        <div class="row pt-4 p-0">
        
          <div class="col-3"> </div>
          <div class="col-6"> <input type="file" name="image" onChange={handleImageChange} multiple/>
       
          <button onClick={uploadImageSubmit} class="btn btn-primary">Upload image</button></div>
        
          <div class="col-3"></div>
        
        </div> 

        <div class="row pt-4 p-0">
          <div class="col-3"></div>
          <div class="col-6">
            <ProgressBar now={uploadProgressValue} label={`${uploadProgressValue}%`} />

          </div>
          <div class="col-3"></div>  
        </div>

        <div class="container pt-4 pb-4" >
          <div>
            {propertyImagesArray.map((key, index2) =>  (
            
              <>
                {index2 %3 == 0 && propertyImagesArray.length - index2 >= 3 ? 
                  <>
                    <div class="row">

                        <div class="col-lg-4 col-md-4 col-sm-12 mx-auto p-2">
                          <img src={propertyImagesArray[index2].imageUrl} class="img-fluid" />                        
                          <div class ="pt-2">
                            <button className={propertyImagesArray[index2].thumbnailbuttonclass}  onClick={()=>setThumbnailfunction(propertyImagesArray[index2]._id,propertyImagesArray[index2].imageName)}> {propertyImagesArray[index2].thumbnail?saveButtonThumbnail_state:saveButtonText_state}</button>
                            <button className="btn" onClick={()=>handleDelete(propertyImagesArray[index2]._id, propertyImagesArray[index2].imageName)} id="deletebuttoninimage">Delete</button>
                          </div>
                        </div> 

                        <div class="col-lg-4 col-md-4 col-sm-12 mx-auto p-2">
                          <img src={propertyImagesArray[index2+1].imageUrl} class="img-fluid" />               
                          <div class ="pt-2">
                            <button className={propertyImagesArray[index2+1].thumbnailbuttonclass} onClick={()=>setThumbnailfunction(propertyImagesArray[index2+1]._id,propertyImagesArray[index2+1].imageName)}> {propertyImagesArray[index2+1].thumbnail?saveButtonThumbnail_state:saveButtonText_state}</button>
                            <button className="btn" onClick={()=>handleDelete(propertyImagesArray[index2+1]._id, propertyImagesArray[index2+1].imageName)} id="deletebuttoninimage">Delete</button>
                          </div>
                        </div> 

                        <div class="col-lg-4 col-md-4 col-sm-12 mx-auto p-2">
                          <img src={propertyImagesArray[index2+2].imageUrl} class="img-fluid" />               
                          <div class ="pt-2">
                            <button className={propertyImagesArray[index2+2].thumbnailbuttonclass} onClick={()=>setThumbnailfunction(propertyImagesArray[index2+2]._id,propertyImagesArray[index2+2].imageName)}> {propertyImagesArray[index2+2].thumbnail?saveButtonThumbnail_state:saveButtonText_state}</button>
                            <button className="btn" onClick={()=>handleDelete(propertyImagesArray[index2+2]._id, propertyImagesArray[index2+2].imageName)} id="deletebuttoninimage">Delete</button>
                          </div>
                        </div> 

                    </div> 
                  </> :                
                  <>
                    {index2 %3 == 0 && propertyImagesArray.length - index2 == 1 ?
                      <div class="row">
                          <div class="col-lg-4 col-md-4 col-sm-12 mx-auto p-2">
                            <img src={propertyImagesArray[index2].imageUrl} class="img-fluid" />
                                          
                            <div class ="pt-2">
                              <button className={propertyImagesArray[index2].thumbnailbuttonclass}  onClick={()=>setThumbnailfunction(propertyImagesArray[index2]._id,propertyImagesArray[index2].imageName)}> {propertyImagesArray[index2].thumbnail?saveButtonThumbnail_state:saveButtonText_state}</button>
                              <button className="btn" onClick={()=>handleDelete(propertyImagesArray[index2]._id, propertyImagesArray[index2].imageName)} id="deletebuttoninimage">Delete</button>
                            </div>
                          </div> 
    
                          <div class="col-lg-4 col-md-4 col-sm-12 mx-auto p-2">
                          </div> 

                          <div class="col-lg-4 col-md-4 col-sm-12 mx-auto p-2">
                          </div>
            
                      </div>
                      :
                      <>
                        { index2 %3 == 0 && propertyImagesArray.length - index2 == 2 ?
                          <div class="row">
                              <div class="col-lg-4 col-md-4 col-sm-12 mx-auto p-2">
                                <img src={propertyImagesArray[index2].imageUrl} class="img-fluid" />          
                                <div class ="pt-2">
                                  <button className={propertyImagesArray[index2].thumbnailbuttonclass} onClick={()=>setThumbnailfunction(propertyImagesArray[index2]._id,propertyImagesArray[index2].imageName)}> {propertyImagesArray[index2].thumbnail?saveButtonThumbnail_state:saveButtonText_state}</button>
                                  <button className="btn" onClick={()=>handleDelete(propertyImagesArray[index2]._id, propertyImagesArray[index2].imageName)} id="deletebuttoninimage">Delete</button>
                                </div>
                              </div> 
                                        
                                        
                              <div class="col-lg-4 col-md-4 col-sm-12 mx-auto p-2">
                                <img src={propertyImagesArray[index2+1].imageUrl} class="img-fluid" />               
                                <div class ="pt-2">
                                  <button className={propertyImagesArray[index2+1].thumbnailbuttonclass} onClick={()=>setThumbnailfunction(propertyImagesArray[index2+1]._id,propertyImagesArray[index2+1].imageName)}> {propertyImagesArray[index2+1].thumbnail?saveButtonThumbnail_state:saveButtonText_state}</button>
                                  <button className="btn" onClick={()=>handleDelete(propertyImagesArray[index2+1]._id, propertyImagesArray[index2+1].imageName)} id="deletebuttoninimage">Delete</button>
                                </div>
                              </div> 
                                
                              <div class="col-lg-4 col-md-4 col-sm-12 mx-auto p-2">
                              </div>                
                          </div>
                          :
                          <></>
                        }
                      </>
                    } 
                    
                  </> 
                }
              </>
            ))}   
          </div>      
        </div>   

        {/* <table className="table table-striped" id="selectedTable">
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
                    Updated Time
                  </th>

                  <th>
                    Index
                  </th>
                  <th>
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
              
                {propertyImagesArray.map(key =>  (
                  <tr>
                    <td>
                      {key.slno}
                    </td>
                    <td>
                      {key._id}
                    </td>
                    <td>
                      <img src={key.imageUrl} />
                    </td>
                    <td>
                      {key.updateTime}
                    </td>
                    <td>
                      {key.index}
                    </td>
                    <td>
                    <button className="btn btn-danger" onClick={()=>handleDelete(key._id)}>Delete</button>
                    </td>
                  </tr>
                ))} 
                <td>
                </td>
              </tbody>
            </table>   */}  
    </div>

    )
};

export default AddImages;