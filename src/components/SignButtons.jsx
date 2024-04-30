import React from "react";
import { Button } from "@mantine/core";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { useDisclosure } from "@mantine/hooks";

const SignButtons = () => {
  const [signInOpened, { open: signInOpen, close: signInClose }] =
    useDisclosure(false);
  const [signUpOpened, { open: signUpOpen, close: signUpClose }] =
    useDisclosure(false);

  const handleSignIn = () => {
    signUpClose(); // Close the Sign Up modal if open
    signInOpen(); // Open the Sign In modal
  };

  const handleSignUp = () => {
    signInClose(); // Close the Sign In modal if open
    signUpOpen(); // Open the Sign Up modal
  };

  return (
    <>
      <Button onClick={handleSignIn}>Sign In</Button>
      <Button onClick={handleSignUp} variant="outline">
        Sign Up
      </Button>
      <SignIn
        opened={signInOpened}
        toggleSignUp={handleSignUp}
        close={signInClose}
      />
      <SignUp
        opened={signUpOpened}
        toggleSignIn={handleSignIn}
        close={signUpClose}
      />
    </>
  );
};

export default SignButtons;
