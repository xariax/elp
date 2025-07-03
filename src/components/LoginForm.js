import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styled from 'styled-components';
import logo from '../pages/logo.png'
// Styled-components deklaruj ZAWSZE poza funkcją komponentu!
const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  align-items:center;
  gap: 15px;
  background: rgba(255,255,255,0.65);
  padding: 32px 24px;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.1);
  min-height:250px;
  min-width: 300px;
`;

const StyledInput = styled.input`
  width: 80%;
  border-radius: 10px;
  padding: 10px;
  border: 2px solid #ccc;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  &:focus {
  border-color: #1976d2;}
  &:hover {
  border-color: #1976d2;}
`;

const StyledButton = styled.button`
  border-radius: 10px;
  width:50%;
  padding: 20px;
  border: none;
  background: #1976d2;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background:rgb(45, 90, 141);
  }
`;

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

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
    
    <FormBox onSubmit={handleSubmit}>
      <img src={logo} alt='logo firmy' style={{marginBottom:'20px'}}/>
      {error && <div >{error}</div>}
       
      <StyledInput
        type="text"
        value={credentials.login}
        onChange={e => setCredentials({ ...credentials, login: e.target.value })}
        placeholder="Login"
        required
        disabled={isSubmitting}
      />

     
      <StyledInput
        type="password"
        value={credentials.password}
        onChange={e => setCredentials({ ...credentials, password: e.target.value })}
        placeholder="Hasło"
        required
        disabled={isSubmitting}
      />
      <StyledButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Logowanie...' : 'Zaloguj'}
      </StyledButton>
    </FormBox>
  );
};

export default LoginForm;
