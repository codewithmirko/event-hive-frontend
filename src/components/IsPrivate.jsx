import React, { useContext, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from 'react-router-dom';
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const PrivateRoute = ({ children }) => {
  const { isLoading, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [signInOpened, { open: signInOpen, close: signInClose }] = useDisclosure(false);
  const [signUpOpened, { open: signUpOpen, close: signUpClose }] = useDisclosure(false);

  const handleSignIn = () => {
    signUpClose(); // Close the Sign Up modal if open
    signInOpen(); // Open the Sign In modal
  };

  const handleSignUp = () => {
    signInClose(); // Close the Sign In modal if open
    signUpOpen(); // Open the Sign Up modal
  };

  

  useEffect(() => {
    if (!isLoading) {
      if (!isLoggedIn) {
        handleSignIn(); // Ensure this function is called properly
      } else {
        signUpClose();
        signInClose(); // Close modals when logged in
      }
    }
  }, [isLoggedIn, isLoading]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!isLoggedIn) {
    return (
      <>
        <SignIn opened={signInOpened} toggleSignUp={handleSignUp} close={signInClose} />
        <SignUp opened={signUpOpened} toggleSignIn={handleSignIn} close={signUpClose} />
      </>
    );
  }

  return children;
};

export default PrivateRoute;
