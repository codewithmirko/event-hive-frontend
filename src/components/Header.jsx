import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Group, Divider, Drawer, ScrollArea, Image, LoadingOverlay } from "@mantine/core";
import { Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AuthContext } from "../context/auth.context";
import SignButtons from "./SignButtons";
import classes from "../styles/Header.module.css";
import logo from "../assets/logo-text-full-res.png";

function Header() {
  const { isLoggedIn, isLoading, logOutUser } = useContext(AuthContext);
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  const handleLogout = () => {
    closeDrawer();
    logOutUser();
  };

  return (
    <Box pb={0}>
      <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
      {!isLoading && (
        <header className={classes.header}>
          <Link to="/" className={`${classes.link} ${classes.logo}`}>
            <Image src={logo} height={35} width="auto" />
          </Link>

          <Group className={classes.buttons} visibleFrom="sm">
            {!isLoggedIn ? (
              <SignButtons />
            ) : (
              <>
                <Link to="/profile" className={classes.link}>
                  Profile
                </Link>
                <Button variant="outline" color="red" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />

          <Drawer
            opened={drawerOpened}
            onClose={closeDrawer}
            size="100%"
            padding="md"
            title="Navigation"
            hiddenFrom="sm"
            // zIndex={1000000}
          >
            <ScrollArea style={{ height: `calc(100vh - ${80}px)` }} mx="-md">
              <Divider my="sm" />
              <Link to="/" className={classes.link} onClick={closeDrawer}>
                Home
              </Link>
              <Divider my="sm" />
              {!isLoggedIn ? (
                <Group justify="center" grow pb="xl" px="md">
                  <SignButtons />
                </Group>
              ) : (
                <Group justify="center" grow pb="xl" px="md">
                  <Link to="/profile" className={classes.link} onClick={closeDrawer}>
                    Profile
                  </Link>
                  <Button variant="outline" color="red" onClick={handleLogout}>
                    Logout
                  </Button>
                </Group>
              )}
            </ScrollArea>
          </Drawer>
        </header>
      )}
    </Box>
  );
}

export default Header;
