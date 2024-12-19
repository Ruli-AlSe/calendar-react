import { EventProps } from 'react-big-calendar';

export interface IEventProps extends EventProps {
  event: EventProps['event'] & { user: { id: string; name: string } };
}

export interface ICalendarEvent {
  id?: string;
  title: string;
  notes: string;
  start: Date;
  end: Date;
  bgColor?: string;
  user: {
    id: string;
    name: string;
  };
}

export interface BackendCalendarEvent {
  id: string;
  notes: string;
  start: string | Date;
  end: string | Date;
  title: string;
  user: {
    name: string;
    id: string;
  };
}
