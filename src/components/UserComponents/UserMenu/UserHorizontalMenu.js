import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from 'framer-motion';


const UserHorizontalMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const HorizontalStyle = {
                          display: 'flex',
                          gap:'20px',
                          wrap:'no-wrap',
                          justifyContent: 'center',
                          alignItems: 'center'
                          }

  // Wyciągamy segment ścieżki (np. "psg1" z "/user/psg1")
  const currentSegment = location.pathname.split('/')[2] || 'main';

  const MainMenu = [
    { id: 'psg1', label: 'PSG1', path: "/user/psg1" },
    { id: 'psg2', label: 'PSG2', path: "/user/psg2" },
    { id: 'psg3', label: 'PSG3', path: "/user/psg3" }
  ];

  const optionsPsg1 = [
    { id: '0', label: 'Strona Główna', path: "/user" },
    { id: '1', label: 'Plany', path: "/user/psg1/plans" },
    { id: '2', label: 'Zamówienia', path: "/user/psg1/orders" },
    { id: '3', label: 'Magazyn', path: "/user/psg1/stock" },
    { id: '4', label: 'Narzędzia', path: "/user/psg1/tools" },
    { id: '5', label: 'Powrót', path: "/user" }
  ];

  const optionsPsg2 = [
    { id: '0', label: 'Strona Główna', path: "/user" },
    { id: '1', label: 'Plany', path: "/user/psg2" },
    { id: '2', label: 'Zamówienia', path: "/user/psg2/zamowienia" },
    { id: '3', label: 'Magazyn', path: "/user/psg2/magazyn" },
    { id: '4', label: 'Powrót', path: "/user" }
  ];

  const optionsPsg3 = [
    { id: '0', label: 'Strona Główna', path: "/user" },
    { id: '1', label: 'Plany', path: "/user/psg3" },
    { id: '2', label: 'Zamówienia', path: "/user/psg3/zamowienia" },
    { id: '3', label: 'Magazyn', path: "/user/psg3/magazyn" },
    { id: '4', label: 'Powrót', path: "/user" }
  ];

  const handleClick = (path) => {
    // Nawiguj tylko jeśli nie jesteśmy już na tej ścieżce
    if (location.pathname !== path) {
      navigate(path, { replace: true }); // replace: true zapobiega powielaniu ścieżki
    }
  };

  // Wybierz odpowiednie opcje na podstawie aktualnej ścieżki
  let options = [];
  if (currentSegment === 'psg1') options = optionsPsg1;
  if (currentSegment === 'psg2') options = optionsPsg2;
  if (currentSegment === 'psg3') options = optionsPsg3;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentSegment}
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div 
        className="userHorizontalMenu"
        style= {HorizontalStyle} >

          {/* Główne menu */}
          {currentSegment === 'main' && MainMenu.map(item => (
            <button
              key={item.id}
              className="menu-item"
              onClick={() => handleClick(item.path)}
            >
              {item.label}
            </button>
          ))}
          
          {/* Podmenu */}
          {currentSegment !== 'main' && options.map(option => (
            <button
              key={option.id}
              className="menu-item"
              onClick={() => handleClick(option.path)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UserHorizontalMenu;
