import * as api from '../../api';
import { AppDispatch } from '../store';


export const getProductById = (id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: 'GET_PRODUCT_REQUEST' });

    const { data } = await api.getProductById(id);

    dispatch({ type: 'GET_PRODUCT_SUCCESS', payload: data });
  } catch (error: any) {
    const errMsg = error.response?.data?.message || error.message;
    dispatch({ type: 'GET_PRODUCT_FAIL', payload: errMsg });
  }
};

export const register = (user: { name: string; id: string; password: string }) => 
  async (dispatch: AppDispatch) => {
    try {
      const { data } = await api.registerUser(user);
      dispatch({ type: 'REGISTER_SUCCESS', payload: data });
      return data;
    } catch (error: any) {
      const errMsg = error.response?.data?.message || error.message;
      dispatch({ type: 'REGISTER_FAIL', payload: errMsg });
      throw errMsg; // Rethrow so frontend can catch it
    }
};

export const login = (user: { id: string; password: string }) => async (dispatch: AppDispatch) => {
  try {
    const { data } = await api.loginUser(user);

    dispatch({ type: 'LOGIN_SUCCESS', payload: data });

    return data; // ✅ Return data to access in component
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message;

    dispatch({ type: 'LOGIN_FAIL', payload: errorMessage });

    // ❗️Throw error to be caught in component's catch block
    throw new Error(errorMessage);
  }
};

export const logout = () => (dispatch: AppDispatch) => {
  dispatch({ type: 'LOGOUT' });
};
