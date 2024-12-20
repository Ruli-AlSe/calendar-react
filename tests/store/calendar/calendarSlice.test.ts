import {
  calendarSlice,
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
  onSetActiveEvent,
  onUpdateEvent,
} from '../../../src/store/calendar/calendarSlice';
import {
  calendarWithActiveEventState,
  calendarWithEventsState,
  events,
  initialState,
} from '../../fixtures/calendarStates';

describe('Testing calendarSlice', () => {
  test('should return default state', () => {
    const state = calendarSlice.getInitialState();

    expect(state).toEqual(initialState);
  });

  test('should activate the event', () => {
    const state = calendarSlice.reducer(calendarWithEventsState, onSetActiveEvent(events[0]));

    expect(state.activeEvent).toEqual(events[0]);
  });

  test('should add the event', () => {
    const newEvent = {
      id: '3',
      start: new Date('2024-12-25 21:45:00'),
      end: new Date('2024-12-25 23:45:00'),
      title: 'Christmas',
      notes: 'Eat a lot of food',
      user: {
        id: '123',
        name: 'carlos',
      },
    };
    const state = calendarSlice.reducer(calendarWithEventsState, onAddNewEvent(newEvent));

    expect(state.events).toEqual([...events, newEvent]);
  });

  test('should update the event', () => {
    const eventUpdated = {
      id: '1',
      start: new Date('2024-12-19 21:45:00'),
      end: new Date('2024-12-19 23:45:00'),
      title: 'Is the birthday of the king',
      notes: 'Buy some gifts and bring gold',
      user: {
        id: '123',
        name: 'Raul',
      },
    };
    const state = calendarSlice.reducer(calendarWithEventsState, onUpdateEvent(eventUpdated));

    expect(state.events).toContain(eventUpdated);
  });

  test('should delete the event', () => {
    let state = calendarSlice.reducer(calendarWithEventsState, onSetActiveEvent(events[0]));
    state = calendarSlice.reducer(state, onDeleteEvent());

    expect(state.events).not.toContain(events[0]);
    expect(state.activeEvent).toBe(null);
  });

  test('should set all events', () => {
    const state = calendarSlice.reducer(initialState, onLoadEvents(events));

    expect(state.events).toEqual(events);
    expect(state.isLoadingEvents).toBeFalsy();
  });

  test('should set the state to default', () => {
    const state = calendarSlice.reducer(calendarWithActiveEventState, onLogoutCalendar());

    expect(state).toEqual(initialState);
  });
});
