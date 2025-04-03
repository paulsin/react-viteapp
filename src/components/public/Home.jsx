import React, { useState, useEffect } from "react";
import background from "../../images/background.jpg";

import Navbar from "../common/NavbarPublic";
import Footer from "../common/Footer"
import NavbarPublic from "../common/NavbarPublic";
import { FaSearch } from "react-icons/fa";

// import Multiselect from 'multiselect-react-dropdown';
import axios from "axios";
import { Url } from "../../constants/global";
import Select from 'react-select';
import { FaPhoneAlt } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { IoLocation } from "react-icons/io5";
import { CgMail } from "react-icons/cg";
import Pagination from "./Pagination";
import { propertyTypes } from "../../constants/global";
import { transactionType } from "../../constants/global";
import { NoImage } from "../../constants/global";
import { ToWords } from 'to-words';
import { neworOldType } from "../../constants/global";
import { pricefromSelect } from "../../constants/global";
import { pricetoSelect } from "../../constants/global";
import { priceRangeSelect } from "../../constants/global";

function Home() {
  const [selectedpropertytype, setSelectedPropertyType] = useState([]);
  const [selectedstatetype, setSelectedStateType] = useState([]);
  const [selecteddistricttype, setSelectedDistrictType] = useState([]);
  const [selectedtowntype, setSelectedTownType] = useState([]);
  const [selectedstateonchangevalue, setSelectedstateOnchangevalue] = useState([]);
  const [selecteddistrictonchangevalue, setSelecteddistrictOnchangevalue] = useState([]);
  const [selectedStatesDisplayed, setSelectedStatesDisplayed] = useState([]);
  const [selectedDistrictsDisplayed, setSelectedDistrictsDisplayed] = useState([]);
  const [selectedTownsDisplayed, setSelectedTownsDisplayed] = useState([]);
  const [saleorrent, setSaleorrent] = useState("");
  const [pricerange, setPricerange] = useState("");
  const [newold, setNewold] = useState("");
  const [pricefrom, setPricefrom] = useState("");
  const [priceto, setPriceto] = useState("");
  const[searchbyId,setSearchById]=useState("")
  let currentpageno=1;
  let recordperpageno=9;
  const [currentPage, setCurrentPage] = useState(currentpageno);
  const [recordsPerPage,setRecordsperpage]=useState(recordperpageno)
  const Noimage= Url + "assets/no_image.jpg";
  const[propertydetails,setPropertydetails]=useState([])
  const [propertyWidget, setPropertyWidget] = useState("");
  const [propertyimagename, setPropertyimagename] = useState("");

 
  // https://youtu.be/wAGIOCqS8tk?si=f-i1ayZt50pg0u04

  //alert(currentPage);

  const lastpostIndex=currentPage*recordsPerPage; 
  //const lastpostIndex=currentPage * recordsPerPage > propertydetails.length ? propertydetails.length + 1 : currentPage * recordsPerPage; 
  const firstpostIndex=lastpostIndex-recordsPerPage;
  //alert(firstpostIndex);
  //alert(lastpostIndex);
  const currentposts=propertydetails.slice(firstpostIndex,lastpostIndex);
  // const npage=Math.ceil(propertydetails.length/recordsPerPage);
  // const numbers=[...Array(npage+1).keys()].slice(1);

  // const propertytype_options = [
  //   { label: "Flat", value: "flat" },
  //   { label: "House", value: "house" },
  //   { label: "House Plot", value: "houseplot"},
  //   { label: "Villa", value: "villa" },
  // ];
//   let array1 = [
//     { label: "John", value: 0 },
//     { label: "Indiana", value: 1 },
//     { label: "Stark", value: 2 },
// ];
  let state_options = []
  let state_selected=[]
  let district_options = []
  let town_options = []
  let district_values=[]
  let town_values=[]
  let selecteddistrict=[]
  let townarray=[]
  let districttemp=[]
  let temparray=[1,2,3]
  let temparray1=[1,2,3]
  let temparray2=[]
  let rowlength
    // const totalPages = Math.ceil(data.length / itemsPerPage);
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const currentItems = data.slice(startIndex, endIndex);
//   let proplength=propertydetails.length
//   //alert(proplength)
//   rowlength=proplength/3
// //alert(rowlength)

//   if(proplength%3!=0){
//     rowlength=Math.floor(rowlength+1)
//   }
//   else if(proplength%3==0){
//     rowlength=rowlength
//   }

//alert(rowlength)
const handleTransactionTypeSelection = (e) => {
  // alert(e.value)
  setSaleorrent(e.value); 
  
}
const handleSelectedPropertyType = (e) => {
  //  alert(e.target.value)
  let propertytypevalue=[];
  e.map(key=>{
    // alert(key.value)
    propertytypevalue.push({ value: key.value, label: key.label })
  })
  setSelectedPropertyType(propertytypevalue)
  
}

  
  const StateType = (event) => {
    // alert(event)
    selecteddistricttype.map(key1=>{
      // alert(key1.value);
      // alert(key1.label)
      event.map(key=>{
        // alert(key.value)
        if(key1.stateID===key.value)
        {
          //alert("haiiii")
          district_values.push({ value: key1.value, label: key1.label, stateID: key1.stateID });
        }
      })
    })
    setSelectedstateOnchangevalue(district_values);


    event.map(key=> {
      // alert(key.stateID)
      state_selected.push({value:key.value,label: key.label,stateID:key.stateID });
    });
    setSelectedStatesDisplayed(state_selected);


    district_values.map(districtkey=>{
      // alert(districtkey.label)
      selectedDistrictsDisplayed.map(selecteddiskey=>{
        // alert(selecteddiskey.label)
        if(districtkey.value===selecteddiskey.value){
           //alert("ghngnj")
           districttemp.push({ value: selecteddiskey.value, label: selecteddiskey.label, stateID : selecteddiskey.stateID});
        }
      })
    })
    //  alert(districttemp)
    setSelectedDistrictsDisplayed(districttemp);

    //alert(districttemp.length);
    //alert(selectedTownsDisplayed.length);

    districttemp.map(keys=>{
     //alert(keys.stateID)
      selectedTownsDisplayed.map(key4=>{
        if(keys.value === key4.districtID)
        {
          // alert("haiii")
          townarray.push({value:key4.value,label:key4.label, districtID : keys.value, stateID : keys.stateID})
        }

      })
    })

    setSelectedTownsDisplayed(townarray);
  }

  const DistrictType = (event1) => {
    //alert(event1[0].value);
    let selecteddistrictTemp = [];
    let towntemp=[];
  
    selectedtowntype.map(key2=>{
      // alert(key2.value);
      // alert(key2.label)
      event1.map(key3=>{
        // alert(key3.value)
        if(key2.districtID===key3.value)
        {
          // alert("haiiii")
          town_values.push({ value: key2.value, label: key2.label,stateID:key2.stateID, districtID: key2.districtID });
          //selecteddistrictTemp.push({value:key3.value,label: key3.label });
        }
      })
    });

    event1.map(key=> {
      // alert(key.stateID)
      selecteddistrictTemp.push({value:key.value,label: key.label,stateID:key.stateID });
    });

    // alert(district_values)
    setSelectedDistrictsDisplayed(selecteddistrictTemp);
    setSelecteddistrictOnchangevalue(town_values);


    town_values.map(townkey=>{
      // alert(townkey.label)
      selectedTownsDisplayed.map(selectedtownkey=>{
       //alert(selectedtownkey.label)
        if(townkey.value===selectedtownkey.value){
          //  alert("ghngnj")
           towntemp.push({ value: selectedtownkey.value, label: selectedtownkey.label , districtID : selectedtownkey.districtID, stateID : selectedtownkey.stateID });
        }
       })
    })
    //  alert(districttemp)
    setSelectedTownsDisplayed(towntemp);
  }


  
  const TownType = (event1) => {
    let selectedtowntemp=[];

    event1.map(key=> {
      //alert(key.districtID);
      selectedtowntemp.push({value:key.value,label: key.label, districtID : key.districtID ,stateID:key.stateID});
    });

    // alert(district_values)
    setSelectedTownsDisplayed(selectedtowntemp);
  }


  function getStates() {
    // alert("anu");
    axios
      .get(Url+"location/states",
    )
    .then((res) => {
      // alert("haiii")
      res.data.map(data1 => {
          // alert(data1.stateName);
          // alert(data1._id)    
          state_options.push({ value: data1._id, label: data1.stateName });
      });
         // setSelectedstateOnchangevalue(district_values) // alert(state_options)
      setSelectedStateType(state_options);
    })
  }
  function getDistricts() {
    //alert("anu");
    axios
      .get(Url+"location/districts",
    )
    .then((res1) => {
      res1.data.map(data2 => {
          // alert(data.stateID);
        district_options.push({ value: data2._id, label: data2.districtName, stateID: data2.stateID});
      });
      setSelectedDistrictType(district_options);
    })
  }
  function getTowns() {
    //alert("anu");
    axios
      .get(Url+"location/towns",
    )
    .then((res2) => {
     
      res2.data.map(data3 => {
        // alert(data3.stateID)
        town_options.push({ value: data3._id, label: data3.townName, districtID: data3.districtID,stateID: data3.stateID });
      });
      setSelectedTownType(town_options);
    })
  }
  function createdata(data,data1,data2){
    const toWords = new ToWords();
    let index=0
    let temparrayfornames=[]
      data.map(row => {
        if(row.propertyStatus!="Draft"){
          data1.map(districttemp => {
            if(districttemp['_id']===row.districtID){
              data2.map(proptemp=>{
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
        
      
      })
      setPropertydetails(temparrayfornames)
  }
  
  function getProperties() {
    axios
    .get(Url+"property/properties",
    )
    .then((res) => {
      axios
      .get(Url+"location/districts",
      )
      .then((res1)=>{
        
      axios
      .get(Url+"location/towns",
      )
      .then((res2) => { 
        createdata(res.data,res1.data,res2.data)
      })

    })

  })
 
  }


  function searchdataout(data,data1,data2,transdata,pricefromdata,pricetodata,neworolddata,pricerangedata,propertytypedata,statedata,districtdata,towndata,Iddata){
    //alert(propertytypedata)
    const toWords = new ToWords();
    let index=0
    let operatearray=[]
    let temparray=[]
    data.map(row => {
      operatearray.push({
                        'propertyID' : row._id,
                        'id':row.id,
                        'stateID':row.stateID,
                        'districtID':row.districtID,
                        'townID':row.townID,
                        'individualPropertyUrl': "/frontend/individualProperty/"+row._id,
                        'propertyType':row.propertyType,
                        'transactionType':row.transactionType,
                        'thumbnailimage':row.thumbnailImage,
                        'thumbnailimagename':row.thumbnailImageName,
                        'builtArea':row.builtArea,
                        'cost':row.cost===undefined?row.cost:row.cost,
                        'price':row.cost===undefined?row.cost:toWords.convert(row.cost),
                        'newOrOld':row.newOrOld,
                        'propertyEditDate':row.propertyEditDate,
                        'imageurl':row.thumbnailImageName ? Url+"assets/"+ row._id + "/" + row.thumbnailImageName : NoImage
      })     
    })
    if(transdata!=""){
      // alert("gb")
      operatearray.map(row1 => {
        //alert(row1.propertyID)
        if(row1.transactionType===transdata){
                  temparray.push({
                         'propertyID':row1.propertyID,
                         'id':row1.id,
                          'individualPropertyUrl':row1.individualPropertyUrl,
                          'propertyType':row1.propertyType,
                          'transactionType':row1.transactionType,
                          'stateID':row1.stateID,
                          'districtID':row1.districtID,
                          'townID':row1.townID,
                          'thumbnailimage':row1.thumbnailimage,
                          'thumbnailimagename':row1.thumbnailimagename,
                          'builtArea':row1.builtArea,
                          'price':row1.price,
                          'cost':row1.cost===undefined?row1.cost:row1.cost,
                          'newOrOld':row1.newOrOld,
                          'propertyEditDate':row1.propertyEditDate,
                          'imageurl':row1.imageurl
                  })
       
        }
          
      })
      operatearray=[];
      operatearray=temparray;
      temparray=[];
    }
    if(neworolddata!=""){
      operatearray.map(row2 => {
        if(row2.newOrOld === neworolddata){
                  temparray.push({
                          'propertyID':row2.propertyID,
                          'id':row2.id,
                          'individualPropertyUrl':row2.individualPropertyUrl,
                          'propertyType':row2.propertyType,
                          'transactionType':row2.transactionType,
                          'stateID':row2.stateID,
                          'districtID':row2.districtID,
                          'townID':row2.townID,
                          'thumbnailimage':row2.thumbnailimage,
                          'thumbnailimagename':row2.humbnailimagename,
                          'builtArea':row2.builtArea,
                          'price':row2.price,
                          'cost':row2.cost===undefined?row2.cost:row2.cost,
                          'newOrOld':row2.newOrOld,
                          'propertyEditDate':row2.propertyEditDate,
                          'imageurl':row2.imageurl
                  })
        }   
      })
      operatearray=[];
      operatearray=temparray;
      temparray=[];
    } 
    
    if(pricefromdata!="" && pricetodata!=""){
      //alert("gb")
      operatearray.map(row3 => {
        //alert(row3.price)
        if(row3.cost > pricefromdata && row3.cost < pricetodata){
                  temparray.push({
                         'propertyID':row3.propertyID,
                         'id':row3.id,
                          'individualPropertyUrl':row3.individualPropertyUrl,
                          'propertyType':row3.propertyType,
                          'transactionType':row3.transactionType,
                          'stateID':row3.stateID,
                          'districtID':row3.districtID,
                          'townID':row3.townID,
                          'thumbnailimage':row3.thumbnailimage,
                          'thumbnailimagename':row3.thumbnailimagename,
                          'builtArea':row3.builtArea,
                          'price':row3.price,
                          'cost':row3.cost===undefined?row3.cost:row3.cost,
                          'newOrOld':row3.newOrOld,
                          'propertyEditDate':row3.propertyEditDate,
                          'imageurl':row3.imageurl
                  })
       
        }    
      })
      operatearray=[];
      operatearray=temparray;
      temparray=[];
    }

    if(propertytypedata!=""){
      // alert("sdfsfzz")
      operatearray.map(row4 => {
        propertytypedata.map(key=>{
            //alert(key.value)
          if(key.value === row4.propertyType){
                        temparray.push({
                                'propertyID':row4.propertyID,
                                'id':row4.id,
                                'individualPropertyUrl':row4.individualPropertyUrl,
                                'propertyType':row4.propertyType,
                                'transactionType':row4.transactionType,
                                'stateID':row4.stateID,
                                'districtID':row4.districtID,
                                'townID':row4.townID,
                                'thumbnailimage':row4.thumbnailimage,
                                'thumbnailimagename':row4.humbnailimagename,
                                'builtArea':row4.builtArea,
                                'price':row4.price,
                                'cost':row4.cost===undefined?row4.cost:row4.cost,
                                'newOrOld':row4.newOrOld,
                                'propertyEditDate':row4.propertyEditDate,
                                'imageurl':row4.imageurl
                        })
          }   
        })
      })
        
      operatearray=[];
      operatearray=temparray;
      temparray=[];
    }
    if(statedata!=""){
      // alert("sdfsfzz")
      operatearray.map(row5 => {
       // alert(row5.stateID)
        statedata.map(key1=>{
            //alert(key1.value)
          if(key1.value === row5.stateID){
                        temparray.push({
                                'propertyID':row5.propertyID,
                                'id':row5.id,
                                'individualPropertyUrl':row5.individualPropertyUrl,
                                'propertyType':row5.propertyType,
                                'transactionType':row5.transactionType,
                                'stateID':row5.stateID,
                                'districtID':row5.districtID,
                                'townID':row5.townID,
                                'thumbnailimage':row5.thumbnailimage,
                                'thumbnailimagename':row5.humbnailimagename,
                                'builtArea':row5.builtArea,
                                'price':row5.price,
                                'cost':row5.cost===undefined?row5.cost:row5.cost,
                                'newOrOld':row5.newOrOld,
                                'propertyEditDate':row5.propertyEditDate,
                                'imageurl':row5.imageurl
                        })
          }   
        })
      })
        
      operatearray=[];
      operatearray=temparray;
      temparray=[];
    }  
    if(districtdata!=""){
      // alert("sdfsfzz")
      operatearray.map(row6 => {
        // alert(row6.districtID)
        districtdata.map(key2=>{
            //alert(key1.value)
          if(key2.value === row6.districtID){
                        temparray.push({
                                'propertyID':row6.propertyID,
                                'id':row6.id,
                                'individualPropertyUrl':row6.individualPropertyUrl,
                                'propertyType':row6.propertyType,
                                'transactionType':row6.transactionType,
                                'stateID':row6.stateID,
                                'districtID':row6.districtID,
                                'townID':row6.townID,
                                'thumbnailimage':row6.thumbnailimage,
                                'thumbnailimagename':row6.humbnailimagename,
                                'builtArea':row6.builtArea,
                                'price':row6.price,
                                'cost':row6.cost===undefined?row6.cost:row6.cost,
                                'newOrOld':row6.newOrOld,
                                'propertyEditDate':row6.propertyEditDate,
                                'imageurl':row6.imageurl
                        })
          }   
        })
      })  
      operatearray=[];
      operatearray=temparray;
      temparray=[];
    }  

    if(towndata!=""){
      // alert("sdfsfzz")
      operatearray.map(row7 => {
       // alert(row5.stateID)
        towndata.map(key3=>{
            //alert(key1.value)
          if(key3.value === row7.townID){
                        temparray.push({
                                'propertyID':row7.propertyID,
                                'id':row7.id,
                                'individualPropertyUrl':row7.individualPropertyUrl,
                                'propertyType':row7.propertyType,
                                'transactionType':row7.transactionType,
                                'stateID':row7.stateID,
                                'districtID':row7.districtID,
                                'townID':row7.townID,
                                'thumbnailimage':row7.thumbnailimage,
                                'thumbnailimagename':row7.humbnailimagename,
                                'builtArea':row7.builtArea,
                                'price':row7.price,
                                'cost':row7.cost===undefined?row7.cost:row7.cost,
                                'propertyEditDate':row7.propertyEditDate,
                                'newOrOld':row7.newOrOld,
                                'imageurl':row7.imageurl
                        })
          }   
        })
      })   
      operatearray=[];
      operatearray=temparray;
      temparray=[];
    } 
    if(pricerangedata!=""){
      //alert("gb")
      operatearray.map(row8 => {
                  temparray.push({  
                    'propertyID':row8.propertyID,
                    'id':row8.id,
                    'individualPropertyUrl':row8.individualPropertyUrl,
                    'propertyType':row8.propertyType,
                    'transactionType':row8.transactionType,
                    'stateID':row8.stateID,
                    'districtID':row8.districtID,
                    'townID':row8.townID,
                    'thumbnailimage':row8.thumbnailimage,
                    'thumbnailimagename':row8.humbnailimagename,
                    'builtArea':row8.builtArea,
                    'price':row8.price,
                    'cost':row8.cost===undefined?row8.cost:row8.cost,
                    'newOrOld':row8.newOrOld,
                    'propertyEditDate':row8.propertyEditDate,
                    'imageurl':row8.imageurl
                  })
     
          
      })
      operatearray=[];
      operatearray=temparray;
      temparray=[];
      if(pricerangedata=="Price Low to High"){
       // alert("jjj")
        operatearray.sort((a, b) => (a.cost > b.cost) ? 1 : -1)

      }
      else if(pricerangedata=="Price High to Low")
      {
        operatearray.sort((a, b) => (a.cost < b.cost) ? 1 : -1)
      }
      else if(pricerangedata=="Latest")
      {
          operatearray.sort((a, b) => (a.propertyEditDate < b.propertyEditDate) ? 1 : -1)
      }
       
    }
    if(Iddata!=""){   
      //alert("HAIII")
      operatearray.map(row10 => {
        //alert(Iddata)
        if(row10.id === Iddata){
                  temparray.push({
                          'propertyID':row10.propertyID,
                          'id':row10.id,
                          'individualPropertyUrl':row10.individualPropertyUrl,
                          'propertyType':row10.propertyType,
                          'transactionType':row10.transactionType,
                          'stateID':row10.stateID,
                          'districtID':row10.districtID,
                          'townID':row10.townID,
                          'thumbnailimage':row10.thumbnailimage,
                          'thumbnailimagename':row10.humbnailimagename,
                          'builtArea':row10.builtArea,
                          'price':row10.price,
                          'cost':row10.cost===undefined?row10.cost:row10.cost,
                          'newOrOld':row10.newOrOld,
                          'propertyEditDate':row10.propertyEditDate,
                          'imageurl':row10.imageurl
                  })
        }   
      })
      operatearray=[];
      operatearray=temparray;
      temparray=[];
    } 

    operatearray.map(row9 => {
      data1.map(districttemp => {
        if(districttemp['_id']===row9.districtID){
          data2.map(proptemp=>{
            if(proptemp['_id']===row9.townID){
              temparray.push({  
                'propertyID':row9.propertyID,
                'id':row9.id,
                'individualPropertyUrl':row9.individualPropertyUrl,
                'propertyType':row9.propertyType,
                'transactionType':row9.transactionType,
                'town':proptemp['townName'],
                'district':districttemp['districtName'],
                'stateID':row9.stateID,
                'districtID':row9.districtID,
                'townID':row9.townID,
                'thumbnailimage':row9.thumbnailimage,
                'thumbnailimagename':row9.humbnailimagename,
                'builtArea':row9.builtArea,
                'price':row9.price,
                'cost':row9.cost===undefined?row9.cost:row9.cost,
                'newOrOld':row9.newOrOld,
                'propertyEditDate':row9.propertyEditDate,
                'imageurl':row9.imageurl
              })
            }
          })
        }
      })  
    })
    operatearray=[];
    operatearray=temparray;
    temparray=[];
    setPropertydetails(operatearray)
  }
  

  function getSearchdata(transdata,pricefromdata,pricetodata,neworolddata,pricerangedata,propertytypedata,statedata,districtdata,towndata,Iddata) {
    axios
    .get(Url+"property/properties",
    )
    .then((res) => {
      axios
      .get(Url+"location/districts",
      )
      .then((res1)=>{
        
      axios
      .get(Url+"location/towns",
      )
      .then((res2) => { 
        searchdataout(res.data,res1.data,res2.data,transdata,pricefromdata,pricetodata,neworolddata,pricerangedata,propertytypedata,statedata,districtdata,towndata,Iddata)
      })

    })

  })
 
  }

  useEffect(() => {
    getStates();
    getDistricts();
    getTowns(); 
    getProperties();  
  }, []);
  
// function prePage(){
//  if(currentPage!==firstpostIndex){
//   setCurrentPage(currentPage-1)
//  }
// }
// function changePage(id){
//   setCurrentPage(id)
// }
// function nextPage(){
//   if(currentPage!==lastpostIndex){
//     setCurrentPage(currentPage+1)
//    }
// }

  const searchfunction = (e) => {
    e.preventDefault();
    //alert(searchbyId)
    getSearchdata(saleorrent,pricefrom,priceto,newold,pricerange,selectedpropertytype,selectedStatesDisplayed,selectedDistrictsDisplayed,selectedTownsDisplayed,searchbyId);

    // alert(pricerange)
    //  alert(pricefrom)
    //  alert(priceto)
    // alert(newold)

    //alert(selectedStatesDisplayed)
     //alert(selectedpropertytype)
    // alert(selectedDistrictsDisplayed)
    //  alert(selectedTownsDisplayed)
   
  }
  return(
      <div>
        <NavbarPublic />
        <header class="page-header header container-fluid-full mx-auto mt-5 p-5 ">
          <div className='container p-4' id="searchpropclass" >
                {/* <div className='w-50 bg-white rounded p-3'> */}
            <form>
              <div className="row mx-auto p-3" id="searchpropclass">
                <div className="col-sm-4">  
                  <h5><b>Search Property By ID</b></h5>
                </div>
                <div className="col-sm-4"> 
                  <input type="text" placeholder="Search.." className="form-control" id="selectboxcolor" onChange={(e) => setSearchById(e.target.value)}/>
                </div>
                <div className="col-sm-4"></div>
              </div>

              <br/>
              <div className="row" >
                <div className="col-md-3"> 
                  <label htmlFor=""><b>Property Type</b></label>
                </div>
                <div className="col-md-3">
                  {/* <MultiSelect
                    options={propertytype_options}
                    value={ selectedpropertytype}
                    onChange={setSelectedPropertyType}
                    labelledBy="Select"
                  />  */}
                    <Select  id="selectboxcolor" isMulti={true} options={propertyTypes} onChange={handleSelectedPropertyType} > 
                    </Select>
                </div>
                <div className="col-md-3">
                  <label htmlFor=""><b>Sale/rent</b></label>
                </div>
                <div className="col-md-3">
                  <Select onChange={handleTransactionTypeSelection} id="selectboxcolor" options={transactionType}>
                    
                  </Select> 
                </div>
              </div> 
              <br/>
              <div className="row" >
                <div className="col-md-3"> 
                  <label htmlFor=""><b>State</b></label>
                </div>
                <div className="col-md-3 app-select">
                  {/* <MultiSelect
                    options={selectedstatetype}
                    // value={selectedstatetype}
                    onChange={StateType}
                    labelledBy="Select"
                  /> */}
                    <Select  id="selectboxcolor" isMulti={true} options={selectedstatetype}  onChange={StateType}> 
                    </Select>       
                </div>
                <div className="col-md-3">
                  <label htmlFor=""><b>Sort By</b></label>
                </div>
                <div className="col-md-3">
                  {/* <select className="form-control" onChange={(e) => setPricerange(e.target.value)} id="selectboxcolor">
                    <option value="">Select</option>
                    <option value="latest">Latest</option>
                    <option value="price_lowtohigh">Price Low to High</option>
                    <option value="price_hightolow">Price High to Low</option>
                  </select>  */}
                   <Select onChange={(e) => setPricerange(e.value)} options={priceRangeSelect} id="selectboxcolor"></Select>

                </div>
              </div> 
              <br/>
              <div className="row">
                <div className="col-md-3"> 
                  <label htmlFor=""><b>District</b></label>
                </div>
                <div className="col-md-3">

                  <Select  id="selectboxcolor" isMulti={true} options={selectedstateonchangevalue} onChange={DistrictType}  
                   value={selectedDistrictsDisplayed} 
                  > 
                  </Select>  
                  {/* <MultiSelect
                    options={selectedstateonchangevalue}
                    
                    // value={selecteddistricttype}
                    onChange={setSelectedDistrictType}
                    labelledBy="Select"
                  /> */}
                    {/* <select className="form-control">
                      <option>Ernakulam</option>
                      <option>Thrissur</option>
                    </select>  */}
                </div>
                <div className="col-md-3">
                  <label htmlFor=""><b>Town</b></label>
                </div>
                <div className="col-md-3">
                <Select  id="selectboxcolor" isMulti={true} options={selecteddistrictonchangevalue} onChange={TownType} value={selectedTownsDisplayed}> 
                </Select>
                  {/* <MultiSelect
                    options={selecteddistrictonchangevalue}
                    // value={selectedtowntype}
                    onChange={setSelectedTownType}
                    labelledBy="Select"
                  /> */}
    
                    {/* <select className="form-control" data-mdb-select-init multiple>
                      <option>Angamaly</option>
                      <option>Kalady</option>
                    </select>  */}
                </div>
              </div>  
              <br/>
              <div className="row" >
                <div className="col-md"> 
                  <label htmlFor=""><b>Property Price</b></label>
                </div>
                <div className="col-md">
                  <label htmlFor=""> <b>Price From</b></label>
                </div>
                <div className="col-md">
                  {/* <select className="form-control" onChange={(e) => setPricefrom(e.target.value)} id="selectboxcolor">
                    <option value="">Select</option>
                    <option value="40lakhs">40 lakhs</option>
                    <option value="20lakhs">20 lakhs</option>
                  </select>  */}
                    <Select onChange={(e) => setPricefrom(e.value)} options={pricefromSelect} id="selectboxcolor"></Select>
                </div>
                <div className="col-md">
                  <label htmlFor=""><b>Price To</b></label>
                </div>
                <div className="col-md">
                  {/* <select className="form-control" onChange={(e) => setPriceto(e.target.value)} id="selectboxcolor">
                    <option value="">Select</option>
                    <option value="1crore">1 crore</option>
                    <option value="1crore_10lakhs">1 crore 10 lakhs</option>
                  </select>  */}
                  <Select onChange={(e) => setPriceto(e.value)} options={pricetoSelect} id="selectboxcolor"></Select>
                </div>
              </div>
              <br/>
              <div className="row" >
                <div className="col-md-3"> 
                  <label htmlFor=""><b>New/Old</b></label>
                </div>
                <div className="col-md-3">
                  <Select onChange={(e) => setNewold(e.value)} options={neworOldType} id="selectboxcolor"></Select>
                  {/* <select className="form-control" onChange={(e) => setNewold(e.target.value)} id="selectboxcolor">
                    <option value="">Select</option>
                    <option value="new">New</option>
                    <option value="old">Old</option>
                  </select>  */}
                </div>
                <div className="col-md-3">    
                </div>
                <div className="col-md-3">      
                </div>
              </div> 
              <br/>
          
              <div className="row mx-auto p-3 text-center" >
                <div className="col-md"> 
                </div>
                <div className="col-md"> 
                  <button className='btn' id="searchbuttoninhome" onClick={searchfunction}>Search properties</button>   
                </div>
                <div className="col-md"> 
                </div>
              </div> 
                      
            </form>
          </div>
        </header>

        <div class="container pt-4 pb-4" >
          <Pagination totalPosts={propertydetails.length} recordsPerPage={recordsPerPage} setCurrentPage={setCurrentPage} 
          currentPage={currentPage} firstpostIndex={firstpostIndex} lastpostIndex={lastpostIndex}/>
        
           
          <div>
  
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
          <div class ="pt-3 p-0">
            <Pagination totalPosts={propertydetails.length} recordsPerPage={recordsPerPage} setCurrentPage={setCurrentPage} 
            currentPage={currentPage} firstpostIndex={firstpostIndex} lastpostIndex={lastpostIndex}/>  </div>
        </div>
   
        <Footer/>
    
      </div>
    )
}

export default Home;