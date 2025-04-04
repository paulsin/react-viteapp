import axios from "axios";
import { Url } from "../../constants/global";

var newUrl = Url + 'accounts/logInFunction';
var loggedCheckUrl = Url + 'accounts/loggedInUser';

export const fetchLoggedDataCommon = () => {
  //return("paulsin");
  const response = axios.get(loggedCheckUrl,   
    { withCredentials: true }
  )
  .then(function (response) {
    //console.log(response);
    //alert(response.data);
    //return response.data
    
    if(response.data.username && response.data.password) {
      //alert("Logged In");
      //navigate('/frontend/profile');
      return("logged_in");
      //setSelectedDIV(loginDIV);
    }
    else {
      //setSelectedDIV(<LoginDIV />);
      return("not_logged_in");
    }
    //setUsername(response.data.username);
    
  })
  .catch(function (error) {
    console.log(error);
  }); 
}