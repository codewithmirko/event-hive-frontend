import {
  Button,
  TextInput,
  Textarea,
  Select,
  Group,
  Card,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
// Import Mantine core styles

const EventForm = ({ onSubmit, initialData = {} }) => {
  // Ensure date is a Date object
  const safeInitialData = {
    ...initialData,
    date: new Date(initialData.date || Date.now()), // Convert date to Date object if it's not already
  };

  const form = useForm({
    initialValues: {
      eventname: "",
      description: "",
      photo: "",
      location: "",
      date: new Date(),
      eventType: "",
      ...safeInitialData,
    },
    validate: {
      eventname: (value) => (value ? null : "Event name is required"),
      location: (value) => (value ? null : "Location is required"),
    },
  });
  const handleSubmit = (values) => {
    // Ensure date is in the right format or manipulate as needed before submitting
    const preparedValues = {
      ...values,
      date: values.date.toISOString(), // Ensure date is submitted as a string in ISO format
    };
    onSubmit(preparedValues);
  };

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
          data={["Conference", "Meetup", "Seminar", "Workshop"]}
          {...form.getInputProps("eventType")}
        />
        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Card>
  );
};

export default EventForm;
