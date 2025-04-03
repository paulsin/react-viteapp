
import React from "react";
import background from "../../images/background.jpg";
import Navbar from "../common/Navbar";
import { Url } from "../../constants/global";
import axios from "axios";
import { useState, useEffect } from "react";
import {  Link,useNavigate, useParams } from "react-router-dom";

var newUrl = Url + 'accounts/person';


const Test = () => {

    const [data, setData] = useState();

    //alert("Paulsin");

    const fetchDataByID = async () => {
      try {
        var individualURL = Url + 'accounts/pageCount';
        
        //alert(individualURL);
        
        const response = await axios.get(individualURL, { withCredentials: true });

       // alert(response.data);

        setData(response.data);
        
      } catch (error) {
        if (!error.response) {
          // Network error occurred
          console.error('Network error:', error);
        } else {
          // The server responded with a status other than 200 range
          console.error('Error response:', error.response);
        }
      }
    };




    useEffect(() => {

        //alert(newID);
        fetchDataByID();

    }, []);



    return(

    <div>

      <Navbar />


        <div className="container mt-1 pt-2" id="containerspace">
          <h2>Registration form</h2>
          
          {data}
          
        </div>

        


    </div>

    )
};

export default Test;