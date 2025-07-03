import React, { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Divider, Box, CssBaseline } from '@mui/material';
import { useAuth } from '../context/AuthContext';

// MUI IMPORTS
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import Backdrop from '@mui/material/Backdrop';

// COMPONENTS IMPORTS
import UserHorizontalMenu from '../components/UserComponents/UserMenu/UserHorizontalMenu'
import LoggedAsText from '../components/UserComponents/LoggedAssText'
import {SidebarNavButton} from '../components/UserComponents/Buttons/SideBarNavButton';

// STYLE IMPORTS
import "./style/UserPanel.css"



export default function LeftExpandableAppBar() {
            const [activeHorizontalMenu, setActiveHorizontalMenu] = useState('main');
            const [open, setOpen] = useState(false);
            const { logout } = useAuth();
            const navigate = useNavigate();

            const handleLogout = async () =>  
            {
              await logout();
              navigate('/'); // Przekierowanie na stronę główną
            };



            const toggleOpen = () => {
              setOpen(!open);
            };


            

  return (
    <>
      <CssBaseline />
      <Box display="flex" flexDirection="row" height="100vh">

         <Backdrop
            open={open}
            onClick={() => setOpen(false)}
            sx={{
            zIndex: 1199,
            position: 'fixed'
    }}
  />
        {/* Lewy AppBar */}
        <Box flexGrow={0} sx={{ zIndex: 1200, position: 'relative' }}>
            
          <AppBar
            position="sticky"
            elevation={1}
            sx={{
              boxShadow: '8px 0 12px -4px rgba(0,0,0,0.3)', 
              width: open ? 200 : 50,
              minHeight: '100vh',
              transition: 'width 0.3s',
              bgcolor: '#1976d2', // niebieskie tło
              color: '#fff',      // białe ikony i tekst
            }}
          >

            <Toolbar
              sx={{
                flexDirection: 'column',
                alignItems: open ? 'flex-start' : 'center',
                minHeight: '100vh',
                p: 2
              }}
            >
              <IconButton
                onClick={toggleOpen}
                sx={{   
                mb: 2,
                color: '#fff',
                p: 1,
                minWidth: 0,
                width: 50,
                height: 50,
                }}
              >
                <MenuIcon />
              </IconButton>



              <SidebarNavButton
                to="/"
                open={open}
                label="Home"
                icon={<HomeIcon />}
              />
                      <Divider sx={{ my: 1, width: "100%", bgcolor: "rgba(255,255,255,0.2)" }} />

              <SidebarNavButton
                to="/about"
                open={open}
                label="About"
                icon={<InfoIcon />}
              />
                      <Divider sx={{ my: 1, width: "100%", bgcolor: "rgba(255,255,255,0.2)" }} />

              <SidebarNavButton
                to="/email"
                open={open}
                label="Contact"
                icon={<ContactMailIcon/>}
              />
                      <Divider sx={{ my: 1, width: "100%", bgcolor: "rgba(255,255,255,0.2)" }} />

                                                              {/* OTWARTY SIDEBAR */}
            {open && (
              <div style={{ marginTop: '40px', padding: 8, width: '100%' }}>
                  
                <button
                        onClick={e => { 
                        e.stopPropagation(); 
                        handleLogout(); 
                            }}

                      style={{
                        marginTop: 4,
                        marginBottom: 10,
                        padding: '12px 24px',
                        borderRadius: 6,
                        border: 'none',
                        background: '#fff',
                        color: '#1976d2',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                      }}
                    >
                      Wyloguj
                </button>
 
  </div>
)}
            

            </Toolbar>
                       
               
          </AppBar>
          
        </Box>
                                                        {/* Główna zawartość */}
        
            <Box flexGrow={1} p={3}>
             
              <LoggedAsText />
                
                                                            {/* Div na całą szerokość */}

                <div className="div-full-width">
                    
                    <UserHorizontalMenu 
                    activeHorizontalMenu={activeHorizontalMenu}
                    setActiveHorizontalMenu={setActiveHorizontalMenu}
                    />
                </div>

                  


                {/* Div na 80% szerokości, wyśrodkowany */}


                <div className="div-80-width">
                  <Outlet />
                </div>


            </Box>
      </Box>
    </>
  );
}
