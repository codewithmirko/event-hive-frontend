import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { createTheme, MantineProvider } from "@mantine/core";
import App from "./App.jsx";
const theme = createTheme({
  /** Put your mantine theme override here */
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </MantineProvider>
  </React.StrictMode>
);
