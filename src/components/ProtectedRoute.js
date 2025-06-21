import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Komponent chroniący trasy na podstawie autentykacji i ról
 * @param {Object} props - Właściwości komponentu
 * @param {string|string[]} [props.requiredRole] - Wymagana rola lub role
 */
const ProtectedRoute = ({ requiredRole }) => {
  const { user, isLoading } = useAuth();

  // Wyświetl ładowanie podczas pobierania danych
  if (isLoading) return <div>Ładowanie...</div>;

  // Przekieruj niezalogowanych na stronę logowania
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Sprawdź uprawnienia jeśli zdefiniowano role
  if (requiredRole) {
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    if (!roles.includes(user.role)) {
      return <Navigate to="/" replace />; // BACKEND INTEGRATION: Można zmienić na /access-denied
    }
  }

  // Użytkownik ma dostęp - renderuj trasę
  return <Outlet />;
};

export default ProtectedRoute;
