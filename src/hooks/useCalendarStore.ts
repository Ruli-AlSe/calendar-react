import { useSelector } from 'react-redux';
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
  RootState,
  useAppDispatch,
} from '../store';
import { ICalendarEvent } from '../interfaces';
import calendarApi from '../api/calendarApi';
import { convertEventsToDateEvents } from '../helpers';

export const useCalendarStore = () => {
  const { events, activeEvent } = useSelector((state: RootState) => state.calendar);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  const setActiveEvent = (calendarEvent: ICalendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent: ICalendarEvent) => {
    // TODO: send event to backend

    // If everything goes well

    if (calendarEvent.id) {
      // updating
      dispatch(onUpdateEvent({ ...calendarEvent }));
    } else {
      // creating
      const { data } = await calendarApi.post('/events', calendarEvent);

      dispatch(
        onAddNewEvent({
          ...calendarEvent,
          id: data.event.id,
          user: { id: user!.uid, name: user!.name },
        })
      );
    }
  };

  const startDeletingEvent = async () => {
    // TODO: send event to backend

    // If everything goes well
    dispatch(onDeleteEvent());
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get('/events');
      const events = convertEventsToDateEvents(data.events);
      dispatch(onLoadEvents(events as ICalendarEvent[]));
    } catch (error) {
      console.error(JSON.stringify(error));
    }
  };

  return {
    // * Properties
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
    // * Methods
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents,
  };
};
