import { Routes, Route } from 'react-router-dom';
import MachineManagement from '../components/AdminComponents/MachineManagement';
import UserManagement from '../components/AdminComponents/UserManagement';
import Reports from '../components/AdminComponents/Reports';
import Settings from '../components/AdminComponents/Settings';

const AdminRoutes = () => (
  <Routes>
    <Route index element={<MachineManagement />} />
    <Route path="machines" element={<MachineManagement />} />
    <Route path="users" element={<UserManagement />} />
    <Route path="reports" element={<Reports />} />
    <Route path="settings" element={<Settings />} />
  </Routes>
);

export default AdminRoutes;
