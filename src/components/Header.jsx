import React from "react";
import { Link } from "react-router-dom";
import { MantineLogo } from "@mantinex/mantine-logo";
import SignButtons from "./SignButtons";
import { useDisclosure } from "@mantine/hooks";
import {
  Box,
  Button,
  rem,
  Burger,
  Group,
  Divider,
  Drawer,
  ScrollArea,
  Image,
} from "@mantine/core";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import classes from "../styles/Header.module.css";
import logo from "../assets/logo-text-full-res.png";

function Header() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  return (
    <Box pb={0}>
      <header className={classes.header}>
        <Link to="/" className={`${classes.link} ${classes.logo}`}>
          <Image src={logo} h={35} w="auto" />
        </Link>

        <Group className={classes.buttons} visibleFrom="sm">
          {isLoggedIn ? (
            <Button variant="outline" color="red" onClick={logOutUser}>
              Logout
            </Button>
          ) : (
            <SignButtons />
          )}
        </Group>

        <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <a href="#" className={classes.link}>
            Home
          </a>

          <Divider my="sm" />

          {!isLoggedIn ? (
            <Group justify="center" grow pb="xl" px="md">
              <SignButtons />
            </Group>
          ) : (
            <Group justify="center" grow pb="xl" px="md">
              <Button variant="outline" color="red" onClick={logOutUser}>
                Logout
              </Button>
            </Group>
          )}
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

export default Header;
