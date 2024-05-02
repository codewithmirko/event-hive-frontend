import "@mantine/core/styles.css";
import { Button } from "@mantine/core";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import Header from "./components/Header";
import ContentPage from "./pages/ContentPage";
import { EventProvider } from "./context/EventContext";

function App() {
  return (
    <>
      <Header />
      <EventProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/content" element={<ContentPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </EventProvider>
    </>
  );
}

export default App;
