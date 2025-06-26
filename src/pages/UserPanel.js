import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Button, Divider, Box, CssBaseline } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import "./style/UserPanel.css"

export default function LeftExpandableAppBar() {
  const [open, setOpen] = useState(false);
    const { user, logout } = useAuth();
     const [anchorEl, setAnchorEl] = useState(null);
  const openEd = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <CssBaseline />
      <Box display="flex" flexDirection="row" height="100vh">
        {/* Lewy AppBar */}
        <Box flexGrow={0}>
            
          <AppBar
            position="sticky"
            elevation={1}
            sx={{
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
                width: 40,
                height: 40,
                }}
              >
                <MenuIcon />
              </IconButton>

                {open && (
  <div style={{ marginTop: '-23px', padding: 8, width: '100%' }}>
    <p style={{ marginLeft: 0, fontSize: 14 }}>
        
 {user?.role} : {user?.login}</p>

    
    <button
      onClick={logout}
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


              <Divider sx={{ my: 1, width: '100%', bgcolor: 'rgba(255,255,255,0.2)' }} />
              <Button
                component={Link}
                to="/"
                startIcon={<HomeIcon sx={{ color: '#fff' }} />}
                sx={{   
                display: 'flex',
                alignItems: 'center',
                justifyContent: open ? 'flex-start' : 'center',
                width: '100%',
                minWidth: 0,
                mb: 1,
                bgcolor: '#1976d2',
                color: '#fff',
                px: open ? 2 : 0,
                borderRadius: '8px',
                transition: 'box-shadow 0.2s, background 0.2s',
                boxShadow: 'none',
                '&:hover': {
                bgcolor: '#1565c0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                zIndex: 1,
    }}}
              >
                {open && 'Home'}
              </Button>
              <Button
                component={Link}
                to="/about"
                startIcon={<InfoIcon sx={{ color: '#fff' }} />}
                sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: open ? 'flex-start' : 'center',
                width: '100%',
                minWidth: 0,
                mb: 1,
                bgcolor: '#1976d2',
                color: '#fff',
                px: open ? 2 : 0,
                borderRadius: '8px',
                transition: 'box-shadow 0.2s, background 0.2s',
                boxShadow: 'none',
                '&:hover': {
                bgcolor: '#1565c0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                zIndex: 1,
                }}}
              >
                {open && 'About'}
              </Button>
              <Button
                component={Link}
                to="/email"
                startIcon={<ContactMailIcon sx={{ color: '#fff' }} />}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: open ? 'flex-start' : 'center',
                    width: '100%',
                    minWidth: 0,
                    mb: 1,
                    bgcolor: '#1976d2',
                    color: '#fff',
                    px: open ? 2 : 0,
                    borderRadius: '8px',
                    transition: 'box-shadow 0.2s, background 0.2s',
                    boxShadow: 'none',
                    '&:hover': {
                    bgcolor: '#1565c0',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    zIndex: 1,
                }}}
              >
                {open && 'Contact'}
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
        {/* Główna zawartość */}
            <Box flexGrow={1} p={3}>

                {/* Div na całą szerokość */}
                <div className="div-full-width">
                    
                      <Button
        id="basic-button"
        aria-controls={openEd ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={openEd ? 'true' : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
          },
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>


                </div>

                {/* Div na 80% szerokości, wyśrodkowany */}
                <div className="div-80-width">
                    <h3>To jest div na 80% szerokości</h3>
                    <p>Możesz tu dodać dowolną zawartość.</p>
                </div>


            </Box>
      </Box>
    </>
  );
}
