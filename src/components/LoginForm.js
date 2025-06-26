import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// BACKEND INTEGRATION: Odkomentuj gdy będziesz mieć klienta API
// import apiClient from '../api/client';

/**
 * Formularz logowania
 */
const LoginForm = () => {
  const [credentials, setCredentials] = useState({ login: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  // BACKEND INTEGRATION: Zastąp tą tablicę połączeniem z API
  const users = [
    { login: 'Rafał', password: 'tajnehaslo', role: 'Admin' },
    { login: 'jan', password: 'jan123', role: 'User' },
    { login: 'anna', password: 'anna123', role: 'User' },
  ];

  /**
   * Obsługa logowania
   * @param {Event} e - Event formularza
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // BACKEND INTEGRATION: Zastąp ten blok połączeniem z API
    // try {
    //   const response = await apiClient.post('/login', credentials);
    //   login(response.data.user, response.data.token);
    //   navigate(foundUser.role === 'admin' ? '/admin' : '/dashboard', { replace: true });
    // } catch (err) {
    //   setError('Błąd logowania');
    // } finally {
    //   setIsSubmitting(false);
    // }

    // Logika tymczasowa (frontend only)
    const foundUser = users.find(
      user => user.login === credentials.login && user.password === credentials.password
    );

    if (foundUser) {
      login({
        login: foundUser.login,
        name: foundUser.login,
        role: foundUser.role
      });

      navigate(foundUser.role === 'Admin' ? '/admin' : '/user', { replace: true });
    } else {
      setError('Nieprawidłowy login lub hasło');
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
      <input
        type="text"
        value={credentials.login}
        onChange={e => setCredentials({ ...credentials, login: e.target.value })}
        placeholder="Login"
        required
        disabled={isSubmitting}
      />
      <input
        type="password"
        value={credentials.password}
        onChange={e => setCredentials({ ...credentials, password: e.target.value })}
        placeholder="Hasło"
        required
        disabled={isSubmitting}
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Logowanie...' : 'Zaloguj'}
      </button>
    </form>
  );
};

export default LoginForm;
