import * as api from '../../api';
import { AppDispatch } from '../store';
import { Product } from '../../types/Product';


export const getHighlight = (token: string) => async (dispatch: AppDispatch) => {
  console.log('action token is ', token);
  try {
    dispatch({ type: 'GET_HIGHLIGHT_REQUEST_BY_HANDLE' });

    const { data } = await api.getHighlight(token);

    // backend sends data.highlights
    dispatch({ 
      type: 'GET_HIGHLIGHT_SUCCESS_BY_HANDLE', 
      payload: data.highlights 
    });
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch({ type: 'GET_HIGHLIGHT_FAIL_BY_HANDLE', payload: errorMsg });
  }
};

export const addToHighlight = (designId: string, token: string) => async (dispatch: AppDispatch) => {
  try {
    await api.addToHighlight(designId, token);

    dispatch({ type: 'ADD_TO_HIGHLIGHT', payload: designId });
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch({ type: 'HIGHLIGHT_ERROR', payload: errorMsg });
  }
};

export const removeFromHighlight = (designId: string, token: string) => async (dispatch: AppDispatch) => {
  try {
    await api.removeFromHighlight(designId, token);

    dispatch({ type: 'REMOVE_FROM_HIGHLIGHT', payload: designId });
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch({ type: 'HIGHLIGHT_ERROR', payload: errorMsg });
  }
};
