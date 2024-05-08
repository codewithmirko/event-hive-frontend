import React, { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import ModifyEventButton from './ModifyEventButton';
import DeleteEventButton from './DeleteEventButton';

const EventModifier = ({ eventId, organizerId }) => {
    const { user } = useContext(AuthContext);
    console.log(  eventId )
    const isOwner = user?._id === organizerId; // Assuming organizer is stored directly in the event
    
    return (
        <div>
            {isOwner && (
                <>
                    <ModifyEventButton eventId={eventId} />
                    <DeleteEventButton eventId={eventId} />
                </>
            )}
        </div>
    );
};

export default EventModifier;
