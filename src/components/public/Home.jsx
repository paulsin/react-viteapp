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

 
  return(
      <div>
        <NavbarPublic />
        <h1>haiiiiiiii how are you</h1>
   
        <Footer/>
    
      </div>
    )
}

export default Home;