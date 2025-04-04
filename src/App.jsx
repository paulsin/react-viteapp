import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
 //import './App.css'
import './custom/custom.css';
import './custom/anju.css';
import './custom/paulsin.css';
import background from './images/background.jpg';
import {
  Route,
  BrowserRouter,
  Routes
} from 'react-router-dom';
 import Test from './components/accounts/Test';
 import Home from './components/public/Home';
 import SignUp from './components/accounts/SignUp';

 import ListUsersCustomTable from './components/accounts/ListUsersCustomTable';
 import Login from './components/accounts/Login';
 import ProfileCheck from './components/accounts/ProfileCheck';
 import SignUpCheck from './components/accounts/SignUpCheck';
 import ListUsersCustomTableCheck from './components/accounts/ListUsersCustomTableCheck';
//  import IndividualProperty from './components/public/IndividualProperty';
 import AboutAs from './components/public/AboutAs';
import ContactAs from './components/public/ContactAs';

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
          {/* <Route path="/frontend/individualProperty/:propertyID" element={<IndividualProperty />} /> */}
          <Route path="/frontend/aboutas" element={<AboutAs />} />
          <Route path="/frontend/contactas" element={<ContactAs />} />
          {/* <Route path='/frontend/addProperty/:operation/:uniqueID' element={<AddPropertyCheck />} />
          <Route path='/frontend/location/:locationType/:countryName' element={<LocationCheck />} />
          <Route path='/frontend/location/:locationType/:countryName/:stateID' element={<LocationCheck />} />
          <Route path='/frontend/location/:locationType/:countryName/:stateID/:districtID' element={<LocationCheck />} />
          <Route path='/frontend/properties' element={<PropertiesCheck />} />
          <Route path='/frontend/addimages/:propertyID' element={<AddImagesCheck />} />
          <Route path="/frontend/individualProperty/:propertyID" element={<IndividualProperty />} />

          <Route path='/frontend/propertyCustomerRequestForOwner/:param1/:param2' element={<PropertyCustomerRequestForOwnerCheck />} />
          <Route path='/frontend/listOwners' element={<OwnerCheck/>} /> */}

        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
    </>
  )
}

export default App
