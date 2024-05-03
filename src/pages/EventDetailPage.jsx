import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Title, Text, Image, Badge, Card, Group, Button } from '@mantine/core';
import { EventContext } from '../context/EventContext';
import { AuthContext } from '../context/auth.context';  // Assuming you have a context to manage authentication
import Comments from '../components/Comments';

const EventDetailPage = () => {
    const { eventId } = useParams();
    const { updateEventParticipation } = useContext(EventContext);
    const { user, isLoggedIn } = useContext(AuthContext); // Assuming this context provides user and authentication status
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [disableButton, setDisableButton] = useState(false);


    const fetchEvent = async () => {
        try {
            const response = await axios.get(`http://localhost:5005/api/events/${eventId}`);
            setEvent(response.data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchEvent();
    }, [eventId,updateEventParticipation]);

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text c="red">Error: {error}</Text>;
    if (!event) return <Text>This event does not exist.</Text>;

    const isUserAttending = event.attendees.some(att => att._id === user?._id); // Check if the user is in the attendees list

    const handleEventParticipation = async () => {
        setDisableButton(true); // Disable the button immediately
    
        try {
            const actionType = isUserAttending ? 'leave' : 'join';
            await updateEventParticipation(event._id, actionType);
    
            await fetchEvent(); // Optionally refetch event data to update the UI
        } catch (error) {
            console.error("Error during event participation:", error);
            showNotification({
                title: 'Error',
                message: 'Failed to update event participation.',
                color: 'red',
            });
        } finally {
            setTimeout(() => setDisableButton(false), 2000); // Re-enable the button after 2 seconds
        }
    };
    

    return (
        <Container>
            <Card shadow="sm" p="lg">
                <Card.Section>
                    <Image src={event.photo || '/default-event.jpg'} alt={event.eventname} height={200} />
                </Card.Section>
                <Group position="apart" style={{ marginBottom: 5, marginTop: 'md' }}>
                    <Title order={2}>{event.eventname}</Title>
                    <Badge color="pink" variant="light">
                        {event.eventType}
                    </Badge>
                </Group>
                <Text size="sm">{event.description}</Text>
                <Text size="sm" style={{ color: 'gray', marginTop: 10 }}>
                    Location: {event.location}
                </Text>
                <Text size="sm" style={{ color: 'gray' }}>
                    Date: {event.date ? new Date(event.date).toLocaleDateString() : 'TBA'}
                </Text>
                <Text size="sm">
                    Organizer: {event.organizer.username}
                </Text>
                <Text size="sm">
                    Attendees: {event.attendees.map(a => a.username).join(", ")}
                </Text>
                <Button
                    variant="outline"
                    style={{ marginTop: 14 }}
                    onClick={handleEventParticipation}
                    disabled={!isLoggedIn || disableButton}  // Disable if not logged in
                >
                    {isUserAttending ? 'Leave Event' : 'Join Event'}  
                </Button>
            </Card>
            <Comments eventId={event._id} />
        </Container>
    );
};

export default EventDetailPage;
