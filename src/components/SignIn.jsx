import React, { useContext } from "react";
import axios from "axios";
import {
  TextInput,
  Text,
  PasswordInput,
  Paper,
  Title,
  Container,
  Group,
  Button,
  Modal,
} from "@mantine/core";
import { useForm } from "@mantine/form"; // USING THIS so we don't use states and .. all the extra stuff
import classes from "../styles/AuthenticationTitle.module.css";
import { AuthContext } from "../context/auth.context";
import CustomNotification from "./CustomNotification";  // Ensure this path is correct

const API_URL = "http://localhost:5005";

const SignIn = ({ opened, toggleSignUp, close }) => {
  const { storeToken, authenticateUser,setIsLoading, isLoading } = useContext(AuthContext);

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length >= 1 ? null : 'Password must be at least 1 character'),
    },
  });

  const handleSignInSubmit = (values) => {
    setIsLoading(true);
    axios
      .post(`${API_URL}/auth/login`, values)
      .then((response) => {
        // console.log("Sign In successful", response);
        storeToken(response.data.token);
        authenticateUser();
        CustomNotification({
          type: 'success',
          message: `Welcome back`
        });
        close();
      })
      .catch((error) => {
        CustomNotification({
          type: 'error',
          message: error.response ? error.response.data.message : 'Failed to connect to the server'
        });
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);  // Reset loading state regardless of the outcome
      });
  };

  return (
    <Modal opened={opened} onClose={close} title="" size="auto">
      <Container size={420} my={40}>
        <Title align="center" className={classes.title}>
          Sign In
        </Title>
        <Text c="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{" "}
          <Button variant="subtle" size="sm" onClick={() => {
            close();
            toggleSignUp();
          }}>
            Sign up instead
          </Button>
        </Text>
        <form onSubmit={form.onSubmit(handleSignInSubmit)}>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput
              label="Email"
              placeholder="john@eventhive.com"
              {...form.getInputProps('email')}
              required
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              {...form.getInputProps('password')}
              required
              mt="md"
            />
            <Group position="right" mt="lg">
              <Button variant="subtle" size="sm">
                Forgot password?
              </Button>
            </Group>
            <Button type="submit" fullWidth mt="xl" loading={form.isSubmitting} disabled={form.isSubmitting} >
              Sign in
            </Button>
          </Paper>
        </form>
      </Container>
    </Modal>
  );
};

export default SignIn;
