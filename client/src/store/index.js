import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers';
import { createLogger } from 'redux-logger';

export default function configureStore(initialState) {
  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(
      createLogger()
    )
  );

  return store;
};
