import { SET_TOKEN, REMOVE_TOKEN } from './actions';

const initialState = { token: null };

export default function(state = initialState, action) {
  if (action) {
    if (action.type === SET_TOKEN) {
      return {...state,  token:action.payload.token };
    }

    if (action.type === REMOVE_TOKEN) {
      return state.set('token', null);
    }
  }

  return state;
}
