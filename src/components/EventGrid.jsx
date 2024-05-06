import { useState, useContext } from "react";
import {
  SimpleGrid,
  Card,
  Image,
  Text,
  Container,
  AspectRatio,
} from "@mantine/core";
import classes from "../styles/EventGrid.module.css";
import EventCard from "./EventCard";
import { EventContext } from "../context/EventContext";
import SearchBox from "./SearchBox";

function EventGrid() {
  const { events } = useContext(EventContext);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents = events.filter((event) =>
    (event.eventname?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  const handleSearch = (value) => {
    setSearchTerm(value.toLowerCase());
  };

  const eventCards = filteredEvents.map((event) => (
    <EventCard
      key={event._id}
      eventName={event.eventname}
      description={event.description}
      photo={event.photo}
      location={event.location}
      date={event.date}
      organizer={event.organizer.username}
      eventType={event.eventType}
      eventId={event._id}
      className={classes.card}
    />
  ));

  return (
    <Container py="xl">
      <div style={{ marginBottom: "20px" }}>
        <SearchBox searchHandler={handleSearch} />
      </div>
      {eventCards.length > 0 ? (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
          {eventCards}
        </SimpleGrid>
      ) : (
        <Text align="center" size="lg" mt="lg">
          No events found matching your search criteria.
        </Text>
      )}
    </Container>
  );
}

export default EventGrid;
