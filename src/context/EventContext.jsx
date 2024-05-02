import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

    const getDataEvent = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/events`, {
                headers: {
                    "Cache-Control": "no-cache"
                },
            });
            const allEvents = response.data;
            console.log(allEvents[0])
            setEvents(response.data);
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
                events.map((event) => (event.id === id ? { ...event, ...response.data } : event))
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
        } catch (error) {
            console.error("Error creating event:", error);
        }
    };

    useEffect(() => {
        getDataEvent();
    }, []);

    return (
        <EventContext.Provider value={{ events, updateEvent, deleteEvent, addEvent }}>
            {children}
        </EventContext.Provider>
    );
};


export { EventProvider, EventContext };
