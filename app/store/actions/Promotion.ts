import * as api from '../../api';
import { AppDispatch } from '../store';
import { Product } from '../../types/Product';


export const getPromotion = (token: string) => async (dispatch: AppDispatch) => {
  console.log('action token is ', token);
  try {
    dispatch({ type: 'GET_PROMOTION_REQUEST_BY_HANDLE' });

    const { data } = await api.getPromotion(token);
console.log(data ,  'action')
    // backend sends data.highlights
    dispatch({ 
      type: 'GET_PROMOTION_SUCCESS_BY_HANDLE', 
      payload: data.promotions 
    });
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch({ type: 'GET_PROMOTION_FAIL_BY_HANDLE', payload: errorMsg });
  }
};

export const addToPromotion = (designId: string, token: string) => async (dispatch: AppDispatch) => {
  try {
    await api.addToPromotion(designId, token);

    dispatch({ type: 'ADD_TO_PROMOTION', payload: designId });
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch({ type: 'PROMOTION_ERROR', payload: errorMsg });
  }
};

export const removeFromPromotion = (designId: string, token: string) => async (dispatch: AppDispatch) => {
  try {
    await api.removeFromPromotion(designId, token);

    dispatch({ type: 'REMOVE_FROM_PROMOTION', payload: designId });
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch({ type: 'HIGHLIGHT_ERROR', payload: errorMsg });
  }
};
