import classes from "../styles/Content.module.css";

import { useState, useContext } from "react";
import { Input, Card, Image, Text, Group, Badge, Button, useMantineTheme } from "@mantine/core";
import { Link } from "react-router-dom";

import { EventContext } from "../context/EventContext.jsx";

const HomePage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [favoritedEvents, setFavoritedEvents] = useState(new Set());

    const { events } = useContext(EventContext);
    const theme = useMantineTheme();

    const toggleFavorite = (eventId) => {
        setFavoritedEvents((prev) => {
            const newFavs = new Set(prev);
            if (newFavs.has(eventId)) {
                newFavs.delete(eventId);
            } else {
                newFavs.add(eventId);
            }
            return newFavs;
        });
    };

    const filteredEvents = events.filter((event) =>
    (event.eventTitle?.toLowerCase() || "").includes(searchTerm.toLowerCase())
);


    return (
        <>
            <p> This is the content page!</p>
            <Input
                placeholder="Search events"
                onChange={(event) => setSearchTerm(event.target.value)}
                className={classes.searchBar}
                mb={20}
            />
            <div className={classes.container}>
                {filteredEvents.length > 0 ? (
                    <div className={classes.eventGrid}>
                        {filteredEvents.map((event) => (
                            
                            <Card key={event._id} shadow="sm" p="lg" className={classes.eventBlock}>{console.log(event._id)}
                                <Card.Section component={Link} to={`/event/${event._id}`}>
                                    <Image src="" height={160} alt={`Image of ${event.eventTitle}`} />
                                </Card.Section>
                                <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
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
                                    {favoritedEvents.has(event.id) ? 'Remove from favorites' : 'Add to favorites'}
                                </Button>
                            </Card>
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
