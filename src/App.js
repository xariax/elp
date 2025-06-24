import { Routes, Route, useLocation} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AnimatePresence, motion } from 'framer-motion';
import ProtectedRoute from './components/ProtectedRoute';
import AdminPanel from './pages/AdminPanelLayout';
import UserPanel from './pages/UserPanel';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage'
import MachineManagement from './components/AdminComponents/MachineManagement';
import UserManagement from './components/AdminComponents/UserManagement';
import Reports from './components/AdminComponents/Reports';
import Settings from './components/AdminComponents/Settings';
import PSG1 from './components/AdminComponents/Machines/PSG1';
import PSG2 from './components/AdminComponents/Machines/PSG2';
import PSG3 from './components/AdminComponents/Machines/PSG3';
import ENGEL from './components/AdminComponents/Machines/ENGEL';
import GALUS from './components/AdminComponents/Machines/GALUS';
function App() {

  const location = useLocation();
  return (
    <AuthProvider>
         <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route 
            path="/login" 
            element={
              <motion.div
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 0 }}
                transition={{ duration: 0.2 }} // 2 sekundy animacji przejścia
              >
                <LoginPage />
              </motion.div>
            } 
          />
        {/* Panel administratora z podtrasami */}
        <Route element={<ProtectedRoute requiredRole="admin" />}>
          <Route path="/admin"
              element={
                <motion.div
                  initial={{ opacity: 0, x: 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 0 }}
                  transition={{ duration: 0.2 }} // 2 sekundy animacji przejścia
                >
                  <AdminPanel />
                </motion.div>
              }>
            <Route index element={<MachineManagement />} />
            <Route path="machines" element={<MachineManagement />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
            <Route path="/admin/machines/psg1" element={<PSG1 />} />
            <Route path="/admin/machines/psg2" element={<PSG2 />} />
            <Route path="/admin/machines/psg3" element={<PSG3 />} />
            <Route path="/admin/machines/engel" element={<ENGEL />} />
            <Route path="/admin/machines/galus" element={<GALUS />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute requiredRole="user" />}>
         <Route path="/user" element={<UserPanel />} />
        </Route>
        
        <Route path="*" element={<HomePage />} />
      </Routes>
      </AnimatePresence>
    </AuthProvider>
  );
}

export default App;
