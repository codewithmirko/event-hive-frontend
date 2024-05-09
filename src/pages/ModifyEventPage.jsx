import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Title,LoadingOverlay } from "@mantine/core";
import EventForm from "../components/EventForm";
import { EventContext } from "../context/EventContext";
import { AuthContext } from "../context/auth.context";
import CustomNotification from "../components/CustomNotification";

const ModifyEventPage = () => {
  const { eventId } = useParams();
  const { getDataEvent, updateEvent } = useContext(EventContext);
  const [eventData, setEventData] = useState(null);
  const { setIsLoading, isLoading } = useContext(AuthContext);
  const navigate = useNavigate(); // Use the useNavigate hook

  useEffect(() => {
    const fetchEventDetails = async () => {
      setIsLoading(true);
      try {
        await getDataEvent(`/${eventId}`, setEventData); // `setEventData` handles setting the state for single event data
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch event details:", error);
        setIsLoading(false);
        CustomNotification({
          type: "error",
          message: "Failed to fetch event details.",
        });
      }
    };
  
    fetchEventDetails();
}, [eventId]); // This should only include eventId

  

  const handleFormSubmit = async (updatedData) => {
    try {
      await updateEvent(eventId, updatedData);
      CustomNotification({
        type: "success",
        message: `Event updated successfully.`,
      });
      navigate(`/event/${eventId}`); // Navigate to the event detail page
    } catch (error) {
      console.error("Error updating event:", error);
      CustomNotification({
        type: "error",
        message: `Failed to update event.`,
      });
    }
  };

  if (isLoading) {
    return (
        <Container size="sm" mt={50}>
            <LoadingOverlay visible={true} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
        </Container>
    );
}

  return (
    <Container size="sm" mt="lg">
      <Title>Edit Event</Title>
      {eventData ? (
        <EventForm onSubmit={handleFormSubmit} eventId={eventId} />
      ) : (
        <Title>No event found to edit.</Title>
      )}
    </Container>
  );
};

export default ModifyEventPage;
