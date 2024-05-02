import "@mantine/core/styles.css";
import { Button } from "@mantine/core";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import Header from "./components/Header";
import { EventProvider } from "./context/EventContext";
import FooterBar from "./components/FooterBar";

function App() {
  return (
    <>
      <Header />
      <EventProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </EventProvider>
      <FooterBar />
    </>
  );
}

export default App;
