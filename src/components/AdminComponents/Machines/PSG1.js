import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const PSG1 = () => {
  const { setHorizontalMenuOptions } = useOutletContext();

  useEffect(() => {
    setHorizontalMenuOptions([
      { id: 'add', label: 'Dodaj', onClick: () => alert('Dodaj PSG1!') },
      { id: 'remove', label: 'Usuń', onClick: () => alert('Usuń PSG1!') }
    ]);
    // Czyść menu po opuszczeniu komponentu
    return () => setHorizontalMenuOptions([]);
  }, [setHorizontalMenuOptions]);

  return (
    <div>
      <h2>PSG1 - Szczegóły</h2>
      {/* ...reszta widoku... */}
    </div>
  );
};

export default PSG1;
