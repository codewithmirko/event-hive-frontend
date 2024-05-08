import { useState, useContext, useEffect } from "react";
import { IconHeart } from "@tabler/icons-react";
import classes from "../styles/EventCard.module.css";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import CustomNotification from "./CustomNotification";
import { useMantineTheme, rem } from "@mantine/core";

function FavoriteIcon({ eventId }) {
    const { user, setIsLoading, fetchUserDetails } = useContext(AuthContext);
    const [favoritedEvents, setFavoritedEvents] = useState(new Set());
    const API_URL = import.meta.env.VITE_API_URL;
    const theme = useMantineTheme();

    useEffect(() => {
        if (user) {
            setFavoritedEvents(new Set(user?.favoritedEvents || []));
        }
    }, [user]);

    const handleFavoriteToggle = async (userId, eventId, isAdding) => {
        setIsLoading(true);
        const storedToken = localStorage.getItem("authToken");

        if (!storedToken) {
            console.error("No session found, please log in.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.patch(`${API_URL}/auth/favorite-${isAdding ? 'add' : 'remove'}`, { userId, eventId }, {
                headers: { Authorization: `Bearer ${storedToken}` }
            });

            CustomNotification({
                type: "success",
                message: `Event ${isAdding ? 'added to' : 'removed from'} favorites successfully!`,
            });

            setFavoritedEvents(prev => {
                const newSet = new Set(prev);
                if (isAdding) {
                    newSet.add(eventId);
                } else {
                    newSet.delete(eventId);
                }
                return newSet;
            });
        } catch (error) {
            CustomNotification({
                type: "error",
                message: error.response?.data.message || `Failed to ${isAdding ? 'add' : 'remove'} event from favorites`,
            });
        } finally {

            setIsLoading(false);
            fetchUserDetails(storedToken);
        }
    };

    return (
        <IconHeart
            style={{ width: rem(16), height: rem(16) }}
            className={classes.iconStyle} // Assuming you have some CSS to apply
            color={theme.colors.red[6]}
            fill={favoritedEvents.has(eventId) ? "red" : "none"}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleFavoriteToggle(user.userId, eventId, !favoritedEvents.has(eventId));
            }}
        />
    );
}

export default FavoriteIcon;
