import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomNotification from "../components/CustomNotification";
import axios from "axios";

const EventContext = createContext();

const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEvents, setTotalEvents] = useState(0);
  const pageSize = 15;  // Define how many items per page you want
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
    headers: { Authorization: getToken(), "Content-Type": "application/json" },
  });

  // Updated to accept optional parameters for filtering and setting state
// Updated to accept currentPage for pagination

const getDataEvent = async (urlPath = "", setState = setEvents, setTotal = setTotalEvents, currentPage = 1) => {
  const baseUrl = `${import.meta.env.VITE_API_URL}/api/events`;
  const isSingleEvent = urlPath.startsWith("/"); // Check if fetching a single event

  let url = baseUrl;
  if (isSingleEvent) {
    url += urlPath; // For single event, urlPath would be "/{eventId}"
  } else {
    const offset = (currentPage - 1) * pageSize; // Calculate offset based on current page
    let queryParams = new URLSearchParams(urlPath); // Assume urlPath includes query string if any
    queryParams.set('limit', pageSize); // Set limit for pagination
    queryParams.set('offset', offset); // Set offset for pagination
    url += `?${queryParams.toString()}`; // For multiple events
  }

  try {
    const response = await axios.get(url, {
      headers: { "Cache-Control": "no-cache" },
    });

    if (isSingleEvent) {
      setState(response.data); // Assuming the response will be a single event object
    } else {
      setState(response.data.events);
      setTotal?.(response.data.total);
    }
  } catch (error) {
    console.error(`Failed to fetch ${isSingleEvent ? "event" : "events"}:`, error);
  }
};


const handlePageChange = (page) => {
  setCurrentPage(page);
  getDataEvent("", setEvents, setTotalEvents, page);  // No filters, just pagination
};


  const updateEvent = async (id, updatedEventData) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/events/${id}`,
        updatedEventData,
        authHeader()
      );
      setEvents(
        events.map((event) =>
          event._id === id ? { ...event, ...response.data } : event
        )
      );
    } catch (error) {
      console.error("Failed to update event:", error);
    }
  };

  const deleteEvent = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/events/${id}`,
        authHeader()
      );
      setEvents(events.filter((event) => event.id !== id));
      navigate("/"); // Redirect user after deletion
    } catch (error) {
      console.error("Failed to delete events:", error);
    }
  };

  const addEvent = async (event) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/events/`,
        event,
        authHeader()
      );
      setEvents((prevEvents) => [...prevEvents, response.data]);
      navigate(`/event/${response.data._id}`);
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };
  const updateEventParticipation = async (eventId, actionType) => {
    const endpoint = actionType === "join" ? "attend" : "leave";
    const messageSuccess =
      actionType === "join"
        ? "You have joined the event!"
        : "You have left the event!";
    const messageError =
      actionType === "join" ? "Failed to join event" : "Failed to leave event";

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/events/${eventId}/${endpoint}`,
        {},
        authHeader()
      );
      if (response.data) {
        setEvents((prevEvents) => {
          if (!Array.isArray(prevEvents)) {
            console.error(
              "Expected an array for prevEvents, received:",
              prevEvents
            );
            return []; // Maintain state integrity
          }
          const index = prevEvents.findIndex((event) => event._id === eventId);
          if (index === -1) {
            console.error("Event not found in the current state");
            return prevEvents;
          }
          const updatedEvents = [...prevEvents];
          updatedEvents[index] = { ...prevEvents[index], ...response.data };
          return updatedEvents;
        });
        CustomNotification({
          type: "success",
          message: messageSuccess,
        });
      } else {
        throw new Error(`No data returned from ${endpoint} event API`);
      }
    } catch (error) {
      console.error(`Error ${actionType} event:`, error);
      CustomNotification({
        type: "success",
        message: messageError,
      });
    }
  };

  useEffect(() => {
    getDataEvent();
  }, []);

  // This effect will trigger when currentPage changes, calling getDataEvent with new page
useEffect(() => {
  getDataEvent("", setEvents, setTotalEvents, currentPage);
}, [currentPage]);


  return (
    <EventContext.Provider
      value={{
        events,
        currentPage,
        totalEvents,
        pageSize,
        handlePageChange,
        getDataEvent,
        updateEvent,
        deleteEvent,
        addEvent,
        updateEventParticipation,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export { EventProvider, EventContext };
