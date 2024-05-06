import React from "react";
import { Paper, Text, Button, Avatar, Grid } from "@mantine/core";

const UserDetails = ({ user, onEdit }) => {
  return (
    <Paper shadow="sm" p="md" withBorder>
      <Grid align="center">
        <Grid.Col span={3}>
          <Avatar
            src={`https://api.multiavatar.com/${encodeURIComponent(
              user.username
            )}.png`}
            alt={`${user.username}'s avatar`}
            size={90}
            style={{ margin: "0 auto" }} // Center the avatar in its grid column
          />
          <Text size="sm" align="center">
            {user.username}
          </Text>
        </Grid.Col>
        <Grid.Col span={7}>
          <Text size="sm">Location: {user.info.location}</Text>
          <Text size="sm">Age: {user.info.age}</Text>
          <Text size="sm">Hobbies: {user.info.hobbies.join(", ")}</Text>
          <Text size="sm">Languages: {user.info.language.join(", ")}</Text>
          <Text size="sm">
            Name: {user.info.firstName} {user.info.lastName}
          </Text>
        </Grid.Col>
        <Grid.Col
          span={2}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-start",
          }}
        >
          <Button
            size="xs"
            onClick={onEdit}
            style={{ width: "auto", padding: "4px 10px" }}
          >
            Edit Profile
          </Button>
        </Grid.Col>
      </Grid>
    </Paper>
  );
};

export default UserDetails;
