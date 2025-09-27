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

  useEffect(() => {
    dispatch(getUsers(page));
  }, [dispatch, page]);

  return (
    <ListWrapper>
      <h2>User List</h2>
      {loading ? <p>Loading...</p> : error ? <p>{error}</p> : (
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.first_name} {user.last_name} - {user.email}</li>
          ))}
        </ul>
      )}
      <button onClick={() => setPage(prev => prev - 1)} disabled={page===1}>Prev</button>
      <button onClick={() => setPage(prev => prev + 1)}>Next</button>
    </ListWrapper>
  );
}

export default UserList;
