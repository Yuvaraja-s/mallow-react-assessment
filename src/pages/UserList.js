import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../redux/actions/userActions';
import styled from 'styled-components';

const ListWrapper = styled.div`
  padding: 20px;
`;

function UserList() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector(state => state.users);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');


 const handleDelete = async (id) => {
  if(window.confirm('Are you sure you want to delete this user?')) {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      dispatch(getUsers(page)); 
    } catch(err) {
      alert('Failed to delete user!');
    }
  }
};

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
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={{ padding: '10px', width: '300px', marginBottom: '20px' }}
        />
      {loading ? <p>Loading...</p> : error ? <p>{error}</p> : (
       <ul>
        {filteredUsers.map(user => (
            <li key={user.id}>
            {user.first_name} {user.last_name} - {user.email}
            <button onClick={() => setEditUser(user)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
            </li>
        ))}
        </ul>

        {editUser && <EditUserModal user={editUser} onClose={() => setEditUser(null)} onUserUpdated={() => dispatch(getUsers(page))} />}
      )}
      <button onClick={() => setPage(prev => prev - 1)} disabled={page===1}>Prev</button>
      <button onClick={() => setPage(prev => prev + 1)}>Next</button>
    </ListWrapper>
  );
}

export default UserList;
