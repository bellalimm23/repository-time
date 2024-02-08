import { NotificationData, showNotification } from '@mantine/notifications';

interface Props extends Omit<NotificationData, 'color'> {}

const notification = {
  info: (props: Props) => showNotification({ ...props, color: 'blue' }),
  success: (props: Props) => showNotification({ ...props, color: 'green' }),
  error: (props: Props) => showNotification({ ...props, color: 'red' }),
};

export default notification;
