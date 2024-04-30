import "@mantine/core/styles.css";
import { Button } from "@mantine/core";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
