import { Calendar, type Event } from 'react-big-calendar';
import { addHours } from 'date-fns';

import { Navbar } from '../components/Navbar';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { localizer, getMessagesES } from '../../helpers';

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
  const eventStyleGetter = (event: Event, start: Date, end: Date, isSelected: boolean) => {
    console.log({ event, start, end, isSelected });

    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
    };

    return {
      style,
    };
  };

  return (
    <>
      <Navbar />

      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 90px)' }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
      />
    </>
  );
};
