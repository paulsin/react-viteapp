import React, { useState, useEffect } from "react";

import Select from 'react-select';
import { Url } from "../../constants/global";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { ToWords } from 'to-words';
import { NoImage } from "../../constants/global";

const IndividualPropertyRelatedProperty = (props) => { 
    const[propertydetails,setPropertydetails]=useState([]);
    var propertyID=props.propertyID 
    let currentpageno=1;
    let recordperpageno=9;
    const [currentPage, setCurrentPage] = useState(currentpageno);
    const [recordsPerPage,setRecordsperpage]=useState(recordperpageno)
    
    const lastpostIndex=currentPage*recordsPerPage; 
    //const lastpostIndex=currentPage * recordsPerPage > propertydetails.length ? propertydetails.length + 1 : currentPage * recordsPerPage; 
    const firstpostIndex=lastpostIndex-recordsPerPage;
    //alert(firstpostIndex);
    //alert(lastpostIndex);
    const currentposts=propertydetails.slice(firstpostIndex,lastpostIndex);

    function createdata(data,data1,data2,data3){
        // alert(data1._id)
        var lowcost=data1.cost-2000000;
        var highcost=data1.cost+2000000;
        const toWords = new ToWords();
        let index=0
        let temparrayfornames=[]
          data.map(row => {
            // alert(row._id)
            // data1.map(individualdata=>{
            
            if(propertyID!==row._id && data1['propertyType']===row.propertyType && row.cost > lowcost && row.cost < highcost && data1['townID']===row.townID && row.propertyStatus!="Draft"){
                    data2.map(districttemp => {
                        if(districttemp['_id']===row.districtID){
                        data3.map(proptemp=>{
                            if(proptemp['_id']===row.townID){
                            temparrayfornames.push({
                                    'index':index++,
                                    'id':row.id,
                                    'propertyID' : row._id,
                                    'individualPropertyUrl' : "/frontend/individualProperty/"+row._id,
                                    'propertyType':row.propertyType,
                                    'transactiontype':row.transactionType,
                                    'town':proptemp['townName'],
                                    'district':districttemp['districtName'],
                                    'thumbnailimage':row.thumbnailImage,
                                    'thumbnailimagename':row.thumbnailImageName,
                                    'builtArea':row.builtArea,
                                    'price':row.cost===undefined?row.cost:toWords.convert(row.cost),
                                    'transactionType':row.transactionType,
                                    // 'status':rowData.status===true?"confirmed":"notconfirmed"}),
                                    // 'imageurl':Url+"assets/"+ row._id + "/" + row.thumbnailImageName,
                                    'imageurl':row.thumbnailImageName ? Url+"assets/"+ row._id + "/" + row.thumbnailImageName : NoImage
                            })
                        
                            }
                        })
                        }
                    })
            }
            // })
            
          
          })
          setPropertydetails(temparrayfornames)
    }
      
    function getProperties() {
        axios
        .get(Url+"property/properties",
        )
        .then((res) => {
            axios
            .get(Url+"property/individualProperty/"+propertyID,
            )
            .then((res1)=>{
                axios
                .get(Url+"location/districts",
                )
                .then((res2)=>{
                
                    axios
                    .get(Url+"location/towns",
                    )
                    .then((res3) => { 
                        createdata(res.data,res1.data,res2.data,res3.data)
                    })
        
                })

            })

            
        
        })
         
    }
  useEffect(() => {
 
    getProperties();  
  }, []);
  
  return (
   <div class="container pt-4 pb-4">
    <h5>Related Properties</h5>
     
              {currentposts.map((key, index2) =>  (
               <>
   
                 {index2 %3 == 0 && currentposts.length - index2 >= 3 ? 
                   <>
                   <div class="row">
                     <div class="col-lg-4 col-md-4 col-sm-12 mx-auto p-2">
                       <img src={currentposts[index2].imageurl} class="img-fluid" id="borderimage" />
                       <div class="container  text-center" id="properties_container">
                         <div class="row row-cols-2 pt-2" >
                       
                             <div class="col" id="properties1">{currentposts[index2].propertyType}</div>
                             <div class="col" id="properties2">{currentposts[index2].id}</div>
                             <div class="col" id="properties2">{currentposts[index2].town}</div>
                             <div class="col" id="properties1">{currentposts[index2].builtArea} sq ft</div>
                             <div class="col" id="properties1">{currentposts[index2].transactionType}</div>
                             <div class="col" id="properties2">{currentposts[index2].price}</div>
                         </div>
                       </div>
                       <div class ="pt-2">
                         <a role="button" href={currentposts[index2].individualPropertyUrl} className='btn' id="searchbuttoninhome">More Details</a>
                       </div>
                     </div> 
   
   
                     <div class="col-lg-4 col-md-4 col-sm-12 mx-auto p-2">
                       <img src={currentposts[index2 + 1].imageurl}  class="img-fluid" id="borderimage"/>
                       <div class="container  text-center" id="properties_container">
                         <div class="row row-cols-2 pt-2" >
                       
                             <div class="col" id="properties1">{currentposts[index2 + 1].propertyType}</div>
                             <div class="col" id="properties2">{currentposts[index2 + 1].id}</div>
                             <div class="col" id="properties2">{currentposts[index2 + 1].town}</div>
                             <div class="col" id="properties1">{currentposts[index2 + 1].builtArea} sq ft</div>
                             <div class="col" id="properties1">{currentposts[index2 + 1].transactionType}</div>
                             <div class="col" id="properties2">{currentposts[index2 + 1].price}</div>
                         </div>
                       </div>
                       <div class ="pt-2">
                       <a role="button" href={currentposts[index2+1].individualPropertyUrl} className='btn' id="searchbuttoninhome">More Details</a>
                       </div>
                     </div> 
   
                     <div class="col-lg-4 col-md-4 col-sm-12 mx-auto p-2">
                       <img src={currentposts[index2 + 2].imageurl} class="img-fluid" id="borderimage"/>
                       <div class="container  text-center" id="properties_container">
                         <div class="row row-cols-2 pt-2" >
                       
                         <div class="col" id="properties1">{currentposts[index2 + 2].propertyType}</div>
                             <div class="col" id="properties2">{currentposts[index2 + 2].id}</div>
                             <div class="col" id="properties2">{currentposts[index2 + 2].town}</div>
                             <div class="col" id="properties1">{currentposts[index2 + 2].builtArea}  sq ft</div>
                             <div class="col" id="properties1">{currentposts[index2 + 2].transactionType}</div>
                             <div class="col" id="properties2">{currentposts[index2 + 2].price}</div>
                         </div>
                       </div>
                       <div class ="pt-2">
                         <a role="button" href={currentposts[index2+2].individualPropertyUrl} className='btn' id="searchbuttoninhome">More Details</a>                    </div>
                       </div> 
   
                     </div> 
                   </> :                
                   
                     <>
                         { index2 %3 == 0 && currentposts.length - index2 == 1 ?
                           <div class="row">
                             <div class="col-lg-4 col-md-4 col-sm-12 mx-auto p-2">
                               <img src={currentposts[index2].imageurl}  class="img-fluid" id="borderimage" />
                               <div class="container  text-center" id="properties_container">
                                 <div class="row row-cols-2 pt-2" >
                               
                                 <div class="col" id="properties1">{currentposts[index2].propertyType}</div>
                                 <div class="col" id="properties2">{currentposts[index2].id}</div>
                                 <div class="col" id="properties2">{currentposts[index2].town}</div>
                                 <div class="col" id="properties1">{currentposts[index2].builtArea} sq ft</div>
                                 <div class="col" id="properties1">{currentposts[index2].transactionType}</div>
                                 <div class="col" id="properties2">{currentposts[index2].price}</div>
                                 </div>
                               </div>
                               <div class ="pt-2">
                                 <a role="button" href={currentposts[index2].individualPropertyUrl} className='btn' id="searchbuttoninhome">More Details</a>
                               </div>
                             </div> 
           
           
                             <div class="col-lg-4 col-md-4 col-sm-12 mx-auto p-2">
                             </div> 
   
                             <div class="col-lg-4 col-md-4 col-sm-12 mx-auto p-2">
                             </div>
               
                           </div>
                         :
                           <>
                             { index2 %3 == 0 && currentposts.length - index2 == 2 ?
                                                       <div class="row">
                                                         <div class="col-lg-4 col-md-4 col-sm-12 mx-auto p-2">
                                                           <img src={currentposts[index2].imageurl}  class="img-fluid" id="borderimage"/>
                                                           <div class="container  text-center" id="properties_container">
                                                             <div class="row row-cols-2 pt-2" >
                                                           
                                                               <div class="col" id="properties1">{currentposts[index2].propertyType}</div>
                                                               <div class="col" id="properties2">{currentposts[index2].id}</div>
                                                               <div class="col" id="properties2">{currentposts[index2].town}</div>
                                                               <div class="col" id="properties1">{currentposts[index2].builtArea} sq ft</div>
                                                               <div class="col" id="properties1">{currentposts[index2].transactionType}</div>
                                                               <div class="col" id="properties2">{currentposts[index2].price}</div>
                                                             </div>
                                                           </div>
                                                           <div class ="pt-2">
                                                             <a role="button" href={currentposts[index2].individualPropertyUrl} className='btn' id="searchbuttoninhome">More Details</a>
                                                           </div>
                                                         </div> 
                                       
                                       
                                                         <div class="col-lg-4 col-md-4 col-sm-12 mx-auto p-2">
                                                           <img src={currentposts[index2+1].imageurl}  class="img-fluid" id="borderimage" />
                                                             <div class="container  text-center" id="properties_container">
                                                               <div class="row row-cols-2 pt-2" >
                                                             
                                                                 <div class="col" id="properties1">{currentposts[index2 + 1].propertyType}</div>
                                                                 <div class="col" id="properties2">{currentposts[index2 + 1].id}</div>
                                                                 <div class="col" id="properties2">{currentposts[index2 + 1].town}</div>
                                                                 <div class="col" id="properties1">{currentposts[index2 + 1].builtArea} sq ft</div>
                                                                 <div class="col" id="properties1">{currentposts[index2 + 1].transactionType}</div>
                                                                 <div class="col" id="properties2">{currentposts[index2 + 1].price}</div>
                                                               </div>
                                                             </div>
                                                             <div class ="pt-2">
                                                             <a role="button" href={currentposts[index2+1].individualPropertyUrl} className='btn' id="searchbuttoninhome">More Details</a>
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
                       
                     </> }
   
               </>
               ))}
   
               
             </div> 
)
}

export default IndividualPropertyRelatedProperty