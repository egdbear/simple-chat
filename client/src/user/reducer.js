import { SAVE_USER, REMOVE_USER } from './actions';

const initialState = {};

export default function(state = initialState, action) {
  if (action) {
    if (action.type === SAVE_USER) {
      const user = action.payload;
      return {...state,  ...user};
    }

    if (action.type === REMOVE_USER) {
      return {...initialState};
    }
  }

  return state;
}
