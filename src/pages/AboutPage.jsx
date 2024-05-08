import {
  Badge,
  Group,
  Title,
  Text,
  Container,
  useMantineTheme,
} from "@mantine/core";
import classes from "../styles/AboutPage.module.css";
import EmployeeCard from "../components/EmployeeCard";
import mirkoAvatar from "../assets/mirko-picture.jpeg";
import fatmaAvatar from "../assets/fatma-picture.jpeg";
import danielAvatar from "../assets/daniel-picture.jpeg";

function AboutPage() {
  const theme = useMantineTheme();

  return (
    <Container size="lg" py="xl">
      <Group justify="center">
        <Badge variant="filled" size="lg">
          About EventHive
        </Badge>
      </Group>

      <Title order={2} className={classes.title} ta="center" mt="sm">
        Where communities come alive.
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        <strong>Discover. Connect. Experience.</strong> EventHive is a social
        networking app where users connect through events and activities. Users
        can host their own events, as well as browse and join events organized
        by others based on their interests and location. Users can also interact
        with each other by commenting on upcoming events.
      </Text>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        <strong>Our mission:</strong> We aim to foster real-world connections by
        bringing people together through fun and meaningful activities within
        their communities.
      </Text>

      <Title order={3} className={classes.title} ta="center" mt="sm">
        Meet the team
      </Title>

      <div className={classes.employeeCtn}>
        <EmployeeCard
          name="Daniel"
          email="danielionutrancea@gmail.com"
          role="Web Dev"
          githubUrl="https://github.com/johndaniell"
          avatarSrc={danielAvatar}
        />

        <EmployeeCard
          name="Fatma"
          email="fatmagursesuzun@gmail.com"
          role="Web Dev"
          githubUrl="https://github.com/ftmgr"
          avatarSrc={fatmaAvatar}
        />

        <EmployeeCard
          name="Mirko"
          email="codewithmirko@gmail.com"
          role="Web Dev"
          githubUrl="https://github.com/codewithmirko"
          avatarSrc={mirkoAvatar}
        />
      </div>
    </Container>
  );
}

export default AboutPage;
