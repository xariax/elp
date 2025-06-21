import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HorizontalMenu.css';

const HorizontalMenu = ({ activeMenu, options }) => {
  const navigate = useNavigate();


  // Przykład dla innych menu
  const machinesMenu = [
    { id: 'all', label: 'Wszystkie maszyny', path: '/admin/machines' },
    { id: 'add', label: 'Dodaj nową', path: '/admin/machines/add' },
    { id: 'status', label: 'Status', path: '/admin/machines/status' },
    { id: 'maintenance', label: 'Kalendarz serwisów', path: '/admin/machines/maintenance' }
  ];

  const settingsMenu = [
    { id: 'general', label: 'Ogólne', path: '/admin/settings' },
    { id: 'users', label: 'Użytkownicy', path: '/admin/settings/users' },
    { id: 'permissions', label: 'Uprawnienia', path: '/admin/settings/permissions' },
    { id: 'notifications', label: 'Powiadomienia', path: '/admin/settings/notifications' }
  ];

  const reportsMenu = [
    { id: 'daily', label: 'Dzienne', path: '/admin/reports/daily' },
    { id: 'weekly', label: 'Tygodniowe', path: '/admin/reports/weekly' },
    { id: 'monthly', label: 'Miesięczne', path: '/admin/reports/monthly' },
    { id: 'custom', label: 'Niestandardowe', path: '/admin/reports/custom' }
  ];

  const getActiveMenu = () => {
    switch (activeMenu) {
      case 'machines': return machinesMenu;
      case 'settings': return settingsMenu;
      case 'reports': return reportsMenu;
      default: return [];
    }
  };

  const menuItems = getActiveMenu();


  
  return (
    <div className="horizontal-menu">
      {menuItems.map(item => (
        <button
          key={item.id}
          className="menu-item"
          onClick={() => navigate(item.path)}
        >
          {item.label}
        </button>
      ))}


{options.map(item => (
        <button
          key={item.id}
          className="menu-item"
          onClick={item.onClick}
        >
          {item.label}
        </button>
      ))}

    </div>
  );
};

export default HorizontalMenu;
