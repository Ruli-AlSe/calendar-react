import { createSlice } from '@reduxjs/toolkit';
import { ICalendarEvent } from '../../interfaces';
import { addHours } from 'date-fns';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CalendarState {
  events: ICalendarEvent[];
  activeEvent: ICalendarEvent | null;
}

const initialState: CalendarState = {
  events: [
    {
      _id: new Date().getTime().toString(),
      title: "Boss' birthdate",
      notes: 'Buy a cake and a gift',
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: '#fafafa',
      user: {
        _id: '123',
        name: 'Raul Almanza',
      },
    },
  ],
  activeEvent: null,
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    onSetActiveEvent: (state, action: PayloadAction<ICalendarEvent>) => {
      state.activeEvent = action.payload;
    },
  },
});

export const { onSetActiveEvent } = calendarSlice.actions;
