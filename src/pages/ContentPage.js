import React from 'react';
import { useAuth } from '../context/AuthContext';

const ContentPage = () => {
  const { user } = useAuth();

  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <h2>Strona dla edytora lub admina</h2>
      <p>Witaj, {user && user.email}! Masz specjalne uprawnienia do tej strony.</p>
    </div>
  );
};

export default ContentPage;
