import { EventProps } from 'react-big-calendar';

interface IEventProps extends EventProps {
  event: EventProps['event'] & { user: { _id: string; name: string } };
}

export const CalendarEvent = ({ event }: IEventProps) => {
  const { title, user } = event;

  return (
    <>
      <strong>{title}</strong>
      <span> - {user.name}</span>
    </>
  );
};
