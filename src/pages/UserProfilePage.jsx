import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/auth.context';
import { Container, Title, LoadingOverlay, Text, Card } from '@mantine/core';
import UserDetails from '../components/UserDetails';
import UserProfileForm from '../components/UserProfileForm';
import { EventContext } from '../context/EventContext';
import EventGrid from "../components/EventGrid.jsx";
import axios from 'axios';


const UserProfilePage = () => {
    const { user, isLoading, setIsLoading, fetchUserDetails, updateUserProfile } = useContext(AuthContext);
    const { getDataEvent } = useContext(EventContext)
    const [editMode, setEditMode] = useState(false);
    const [joinedEvents, setJoinedEvents] = useState([]);
    const [organizedEvents, setOrganizedEvents] = useState([]);
    const [favoritedEvents, setFavoritedEvents ] = useState([])

const fetchFavoriteEvents = React.useCallback(async (eventIds) => {
    const idsParam = eventIds.join(',');
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/events/by-ids?ids=${idsParam}`, {
            headers: { "Cache-Control": "no-cache" },
        });
        return response.data; // Returns an array of event objects
    } catch (error) {
        console.error("Failed to fetch favorite events:", error);
        return []; // Return empty array on error to prevent application crash
    }
}, []); // No dependencies means this function is created once per component instance


const loadEvents = async () => {
    if (user) {
        const attendeesPromise = getDataEvent(`?attendee=${user._id}`, setJoinedEvents);
        const organizersPromise = getDataEvent(`?organizer=${user._id}`, setOrganizedEvents);
        await Promise.all([attendeesPromise, organizersPromise]);

        if (user.favoritedEvents && user.favoritedEvents.length > 0) {
            const favoriteEvents = await fetchFavoriteEvents(user.favoritedEvents);
            setFavoritedEvents(favoriteEvents);
        }
    }
};


    useEffect(() => {
        loadEvents();
    }, [user?._id]);


    const handleSaveChanges = async (values) => {
        // console.log('Form values:', values);
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

    const MemoizedEventGrid = React.memo(EventGrid);

    return (
        <Container size="md" mt={50}>
            <Title align="center">User Profile</Title>
            {!editMode ? (
                <UserDetails user={user} onEdit={() => setEditMode(true)} />
            ) : (
                <UserProfileForm user={user} onSave={handleSaveChanges} onCancel={() => setEditMode(false)} />
            )}
            <>
                <MemoizedEventGrid title="Joined Events" events={joinedEvents} />
                <MemoizedEventGrid title="Organized Events" events={organizedEvents} />
                <EventGrid title="Favorited Events" events={favoritedEvents} />
            </>
        </Container>
    );
    
};

export default UserProfilePage;
