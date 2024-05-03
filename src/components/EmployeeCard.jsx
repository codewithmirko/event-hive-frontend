import { Avatar, Text, Button, Paper } from "@mantine/core";

function EmployeeCard({ name, email, role, githubUrl, avatarSrc }) {
  return (
    <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
      <Avatar src={avatarSrc} size={120} radius={120} mx="auto" />
      <Text ta="center" fz="lg" fw={500} mt="md">
        {name}
      </Text>
      <Text ta="center" c="dimmed" fz="sm">
        {email} • {role}
      </Text>

      <Button
        component="a"
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        variant="default"
        fullWidth
        mt="md"
      >
        Github
      </Button>
    </Paper>
  );
}

export default EmployeeCard;
