import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import Modal from './Modal';

const AdminPsg3 = () => {
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
      <h2>PSG1 - Szczegóły</h2>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <h3>Dodaj PSG1</h3>
        <form>
          {/* ...pola formularza... */}
        </form>
      </Modal>
    </div>
  );
};

export default AdminPsg3;
