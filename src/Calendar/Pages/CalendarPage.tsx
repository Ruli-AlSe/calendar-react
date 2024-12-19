import { useEffect, useState } from 'react';
import { Calendar, View } from 'react-big-calendar';

import { Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from '../';
import { localizer, getMessagesES } from '../../helpers';
import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { ICalendarEvent } from '../../interfaces';

export const CalendarPage = () => {
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
  const { user } = useAuthStore();

  const [lastView, setLastView] = useState<View>(
    (localStorage.getItem('lastView') || 'week') as View
  );
  const eventStyleGetter = (event: ICalendarEvent) => {
    const isMyEvent = user!.uid === event.user.id;

    const style = {
      backgroundColor: isMyEvent ? '#347CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
    };

    return {
      style,
    };
  };

  const onDoubleClick = () => {
    openDateModal();
  };

  const onViewChanged = (view: View) => {
    localStorage.setItem('lastView', view);
    setLastView(view);
  };

  useEffect(() => {
    startLoadingEvents();
  }, []);

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
        eventPropGetter={eventStyleGetter}
        components={{
          event: (props) => <CalendarEvent {...props} />,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={setActiveEvent}
        onView={onViewChanged}
      />

      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
};
