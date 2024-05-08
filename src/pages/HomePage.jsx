// pages/HomePage.jsx
import React, { useContext, useEffect } from 'react';
import { EventContext } from '../context/EventContext';
import EventGrid from '../components/EventGrid';
import HeroSection from "../components/HeroSection.jsx";
import PaginationControls from '../components/PaginationControls';

const HomePage = () => {
    const { events, currentPage, totalEvents, handlePageChange, pageSize } = useContext(EventContext);
    useEffect(() => {
        // Initial fetch is handled within the context when the component mounts
    }, []);

    return (
        <>
              <HeroSection />

            <EventGrid events={events} />
            <PaginationControls 
  currentPage={currentPage} 
  onPageChange={handlePageChange} 
  total={totalEvents} 
  pageSize={pageSize} 
/>
        </>
    );
};

export default HomePage;
