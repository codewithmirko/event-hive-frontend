import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Title,LoadingOverlay } from "@mantine/core";
import EventForm from "../components/EventForm";
import { EventContext } from "../context/EventContext";
import { AuthContext } from "../context/auth.context";
import CustomNotification from "../components/CustomNotification";

const ModifyEventPage = () => {
  const { eventId } = useParams();
  const {  updateEvent } = useContext(EventContext);
  const { isLoading } = useContext(AuthContext);
  const navigate = useNavigate(); // Use the useNavigate hook


  

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
      {eventId ? (
        <EventForm onSubmit={handleFormSubmit} eventId={eventId} />
      ) : (
        <Title>No event found to edit.</Title>
      )}
    </Container>
  );
};

export default ModifyEventPage;
