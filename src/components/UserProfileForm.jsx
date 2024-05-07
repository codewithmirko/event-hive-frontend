import React from 'react';
import { TextInput, Button, Group, Paper } from '@mantine/core';
import { useForm } from '@mantine/form';

const UserProfileForm = ({ user, onSave, onCancel }) => {
    const form = useForm({
        initialValues: {
            username: user?.username || '',
            info: {
                firstName: user?.info?.firstName || '',
                lastName: user?.info?.lastName || '',
                location: user?.info?.location || '',
                age: user?.info?.age || '',
                hobbies: user?.info?.hobbies?.join(', ') || '',
                language: user?.info?.language?.join(', ') || '',
            }
        }
    });

    const handleFormSubmit = (values) => {
        // Convert hobbies and language back to array
        const updatedValues = {
            ...values,
            info: {
                ...values.info,
                hobbies: values.info.hobbies.split(',').map(hobby => hobby.trim()), // split string into array and trim whitespace
                language: values.info.language.split(',').map(lang => lang.trim())
            }
        };
        onSave(updatedValues);
    };

    return (
        <Paper shadow="sm" p="md" withBorder>
            <form onSubmit={form.onSubmit(handleFormSubmit)}>
                <TextInput label="Username" {...form.getInputProps('username')} />
                <TextInput label="First Name" {...form.getInputProps('info.firstName')} />
                <TextInput label="Last Name" {...form.getInputProps('info.lastName')} />
                <TextInput label="Location" {...form.getInputProps('info.location')} />
                <TextInput label="Age" {...form.getInputProps('info.age')} type="number" />
                <TextInput label="Hobbies" {...form.getInputProps('info.hobbies')} />
                <TextInput label="Languages" {...form.getInputProps('info.language')} />
                <Group position="right" mt="md">
                    <Button type="button" onClick={onCancel}>Cancel</Button>
                    <Button type="submit">Save Changes</Button>
                </Group>
            </form>
        </Paper>
    );
};

export default UserProfileForm;
