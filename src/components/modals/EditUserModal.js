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
`;

const Button = styled.button`
  padding: 10px;
  background-color: #ffc107;
  color: white;
  border: none;
  cursor: pointer;
`;

export default function EditUserModal({ user, onClose, onUserUpdated }) {
  const [first_name, setFirstName] = useState(user.first_name);
  const [last_name, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`https://reqres.in/api/users/${user.id}`, { first_name, last_name, email });
      onUserUpdated(res.data);
      onClose();
    } catch (err) {
      alert('Failed to update user!');
    }
  };

  return (
    <Modal onClose={onClose}>
      <h2>Edit User</h2>
      <Form onSubmit={handleSubmit}>
        <Input placeholder="First Name" value={first_name} onChange={e => setFirstName(e.target.value)} required />
        <Input placeholder="Last Name" value={last_name} onChange={e => setLastName(e.target.value)} required />
        <Input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <Button type="submit">Update</Button>
      </Form>
    </Modal>
  );
}
