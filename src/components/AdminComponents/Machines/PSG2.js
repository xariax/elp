import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const Psg2 = () => {
  const { setHorizontalMenuOptions } = useOutletContext();

  useEffect(() => {
    setHorizontalMenuOptions([
      { id: 'add', label: 'Dodaj', onClick: () => alert('Dodaj PSG2!') },
      { id: 'remove', label: 'Konfiguruj', onClick: () => alert('Usuń PSG2!') },
      { id: 'remove', label: 'Usuń', onClick: () => alert('Usuń PSG2!') }
    ]);
    
    return () => setHorizontalMenuOptions([]);
  }, [setHorizontalMenuOptions]);

  return (
    <div>
      <h2>PSG2 - Szczegóły</h2>
      {/* ... zawartość ... */}
    </div>
  );
};

export default Psg2;
