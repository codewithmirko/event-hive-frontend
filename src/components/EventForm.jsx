import { Button, TextInput, Textarea, Select, Group,Card } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications'; // ???
// Import Mantine core styles



const EventForm = ({ onSubmit, initialData = {} }) => {
  const form = useForm({
    initialValues: {
      eventname: '',
      description: '',
      photo: '',
      location: '',
      date: new Date(),
      eventType: '',
      ...initialData
    },
    validate: {
      eventname: (value) => (value ? null : 'Event name is required'),
      location: (value) => (value ? null : 'Location is required'),
    },
  });

  const handleSubmit = (values) => {
    onSubmit(values);
  };

    return (
    <Card shadow="sm" padding="lg" radius="md">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          required
          label="Event Name"
          placeholder="Enter event name"
          {...form.getInputProps('eventname')}
        />
        <Textarea
          label="Description"
          placeholder="Describe the event"
          {...form.getInputProps('description')}
        />
        <TextInput
          label="Photo URL"
          placeholder="http://example.com/photo.jpg"
          {...form.getInputProps('photo')}
        />
        <TextInput
          required
          label="Location"
          placeholder="Enter event location"
          {...form.getInputProps('location')}
        />
        <DatePickerInput
          label="Event Date"
          placeholder="Pick date"
          {...form.getInputProps('date')}
        />
        <Select
        
          label="Event Type"
          placeholder="Select event type"
          data={['Conference', 'Meetup', 'Seminar', 'Workshop']}
          {...form.getInputProps('eventType')}
        />
        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Card>
  );
};

export default EventForm;
