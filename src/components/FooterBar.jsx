import { Container, Group, Anchor, Image } from "@mantine/core";
import { MantineLogo } from "@mantinex/mantine-logo";
import classes from "../styles/FooterBar.module.css";
import logo from "../assets/logo-text-full-res.png";

const links = [
  { link: "#", label: "Contact" },
  { link: "#", label: "About" },
  { link: "#", label: "Privacy" },
];

function FooterBar() {
  const items = links.map((link) => (
    <Anchor
      key={link.label}
      href={link.link}
      color="dimmed"
      size="sm"
      onClick={(event) => event.preventDefault()}
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Image src={logo} h={35} w="auto" />
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  );
}

export default FooterBar;
