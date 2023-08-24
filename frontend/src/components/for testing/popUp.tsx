import React, { useState } from 'react';
import Modal from '../modal/Modal';

interface PopupProps {
  // Props if needed
}



const Popup: React.FC<PopupProps> = () => {

  const [isOpen, setIsOpen] = useState(false);

  const useModal = () => {
  
    const openModal = () => {
      setIsOpen(true);
    };
  
    const closeModal = () => {
      setIsOpen(false);
    };
  
    return {
      openModal,
      closeModal,
    };
  };

  const { openModal, closeModal } = useModal();

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      {isOpen && (
        <div className="modal">
         <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
          <button onClick={closeModal}>Close Modal</button>
        </div>
      )}
    </div>
  );
};

export default Popup;
