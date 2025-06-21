import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Modal from './ModalForMachine/Modal';
const Psg3 = () => {
  const { setHorizontalMenuOptions } = useOutletContext();
    const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    setHorizontalMenuOptions([
      { id: 'add', label: 'Dodaj', onClick: () => setShowModal(true) },
      { id: 'remove', label: 'Usuń', onClick: () => alert('Usuń PSG1!') }
    ]);
    return () => setHorizontalMenuOptions([]);
  }, [setHorizontalMenuOptions]);

  return (
    <div>
      <h2>PSG3 - Szczegóły</h2>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
              <h3>Dodaj PSG1</h3>
              <form>
                {/* ...pola formularza... */}
              </form>
            </Modal>
    </div>
  );
};

export default Psg3;
