import {
  Badge,
  Group,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { IconGauge, IconUser, IconCookie } from "@tabler/icons-react";
import classes from "../styles/AboutPage.module.css";
import EmployeeCard from "../components/EmployeeCard";
import mirkoAvatar from "../assets/mirko-picture.jpeg";
import fatmaAvatar from "../assets/fatma-picture.jpeg";
import danielAvatar from "../assets/daniel-picture.jpeg";

const mockdata = [
  {
    title: "Extreme performance",
    description:
      "This dust is actually a powerful poison that will even make a pro wrestler sick, Regice cloaks itself with frigid air of -328 degrees Fahrenheit",
    icon: IconGauge,
  },
  {
    title: "Privacy focused",
    description:
      "People say it can run at the same speed as lightning striking, Its icy body is so cold, it will not melt even if it is immersed in magma",
    icon: IconUser,
  },
  {
    title: "No third parties",
    description:
      "They’re popular, but they’re rare. Trainers who show them off recklessly may be targeted by thieves",
    icon: IconCookie,
  },
];

function AboutPage() {
  const theme = useMantineTheme();
  const features = mockdata.map((feature) => (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      className={classes.card}
      padding="xl"
    >
      <feature.icon
        style={{ width: rem(50), height: rem(50) }}
        stroke={2}
        color={theme.colors.blue[6]}
      />
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

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
