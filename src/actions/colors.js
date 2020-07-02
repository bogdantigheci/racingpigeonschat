import { SET_COLORS } from '../constants/types';

export const setColorsSuccess = (primaryColor, secondaryColor) => ({
  type: SET_COLORS,
  payload: {
    primaryColor,
    secondaryColor,
  },
});

export const setColors = (primaryColor, secondaryColor) => (dispatch) => {
  dispatch(setColorsSuccess(primaryColor, secondaryColor));
};
