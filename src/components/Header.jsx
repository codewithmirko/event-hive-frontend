import {
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { MantineLogo } from "@mantinex/mantine-logo";
import { useDisclosure } from "@mantine/hooks";
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
} from "@tabler/icons-react";
import classes from "../styles/Header.module.css";
import SearchBox from "./SearchBox";
import SignButtons from "./SignButtons";
import { useContext } from "react"; // <== IMPORT
import { AuthContext } from "../context/auth.context"; // <== IMPORT

const mockdata = [
  {
    icon: IconCode,
    title: "Open source",
    description: "This Pokémon’s cry is very loud and distracting",
  },
];

function Header() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();

  return (
    <Box pb={120}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <a href="#" className={classes.link}>
            <MantineLogo size={30} />{" "}
          </a>

          {/* Middle section */}
          <Group h="100%" gap={0} visiblefrom="sm">
            <SearchBox />
          </Group>

          {isLoggedIn && (
            <>
              <Group visiblefrom="sm">
                <Button
                  visiblefrom="sm"
                  variant="outline"
                  color="red"
                  onClick={logOutUser}
                >
                  Logout
                </Button>
              </Group>
            </>
          )}

          {!isLoggedIn && (
            <Group visiblefrom="sm">
              <SignButtons />
            </Group>
          )}

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
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

          {/* Right section */}

          {!isLoggedIn && (
            <Group justify="center" grow pb="xl" px="md">
              <SignButtons />
            </Group>
          )}

          {isLoggedIn && (
            <Group justify="center" grow pb="xl" px="md">
              <button variant="outline" color="red" onClick={logOutUser}>
                Logout
              </button>
            </Group>
          )}
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

export default Header;
