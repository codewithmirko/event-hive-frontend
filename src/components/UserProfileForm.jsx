import React from 'react';
import { TextInput, Button, Group, Paper } from '@mantine/core';
import { useForm } from '@mantine/form';

const UserProfileForm = ({ user, onSave, onCancel }) => {
    const form = useForm({
        initialValues: {
            username: user.username,
            firstName: user.info.firstName,
            lastName: user.info.lastName,
            location: user.info.location,
            age: user.info.age,
            hobbies: user.info.hobbies.join(', '),
            language: user.info.language.join(', ')
        }
    });

    return (
        <Paper shadow="sm" p="md" withBorder>
            <form onSubmit={form.onSubmit(values => onSave(values))}>
                <TextInput label="Username" {...form.getInputProps('username')} />
                <TextInput label="First Name" {...form.getInputProps('firstName')} />
                <TextInput label="Last Name" {...form.getInputProps('lastName')} />
                <TextInput label="Location" {...form.getInputProps('location')} />
                <TextInput label="Age" {...form.getInputProps('age')} type="number" />
                <TextInput label="Hobbies" {...form.getInputProps('hobbies')} />
                <TextInput label="Languages" {...form.getInputProps('language')} />
                <Group position="right" mt="md">
                    <Button type="button" onClick={onCancel}>Cancel</Button>
                    <Button type="submit">Save Changes</Button>
                </Group>
            </form>
        </Paper>
    );
};

export default UserProfileForm;
