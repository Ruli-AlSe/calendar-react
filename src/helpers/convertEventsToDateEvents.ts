import { parseISO } from 'date-fns';
import { BackendCalendarEvent, ICalendarEvent } from '../interfaces';

export const convertEventsToDateEvents = (events: BackendCalendarEvent[]): ICalendarEvent[] => {
  return events.map((event) => {
    const calendarEvent: ICalendarEvent = {
      id: event.id,
      title: event.title,
      notes: event.notes,
      start: parseISO(event.start as string),
      end: parseISO(event.end as string),
      bgColor: '#fafafa',
      user: {
        id: event.user._id,
        name: event.user.name,
      },
    };

    return calendarEvent;
  });
};
