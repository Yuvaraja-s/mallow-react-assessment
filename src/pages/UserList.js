import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../redux/actions/userActions';
import styled from 'styled-components';
import axios from 'axios';
import AddUserModal from '../components/modals/AddUserModal';
import EditUserModal from '../components/modals/EditUserModal';

const ListWrapper = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: auto;
`;

const UserItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;

  div {
    display: flex;
    gap: 10px;
  }

  button {
    padding: 5px 10px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }

  button.edit {
    background-color: #ffc107;
    color: white;
  }

  button.delete {
    background-color: #dc3545;
    color: white;
  }
`;

const SearchInput = styled.input`
  padding: 10px;
  width: 100%;
  max-width: 300px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const AddButton = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  margin-bottom: 20px;
`;

function UserList() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector(state => state.users);

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editUser, setEditUser] = useState(null);

  // Delete user
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`https://reqres.in/api/users/${id}`);
        dispatch(getUsers(page));
      } catch (err) {
        alert('Failed to delete user!');
      }
    }
  };

  // Filter users
  const filteredUsers = users.filter(user =>
    user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    dispatch(getUsers(page));
  }, [dispatch, page]);

  return (
    <ListWrapper>
      <h2>User List</h2>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <SearchInput
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <AddButton onClick={() => setShowAddModal(true)}>Add User</AddButton>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {filteredUsers.map(user => (
            <UserItem key={user.id}>
              {user.first_name} {user.last_name} - {user.email}
              <div>
                <button className="edit" onClick={() => setEditUser(user)}>Edit</button>
                <button className="delete" onClick={() => handleDelete(user.id)}>Delete</button>
              </div>
            </UserItem>
          ))}
        </ul>
      )}

      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button onClick={() => setPage(prev => prev - 1)} disabled={page === 1}>Prev</button>
        <button onClick={() => setPage(prev => prev + 1)}>Next</button>
      </div>

      {showAddModal && (
        <AddUserModal
          onClose={() => setShowAddModal(false)}
          onUserAdded={() => dispatch(getUsers(page))}
        />
      )}

      {editUser && (
        <EditUserModal
          user={editUser}
          onClose={() => setEditUser(null)}
          onUserUpdated={() => dispatch(getUsers(page))}
        />
      )}
    </ListWrapper>
  );
}

export default UserList;
