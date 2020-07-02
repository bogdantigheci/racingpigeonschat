import {
  SET_CURRENT_CHANNEL,
  SET_PRIVATE_CHANNEL,
  SET_USER_POSTS,
} from '../constants/types';



export const setCurrentChannelSuccess = (channel) => ({
  type: SET_CURRENT_CHANNEL,
  payload: channel,
});

export const setUserPostsSuccess = (posts) => ({
  type: SET_USER_POSTS,
  payload: posts,
});

export const setPrivateChannelSuccess = (privateChannel) => ({
  type: SET_PRIVATE_CHANNEL,
  payload: privateChannel,
});

export const setCurrentChannel = (channel) => (dispatch) => {
  dispatch(setCurrentChannelSuccess(channel));
};

export const setUserPosts = (posts) => (dispatch) => {
  dispatch(setUserPostsSuccess(posts));
};
export const setPrivateChannel = (privateChannel) => (dispatch) => {
  dispatch(setPrivateChannelSuccess(privateChannel));
};
