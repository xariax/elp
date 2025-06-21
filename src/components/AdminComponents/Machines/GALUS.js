import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const Psg3 = () => {
  const { setHorizontalMenuOptions } = useOutletContext();

  useEffect(() => {
    setHorizontalMenuOptions([
      { id: 'add', label: 'Dodaj', onClick: () => alert('Dodaj PSG3!') },
       { id: 'remove', label: 'Abrakadabra', onClick: () => alert('Usuń PSG3!') },
      { id: 'remove', label: 'GALUS', onClick: () => alert('Usuń PSG3!') }
    ]);
    
    return () => setHorizontalMenuOptions([]);
  }, [setHorizontalMenuOptions]);

  return (
    <div>
      <h2>PSG3 - Szczegóły</h2>
      {/* ... zawartość ... */}
    </div>
  );
};

export default Psg3;
