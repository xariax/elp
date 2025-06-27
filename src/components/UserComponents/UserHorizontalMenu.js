import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from 'framer-motion';
import './horizontalMenu.css'

const UserHorizontalMenu = () => {
  const [ActiveHorizontalMenu, setActiveHorizontalMenu] = useState('main');
  const Navigate = useNavigate();
  
  const MainMenu = [
    { id: 'psg1', label: 'PSG1'},
    { id: 'psg2', label: 'PSG2', path: 'psg2' },
    { id: 'psg3', label: 'PSG3', path: 'psg3' }
  ];

  const optionsPsg1 = [
    {id:'0', label: 'Strona Główna', path:"/user"},
    {id:'1', label: 'Plany', path: 'psg1'},
    {id:'2', label: 'Zamówienia'},
    {id:'3', label: 'Magazyn'},
    {id:'4', label: 'Powrót', action: {onClick:()=> setActiveHorizontalMenu('main')}
    }
  ]

  const optionsPsg2 = [
    {id:'0', label: 'Strona Główna', path:"/user"},
    {id:'1', label: 'Plany', path: 'psg2'},
    {id:'2', label: 'Zamówienia'},
    {id:'3', label: 'Magazyn'},
    {id:'4', label: 'Powrót', action: {onClick:()=> setActiveHorizontalMenu('main')}
    }
  ]
const optionsPsg3 = [
    {id:'0', label: 'Strona Główna', path:"/user"},
    {id:'1', label: 'Plany', path: 'psg3'},
    {id:'2', label: 'Zamówienia'},
    {id:'3', label: 'Magazyn'},
    {id:'4', label: 'Powrót', action: {onClick:()=> setActiveHorizontalMenu('main')}
    }
  ]
  return (
 <AnimatePresence mode="wait">
                  <motion.div
                    key={ActiveHorizontalMenu}
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    
                  >
    <div className="userHorizontalMenu">
      {/* Wyświetl główne menu tylko, gdy aktywne menu to 'main' */}
      {ActiveHorizontalMenu === 'main' && (
        MainMenu.map(item => (
          <button
            key={item.id}
            className="menu-item"
            onClick={() => {
           
              setActiveHorizontalMenu(item.id);
            }}
          >
            {item.label}
          </button>
        ))
      )}

      {/* Podmenu dla PSG1 */}
      {ActiveHorizontalMenu === 'psg1' && (
        optionsPsg1.map(option =>(
            <button 
            key={option.id}
            className="menu-item"
            onClick={()=> {
                Navigate(option.path)
                if (option.action?.onClick) {
                    option.action.onClick();
      }
            }}>
                {option.label}
            </button>
        ))
      )}

      {/* Podmenu dla PSG2 */}
      {ActiveHorizontalMenu === 'psg2' && (
       optionsPsg2.map(option =>(
            <button 
            key={option.id}
            className="menu-item"
            onClick={()=> {
                Navigate(option.path)
                if (option.action?.onClick) {
                    option.action.onClick();
      }
            }}>
                {option.label}
            </button>
        ))
      )}

      {/* Podmenu dla PSG3 */}
      {ActiveHorizontalMenu === 'psg3' && (
        optionsPsg3.map(option =>(
            <button 
            key={option.id}
            className="menu-item"
            onClick={()=> {
                Navigate(option.path)
                if (option.action?.onClick) {
                    option.action.onClick();
      }
            }}>
                {option.label}
            </button>
        ))
      )}
    </div>
  </motion.div>
</AnimatePresence>
  );
};

export default UserHorizontalMenu;
