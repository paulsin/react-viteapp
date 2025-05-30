
import React, { Suspense } from "react";
const AppNavbar = React.lazy(() => import("../common/AppNavbar"));
import { Url } from "../../constants/global";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

var newUrl = Url + 'accounts/person';


const Test = () => {

    const [data, setData] = useState();

    //alert("Paulsin");

    const fetchDataByID = async () => {
      try {
        var individualURL = Url + 'accounts/pageCount';
        
        //alert(individualURL);
        
        const response = await axios.get(individualURL, { withCredentials: true });

        //alert(response.data);

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

      
       <Suspense><AppNavbar /></Suspense>


      <div  className="container mt-3">
          <h2>Registration form</h2>
          
          {data}
          
        </div>

        


    </div>

    )
};

export default Test;