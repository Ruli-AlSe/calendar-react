import { EventProps } from 'react-big-calendar';

export interface IEventProps extends EventProps {
  event: EventProps['event'] & { user: { _id: string; name: string } };
}

export interface ICalendarEvent {
  _id?: string;
  title: string;
  notes: string;
  start: Date;
  end: Date;
  bgColor?: string;
  user: {
    _id: string;
    name: string;
  };
}
