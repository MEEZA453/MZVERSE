import * as api from '../../api';
import { AppDispatch } from '../store';

// 🔹 Search Users
export const searchUsers = (query: string, token: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: 'SEARCH_USERS_REQUEST' });

    const { data } = await api.searchUsers(query, token);

    dispatch({
      type: 'SEARCH_USERS_SUCCESS',
      payload: data,
    });
  } catch (error: any) {
    const errMsg = error.response?.data?.message || error.message;
    dispatch({
      type: 'SEARCH_USERS_FAIL',
      payload: errMsg,
    });
  }
};

// 🔹 Default Users (if query is blank)
export const getDefaultUsers = (token: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: 'SEARCH_USERS_REQUEST' });

    const { data } = await api.getDefaultUsers(token);

    dispatch({
      type: 'SEARCH_USERS_SUCCESS', // ✅ reuse success reducer
      payload: data,
    });
  } catch (error: any) {
    const errMsg = error.response?.data?.message || error.message;
    dispatch({
      type: 'SEARCH_USERS_FAIL',
      payload: errMsg,
    });
  }
};

// 🔹 Search Posts
export const searchPosts = (query: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: 'SEARCH_POSTS_REQUEST' });

    const { data } = await api.searchPosts(query);

    dispatch({
      type: 'SEARCH_POSTS_SUCCESS',
      payload: data,
    });
  } catch (error: any) {
    const errMsg = error.response?.data?.message || error.message;
    dispatch({
      type: 'SEARCH_POSTS_FAIL',
      payload: errMsg,
    });
  }
};

// 🔹 Default Posts
export const getDefaultPosts = () => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: 'SEARCH_POSTS_REQUEST' });

    const { data } = await api.getDefaultPosts();

    dispatch({
      type: 'SEARCH_POSTS_SUCCESS',
      payload: data,
    });
  } catch (error: any) {
    const errMsg = error.response?.data?.message || error.message;
    dispatch({
      type: 'SEARCH_POSTS_FAIL',
      payload: errMsg,
    });
  }
};

// 🔹 Search Assets
export const searchAssets = (
  query: string,
  page: number = 1,
  limit: number = 10,
  token: string
) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: 'SEARCH_ASSETS_REQUEST' });

    const { data } = await api.searchAssets(query, page, limit, token);

    dispatch({
      type: 'SEARCH_ASSETS_SUCCESS',
      payload: {
        page: data.page,
        limit: data.limit,
        count: data.count,
        results: data.results, // already includes isMyProduct from backend
      },
    });
  } catch (error: any) {
    const errMsg = error.response?.data?.message || error.message;
    dispatch({
      type: 'SEARCH_ASSETS_FAIL',
      payload: errMsg,
    });
  }
};
// 🔹 Default Assets
export const getDefaultAssets = (page: number = 1, limit: number = 10 , token:string) => 
  async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: 'SEARCH_ASSETS_REQUEST' });

      const { data } = await api.getDefaultAssets(page, limit, token);

      dispatch({
        type: 'SEARCH_ASSETS_SUCCESS',
        payload: {
          page: data.page,
          limit: data.limit,
          count: data.count,
          results: data.results, // ✅ backend already sends isMyProduct
        },
      });
    } catch (error: any) {
      const errMsg = error.response?.data?.message || error.message;
      dispatch({
        type: 'SEARCH_ASSETS_FAIL',
        payload: errMsg,
      });
    }
  };

