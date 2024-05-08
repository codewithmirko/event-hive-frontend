import React from 'react';
import { ActionIcon } from '@mantine/core';
import { IconPencil } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const ModifyEventButton = ({ eventId }) => {
    const navigate = useNavigate();
    const handleModifyClick = () => {
        navigate(`/modify-event/${eventId}`); // Redirects to the modify event page
    };

    return (
        <ActionIcon onClick={handleModifyClick} title="Modify Event">
            <IconPencil size={16} />
        </ActionIcon>
    );
};

export default ModifyEventButton;
