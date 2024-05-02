import React, { useContext } from 'react';
import { Container, Title } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import EventForm from '../components/EventForm';
import { EventContext } from '../context/EventContext';

const CreateEventPage = () => {
  const { addEvent } = useContext(EventContext);

  const handleFormSubmit = async (eventData) => {
    try {
      await addEvent(eventData);
      showNotification({
        title: 'Success',
        message: 'Event created successfully!',
        color: 'green',
      });
    } catch (error) {
      console.error("Error creating event:", error);
      showNotification({
        title: 'Error',
        message: 'Failed to create event',
        color: 'red',
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
