import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { Drawer, IconButton, Divider, Box, CssBaseline, Modal, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { useAuth } from '../context/AuthContext';

import UserHorizontalMenu from '../components/UserComponents/UserMenu/UserHorizontalMenu';
import LoggedAsText from '../components/UserComponents/LoggedAssText';
import { SidebarNavButton } from '../components/UserComponents/Buttons/SideBarNavButton';

import "./style/UserPanel.css";

const drawerWidthOpen = 200;
const drawerWidthClosed = 50;

export default function UserPage() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const machine = localStorage.getItem('selectedMachine');
    const path = location.pathname.toLowerCase();

    if (!machine) {
      setModalOpen(true);
      return;
    }

    if (path === '/user') {
      navigate(`/user/${machine}`, { replace: true });
      return;
    }

    const pathParts = path.split('/').filter(Boolean);
    if (pathParts.length === 2 && pathParts[0] === 'user') {
      const selectedMachineFromPath = pathParts[1];
      if (selectedMachineFromPath !== machine) {
        navigate(`/user/${machine}`, { replace: true });
      }
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    const machine = localStorage.getItem('selectedMachine');
    if (!machine) setModalOpen(true);
    else setModalOpen(false);
  }, []);

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem('selectedMachine');
    navigate('/');
  };

  const toggleOpen = () => {
    setOpen(!open);
  };

  const handleMachineSelect = (machine) => {
    localStorage.setItem('selectedMachine', machine);
    setModalOpen(false);
    navigate(`/user/${machine}`, { replace: true });
  };

  return (
    <>
      <CssBaseline />
      {/* MODAL WYBORU MASZYNY */}
      <Modal
        open={modalOpen}
        onClose={() => {}}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        disableEscapeKeyDown
        BackdropProps={{
          style: { backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1200 }
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            minWidth: 320,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            outline: 'none',
            zIndex: 1500
          }}
        >
          <h3 id="modal-title" style={{ marginBottom: 54, textAlign: 'center' }}>
            Witaj {user?.name}, na której maszynie dzisiaj pracujesz?
          </h3>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleMachineSelect('psg1')}
              sx={{ minWidth: 90 }}
            >
              PSG1
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleMachineSelect('psg2')}
              sx={{ minWidth: 90 }}
            >
              PSG2
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleMachineSelect('psg3')}
              sx={{ minWidth: 90 }}
            >
              PSG3
            </Button>
          </Box>
        </Box>
      </Modal>

      <Box sx={{ display: 'flex', height: '100vh' }}>
        {/* Drawer boczny */}
        <Drawer
          anchor="left"
          variant="persistent"
          open={true}
          PaperProps={{
            sx: {
              width: open ? drawerWidthOpen : drawerWidthClosed,
              bgcolor: '#1976d2',
              color: '#fff',
              overflowX: 'hidden',
              transition: 'width 0.3s',
              boxShadow: '8px 0 12px -4px rgba(0,0,0,0.3)',
              borderRight: 0
            }
          }}
          sx={{
            width: open ? drawerWidthOpen : drawerWidthClosed,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: open ? drawerWidthOpen : drawerWidthClosed,
              boxSizing: 'border-box'
            }
          }}
        >
          <Box
            sx={{
              display: 'flex',
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
              icon={<ContactMailIcon />}
            />
            <Divider sx={{ my: 1, width: "100%", bgcolor: "rgba(255,255,255,0.2)" }} />
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
          </Box>
        </Drawer>

        {/* Główna zawartość przesuwana przez Drawer */}
        <Box
          flexGrow={1}
          p={3}
          sx={{
            transition: 'margin-left 0.3s',
            marginLeft: open ? `${drawerWidthOpen}px` : `${drawerWidthClosed}px`
          }}
        >
          <LoggedAsText />
          <div className="div-full-width">
            <UserHorizontalMenu />
          </div>
          <div className="div-80-width">
            <Outlet />
          </div>
        </Box>
      </Box>
    </>
  );
}
