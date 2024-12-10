import { IEventProps } from '../../interfaces';

export const CalendarEvent = ({ event }: IEventProps) => {
  const { title, user } = event;

  return (
    <>
      <strong>{title}</strong>
      <span> - {user.name}</span>
    </>
  );
};
