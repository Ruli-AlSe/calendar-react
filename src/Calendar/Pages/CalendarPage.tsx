import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { addHours, parse, startOfWeek, getDay, format } from 'date-fns';
import { enUS } from 'date-fns/locale';

import { Navbar } from '../components/Navbar';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
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
];

export const CalendarPage = () => {
  return (
    <>
      <Navbar />

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 90px)' }}
      />
    </>
  );
};
