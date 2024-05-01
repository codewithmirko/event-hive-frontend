import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const API_URL = "http://localhost:5005";

import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import classes from "../styles/AuthenticationTitle.module.css";

const SignUp = ({ opened, toggleSignIn, close }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleConfirmPassword = (e) => setConfirmPassword(e.target.value);

  const handleSignUpSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.log("The passwords do not match! Please check again.");
      return;
    }

    const requestBody = { email, password, name };
    console.log(requestBody);
    console.log("hello");

    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error.response.data);
        console.log(error.response.status);
      });
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="" size="auto">
        <Container size={420} my={40}>
          <Title align="center" className={classes.title}>
            Sign Up
          </Title>
          <Text color="dimmed" size="sm" align="center" mt={5}>
            Already have an account?{" "}
            <Button
              variant="subtle"
              size="sm"
              type="button"
              onClick={() => {
                close(); // Close this modal first
                toggleSignIn(); // Then trigger the Sign In modal
              }}
            >
              Sign in instead
            </Button>
          </Text>
          <form onSubmit={handleSignUpSubmit}>
            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
              <TextInput
                label="Email"
                placeholder="john@eventhive.com"
                value={email}
                onChange={handleEmail}
                required
              />
              <PasswordInput
                label="Password"
                placeholder="Your password"
                required
                mt="md"
                value={password}
                onChange={handlePassword}
              />
              <PasswordInput
                label="confirmPassword"
                placeholder="Confirm password"
                required
                mt="md"
                value={confirmPassword}
                onChange={handleConfirmPassword}
              />
              <Group justify="space-between" mt="lg"></Group>
              <Button
                fullWidth
                mt="xl"
                type="submit"
                // onClick={() => {
                //   console.log("i am onclick");
                //   close();
                // }}
              >
                Sign up
              </Button>
            </Paper>
          </form>
        </Container>
      </Modal>
    </>
  );
};

export default SignUp;
