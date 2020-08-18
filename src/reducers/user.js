import { GET_USER, LOGOUT_USER } from '../actions/user'

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case LOGOUT_USER:
      return {};
    default:
      return state;
  }
}