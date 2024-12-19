import { createSlice } from '@reduxjs/toolkit';
import { ICalendarEvent } from '../../interfaces';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CalendarState {
  isLoadingEvents: boolean;
  events: ICalendarEvent[];
  activeEvent: ICalendarEvent | null;
}

const initialState: CalendarState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null,
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    onSetActiveEvent: (state, action: PayloadAction<ICalendarEvent>) => {
      state.activeEvent = action.payload;
    },
    onAddNewEvent: (state, action: PayloadAction<ICalendarEvent>) => {
      state.events.push(action.payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, action: PayloadAction<ICalendarEvent>) => {
      state.events = state.events.map((event) => {
        if (event.id === action.payload.id) {
          return action.payload;
        }

        return event;
      });
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter((event) => event.id !== state.activeEvent?.id);
        state.activeEvent = null;
      }
    },
    onLoadEvents: (state, action: PayloadAction<ICalendarEvent[]>) => {
      state.isLoadingEvents = false;
      console.log(action.payload);
      action.payload.forEach((event) => {
        const exists = state.events.some((dbEvent) => dbEvent.id === event.id);
        if (!exists) {
          state.events.push(event);
        }
      });
      state.activeEvent = null;
    },
  },
});

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents } =
  calendarSlice.actions;
