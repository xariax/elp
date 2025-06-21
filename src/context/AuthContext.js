import React, { createContext, useState, useContext, useEffect } from 'react';

// Tworzymy kontekst autentykacji
const AuthContext = createContext(null);

/**
 * Provider kontekstu autentykacji
 * @param {Object} props - Właściwości komponentu
 * @param {ReactNode} props.children - Dzieci komponentu
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Efekt inicjalizujący - sprawdza localStorage przy ładowaniu
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);
    setIsLoading(false);
  }, []);

  /**
   * Funkcja logująca użytkownika
   * @param {Object} userData - Dane użytkownika
   * @param {string} [token] - Token autoryzacyjny (dla backendu)
   */
  const login = (userData, token = null) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    
    // BACKEND INTEGRATION: Zapisz token w localStorage
    if (token) localStorage.setItem('authToken', token);
  };

  /**
   * Funkcja wylogowująca użytkownika
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('authToken'); // BACKEND INTEGRATION: Usuń token
  };

  /**
   * Sprawdza czy użytkownik ma wymagane uprawnienia
   * @param {string|string[]} requiredRole - Wymagana rola lub tablica ról
   * @returns {boolean} - Czy użytkownik ma uprawnienia
   */
  const hasPermission = (requiredRole) => {
    if (!user) return false;
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    return roles.includes(user.role);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook do łatwego dostępu do kontekstu autentykacji
 * @returns {Object} - Wartości kontekstu
 */
export const useAuth = () => useContext(AuthContext);
