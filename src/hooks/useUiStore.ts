import { useSelector } from 'react-redux';
import { onCloseDateModal, onOpenDateModal, RootState, useAppDispatch } from '../store';

export const useUiStore = () => {
  const { isDateModalOpen } = useSelector((state: RootState) => state.ui);
  const dispatch = useAppDispatch();

  const openDateModal = () => {
    dispatch(onOpenDateModal());
  };

  const closeDateModal = () => {
    dispatch(onCloseDateModal());
  };

  const toggleDateModal = () => {
    if (isDateModalOpen) {
      closeDateModal();
    } else {
      openDateModal();
    }
  };

  return {
    // * Properties
    isDateModalOpen,

    // * Methods
    openDateModal,
    closeDateModal,
    toggleDateModal,
  };
};
