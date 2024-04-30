import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import SignUp from "./SignUp";

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
            <Group justify="space-between" mt="lg">
              <Button variant="subtle" size="sm">
                Forgot password?
              </Button>
            </Group>
            <Button fullWidth mt="xl" onClick={close}>
              Sign in
            </Button>
          </Paper>
        </Container>
      </Modal>
    </>
  );
};

export default SignIn;
