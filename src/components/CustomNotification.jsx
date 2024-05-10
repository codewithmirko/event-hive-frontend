import { notifications } from "@mantine/notifications";
import {
  IconX,
  IconCheck,
  IconInfoCircle,
  IconAlertTriangle,
} from "@tabler/icons-react";

const CustomNotification = ({ type, message }) => {
  const iconSize = { width: 20, height: 20 }; // This size should now be handled by styles directly applicable to icons

  // Define icons and colors based on the type of notification
  const config = {
    error: {
      icon: <IconX style={iconSize} />,
      color: "red",
      title: "Bummer!",
    },
    success: {
      icon: <IconCheck style={iconSize} />,
      color: "teal",
      title: "All good!",
    },
    info: {
      icon: <IconInfoCircle style={iconSize} />,
      color: "blue",
      title: "FYI",
    },
    warning: {
      icon: <IconAlertTriangle style={iconSize} />,
      color: "orange",
      title: "Heads up!",
    },
  };

  const { icon, color, title } = config[type] || {};

  // Trigger a notification using Mantine's notifications system
  notifications.show({
    title: title,
    message: message,
    icon: icon,
    color: color,
  });
};

export default CustomNotification;
