import { parseISO } from 'date-fns';
import { BackendCalendarEvent } from '../interfaces';

export const convertEventsToDateEvents = (events: BackendCalendarEvent[]) => {
  return events.map((event) => {
    event.start = parseISO(event.start as string);
    event.end = parseISO(event.end as string);

    return event;
  });
};
