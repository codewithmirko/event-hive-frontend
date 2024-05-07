import React, { useContext } from "react";
import axios from "axios";
import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Modal,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import classes from "../styles/AuthenticationTitle.module.css";
import CustomNotification from "./CustomNotification";
import { useState } from "react";
import { AuthContext } from "../context/auth.context";

const API_URL = import.meta.env.VITE_API_URL;

const SignUp = ({ opened, toggleSignIn, close }) => {
  const { setIsLoading, isLoading } = useContext(AuthContext);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      userName: (value) => (value ? null : "Username is required"),
      email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length >= 1 ? null : "Password must be at least 1 character",
      confirmPassword: (value, values) =>
        value === values.password ? null : "Passwords do not match",
    },
  });

  const handleSignUpSubmit = (values) => {
    setIsLoading(true);
    setIsSubmitting(true);
    const { userName, email, password } = values;

    axios
      .post(`${API_URL}/auth/signup`, { username: userName, email, password })
      .then(() => {
        CustomNotification({
          type: "success",
          message: "Account created successfully!",
        });
        close();
      })
      .catch((error) => {
        CustomNotification({
          type: "error",
          message: error.response
            ? error.response.data.message
            : "Failed to connect to the server",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
        setIsLoading(false); // Reset loading state regardless of the outcome
      });
  };

  return (
    <Modal opened={opened} onClose={close} title="" size="auto">
      <Container size={420} my={40}>
        <Title align="center" className={classes.title}>
          Sign Up
        </Title>
        <Text c="dimmed" size="sm" align="center" mt={5}>
          Already have an account?{" "}
          <Button
            variant="subtle"
            size="sm"
            onClick={() => {
              close();
              toggleSignIn();
            }}
          >
            Sign in instead
          </Button>
        </Text>
        <form onSubmit={form.onSubmit(handleSignUpSubmit)}>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput
              label="Username"
              placeholder="coolusername"
              {...form.getInputProps("userName")}
              required
            />
            <TextInput
              label="Email"
              placeholder="john@eventhive.com"
              {...form.getInputProps("email")}
              required
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              {...form.getInputProps("password")}
              required
              mt="md"
            />
            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm password"
              {...form.getInputProps("confirmPassword")}
              required
              mt="md"
            />
            <Group position="right" mt="lg">
              <Button
                type="submit"
                fullWidth
                mt="xl"
                loading={form.isSubmitting}
              >
                Sign up
              </Button>
            </Group>
          </Paper>
        </form>
      </Container>
    </Modal>
  );
};

export default SignUp;
