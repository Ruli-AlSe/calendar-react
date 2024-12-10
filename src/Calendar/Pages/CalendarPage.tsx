import { useState } from 'react';
import { Calendar, View } from 'react-big-calendar';

import { Navbar, CalendarEvent, CalendarModal, FabAddNew } from '../';
import { localizer, getMessagesES } from '../../helpers';
import { useCalendarStore, useUiStore } from '../../hooks';

import 'react-big-calendar/lib/css/react-big-calendar.css';

export const CalendarPage = () => {
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent } = useCalendarStore();

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

  const onDoubleClick = () => {
    openDateModal();
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
        onSelectEvent={setActiveEvent}
        onView={onViewChanged}
      />

      <CalendarModal />
      <FabAddNew />
    </>
  );
};
