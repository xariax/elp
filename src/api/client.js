import axios from 'axios';

/**
 * Konfiguracja klienta HTTP
 * BACKEND INTEGRATION: Ustaw prawidłowy adres API
 */
const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api', // Zmień na adres twojego backendu
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

// Automatyczne dodawanie tokena do nagłówków
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Obsługa błędów autentykacji
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // BACKEND INTEGRATION: Dodaj obsługę wylogowania
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
