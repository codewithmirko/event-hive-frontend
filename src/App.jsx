import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
// import '@mantine/dropzone/styles.css';
// import '@mantine/code-highlight/styles.css';
import { Button } from "@mantine/core";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import Header from "./components/Header";
import { EventProvider } from "./context/EventContext";
import FooterBar from "./components/FooterBar";
import EventDetailPage from "./pages/EventDetailPage";
import CreateEventPage from "./pages/CreateEventPage";
import IsPrivate from "./components/IsPrivate";
import UserProfilePage from "./pages/UserProfilePage";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <>
      <Header />
      <EventProvider>
        <Routes>
          <Route path="/event/:eventId" element={<EventDetailPage />} />
          <Route
            path="/event/create"
            element={
              <IsPrivate>
                <CreateEventPage />
              </IsPrivate>
            }
          />
          <Route
            path="/profile"
            element={
              <IsPrivate>
                <UserProfilePage />
              </IsPrivate>
            }
          />
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </EventProvider>
      <FooterBar />
    </>
  );
}

export default App;
