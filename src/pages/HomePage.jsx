import { useState, useContext } from "react";
import {
  Input,
  Card,
  Image,
  Text,
  Group,
  Badge,
  Button,
  useMantineTheme,
} from "@mantine/core";
import { Link } from "react-router-dom";

import classes from "../styles/EventCard.module.css";
import styles from "../styles/HomePage.module.css";

import { EventContext } from "../context/EventContext.jsx";
import HeroSection from "../components/HeroSection.jsx";
import EventCard from "../components/EventCard.jsx";
import SearchBox from "../components/SearchBox.jsx";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [favoritedEvents, setFavoritedEvents] = useState(new Set());

  const { events } = useContext(EventContext);
  const theme = useMantineTheme();

  const searchHandler = (string) => {
    setSearchTerm(string.toLowerCase());
  };

  // const toggleFavorite = (eventId) => {
  //   setFavoritedEvents((prev) => {
  //     const newFavs = new Set(prev);
  //     if (newFavs.has(eventId)) {
  //       newFavs.delete(eventId);
  //     } else {
  //       newFavs.add(eventId);
  //     }
  //     return newFavs;
  //   });
  // };

  const filteredEvents = events.filter((event) =>
    (event.eventname?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <HeroSection />
      <div className={styles.searchBar}>
        <SearchBox searchHandler={searchHandler} />
      </div>
      {/* <Input
        placeholder="Search events"
        onChange={(event) => setSearchTerm(event.target.value)}
        className={classes.searchBar}
        mb={20}
      /> */}
      <div className={classes.cardBlock}>
        {filteredEvents.length > 0 ? (
          <div className={classes.cardContainer}>
            {filteredEvents.map((event) => (
              <EventCard
                key={event._id}
                eventName={event.eventname}
                description={event.description}
                photo={event.photo}
                location={event.location}
                date={event.date}
                eventId={event._id}
                // organizer={event.organizer}
                eventType={event.eventType}
                className={classes.card}
              />
            ))}
          </div>
        ) : (
          <Text align="center" size="lg" mt="lg">
            No events found matching your search criteria.
          </Text>
        )}
      </div>
    </>
  );
};

export default HomePage;

{
  /* <Card
key={event._id}
shadow="sm"
p="lg"
className={classes.eventBlock}
>
{console.log(event._id)}
<Card.Section component={Link} to={`/event/${event._id}`}>
  <Image
    src=""
    height={160}
    alt={`Image of ${event.eventTitle}`}
  />
</Card.Section>
<Group
  position="apart"
  style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
>
  <Text weight={500}>{event.eventTitle}</Text>
  <Badge color="pink" variant="light">
    {event.category}
  </Badge>
</Group>
<Text size="sm" style={{ lineHeight: 1.5 }}>
  {event.description}
</Text>
<Button
  variant="outline"
  color={favoritedEvents.has(event.id) ? "red" : "blue"}
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(event.id);
  }}
  fullWidth
  style={{ marginTop: 14 }}
>
  {favoritedEvents.has(event.id)
    ? "Remove from favorites"
    : "Add to favorites"}
</Button>
</Card> */
}
