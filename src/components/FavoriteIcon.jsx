import { useState, useContext, useEffect } from "react";
import { IconBookmark, IconHeart, IconShare } from "@tabler/icons-react";
import classes from "../styles/EventCard.module.css";
import { AuthContext } from "../context/auth.context"
import axios from "axios";
import CustomNotification from "./CustomNotification";

import {
    Paper,
    Text,
    Title,
    Button,
    useMantineTheme,
    rem,
} from "@mantine/core";

function FavoriteIcon({
    eventId
}) {
    const { user, setIsLoading, fetchUserDetails } = useContext(AuthContext); // Access user from AuthContext
    const [favoritedEvents, setFavoritedEvents] = useState(new Set());


    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        // This will only run once when the component mounts or when user changes
        if (user) {
            setFavoritedEvents(new Set(user?.favoritedEvents || []));
        }
    }, [user]); // Dependency array ensures effect runs only when user changes

    console.log("User: ", user);

    // const rem = (size) => `${size}rem`;
    const theme = useMantineTheme();


    const favoriteAdd = ((userId, eventId) => {
        setIsLoading(true)

        const storedToken = localStorage.getItem("authToken");

        // Early exit if no token is found in localStorage
        if (!storedToken) {
            logOutUser("info", "No session found, please log in.");
            return; // Stop execution of the function here
        }


        axios
            .patch(`${API_URL}/auth/favorite-add`, { userId, eventId }, {
                headers: {
                    Authorization: `Bearer ${storedToken}`
                }
            }).
            then(() => {
                CustomNotification({
                    type: "success",
                    message: "Added to the favorites successfully!",
                }
                );
                setFavoritedEvents((prev) => new Set(prev.add(eventId)));
            })
            .catch((error) => {
                CustomNotification({
                    type: "error",
                    message: error.response
                        ? error.response.data.message
                        : "Failed to added to the favorites",
                });
            })
            .finally(() => {
                fetchUserDetails();
                setIsLoading(false); // Reset loading state regardless of the outcome
            });

    });

    const favoriteDelete = ((userId, eventId) => {
        setIsLoading(true)
        const storedToken = localStorage.getItem("authToken");
        if (!storedToken) {
            console.error("No session found, please log in.");
            return;
        }
        axios
            .patch(`${API_URL}/auth/favorite-remove`, { userId, eventId }, {
                headers: {
                    Authorization: `Bearer ${storedToken}`
                }
            })
            .then(() => {
                CustomNotification({
                    type: "success",
                    message: "Added to the favorites successfully!",
                }
                );
                setFavoritedEvents((prev) => new Set(prev.add(eventId)));
            })
            .catch((error) => {
                CustomNotification({
                    type: "error",
                    message: error.response
                        ? error.response.data.message
                        : "Failed to added to the favorites",
                });
            })
            .finally(() => {
                fetchUserDetails();
                setIsLoading(false); // Reset loading state regardless of the outcome
            });
    })

    const toggleFavorite = (eventId) => {
        if (favoritedEvents?.has(eventId)) {
            favoriteDelete(user.userId, eventId);
            cons
        } else {
            favoriteAdd(user.userId, eventId);
        }
    };

    return (<>
        {(user && favoritedEvents) ? <IconHeart
            style={{ width: rem(16), height: rem(16) }}
            color={theme.colors.red[6]}
            fill={favoritedEvents?.has(eventId) ? "red" : "none"}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite(eventId);
            }}
        /> : <IconHeart
            style={{ width: rem(16), height: rem(16) }}
            color={theme.colors.red[6]}
            fill={"none"}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite(eventId);
            }}
        />}
    </>);
}

export default FavoriteIcon;