import React, { useContext } from 'react';
import { Container, Title } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import EventForm from '../components/EventForm';
import { EventContext } from '../context/EventContext';
import { AuthContext } from '../context/auth.context';

const CreateEventPage = () => {
  const { addEvent } = useContext(EventContext);
  const { setIsLoading, isLoading } = useContext(AuthContext);

  const handleFormSubmit = async (eventData) => {
    setIsLoading(true)
    try {
      await addEvent(eventData);
      showNotification({
        title: 'Success',
        message: 'Event created successfully!',
        color: 'green',
      });
      setIsLoading(false);
    } catch (error) {
      console.error("Error creating event:", error);
      showNotification({
        title: 'Error',
        message: 'Failed to create event',
        color: 'red',
      })
      .finally(() => {
        setIsLoading(false);  // Reset loading state regardless of the outcome
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
