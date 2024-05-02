import {
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  rem,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import eventPicture from "../assets/event-picture.png";
import classes from "../styles/HeroSection.module.css";

function HeroSection() {
  return (
    <Container size="md">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            <span className={classes.highlight}>EventHive:</span> <br />
            The No.1 Social Event Platform
          </Title>
          <Text c="dimmed" mt="md">
            Immerse yourself in a community where connections are made through
            shared experiences. Host or join a range of events tailored to your
            passions and locality.
          </Text>

          <List
            mt={30}
            spacing="sm"
            size="sm"
            icon={
              <ThemeIcon size={20} radius="xl">
                <IconCheck
                  style={{ width: rem(12), height: rem(12) }}
                  stroke={1.5}
                />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>Community Interaction</b> – Connect with like-minded
              individuals through diverse events
            </List.Item>
            <List.Item>
              <b>Discover yourself</b> – Expand your social horizons by
              discovering new events and activities.
            </List.Item>
            <List.Item>
              <b>Showcase your Passion</b> – Hosting an event enables you to
              showcase your passion or share your expertise.
            </List.Item>
          </List>

          <Group mt={30}>
            <Button radius="xl" size="md" className={classes.control}>
              Sign Up
            </Button>
          </Group>
        </div>
        <Image src={eventPicture} className={classes.image} />
      </div>
    </Container>
  );
}

export default HeroSection;
