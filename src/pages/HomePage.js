import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div>
    <h1>Strona główna</h1>
    <p>Witaj w naszej aplikacji!</p>
    <Link to="/login">Zaloguj się</Link>
  </div>
);

export default HomePage;
