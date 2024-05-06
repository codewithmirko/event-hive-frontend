import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/auth.context';
import { Container, Title, LoadingOverlay, Text, Card } from '@mantine/core';
import UserDetails from '../components/UserDetails';
import UserProfileForm from '../components/UserProfileForm';
import { EventContext } from '../context/EventContext';
import EventGrid from "../components/EventGrid.jsx";

const UserProfilePage = () => {
    const { user, isLoading } = useContext(AuthContext);
    const { getDataEvent } = useContext(EventContext)
    const [editMode, setEditMode] = useState(false);
    const [joinedEvents, setJoinedEvents] = useState([]);
    const [organizedEvents, setOrganizedEvents] = useState([]);
    const [favoritedEvents, setFavoritedEvents] = useState([]);

    useEffect(() => {
        // Fetch initial 15 events (make sure your API supports this limit query)
        

        // Fetch specific sets of events if the user is logged in
        if (user) {
            getDataEvent(`?attendee=${user._id}`, setJoinedEvents);
            getDataEvent(`?organizer=${user._id}`, setOrganizedEvents);
        }
    }, [user]);


    const handleSaveChanges = (values) => {
        console.log('Form values:', values);
        // Here, implement the logic to send data to the server
        // After successful update, you might want to call a method to refresh user info
        setEditMode(false);
    };

    // TEMPORARY FUNCTION
    const EventsList = ({ title, events }) => (
        <>
            <Title order={4}>{title}</Title>
            {events.length ? (
                events.map(event => (
                    <Card key={event._id}>
                        <Text>{event.eventname}</Text>
                    </Card>
                ))
            ) : (
                <>
                <div>No events found.</div>
                </>
            )}
        </>
    );


    if (isLoading) {
        return (
            <Container size="sm" mt={50}>
                <LoadingOverlay visible={true} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            </Container>
        );
    }


    if (!user) {
        return (
            <Container size="sm" mt={50}>
                <LoadingOverlay visible={true} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            </Container>
        );
    }

    return (
        <Container size="md" mt={50}>
            <Title align="center">User Profile</Title>
            {!editMode ? (
                <UserDetails user={user} onEdit={() => setEditMode(true)} />
            ) : (
                <UserProfileForm user={user} onSave={handleSaveChanges} onCancel={() => setEditMode(false)} />
            )}
    <>
            <EventGrid title="Joined Events" events={joinedEvents} />
            <EventGrid title="Organized Events" events={organizedEvents} />
            <EventGrid title="Favorited Events" events={user?.favoritedEvents} />
            </>
        </Container>
    );
};

export default UserProfilePage;
