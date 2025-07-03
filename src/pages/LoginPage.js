import React from 'react';
import LoginForm from '../components/LoginForm';
import styled from 'styled-components';

const LoginPage = () => {

 const Wrapper = styled.div`
   width: 100vw;
  height: 100vh;
  background-image: url('https://www.elpes.com/wp-content/uploads/2022/02/slajd_1.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
 `;

  return (
  <Wrapper>

    <LoginForm />
  </Wrapper>
  )
};

export default LoginPage;
