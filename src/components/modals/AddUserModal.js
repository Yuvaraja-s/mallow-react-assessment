import React, { useState } from 'react';
import Modal from './Modal';
import styled from 'styled-components';
import axios from 'axios';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Button = styled.button`
  padding: 12px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  margin-top: 10px;
  transition: all 0.3s;

  &:hover {
    background-color: #218838;
  }
`;

export default function AddUserModal({ onClose, onUserAdded }) {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://reqres.in/api/users', { first_name, last_name, email });
      onUserAdded(res.data); // Notify parent to refresh list
      onClose(); // Close modal
    } catch (err) {
      alert('Failed to add user!');
    }
  };

  return (
    <Modal onClose={onClose}>
      <h2>Add User</h2>
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="First Name"
          value={first_name}
          onChange={e => setFirstName(e.target.value)}
          required
        />
        <Input
          placeholder="Last Name"
          value={last_name}
          onChange={e => setLastName(e.target.value)}
          required
        />
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <Button type="submit">Add User</Button>
      </Form>
    </Modal>
  );
}
