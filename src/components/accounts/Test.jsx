
import React from "react";
import background from "../../images/background.jpg";
import Navbar from "../common/Navbar";
import { Url } from "../../constants/global";
import axios from "axios";
import { useState, useEffect } from "react";
import {  Link,useNavigate, useParams } from "react-router-dom";

var newUrl = Url + 'accounts/person';


const Test = () => {

   


    return(

    <div>

      <Navbar />


        <div className="container mt-1 pt-2" id="containerspace">
          <h2>Registration form</h2>
          

          
        </div>

        


    </div>

    )
};

export default Test;