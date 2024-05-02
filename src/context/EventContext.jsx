import { createContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const EventContext = createContext();
export default EventContext;

export const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([]);

    const fetchDataEvent = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/events`, {
                headers: {
                    "Cache-Control": "no-cache",
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setEvents(data);
        } catch (error) {
            console.error("Failed to fetch events:", error);
        }
    };

    const updateEvent = async (id, updatedEventData) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/events/${id}`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedCityData),
                }
            );
            if (!response.ok)
                throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            setEvents(
                events.map((event) => (event.id === id ? { ...event, ...data } : event))
            );
        } catch (error) {
            console.error("Failed to update event:", error);
        }
    };

    const deleteEvent = async (id) => {
        try {
            await fetch(`${import.meta.env.VITE_API_URL}/events/${id}`, {
                method: "DELETE",
            });
            setEvents(events.filter((event) => event.id !== id));
            Navigate("/"); // Redirect user after deletion
        } catch (error) {
            console.error("Failed to delete events:", error);
        }
    };

    const addEvent = async (event) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/events/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(city),
            });
            if (!response.ok) throw new Error("Failed to create new event");
            const newEvent = await response.json();
            setEvents((prevEvents) => [...prevEvents, newEvent]); // Assuming you have a state `events` that tracks your events
        } catch (error) {
            console.error("Error creating event:", error);
        }
    };

    useEffect(() => {
        fetchDataEvent();
    }, []);

    return (
        <EventContext.Provider value={{ events, updateEvent, deleteEvent, addEvent }}>
            {children}
        </EventContext.Provider>
    );
};
