import React from 'react';
import { useAuth } from '../context/AuthContext';

/**
 * Panel użytkownika
 */
const Dashboard = () => {
  const { user, logout } = useAuth();

  // BACKEND INTEGRATION: Pobierz dane użytkownika z API
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     const response = await apiClient.get('/user/data');
  //     // ...obsłuż dane
  //   };
  //   fetchUserData();
  // }, []);

  return (
    <div>
      <h1>Panel użytkownika</h1>
      <p>Witaj, {user?.email}!</p>
      <button onClick={logout}>Wyloguj</button>
    </div>
  );
};

export default Dashboard;
