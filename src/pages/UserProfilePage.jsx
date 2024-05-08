import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/auth.context';
import { Container, Title, LoadingOverlay, Text, Card } from '@mantine/core';
import UserDetails from '../components/UserDetails';
import UserProfileForm from '../components/UserProfileForm';
import { EventContext } from '../context/EventContext';
import EventGrid from "../components/EventGrid.jsx";

const UserProfilePage = () => {
    const { user, isLoading, setIsLoading, fetchUserDetails, updateUserProfile } = useContext(AuthContext);
    const { getDataEvent } = useContext(EventContext)
    const [editMode, setEditMode] = useState(false);
    const [joinedEvents, setJoinedEvents] = useState([]);
    const [organizedEvents, setOrganizedEvents] = useState([]);


    useEffect(() => {
        // Fetch initial 15 events (make sure your API supports this limit query)
        

        // Fetch specific sets of events if the user is logged in
        if (user) {
            getDataEvent(`?attendee=${user._id}`, setJoinedEvents);
            getDataEvent(`?organizer=${user._id}`, setOrganizedEvents);
        }
    }, [user,getDataEvent]);


    const handleSaveChanges = async (values) => {
        console.log('Form values:', values);
        setIsLoading(true)
        try {
            await updateUserProfile(values); // Send updated profile data
            setEditMode(false);
          } catch (error) {
            console.error('Error updating profile:', error);
          } finally {
            setIsLoading(false);
          }
        };



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
    console.log(joinedEvents,organizedEvents,user?.favoritedEvents )
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
