import { addHours } from 'date-fns';
import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks';

export const FabAddNew = () => {
  const { openDateModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();
  const { user } = useAuthStore();

  const handleClickNew = () => {
    setActiveEvent({
      title: '',
      notes: '',
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: '#fafafa',
      user: {
        id: user!.uid,
        name: user!.name,
      },
    });
    openDateModal();
  };
  return (
    <button onClick={handleClickNew} className="btn btn-primary fab">
      <i className="fas fa-plus" />
    </button>
  );
};
