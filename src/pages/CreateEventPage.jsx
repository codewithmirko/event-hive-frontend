import React, { useContext } from "react";
import { Container, Title } from "@mantine/core";
import EventForm from "../components/EventForm";
import { EventContext } from "../context/EventContext";
import { AuthContext } from "../context/auth.context";
import CustomNotification from "../components/CustomNotification";

const CreateEventPage = () => {
  const { addEvent } = useContext(EventContext);
  const { setIsLoading, isLoading } = useContext(AuthContext);

  const handleFormSubmit = async (eventData) => {
    setIsLoading(true);
    try {
      await addEvent(eventData);
      CustomNotification({
        type: "success",
        message: `Event created succesfully.`,
      });
      setIsLoading(false);
    } catch (error) {
      console.error("Error creating event:", error);
      CustomNotification({
        type: "success",
        message: `Failed to create event.`,
      }).finally(() => {
        setIsLoading(false); // Reset loading state regardless of the outcome
      });
    }
  };

  return (
    <Container size="sm" mt="lg">
      <Title>Create New Event</Title>
      <EventForm onSubmit={handleFormSubmit} />
    </Container>
  );
};

export default CreateEventPage;
