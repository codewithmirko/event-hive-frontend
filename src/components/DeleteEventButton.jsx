import React, { useContext, useState } from "react";
import {
  ActionIcon,
  Modal,
  Text,
  Button,
  useMantineTheme,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { EventContext } from "../context/EventContext";
import { useNavigate } from "react-router-dom";
import classes from "../styles/EventCard.module.css";

const DeleteEventButton = ({ eventId }) => {
  const [opened, setOpened] = useState(false);
  const { deleteEvent, getDataEvent } = useContext(EventContext);
  const theme = useMantineTheme();
  const navigate = useNavigate(); // Hook for navigation
  const handleDelete = async () => {
    try {
      await deleteEvent(eventId);
      setOpened(false);
      getDataEvent();
      navigate("/"); // Redirect user after deletion
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
  };

  return (
    <>
      <ActionIcon
        color="red"
        onClick={() => setOpened(true)}
        className={classes.action}
      >
        <IconTrash
          size={16}
          color={theme.colors.red[7]}
          fill={theme.colors.red[2]}
        />
      </ActionIcon>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Confirm Deletion"
      >
        <Text>Are you sure you want to delete this event?</Text>
        <Button color="red" onClick={handleDelete}>
          Confirm Delete
        </Button>
      </Modal>
    </>
  );
};

export default DeleteEventButton;
