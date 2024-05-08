import {
  Image,
  Container,
  Title,
  Text,
  Button,
  SimpleGrid,
} from "@mantine/core";
import errorimage from "../assets/errorimage.svg";
import classes from "../styles/NotFoundImage.module.css";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <Container className={classes.root}>
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <Image src={errorimage} className={classes.mobileImage} />
        <div>
          <Title className={classes.title}>Something is not right...</Title>
          <Text c="dimmed" size="lg">
            The Page you are trying to open does not exist. You may have
            mistyped the address, or the page has been moved to another URL. If
            you think this is an error contact support.
          </Text>
          <Link to="/" className={classes.link}>
            <Button
              variant="outline"
              size="md"
              mt="xl"
              className={classes.control}
            >
              Get back to home page
            </Button>
          </Link>
        </div>
        <Image src={errorimage} className={classes.desktopImage} />
      </SimpleGrid>
    </Container>
  );
}

export default ErrorPage;
