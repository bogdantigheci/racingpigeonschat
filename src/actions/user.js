import { SET_USER, CLEAR_USER } from '../constants/types';

export const setUserSuccess = (user) => ({
  type: SET_USER,
  payload: user,
});

export const clearUserSuccess = () => ({
  type: CLEAR_USER,
});

export const setUser = (user) => (dispatch) => {
  dispatch(setUserSuccess(user));
};

export const clearUser = () => (dispatch) => {
  dispatch(clearUserSuccess());
};
