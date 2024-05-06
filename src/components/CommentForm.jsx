import React, { useContext, useState } from 'react';
import { TextInput, Button, Stack } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';
import { AuthContext } from '../context/auth.context';
import axios from 'axios';
import SignIn from "./SignIn";
import SignUp from "./SignUp";

function CommentForm({ eventId, fetchComments }) {
    const [newComment, setNewComment] = useState('');
    const { user } = useContext(AuthContext);
    const BACKEND_URL = import.meta.env.VITE_API_URL;
    const [signInOpened, { open: openSignIn, close: closeSignIn }] = useDisclosure(false);
    const [signUpOpened, { open: openSignUp, close: closeSignUp }] = useDisclosure(false);

    const handleSignIn = () => {
        openSignIn();
        closeSignUp();
    };

    const handleSignUp = () => {
        openSignUp();
        closeSignIn();
    };

    const postComment = async () => {
        if (!user) {
            handleSignIn(); // Open the sign-in modal if the user is not logged in
            showNotification({
                title: 'Unauthorized',
                message: 'You must be logged in to post comments.',
                color: 'red',
            });
            return;
        }

        try {
            console.log('posting', newComment)
            const response = await axios.post(`${BACKEND_URL}/api/comments/`, {
                commentText: newComment,
                eventId: eventId,
                commenter: user._id,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    'Content-Type': 'application/json',
                },
            });

            setNewComment('');
            fetchComments(); // Re-fetch comments to include the new one
            showNotification({
                title: 'Success',
                message: 'Comment added successfully.',
                color: 'green',
            });
        } catch (error) {
            console.log(error)
            showNotification({
                title: 'Error',
                message: error.response ? error.response.data.message : 'Failed to post comment.',
                color: 'red',
            });
        }
    };

    return (
        <>
        <Stack>
            <TextInput
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(event) => event.key === "Enter" && postComment()}
            />
            <Button type="submit" onClick={postComment}>
                Post Comment
            </Button>
        </Stack>
         <SignIn opened={signInOpened} toggleSignUp={handleSignUp} close={closeSignIn} />
         <SignUp opened={signUpOpened} toggleSignIn={handleSignIn} close={closeSignUp} />
         </>
    );
}

export default CommentForm;
