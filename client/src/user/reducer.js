import { SAVE_USER, REMOVE_USER } from './actions';

const initialState = { user: {} };

export default function(state = initialState, action) {
  if (action) {
    if (action.type === SAVE_USER) {
      return {...state,  user: action.payload.user };
    }

    if (action.type === REMOVE_USER) {
      return {...state, user: {} };
    }
  }

  return state;
}
