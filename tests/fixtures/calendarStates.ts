export const events = [
  {
    id: '1',
    start: new Date('2024-12-19 21:45:00'),
    end: new Date('2024-12-19 23:45:00'),
    title: "Raul's birthday",
    notes: 'Buy some gifts',
    user: {
      id: '123',
      name: 'Raul',
    },
  },
  {
    id: '2',
    start: new Date('2025-01-19 21:45:00'),
    end: new Date('2025-01-19 23:45:00'),
    title: "Judith's birthday",
    notes: 'Buy cake and flowers',
    user: {
      id: '123',
      name: 'Judith',
    },
  },
];

export const initialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null,
};

export const calendarWithEventsState = {
  isLoadingEvents: true,
  events: [...events],
  activeEvent: null,
};

export const calendarWithActiveEventState = {
  isLoadingEvents: true,
  events: [...events],
  activeEvent: { ...events[0] },
};
