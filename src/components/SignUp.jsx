import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { useNavigate } from "react-router-dom";

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

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const requestBody = { email, password, name };

    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
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
              type="button" // Ensure it's explicitly a button to prevent form submission
              onClick={() => {
                close(); // Close this modal first
                toggleSignIn(); // Then trigger the Sign In modal
              }}
            >
              Sign in instead
            </Button>
          </Text>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput
              label="Email"
              placeholder="john@eventhive.com"
              required
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              mt="md"
            />
            <Group justify="space-between" mt="lg"></Group>
            <Button
              fullWidth
              mt="xl"
              onClick={() => {
                handleSignupSubmit();
                close();
              }}
            >
              Sign up
            </Button>
          </Paper>
        </Container>
      </Modal>
    </>
  );
};

export default SignUp;
