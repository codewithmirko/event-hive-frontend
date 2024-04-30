import "@mantine/core/styles.css";
import { Button } from "@mantine/core";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import NavBar from "./components/Navbar";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
