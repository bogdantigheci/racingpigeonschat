import { SET_COLORS } from '../constants/types';

const initialColorsState = {
  primaryColor: 'blue',
  secondaryColor: '#eee',
};

const colors = (state = initialColorsState, action) => {
  switch (action.type) {
    case SET_COLORS:
      return {
        primaryColor: action.payload.primaryColor,
        secondaryColor: action.payload.secondaryColor,
      };
    default:
      return state;
  }
};

export default colors;
