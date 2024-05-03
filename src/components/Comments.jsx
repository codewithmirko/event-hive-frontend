import React, { useState, useEffect, useContext } from "react";
import { TextInput, Button, Stack, Text } from "@mantine/core";
import { AuthContext } from "../context/auth.context";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import Message from "./Message";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { useDisclosure } from "@mantine/hooks";

function Comments({ eventId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { user } = useContext(AuthContext);
  const BACKEND_URL = import.meta.env.VITE_API_URL;

  const [signInOpened, { open: signInOpen, close: signInClose }] =
    useDisclosure(false);
  const [signUpOpened, { open: signUpOpen, close: signUpClose }] =
    useDisclosure(false);

  const handleSignIn = () => {
    signUpClose(); // Close the Sign Up modal if open
    signInOpen(); // Open the Sign In modal
  };

  const handleSignUp = () => {
    signInClose(); // Close the Sign In modal if open
    signUpOpen(); // Open the Sign Up modal
  };

  // Helper function to create headers with the authorization token
  const authHeader = () => {
    const token = localStorage.getItem("authToken");
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
        "Content-Type": "application/json",
      },
    };
  };

  async function handleCommentAPI(method, endpoint, data = {}) {
    try {
      const response = await axios({
        method: method,
        url: `${BACKEND_URL}/api/comments${endpoint}`,
        headers: authHeader().headers,
        data: data,
      });
      return response.data; // Directly return data from axios response
    } catch (error) {
      console.error(`Error during ${method} API call at ${endpoint}:`, error);
      throw error; // Re-throw error to be handled by the calling function
    }
  }

  const fetchComments = async () => {
    try {
      const data = await handleCommentAPI("get", `/event/${eventId}`);
      setComments(data);
    } catch (err) {
      console.error("Error retrieving comments:", err);
      showNotification({
        title: "Error",
        message: "Failed to retrieve comments.",
        color: "red",
      });
    }
  };

  useEffect(() => {
    fetchComments();
  }, [eventId]); // Dependency array ensures it runs only when eventId changes

  const postComment = async () => {
    if (!user) {
      handleSignIn();
      showNotification({
        title: "Unauthorized",
        message: "You must be logged in to post comments.",
        color: "red",
      });
      return;
    }

    try {
      await handleCommentAPI("post", "/", {
        commentText: newComment,
        eventId,
        commenter: user._id,
      });
      setNewComment("");
      fetchComments(); // Re-fetch comments to include the new one with populated data
      showNotification({
        title: "Success",
        message: "Comment added successfully.",
        color: "green",
      });
    } catch {
      showNotification({
        title: "Error",
        message: "Failed to post comment.",
        color: "red",
      });
    }
  };

  const deleteComment = async (commentId) => {
    if (!user) {
      showNotification({
        title: "Unauthorized",
        message: "You must be logged in to delete comments.",
        color: "red",
      });
      return;
    }

    try {
      await handleCommentAPI("delete", `/${commentId}`);
      fetchComments(); // Re-fetch comments to ensure the state matches the database after deletion
      showNotification({
        title: "Success",
        message: "Comment deleted successfully.",
        color: "green",
      });
    } catch {
      showNotification({
        title: "Error",
        message: "Failed to delete comment.",
        color: "red",
      });
    }
  };

  return (
    <>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <Message
            key={comment._id}
            comment={comment}
            isOwner={user?._id === comment.commenter?._id}
            onDelete={() => deleteComment(comment._id)}
          />
        ))
      ) : (
        <Text>No comments yet.</Text>
      )}
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
      <SignIn
        opened={signInOpened}
        toggleSignUp={handleSignUp}
        close={signInClose}
      />
      <SignUp
        opened={signUpOpened}
        toggleSignIn={handleSignIn}
        close={signUpClose}
      />
    </>
  );
}

export default Comments;
