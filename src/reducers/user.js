import { SET_USER, CLEAR_USER } from '../constants/types';

const initialState = { currentUser: null, isLoading: true };

const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload,
        isLoading: false,
      };
    case CLEAR_USER:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default user;
