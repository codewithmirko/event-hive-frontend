import { Container, Group, Anchor } from "@mantine/core";
import { MantineLogo } from "@mantinex/mantine-logo";
import classes from "../styles/FooterBar.module.css";

const links = [
  { link: "#", label: "Contact" },
  { link: "#", label: "Privacy" },
  { link: "#", label: "Blog" },
  { link: "#", label: "Careers" },
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
        <MantineLogo size={28} />
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  );
}

export default FooterBar;
