import React from 'react';
import { Text, Button, Paper } from '@mantine/core';

const UserDetails = ({ user, onEdit }) => {
    return (
        <Paper shadow="sm" p="md" withBorder>
            <Text size="sm">Username: {user.username}</Text>
            <Text size="sm">Email: {user.email}</Text>
            <Text size="sm">First Name: {user.info.firstName}</Text>
            <Text size="sm">Last Name: {user.info.lastName}</Text>
            <Text size="sm">Location: {user.info.location}</Text>
            <Text size="sm">Age: {user.info.age}</Text>
            <Text size="sm">Hobbies: {user.info.hobbies.join(', ')}</Text>
            <Text size="sm">Languages: {user.info.language.join(', ')}</Text>
            <Button mt="md" onClick={onEdit}>Edit Profile</Button>
        </Paper>
    );
};

export default UserDetails;
