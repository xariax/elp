import React, { useRef, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SideBar = ({ sidebarOpen, setSidebarOpen, onMenuSelect }) => {
  const { user, logout } = useAuth();
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

const handleItemClick = (menuKey, path) => {
  // Jeśli kliknięto "Maszyny", ustaw stan na null
  if (menuKey === 'machines') {
    onMenuSelect(null);
  } else {
    onMenuSelect(menuKey);
  }
  navigate(path);
};
    // Dodajemy opcję "Strona główna" do resetu
  const handleHomeClick = () => {
    onMenuSelect(null); // Resetujemy aktywną sekcję
    navigate('/admin');
  };

  // Zamykaj menu po kliknięciu poza nim lub na overlay
  useEffect(() => {
    if (!sidebarOpen) return;

    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sidebarOpen, setSidebarOpen]);

  return (
    <>
      {/* Overlay - przyciemnienie tła */}
      {sidebarOpen && (
        <div 
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Pasek boczny */}
      <div
        ref={sidebarRef}
        className={`sidebar-overlay${sidebarOpen ? " open" : ""}`}
      >
        <button
          className="sidebar-toggle"
          onClick={() => setSidebarOpen(open => !open)}
          aria-label={sidebarOpen ? "Zamknij menu" : "Otwórz menu"}
        >
          {sidebarOpen ? "◀" : "▶"}
        </button>
        <div className="sidebar-content">

            {/* Dodajemy przycisk "Strona główna" */}
          <button 
            className="home-button"
            onClick={handleHomeClick}
          >
            Strona główna
          </button>
          <p>{user?.login} (rola: {user?.role})</p>
          <button onClick={logout}>Wyloguj</button>

          <h3>Menu zarządzania</h3>
          <ul className="sidebar-menu">
      <li onClick={() => handleItemClick('machines', '/admin/machines')}>
        Maszyny
      </li>
      <li onClick={() => handleItemClick('settings', '/admin/settings')}>
        Ustawienia
      </li>
      <li onClick={() => handleItemClick('reports', '/admin/reports')}>
        Raporty
      </li>
    </ul>
        </div>
      </div>
    </>
  );
};

export default SideBar;
