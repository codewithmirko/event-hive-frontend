import classes from "../styles/Content.module.css";

import { useState, useContext } from "react";
import { Input } from "@mantine/core";
import { Link } from "react-router-dom";

import { EventContext } from "../context/EventContext.jsx";

const HomePage = () => {
    const [favoritedEvents, setFavoritedEvents] = useState(new Set());

    const { events } = useContext(EventContext);

    const toggleFavorite = (eventId) => {
        setFavoritedEvents((prev) => {
            const newFavs = new Set(prev);
            if (newFavs.has(eventId)) {
                newFavs.delete(eventId);
            } else {
                newFavs.add(eventId);
            }
            return newFavs;
        });
    };

    // Filter cities based on search term
    const filteredEvents = events.filter((event) =>
        event.eventTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <>
            <p> This is the content page!</p>
            <div className={classes.container}>
                <div className={classes.eventGrid}>
                    {events &&
                        filteredEvents.map((event) => (
                            <div key={event.id} className={classes.eventBlock}>
                                <Link to={`/event/${event.id}`}>
                                    <img
                                        src={event.picture[0].src}
                                        alt={`Image of ${event.eventTitle}`}
                                    ></img>
                                    <div className={classes.eventTitle}>{event.eventTitle}</div>
                                    <div className={classes.description}>{event.description}</div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="40"
                                        height="40"
                                        viewBox="0 0 24 24"
                                        fill={favoritedEvents.has(event.id) ? "red" : "none"}
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className={classes.heartIcon}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            toggleFavorite(event.id);
                                        }}
                                    >
                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                    </svg>
                                </Link>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
};

export default HomePage;
