import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { Container, Title, LoadingOverlay } from '@mantine/core';
import UserDetails from '../components/UserDetails';
import UserProfileForm from '../components/UserProfileForm';

const UserProfilePage = () => {
    const { user, isLoading } = useContext(AuthContext);
    const [editMode, setEditMode] = useState(false);

    const handleSaveChanges = (values) => {
        console.log('Form values:', values);
        // Here, implement the logic to send data to the server
        // After successful update, you might want to call a method to refresh user info
        setEditMode(false);
    };

    if (isLoading) {
        return (
            <Container size="sm" mt={50}>
                <LoadingOverlay visible={true} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            </Container>
        );
    }

    if (!user) {
        return (
            <Container size="sm" mt={50}>
                <Title align="center">User not found</Title>
            </Container>
        );
    }

    return (
        <Container size="sm" mt={50}>
            <Title align="center">User Profile</Title>
            {!editMode ? (
                <UserDetails user={user} onEdit={() => setEditMode(true)} />
            ) : (
                <UserProfileForm user={user} onSave={handleSaveChanges} onCancel={() => setEditMode(false)} />
            )}
        </Container>
    );
};

export default UserProfilePage;
