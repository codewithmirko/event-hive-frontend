import  { useState, useEffect, createContext  } from "react";
import axios from "axios";
import CustomNotification from "../components/CustomNotification";


const API_URL = "http://localhost:5005";
const AuthContext = createContext();


function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  const authenticateUser = () => {
    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem("authToken");
  
    // Early exit if no token is found in localStorage
    if (!storedToken) {
      logOutUser("info", "No session found, please log in.");
      return;  // Stop execution of the function here
    }
  
    // If the token exists, proceed to verify it with the server
    axios.get(`${API_URL}/auth/verify`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
    .then(() => {
      // Token is valid, proceed to fetch user details
      fetchUserDetails(storedToken);
      setIsLoggedIn(true);
      setIsLoading(false);
    })
    .catch(error => {
      // If the server sends an error response (invalid token)
      logOutUser("error", "Session expired, please log in again.");
      console.error('Error verifying token:', error);
    });
  };
  

  const fetchUserDetails = (token) => {
    axios.get(`${API_URL}/auth/user-details`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      
      const user = response.data.user;
      // console.log('FETCHING USER ', user)
      setUser(user);
      setIsLoggedIn(true);
      setIsLoading(false)
    })
    .catch(error => {
      console.error('Error fetching user details:', error);
      logOutUser("error", "Failed to fetch user details, logging out for security.");
    })
    .finally(() => {
      setIsLoading(false);
    });
  };


  const removeToken = () => {
    // <== ADD
    // Upon logout, remove the token from the localStorage
    localStorage.removeItem("authToken");
  };

const logOutUser = (notificationType = "success", notificationMessage = "You've been logged out.") => {
  removeToken();
  // console.log('loggingout')
  setIsLoggedIn(false);
  setUser(null);
  setIsLoading(false);
  CustomNotification({
    type: notificationType,
    message: notificationMessage
  });
};


  useEffect(() => {
    // console.log('HELLO')
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logOutUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
