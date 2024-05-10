import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Group,
  Divider,
  Drawer,
  ScrollArea,
  Image,
  LoadingOverlay,
} from "@mantine/core";
import { Burger, AppShell, Avatar } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AuthContext } from "../context/auth.context";
import SignButtons from "./SignButtons";
import classes from "../styles/Header.module.css";
import logo from "../assets/logo-text-full-res.png";

function Header() {
  const { isLoggedIn, isLoading, logOutUser, user } = useContext(AuthContext);
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const handleLogout = () => {
    closeDrawer();
    logOutUser();
  };

  return (
    <Box pb={60}>
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      {!isLoading && (
        <header className={`${classes.header} ${classes.sticky}`}>
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
                  
                  <Avatar

                    src={`https://api.multiavatar.com/${encodeURIComponent(
                      user?.username
                    )}.png`}
                    alt={`${user?.username}'s avatar`}
                    size={35}
                    style={{ margin: "10px" , padding :"2px"}} // Center the avatar in its grid column
                  />
                </Link>
                <Button variant="outline" color="red" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />

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
                  <Link
                    to="/profile"
                    className={classes.link}
                    onClick={closeDrawer}
                  >
                    Profile

                      <Avatar
                      src={`https://api.multiavatar.com/${encodeURIComponent(
                        user?.username
                      )}.png`}
                      alt={`${user?.username}'s avatar`}
                      size={30}
                      style={{ margin: "10px" , padding :"2px"}} // Center the avatar in its grid column
                    />
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
