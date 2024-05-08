import { useState } from "react";
import {
  SimpleGrid,
  Card,
  Image,
  Text,
  Container,
  AspectRatio,
  Title,
  Paper,
} from "@mantine/core";
import classes from "../styles/EventGrid.module.css";
import EventCard from "./EventCard";
import SearchBox from "./SearchBox";


function EventGrid({ events, title = 'Events' }) {
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
      organizer={event.organizer?.username}
      eventType={event.eventType}
      eventId={event._id}
      className={classes.card}
      organizerId={event.organizer._id}
    />

  ));

  return (
    <Container py="xl">
      <Paper shadow="sm" radius="md" p="md" withBorder style={{ marginBottom: "20px" }}>
        <Title order={2} align="center">{title}</Title>
        <div style={{ marginBottom: "20px" }}>
          <SearchBox searchHandler={handleSearch} />
        </div>

        {eventCards.length > 0 ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg" >
              {eventCards}
            </SimpleGrid>
          </div>


        ) : (
          <Text align="center" size="lg" mt="lg">
            No events found matching your search criteria.
          </Text>
        )}
      </Paper>
    </Container>
  );
}

export default EventGrid;
