import classes from "../styles/EventCard.module.css";
import React, { useState, useEffect, useContext } from 'react';
import { IconHeart } from '@tabler/icons-react';
import { AuthContext } from '../context/auth.context';
import axios from 'axios';
import CustomNotification from './CustomNotification';
import { ActionIcon, useMantineTheme, rem } from '@mantine/core';

function FavoriteIcon({ eventId }) {
    const { user } = useContext(AuthContext);
    const [isFavorited, setIsFavorited] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL;
    const [token, setToken] = useState('');
    const theme = useMantineTheme();

    useEffect(() => {
        // Check if the event is favorited when the component mounts or user changes
        setIsFavorited(user?.favoritedEvents?.includes(eventId));
    }, [user?.favoritedEvents, eventId]);  // Only depend on favoritedEvents and eventId

   

useEffect(() => {
    setToken(localStorage.getItem("authToken"));
}, [user]);

const handleFavoriteToggle = async () => {
    const newFavoritedStatus = !isFavorited;
    setIsFavorited(newFavoritedStatus);  // Optimistically update the UI

    try {
        await axios.patch(`${API_URL}/auth/favorite-${newFavoritedStatus ? 'add' : 'remove'}`, {
            userId: user._id,
            eventId
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        CustomNotification({
            type: "success",
            message: `Event ${newFavoritedStatus ? 'added to' : 'removed from'} favorites successfully!`,
        });
    } catch (error) {
        setIsFavorited(!newFavoritedStatus); // Revert on failure
        CustomNotification({
            type: "error",
            message: error.response?.data.message || `Failed to ${newFavoritedStatus ? 'add' : 'remove'} event from favorites`,
        });
    }
};


    return (
        <ActionIcon className={classes.action}
        onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleFavoriteToggle();
        }}>
            <IconHeart
                style={{ width: rem(16), height: rem(16) }}
                className={classes.iconStyle}
                color={theme.colors.red[6]}
                fill={isFavorited ? "red" : "none"}

            />
        </ActionIcon>
    );
}

export default FavoriteIcon;
