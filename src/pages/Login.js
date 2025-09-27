import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f7f7;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
`;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://reqres.in/api/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/users');
    } catch (err) {
      alert('Login failed!');
    }
  };

  return (
    <LoginWrapper>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <Button type="submit">Login</Button>
      </Form>
    </LoginWrapper>
  );
}

export default Login;
