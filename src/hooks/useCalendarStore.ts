import { useSelector } from 'react-redux';
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent,
  RootState,
  useAppDispatch,
} from '../store';
import { ICalendarEvent } from '../interfaces';

export const useCalendarStore = () => {
  const { events, activeEvent } = useSelector((state: RootState) => state.calendar);
  const dispatch = useAppDispatch();

  const setActiveEvent = (calendarEvent: ICalendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent: ICalendarEvent) => {
    // TODO: send event to backend

    // If everything goes well

    if (calendarEvent._id) {
      // updating
      dispatch(onUpdateEvent({ ...calendarEvent }));
    } else {
      // creating
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime().toString() }));
    }
  };

  const startDeletingEvent = async () => {
    // TODO: send event to backend

    // If everything goes well
    dispatch(onDeleteEvent());
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
  };
};
