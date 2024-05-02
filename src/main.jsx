import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProviderWrapper } from "./context/auth.context";
import { EventProvider } from "./context/EventContext.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { createTheme, MantineProvider } from "@mantine/core";
import { Notifications  } from '@mantine/notifications';
import App from "./App.jsx";

const theme = createTheme({
  /** Put your mantine theme override here */
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
    <Notifications />
      <Router>
        <AuthProviderWrapper>
          <EventProvider>
          <App />
          </EventProvider>
        </AuthProviderWrapper>
      </Router>
    </MantineProvider>
  </React.StrictMode>
);
