import { useState, useContext } from "react";
import { useMantineTheme } from "@mantine/core";

import { EventContext } from "../context/EventContext.jsx";
import HeroSection from "../components/HeroSection.jsx";
import EventGrid from "../components/EventGrid.jsx";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [favoritedEvents, setFavoritedEvents] = useState(new Set());

  const { events } = useContext(EventContext);
  const theme = useMantineTheme();

  const searchHandler = (string) => {
    setSearchTerm(string.toLowerCase());
  };

  // const toggleFavorite = (eventId) => {
  //   setFavoritedEvents((prev) => {
  //     const newFavs = new Set(prev);
  //     if (newFavs.has(eventId)) {
  //       newFavs.delete(eventId);
  //     } else {
  //       newFavs.add(eventId);
  //     }
  //     return newFavs;
  //   });
  // };

  const filteredEvents = events.filter((event) =>
    (event.eventname?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <HeroSection />
      <EventGrid />
    </>
  );
};

export default HomePage;
