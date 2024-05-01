import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import SignUp from "./SignUp";
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

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

const SignIn = ({ opened, toggleSignUp, close }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { storeToken } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSignInSubmit = (e) => {
    e.preventDefault();

    const requestBody = { email, password };
    console.log(requestBody);

    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        console.log("Sign In succesful");
        console.log("JWT token", response.data.token);
        console.log("Response data:", response.data);
        storeToken(response.data.token);
        // navigate("/");
        close();
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
            Sign In
          </Title>
          <Text c="dimmed" size="sm" align="center" mt={5}>
            Do not have an account yet?{" "}
            <Button
              variant="subtle"
              size="sm"
              onClick={() => {
                close(); // First close the SignIn modal
                toggleSignUp(); // Then open the SignUp modal
              }}
            >
              Sign up instead
            </Button>
          </Text>
          <form onSubmit={handleSignInSubmit}>
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
                value={password}
                onChange={handlePassword}
                required
                mt="md"
              />
              <Group justify="space-between" mt="lg">
                <Button variant="subtle" size="sm">
                  Forgot password?
                </Button>
              </Group>
              <Button type="submit" fullWidth mt="xl">
                Sign in
              </Button>
            </Paper>
          </form>
        </Container>
      </Modal>
    </>
  );
};

export default SignIn;
