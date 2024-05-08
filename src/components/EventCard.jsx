import FavoriteIcon from "./FavoriteIcon";

import {
  Card,
  Image,
  Text,
  Badge,
  Group,
  Center,
  Avatar,
} from "@mantine/core";

import { Link } from "react-router-dom";
import EventModifier from "./EventModifier";
import classes from "../styles/EventCard.module.css";


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
    
        <div className={classes.footer} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              src={`https://api.multiavatar.com/${encodeURIComponent(organizer)}.png`}
              size={24}
              radius="xl"
              style={{ marginRight: '8px' }}
            />
            <Text fz="sm">{organizer}</Text>
          </div>
    
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
            <EventModifier eventId={eventId} organizerId={organizerId} />
            <FavoriteIcon eventId={eventId} />
          </div>
        </div>
      </Card>
    );
    
}

export default EventCard;
