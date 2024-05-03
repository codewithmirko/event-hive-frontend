import { Text, Avatar, Group, Button, Box, Modal } from '@mantine/core';
import { useState } from 'react';

function Message({ comment, isOwner, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const messageAlignment = isOwner ? 'flex-end' : 'flex-start';
  const bubbleColor = isOwner ? '#d1eaff' : '#f0f0f0';

  const handleDelete = () => {
    onDelete(comment._id);
    setShowConfirm(false); // Hide the modal after confirming
  };

  return (
    <>
      <Group position={messageAlignment} spacing="xs" style={{ marginBottom: 10 }}>
        <Box
          style={{
            backgroundColor: bubbleColor,
            padding: '8px 12px',
            borderRadius: '16px',
            maxWidth: '80%',
            display: 'flex', // Ensure the avatar and text are aligned nicely
            alignItems: 'center', // Align items vertically
          }}
        >
          <Avatar
            src={`https://api.multiavatar.com/${encodeURIComponent(comment.commenter.username)}.png`}
            alt={`${comment.commenter.username}'s avatar`}
            size="md" // Adjust size as needed
            style={{ marginRight: '8px' }} // Spacing between avatar and text
          />
          <div style={{ flex: 1, position: 'relative' }}> {/* Ensure text fills remaining space */}
            <Text size="sm">{comment.commenter.username}</Text>
            {isOwner && (
              <Button
                size="xs"
                style={{ position: 'absolute', top: 0, right: 0, padding: '0 5px' }}
                onClick={() => setShowConfirm(true)}
                variant="subtle"
              >
                X
              </Button>
            )}
            <Text size="xs" c="dimmed">
              Posted at {new Date(comment.createdAt).toLocaleTimeString()}
            </Text>
            <Text size="sm">
              {comment.commentText}
            </Text>
          </div>
        </Box>
      </Group>
      {/* Confirmation Modal */}
      <Modal
        title="Confirm deletion"
        opened={showConfirm}
        onClose={() => setShowConfirm(false)}
        size="sm"
      >
        <Text>Are you sure you want to delete this comment?</Text>
        <Group position="right" mt="md">
          <Button color="red" onClick={handleDelete}>Yes</Button>
          <Button variant="outline" onClick={() => setShowConfirm(false)}>No</Button>
        </Group>
      </Modal>
    </>
  );
}

export default Message;
