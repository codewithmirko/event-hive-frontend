import { IconBookmark, IconHeart, IconShare } from "@tabler/icons-react";
import FavoriteIcon from "./FavoriteIcon";
import { AuthContext } from "../context/auth.context"
import { useContext } from 'react';

import {
  Card,
  Image,
  Text,
  ActionIcon,
  Badge,
  Group,
  Center,
  Avatar,
  useMantineTheme,
  rem,
} from "@mantine/core";
import classes from "../styles/EventCard.module.css";
import { Link } from "react-router-dom";
import EventModifier from "./EventModifier";


function EventCard({
  eventName,
  description,
  photo,
  location,
  date,
  organizer,
  eventType,
  eventId,
  organizerId,
}) {
  const theme = useMantineTheme();
  //const { user } = useContext(AuthContext); // Access user from AuthContext


  const defaultImageSrc =
    "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg";


  return (
    <Card withBorder radius="md">
      <Card.Section>
        <Link to={`/event/${eventId}`}>
          <Image src={photo || defaultImageSrc} height={180} />
        </Link>
      </Card.Section>

      <Badge
        className={classes.rating}
        variant="gradient"
        gradient={{ from: "yellow", to: "red" }}
      >
        {eventType}
      </Badge>
      <Link to={`/event/${eventId}`}>
        <Text className={classes.title} fw={500}>
          {eventName}
        </Text>
      </Link>

      <Text fz="sm" c="dimmed" lineClamp={4}>
        {description}
      </Text>

      <Text size="sm">{location}</Text>
      <Text size="sm">{new Date(date).toDateString()}</Text>

      <Group justify="space-between" className={classes.footer}>
        <Center>
          <Avatar
            src={`https://api.multiavatar.com/${encodeURIComponent(
              organizer
            )}.png`}
            size={24}
            radius="xl"
            mr="xs"
          />
          <Text fz="sm" inline>
            {organizer}
          </Text>
        </Center>

        <Group gap={8} mr={0}>
          <EventModifier eventId={eventId} organizerId={organizerId} />
          <ActionIcon className={classes.action}>
            <FavoriteIcon eventId={eventId} />
          </ActionIcon>
        </Group>
      </Group>
    </Card>
  );
}

export default EventCard;
