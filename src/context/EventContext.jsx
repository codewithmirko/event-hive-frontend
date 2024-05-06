import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { showNotification } from '@mantine/notifications';
import axios from "axios";

const EventContext = createContext();

const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate(); // Hook for navigation

    // Function to retrieve the auth token from localStorage
    const getToken = () => {
        const storedToken = localStorage.getItem("authToken");
        console.log(`I am the storedToken:`, storedToken);
        console.log("I am the getToken function");
        return storedToken ? `Bearer ${storedToken}` : null;
    };

    // Helper function to create headers
    const authHeader = () => ({
        headers: { 'Authorization': getToken(), 'Content-Type': 'application/json' }
    });

    // Updated to accept optional parameters for filtering and setting state
    const getDataEvent = async (urlPath = '', setState = setEvents) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/events${urlPath}`, {
                headers: {
                    "Cache-Control": "no-cache"
                },
            });
            setState(response.data);
        } catch (error) {
            console.error("Failed to fetch events:", error);
        }
    };


    const updateEvent = async (id, updatedEventData) => {
        try {
            const response = await axios.patch(
                `${import.meta.env.VITE_API_URL}/api/events/${id}`,
                updatedEventData,
                authHeader()
            );
            setEvents(
                events.map((event) => (event._id === id ? { ...event, ...response.data } : event))
            );
            
        } catch (error) {
            console.error("Failed to update event:", error);
        }
    };

    const deleteEvent = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/events/${id}`, authHeader());
            setEvents(events.filter((event) => event.id !== id));
            navigate("/"); // Redirect user after deletion
        } catch (error) {
            console.error("Failed to delete events:", error);
        }
    };

    const addEvent = async (event) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/events/`, event, authHeader());
            setEvents((prevEvents) => [...prevEvents, response.data]);
            navigate(`/event/${response.data._id}`);
        } catch (error) {
            console.error("Error creating event:", error);
        }
    };
    const updateEventParticipation = async (eventId, actionType) => {
        const endpoint = actionType === 'join' ? 'attend' : 'leave';
        const messageSuccess = actionType === 'join' ? 'You have joined the event!' : 'You have left the event!';
        const messageError = actionType === 'join' ? 'Failed to join event' : 'Failed to leave event';
    
        try {
            const response = await axios.patch(`http://localhost:5005/api/events/${eventId}/${endpoint}`, {}, authHeader());
            if (response.data) {
                setEvents(prevEvents => {
                    if (!Array.isArray(prevEvents)) {
                        console.error('Expected an array for prevEvents, received:', prevEvents);
                        return []; // Maintain state integrity
                    }
                    const index = prevEvents.findIndex(event => event._id === eventId);
                    if (index === -1) {
                        console.error('Event not found in the current state');
                        return prevEvents;
                    }
                    const updatedEvents = [...prevEvents];
                    updatedEvents[index] = { ...prevEvents[index], ...response.data };
                    return updatedEvents;
                });
                showNotification({
                    title: 'Success',
                    message: messageSuccess,
                    color: 'green',
                });
            } else {
                throw new Error(`No data returned from ${endpoint} event API`);
            }
        } catch (error) {
            console.error(`Error ${actionType} event:`, error);
            showNotification({
                title: 'Error',
                message: messageError,
                color: 'red',
            });
        }
    };
    
    
    
    
    
    

      
    useEffect(() => {
        getDataEvent();
    }, []);

    return (
        <EventContext.Provider value={{ events, getDataEvent, updateEvent, deleteEvent, addEvent, updateEventParticipation }}>
            {children}
        </EventContext.Provider>
    );
};


export { EventProvider, EventContext };
