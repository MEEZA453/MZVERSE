import * as api from '../../api';
import { AppDispatch } from '../store';

// Follow a user
export const followUser = (targetId: string, token: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: 'FOLLOW_REQUEST' });

    await api.followUser(targetId, token);

    dispatch({ type: 'FOLLOW_SUCCESS', payload: targetId });
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch({ type: 'FOLLOW_FAIL', payload: errorMsg });
  }
};

// Unfollow a user
export const unfollowUser = (targetId: string, token: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: 'UNFOLLOW_REQUEST' });

    await api.unfollowUser(targetId, token);

    dispatch({ type: 'UNFOLLOW_SUCCESS', payload: targetId });
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch({ type: 'UNFOLLOW_FAIL', payload: errorMsg });
  }
};

// Get followers by handle
export const getFollowersByHandle = (handle: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: 'GET_FOLLOWERS_REQUEST' });

    const { data } = await api.getFollowers(handle);

    dispatch({ type: 'GET_FOLLOWERS_SUCCESS', payload: data });
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch({ type: 'GET_FOLLOWERS_FAIL', payload: errorMsg });
  }
};

// Get following by handle
export const getFollowingByHandle = (handle: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: 'GET_FOLLOWING_REQUEST' });

    const { data } = await api.getFollowing(handle);

    dispatch({ type: 'GET_FOLLOWING_SUCCESS', payload: data });
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch({ type: 'GET_FOLLOWING_FAIL', payload: errorMsg });
  }
};
