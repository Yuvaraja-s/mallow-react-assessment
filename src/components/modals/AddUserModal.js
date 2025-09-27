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
  background-color: #28a745;
  color: white;
  border: none;
  cursor: pointer;
`;

export default function AddUserModal({ onClose, onUserAdded }) {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://reqres.in/api/users', { first_name, last_name, email });
      onUserAdded(res.data);
      onClose();
    } catch (err) {
      alert('Failed to add user!');
    }
  };

  return (
    <Modal onClose={onClose}>
      <h2>Add User</h2>
      <Form onSubmit={handleSubmit}>
        <Input placeholder="First Name" value={first_name} onChange={e => setFirstName(e.target.value)} required />
        <Input placeholder="Last Name" value={last_name} onChange={e => setLastName(e.target.value)} required />
        <Input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <button onClick={() => setShowAddModal(true)} style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
        Add User
        </button>
{showAddModal && (
  <AddUserModal
    onClose={() => setShowAddModal(false)}
    onUserAdded={() => dispatch(getUsers(page))}
  />
)}

      </Form>
    </Modal>
  );
}
