import { Container, Group, Image } from "@mantine/core";
import classes from "../styles/FooterBar.module.css";
import logo from "../assets/logo-text-full-res.png";
import { Link } from "react-router-dom";

function FooterBar() {
  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Link to="/">
          <Image src={logo} h={35} w="auto" />
        </Link>
        <Group>
          <Link to="/about">About</Link>
        </Group>
      </Container>
    </div>
  );
}

export default FooterBar;
