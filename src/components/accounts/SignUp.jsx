
import React, { Suspense} from "react";



import { Url } from "../../constants/global";
import axios from "axios";
import { useState, useEffect,useMemo } from "react";
import {  Link,useNavigate, useParams  } from "react-router-dom";


var newUrl = Url + 'accounts/person';
const AppNavbar = React.lazy(() => import("../common/AppNavbar"));
var accurl= Url+'accounts/';

const SignUp = (props) => {
 
   

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [alertClass, setAlertClass] = useState("alert alert-secondary");
    const [alertContent, setAlertContent] = useState("Enter the following details for registration");
    const [userRole, setUserRole] = useState("");
    const [data, setData] = useState([]);
    const [buttonLabel, setButtonLabel] = useState("Submit");
    const [emailBoxStatus, setEmailBoxStatus] = useState(false);
    const [newID, setNewID] = useState(props.newID);
    const[otp,setOtp]=useState("");
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [showOtpButton, setShowOtpButton] = useState(true);
    const [hidesubmitButton, setHidesubmitButton] = useState(false);
//    const [dataCheckFlag, setDataCheckFlag] = useState(0);

    ///   For navigate function
    const navigate = useNavigate();

    //const {newID} = useParams();

    //alert(newID);


    const dataCheckFunction = (e) => {

      if(name == "") {
        setAlertContent("Enter the name");
        setAlertClass("alert alert-danger");
      }
      else if(mobile == "") {
        setAlertContent("Enter the mobile number");
        setAlertClass("alert alert-danger");
      }
      else if(email == "") {
        setAlertContent("Enter the email ID");
        setAlertClass("alert alert-danger");
      }
      else if(password == "") {
        setAlertContent("Enter the password");
        setAlertClass("alert alert-danger");
      }
      else if(password.length < 8) {
        setAlertContent("Password should have 8 letters");
        setAlertClass("alert alert-danger");
      }
      else if(confirmPassword == "") {
        setAlertContent("Retype password");
        setAlertClass("alert alert-danger");
      }
      else if(userRole == "") {
        setAlertContent("Select user role");
        setAlertClass("alert alert-danger");
      }
      else if(password != confirmPassword) {
        setAlertContent("Password does not match");
        setAlertClass("alert alert-danger");
      }
      else {
        //alert("setting here");
        return(1);
      }

      return 0;
    }


    const handleSubmit = async (e) => {
      //alert("Paulsin");
      
      //e.preventDefault(); 

      console.log("Clicked");

      let dataCheckFlag = await dataCheckFunction(); 

/*
      if(name == "") {
        setAlertContent("Enter the name");
        setAlertClass("alert alert-danger");
      }
      else if(mobile == "") {
        setAlertContent("Enter the mobile number");
        setAlertClass("alert alert-danger");
      }
      else if(email == "") {
        setAlertContent("Enter the email ID");
        setAlertClass("alert alert-danger");
      }
      else if(password == "") {
        setAlertContent("Enter the password");
        setAlertClass("alert alert-danger");
      }
      else if(confirmPassword == "") {
        setAlertContent("Retype password");
        setAlertClass("alert alert-danger");
      }
      else if(userRole == "") {
        setAlertContent("Select user role");
        setAlertClass("alert alert-danger");
      }
*/
      //alert(dataCheckFlag);

      if(dataCheckFlag == 1) {
        setAlertContent("Registration in progress");
        setAlertClass("alert alert-warning");
      
        //alert(userRole);

        try {
          //alert("Paulsin");
          const response = await axios.post(
            newUrl,
            {
              "name": name,    
              "email": email, 
              "mobile" : mobile, 
              "password": password,
              "userRole": userRole
            }     
          );  

          //console.log(response.data);
          //alert(response.status);
          //alert(response.status);
          //alert(response.data);
          if(response.data == "user exists") {
            setAlertContent("Email ID already registered");
            setAlertClass("alert alert-danger");
          }
          else if(response.data === "OK" || response.status === 200) {
            setAlertContent("Registration completed");
            setAlertClass("alert alert-success");
            //alert("Paulsin");
          }
          
        } catch(error) {
          console.error("Error posting data:", error);
        }
      }
      //setDataCheckFlag(0);
    };

    const fetchDataByID = async () => {
      try {
        var individualURL = newUrl + '/' + newID;
        
        //alert(individualURL);
        
        const response = await axios.get(individualURL);
        setData(response.data[0].confirmPassword);
        //setOriginalData(response.data);
        //alert(response.data[0].email);

        setName(response.data[0].name);
        setEmail(response.data[0].email);
        setMobile(response.data[0].mobile);
        setPassword(response.data[0].password);
        setConfirmPassword(response.data[0].password);
        setUserRole(response.data[0].userRole);

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

    var userRoleWidget =           
      <select value={userRole} class="form-control" id="userRole" aria-label="Default select example" name="userRole" onChange={(e) => setUserRole(e.target.value)}>
        <option value="">Select</option>
        <option value="developer">Developer</option>
        <option value="admin">Admin</option>
        <option value="owner">Owner</option>
      </select>


    useEffect(() => {
      //console.log('i fire once');
      //fetchData();
      //alert(props.newID);
      if(props.newID) {
        //alert(newID);
        fetchDataByID();
        setButtonLabel("Update");
        setEmailBoxStatus(true);
      }
      else {
        setButtonLabel("Submit");
        setEmailBoxStatus(false);
      }
    }, []);


    const handleUpdate = async (e) => {
      //e.preventDefault(); 
      //alert("nshgsf");
      var updateURL = newUrl + "/update/";
      
      //alert(updateURL);

      let dataCheckFlag = await dataCheckFunction(); 

      if(dataCheckFlag == 1) {

        setAlertContent("Updation in progress");
        setAlertClass("alert alert-warning");

        try {
          var response = await axios.post(
            updateURL,
            {
              "id" : newID,
              "name": name,    
              "email": email, 
              "mobile" : mobile, 
              "password": password,
              "userRole": userRole
            }     
          );  

          if(response.data === "OK" || response.status === 200) {
            setAlertContent("Updation completed");
            setAlertClass("alert alert-success");
            //alert("Paulsin");
          }

        } catch(error) {
          console.error("Error posting data:", error);
        }
      }
    }

    const buttonClickFunction = async (e) => {
      e.preventDefault(); 
      if(newID) {
        handleUpdate();
      }
      else {
        handleSubmit();
      }
    }
    const Sendotp = async (e) => {
      e.preventDefault(); 
      const sendotpURL = accurl + "send-otp";
      // alert(sendotpURL);
    
      try {
        const response = await axios.post(sendotpURL, { email });
    
        // alert(response.data);
        setAlertContent("Wait for the Otp");
        setAlertClass("alert alert-info");
        if (response.data === "OTP sent") {
          // alert("haiii")
          // // console.log("Showing OTP input...");
          setAlertContent("Please enter the otp send to your email");
          setAlertClass("alert alert-info");
          setShowOtpInput(true); 
          setShowOtpButton(false);
          setHidesubmitButton(true);
        } else  if(response.data==="Error sending email"){
          setAlertContent("Please verify your email");
          setAlertClass("alert alert-danger");
          setShowOtpInput(false); 
          setShowOtpButton(true);
          setHidesubmitButton(false);
        }
        
      } catch (error) {
        console.error("Error posting data:", error);
      }
    }
    const verifyOtp = async (e) => {
      e.preventDefault();
      var verifyotpURL = accurl + "verify-otp";
      // alert(verifyotpURL)
    
      try {
        const response = await axios.post(verifyotpURL, { email, otp })
         
            // alert(response.data)
            if(response.data==="OTP verified"){
              if(newID) {
                handleUpdate();
              }
              else {
                handleSubmit();
              }

            }
            else if(response.data==="OTP expired"){
              setAlertContent("Otp Expired,Please try by using another Otp");
              setAlertClass("alert alert-danger");
            }
            else if(response.data==="Invalid OTP"){
              setAlertContent("Please enter the correct Otp number");
              setAlertClass("alert alert-danger");
            }
            else if(response.data==="No OTP sent"){
              setAlertContent("Otp didn't sent yet");
              setAlertClass("alert alert-danger");
            } 
           
            
         
          } catch (error) {
            console.error("Error posting data:", error);
          }
      }
 
  
    

    return(

    <div>

        <Suspense><AppNavbar/></Suspense>


        <div className="pl-3 mt-5 pb-3 pr-3 ">
          <h2>Registration form</h2>
          
            <div className={alertClass} role="alert">
              {alertContent}
            </div>

            <div className="mb-3 mt-3">
              <label for="name">Name:</label>
              <input type="name" className="form-control" id="name" placeholder="Enter name" name="name" required onChange={(e) => setName(e.target.value)}
              value={name}/>
            </div>

            <div className="mb-3 mt-3">
              <label for="mobile">Mobile:</label>
              <input type="number" pattern="[0-9]*" class="form-control" id="mobile" placeholder="Enter mobile number" name="mobile" 
              required onChange={(e) => setMobile(e.target.value)} value={mobile}/>
            </div>

            <div class="mb-3 mt-3"> 
              <label for="email">Email:</label>
              <input type="email" class="form-control" id="email" placeholder="Enter email" name="email" required onChange={(e) => setEmail(e.target.value)}
              value={email} disabled={emailBoxStatus}/>
            </div>

            <div class="mb-3 mt-3">
              <label for="password">Password:</label>
              <input type="password" class="form-control" id="password" placeholder="Enter password" name="password" 
              required onChange={(e) => setPassword(e.target.value)} value={password}/>
            </div>

            <div class="mb-3 mt-3">
              <label for="confirmPassword">Confirm password:</label>
              <input type="password" class="form-control" id="confirmPassword" placeholder="Repeat password" name="confirmPassword" 
              required onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword}/>
            </div>

            <div class="mb-3 mt-3"> 
              <label for="userRole" class="form-check-label">Select user role</label>
              {userRoleWidget}
            </div>

            <div class="form-check mb-3">
              <label class="form-check-label">
                <input class="form-check-input" type="checkbox" name="remember" /> Remember me
              </label>
            </div>
            <button type="submit" class="btn btn-primary" onClick={Sendotp} hidden={hidesubmitButton}>{buttonLabel}</button>
            {showOtpInput && (
        <div class="mb-3 mt-3">
        <label for="password">Otp</label>
        <input type="text" class="form-control" id="otp" placeholder="Enter Otp" name="otp" 
        required onChange={(e) => setOtp(e.target.value)} value={otp} />
      </div>
      ) }
      
            <button type="submit" class="btn btn-primary" onClick={verifyOtp} hidden={showOtpButton}>{buttonLabel}</button>
            {/* <button type="submit" class="btn btn-primary" onClick={buttonClickFunction}>{buttonLabel}</button> */}



 
    
  
            
        </div>

        


    </div>

    )
};

export default SignUp;