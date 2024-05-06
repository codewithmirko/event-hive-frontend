import {  useContext } from "react";

import { EventContext } from "../context/EventContext.jsx";
import HeroSection from "../components/HeroSection.jsx";
import EventGrid from "../components/EventGrid.jsx";

const HomePage = () => {


  const { events } = useContext(EventContext);


  return (
    <>
      <HeroSection />
      <EventGrid events={events} />
    </>
  );
};

export default HomePage;
