import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import { AnimatePresence, motion } from 'framer-motion';

import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';

// ADMIN IMPORTS
import AdminPanel from './pages/AdminPanelLayout';
import MachineManagement from './components/AdminComponents/MachineManagement';
import UserManagement from './components/AdminComponents/UserManagement';
import Reports from './components/AdminComponents/Reports';
import Settings from './components/AdminComponents/Settings';
import AdminPSG1 from './components/AdminComponents/Machines/AdminPSG1';
import AdminPSG2 from './components/AdminComponents/Machines/AdminPSG2';
import AdminPSG3 from './components/AdminComponents/Machines/AdminPSG3';
import ENGEL from './components/AdminComponents/Machines/ENGEL';
import GALUS from './components/AdminComponents/Machines/GALUS';

// USER IMPORTS
import UserPage from './components/UserComponents/UserPage';
import UserMachineHome from './components/UserComponents/UserMachineHome';
import ORDER from './components/UserComponents/UserMenu/Order';
import Stock from './components/UserComponents/UserMenu/Stock';
import Plans from './components/UserComponents/UserMenu/Plans';
import Tools from './components/UserComponents/UserMenu/Tools';

function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route 
            path="/" 
            element={
              <motion.div
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 0 }}
                transition={{ duration: 0.3 }} 
              >
                <LoginPage />
              </motion.div>
            } 
          />

          {/* Panel administratora z podtrasami */}
          <Route element={<ProtectedRoute requiredRole="Admin" />}>
            <Route path="/admin"
                element={
                  <motion.div
                    initial={{ opacity: 0, x: 0 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 0 }}
                    transition={{ duration: 0.3 }} 
                  >
                    <AdminPanel />
                  </motion.div>
                }>
              <Route index element={<MachineManagement />} />
              <Route path="machines" element={<MachineManagement />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="reports" element={<Reports />} />
              <Route path="settings" element={<Settings />} />
              <Route path="machines/psg1" element={<AdminPSG1 />} />
              <Route path="machines/psg2" element={<AdminPSG2 />} />
              <Route path="machines/psg3" element={<AdminPSG3 />} />
              <Route path="machines/engel" element={<ENGEL />} />
              <Route path="machines/galus" element={<GALUS />} />
            </Route>
          </Route>

          {/* Panel użytkownika */}
          <Route element={<ProtectedRoute requiredRole="User" />}>
            <Route path="/user" element={<UserPage />}>
              <Route path=":machine" element={<UserMachineHome />} />
              <Route path=":machine/plans" element={<Plans />} />
              <Route path=":machine/orders" element={<ORDER />} />
              <Route path=":machine/stock" element={<Stock />} />
              <Route path=":machine/tools" element={<Tools />} />
            </Route>
          </Route>
        </Routes>
      </AnimatePresence>
    </AuthProvider>
  );
}

export default App;
