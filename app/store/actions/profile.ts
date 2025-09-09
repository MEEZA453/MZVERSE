import * as api from '../../api';
import { AppDispatch } from '../store';

export const getUserByHandle = (handle: string, token: string) => async (dispatch: AppDispatch) => {
  try {
    // clear any previous profile immediately
    dispatch({ type: 'CLEAR_PROFILE' });

    // start request
    dispatch({ type: 'GET_USER_BY_HANDLE_REQUEST', meta: { handle } });

    const { data } = await api.getUserByHandle(handle, token);

    dispatch({
      type: 'GET_USER_BY_HANDLE_SUCCESS',
      payload: data,
      meta: { handle },
    });
  } catch (error: any) {
    const errMsg = error.response?.data?.message || error.message || 'Failed to fetch profile';
    dispatch({
      type: 'GET_USER_BY_HANDLE_FAIL',
      payload: errMsg,
      meta: { handle },
    });
  }
};
