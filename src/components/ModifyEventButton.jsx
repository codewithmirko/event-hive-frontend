import React from 'react';
import { ActionIcon, useMantineTheme } from '@mantine/core';
import { IconPencil } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import classes from "../styles/EventCard.module.css";

const ModifyEventButton = ({ eventId }) => {
    const theme = useMantineTheme();
    const navigate = useNavigate();
    const handleModifyClick = () => {
        navigate(`/modify-event/${eventId}`); // Redirects to the modify event page
    };

    return (
        <ActionIcon onClick={handleModifyClick} title="Modify Event" className={classes.action}>
            <IconPencil size={16} 
            color={theme.colors.yellow[6]}/>
        </ActionIcon>
    );
};

export default ModifyEventButton;
