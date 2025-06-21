import React, { useEffect } from 'react';
import './StickyTopBar.css';

const StickyTopBar = ({ onLogout }) => {
  useEffect(() => {
    console.log("StickyTopBar mounted");
    return () => console.log("StickyTopBar unmounted");
  }, []);

  return (
    <div className="top-bar">
      <button>Raporty</button>
      <button>Ustawienia</button>
      <button>Statystyki</button>
      <button onClick={onLogout}>Wyloguj</button>
    </div>
  );
};

export default StickyTopBar;
