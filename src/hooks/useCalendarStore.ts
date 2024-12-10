import { useSelector } from 'react-redux';
import { onSetActiveEvent, RootState, useAppDispatch } from '../store';
import { ICalendarEvent } from '../interfaces';

export const useCalendarStore = () => {
  const { events, activeEvent } = useSelector((state: RootState) => state.calendar);
  const dispatch = useAppDispatch();

  const setActiveEvent = (calendarEvent: ICalendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  return {
    // * Properties
    events,
    activeEvent,
    // * Methods
    setActiveEvent,
  };
};
