import React, { useState, useEffect, useContext } from "react";
import { Text } from "@mantine/core";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import Message from "./Message";
import { showNotification } from "@mantine/notifications";
import CommentForm from "./CommentForm"; // Import the new component

function Comments({ eventId }) {
  const [comments, setComments] = useState([]);
  const { user } = useContext(AuthContext);
  const BACKEND_URL = import.meta.env.VITE_API_URL;

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
      console.log("DATA inside comment handler", data);
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
      await handleCommentAPI("delete", `/${commentId}`, user);
      fetchComments(); // Re-fetch comments to ensure the state matches the database after deletion
      showNotification({
        title: "Success",
        message: "Comment deleted successfully.",
        color: "green",
      });
    } catch (error) {
      console.log(error);
      showNotification({
        title: "Error",
        message: "Failed to delete comment.",
        color: "red",
      });
    }
  };

  useEffect(() => {
    fetchComments();
  }, [eventId]); // Dependency array ensures it runs only when eventId changes

  return (
    <>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <Message
            key={comment._id}
            comment={comment}
            isOwner={user?._id === comment.commenter?._id}
            onDelete={() => deleteComment(comment._id)}
            isAdmin={user?.userType === "admin"}
          />
        ))
      ) : (
        <Text>No comments yet.</Text>
      )}
      <CommentForm eventId={eventId} fetchComments={fetchComments} />
    </>
  );
}

export default Comments;
