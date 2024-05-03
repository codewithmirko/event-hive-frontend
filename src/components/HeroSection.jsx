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
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <Container size="md">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            Your <span className={classes.highlight}>Social</span> <br />
            Event Platform
          </Title>
          <Text c="dimmed" mt="md">
            Connections are made through shared experiences. Host or join events
            tailored to your passions and locality.
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
              <b>Discover yourself</b> – Expand your social horizons by
              discovering new events and activities.
            </List.Item>
            <List.Item>
              <b>Showcase your Passion</b> – Hosting an event enables you to
              showcase your passion or share your expertise.
            </List.Item>
          </List>

          <Group mt={30}>
            <Link to="/event/create" className={classes.link}>
              <Button radius="xl" size="md" className={classes.control}>
                Create Event
              </Button>
            </Link>
            <Link to="/about" className={classes.link}>
              <Button
                variant="default"
                radius="xl"
                size="md"
                className={classes.control}
              >
                Learn more
              </Button>
            </Link>
          </Group>
        </div>
        <img src={eventPicture} className={classes.image} />
      </div>
    </Container>
  );
}

export default HeroSection;
