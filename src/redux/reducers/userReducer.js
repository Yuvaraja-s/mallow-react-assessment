import { GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_FAIL } from '../actions/userActions';

const initialState = {
  loading: false,
  users: [],
  error: null,
};

export default function userReducer(state = initialState, action) {
  switch(action.type) {
    case GET_USERS_REQUEST:
      return { ...state, loading: true };
    case GET_USERS_SUCCESS:
      return { ...state, loading: false, users: action.payload.data };
    case GET_USERS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
