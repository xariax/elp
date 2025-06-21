import React from 'react';
import './Modal.css';

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        onClick={e => e.stopPropagation()} // Zapobiega zamknięciu po kliknięciu w środek
      >
        <button className="modal-close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
