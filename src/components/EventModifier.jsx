import React, { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import ModifyEventButton from './ModifyEventButton';
import DeleteEventButton from './DeleteEventButton';

const EventModifier = ({ eventId, organizerId }) => {
    const { user } = useContext(AuthContext);
    const isOwner = user?._id === organizerId; // Assuming organizer is stored directly in the event
    const isAdmin = user?.userType === 'admin';
    
    return (
        <div>
            {(isOwner || isAdmin) && (
                <>
                    <ModifyEventButton eventId={eventId} />
                    <DeleteEventButton eventId={eventId} />
                </>
            )}
        </div>
    );
};

export default EventModifier;
