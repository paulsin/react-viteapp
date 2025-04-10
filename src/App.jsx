import { useState } from 'react'


//  import './App.css'
import './custom/custom.css';
import './custom/anju.css';
import './custom/paulsin.css';

import {
  Route,
  BrowserRouter,
  Routes
} from 'react-router-dom';
 import Test from './components/accounts/Test';
 import Home from './components/public/Home';


 
 import Login from './components/accounts/Login';
 import ProfileCheck from './components/accounts/ProfileCheck';
 import SignUpCheck from './components/accounts/SignUpCheck';
 import ListUsersCustomTableCheck from './components/accounts/ListUsersCustomTableCheck';
import IndividualProperty from './components/public/IndividualProperty';
 import AboutAs from './components/public/AboutAs';
import ContactAs from './components/public/ContactAs';
import LocationCheck from './components/property/LocationCheck';
import PropertiesCheck from './components/property/PropertiesCheck';
import AddImagesCheck from './components/property/AddImagesCheck';
import AddPropertyCheck from './components/property/AddPropertyCheck';
import OwnerCheck from './components/property/OwnerCheck';
import PropertyCustomerRequestForOwnerCheck from './components/property/PropertyCustomerRequestForOwnerCheck';
import HistoryCheck from './components/accounts/HistoryCheck';


   import { SnackbarProvider, useSnackbar } from 'notistack';


function App() {
  
  const [count, setCount] = useState(0)

  return (
    <>
       {/* <h1>dfhhhhhhhhhhh</h1> */}
        {/* <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a> */}
     {/* <h1>sdfvdxbgkkkk</h1> */}
  
     <SnackbarProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Home />} />
          
          <Route path="/test" element={<Test />} />

          {/* <Route path="/test2" element={<Test2 />} />
          <Route path="/test3" element={<Test3 />} />*/}
        <Route path="/frontend/signupCheck" element={<SignUpCheck />} />
          <Route path="/frontend/signupCheck/:newID" element={<SignUpCheck />} />
          <Route path="/frontend/login" element={<Login />} />
     
          <Route path='/frontend/listusersowntable' element={<ListUsersCustomTableCheck />} />
          <Route path='/frontend/profile' element={<ProfileCheck />} />  
          <Route path="/frontend/individualProperty/:propertyID" element={<IndividualProperty />} /> 
          <Route path="/frontend/aboutas" element={<AboutAs />} />
          <Route path="/frontend/contactas" element={<ContactAs />} />
          <Route path='/frontend/location/:locationType/:countryName' element={<LocationCheck />} />
          <Route path='/frontend/location/:locationType/:countryName/:stateID' element={<LocationCheck />} />
          <Route path='/frontend/location/:locationType/:countryName/:stateID/:districtID' element={<LocationCheck />} />
          <Route path='/frontend/properties' element={<PropertiesCheck />} />
          <Route path='/frontend/addimages/:propertyID' element={<AddImagesCheck />} />
          <Route path='/frontend/addProperty/:operation/:uniqueID' element={<AddPropertyCheck />} />
          <Route path='/frontend/listOwners' element={<OwnerCheck/>} />
          <Route path='/frontend/history' element={<HistoryCheck/>} />
          <Route path='/frontend/propertyCustomerRequestForOwner/:param1/:param2' element={<PropertyCustomerRequestForOwnerCheck />} />
       
          

        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
    </>
  )
}

export default App
