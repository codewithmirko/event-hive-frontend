import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Title } from '@mantine/core';
import EventForm from '../components/EventForm';
import { showNotification } from '@mantine/notifications';
import { EventContext } from '../context/EventContext';
import { AuthContext } from '../context/auth.context';

const ModifyEventPage = () => {
  const { eventId } = useParams();
  const { getDataEvent, updateEvent } = useContext(EventContext);
  const [eventData, setEventData] = useState(null);
  const { setIsLoading, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();  // Use the useNavigate hook


  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        await getDataEvent(`/${eventId}`, setEventData);  // Assume getDataEvent can accept endpoint and setter function
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch event details:", error);
        setIsLoading(false);
        showNotification({
          title: 'Error',
          message: 'Failed to fetch event details',
          color: 'red',
        });
      }
    };

    fetchEventDetails();
  }, [eventId, getDataEvent]);

  const handleFormSubmit = async (updatedData) => {
    try {
      await updateEvent(eventId, updatedData);
      showNotification({
        title: 'Success',
        message: 'Event updated successfully!',
        color: 'green',
      });
      navigate(`/event/${eventId}`);  // Navigate to the event detail page
    } catch (error) {
      console.error("Error updating event:", error);
      showNotification({
        title: 'Error',
        message: 'Failed to update event',
        color: 'red',
      });
    }
  };

  if (isLoading) return <Loader />;

  return (
    <Container size="sm" mt="lg">
      <Title>Edit Event</Title>
      {eventData ? (
        <EventForm onSubmit={handleFormSubmit} initialData={eventData} />
      ) : (
        <Title>No event found to edit.</Title>
      )}
    </Container>
  );
};

export default ModifyEventPage;
