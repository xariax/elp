//import Greeting from '../components/AdminComponents/AdminGreeting';

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import SideBar from '../components/AdminComponents/SideBarMenu/SideBar'; // <-- Dodaj import
import HorizontalMenu from '../components/AdminComponents/HorizontalMenu/HorizontalMenu';
import { AnimatePresence, motion } from 'framer-motion';
import './style/AdminPanel.css';
import logo from './logo.png'

const AdminPanel = () => {
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMainMenu, setActiveMainMenu] = useState(null);
  const [horizontalMenuOptions, setHorizontalMenuOptions] = useState([]);
  const Navigate = useNavigate();
  const location = useLocation();

  
  const handleMenuSelect = (menuKey) => {
    setActiveMainMenu(menuKey);
  };

  const defaultMenu = [
  { id: 'psg1', label: 'PSG1', path: '/admin/machines/psg1' },
  { id: 'psg2', label: 'PSG2', path: '/admin/machines/psg2' },
  { id: 'psg3', label: 'PSG3', path: '/admin/machines/psg3' },
  { id: 'engel', label: 'Engel', path: '/admin/machines/engel' },
  { id: 'galus', label: 'Galus', path: '/admin/machines/galus' }
];




  return ( 
<div className="parent">
      
       <SideBar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen}
        onMenuSelect={handleMenuSelect}
      />


      <div className="div1">
        <img src={logo} alt="Elpes Logo" className="elpes-logo" />
      </div>


      <div className="div2">
        
        
        <div className="default-menu">
            {defaultMenu.map(item => (
              <button
                key={item.id}
                className="menu-item"
                onClick={() => Navigate(item.path)
                  
                }
              >
                {item.label}
              </button>
            ))}
          </div>


      </div>

        <div class="div3">

          <HorizontalMenu
          activeMenu={activeMainMenu} 
          options={horizontalMenuOptions} 
          />


          
            <div class="Content">
                 <AnimatePresence mode="wait">
                  <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >


              <Outlet context={{ setHorizontalMenuOptions }} />
                  </motion.div>
                </AnimatePresence>
          
            </div>
          
        </div>

</div>
  );
};

export default AdminPanel;
