import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  TextInput,
  Textarea,
  Select,
  Group,
  Card,
  Loader,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { EventContext } from "../context/EventContext";

const EventForm = ({ onSubmit, eventId }) => {
  const { getDataEvent } = useContext(EventContext);

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      eventname: "",
      description: "",
      photo: "",
      location: "",
      date: new Date(),
      eventType: "",
    },
    validate: {
      eventname: (value) => (value ? null : "Event name is required"),
      location: (value) => (value ? null : "Location is required"),
    },
  });

  useEffect(() => {
    if (eventId) {
      getDataEvent(
        `/${eventId}`,
        (data) => {
          if (data) {
            // console.log('getting data')
            const date = data.date ? new Date(data.date) : new Date(); // Safeguard if date is undefined
            form.setValues({ ...data, date });
          } else {
            throw new Error("No data returned for event");
          }
        },
        null,
        null
      ) // Only pass the setState function
        .catch((error) => {
          console.error("Failed to fetch event details:", error);
          setError("Failed to fetch event details.");
        });
    }
  }, []);

  const handleSubmit = (values) => {
    const preparedValues = {
      ...values,
      date: values.date.toISOString(),
    };
    onSubmit(preparedValues);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (error) return <div>{error}</div>;

  return (
    <Card shadow="sm" padding="lg" radius="md">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          required
          label="Event Name"
          placeholder="Enter event name"
          {...form.getInputProps("eventname")}
        />
        <Textarea
          label="Description"
          placeholder="Describe the event"
          {...form.getInputProps("description")}
        />
        <TextInput
          label="Photo URL"
          placeholder="http://example.com/photo.jpg"
          {...form.getInputProps("photo")}
        />
        <TextInput
          required
          label="Location"
          placeholder="Enter event location"
          {...form.getInputProps("location")}
        />
        <DatePickerInput
          label="Event Date"
          placeholder="Pick date"
          {...form.getInputProps("date")}
        />
        <Select
          label="Event Type"
          placeholder="Select event type"
          data={[
            "Conference",
            "Meetup",
            "Seminar",
            "Workshop",
            "Social Gathering",
            "Networking Event",
            "Symposium",
            "Concert",
            "Party",
            "Festival",
            "Club Night",
            "Themed Party",
            "House Party",
            "Outdoor Event",
            "Cultural Celebration",
            "Flex Work",
            "Sport",
            "Silent Disco",
          ]}
          searchable
          {...form.getInputProps("eventType")}
        />
        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
          <Button type="button" color="gray" onClick={handleCancel}>
            Cancel
          </Button>
        </Group>
      </form>
    </Card>
  );
};

export default EventForm;
