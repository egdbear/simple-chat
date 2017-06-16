import authReducer from '../auth/reducer';
import userReducer from '../user/reducer';
import { combineReducers } from 'redux';

export default combineReducers({
  auth: authReducer,
  user: userReducer
});
