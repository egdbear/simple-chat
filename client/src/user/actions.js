export const SAVE_USER = 'USER__SAVE_USER';
export const REMOVE_USER = 'USER__REMOVE_USER';

export function saveUser(user)  {
  return { type: SAVE_USER, payload: user };
}

export function removeUser() {
  return { type: REMOVE_USER };
}
