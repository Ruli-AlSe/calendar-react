import Modal from 'react-modal';

import { useState } from 'react';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const onCloseModal = () => {
    console.log('closing modal');

    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      onRequestClose={onCloseModal}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1>Hola mundo</h1>
      <hr />
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem dolorum aperiam eum
        dignissimos mollitia doloribus odit officiis, fugiat vel ea dolores ducimus obcaecati vero
        distinctio ipsum neque numquam accusantium id?
      </p>
    </Modal>
  );
};
