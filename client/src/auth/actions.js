export const SET_TOKEN = 'AUTH__SET_TOKEN';
export const REMOVE_TOKEN = 'AUTH__REMOVE_TOKEN';

export function setToken(token)  {
  return { type: SET_TOKEN, payload: token };
}

export function removeToken() {
  return { type: REMOVE_TOKEN };
}
