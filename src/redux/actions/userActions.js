import axios from 'axios';

export const GET_USERS_REQUEST = 'GET_USERS_REQUEST';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAIL = 'GET_USERS_FAIL';

export const getUsers = (page = 1) => async (dispatch) => {
  dispatch({ type: GET_USERS_REQUEST });
  try {
    const { data } = await axios.get(`https://reqres.in/api/users?page=${page}`);
    dispatch({ type: GET_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_USERS_FAIL, payload: error.message });
  }
};
