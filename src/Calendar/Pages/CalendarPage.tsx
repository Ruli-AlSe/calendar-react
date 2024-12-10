import { Calendar, View, type Event } from 'react-big-calendar';
import { addHours } from 'date-fns';

import { Navbar, CalendarEvent, CalendarModal } from '../';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { localizer, getMessagesES } from '../../helpers';
import { useState } from 'react';

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
  const [lastView, setLastView] = useState<View>(
    (localStorage.getItem('lastView') || 'week') as View
  );
  // const eventStyleGetter = (event: Event, start: Date, end: Date, isSelected: boolean) => {
  //  console.log({ event, start, end, isSelected });

  //   const style = {
  //     backgroundColor: '#347CF7',
  //     borderRadius: '0px',
  //     opacity: 0.8,
  //     color: 'white',
  //   };

  //   return {
  //     style,
  //   };
  // };

  const onDoubleClick = (eventData: Event) => {
    console.log({ doubleClick: eventData });
  };

  const onSelect = (eventData: Event) => {
    console.log({ click: eventData });
  };

  const onViewChanged = (view: View) => {
    localStorage.setItem('lastView', view);
    setLastView(view);
  };

  return (
    <>
      <Navbar />

      <Calendar
        culture="es"
        localizer={localizer}
        defaultView={lastView}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 90px)' }}
        messages={getMessagesES()}
        // eventPropGetter={eventStyleGetter}
        components={{
          event: (props) => <CalendarEvent {...props} />,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />

      <CalendarModal />
    </>
  );
};
