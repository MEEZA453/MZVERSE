import { AnyAction } from 'redux';
import { Product } from '../../types/Product';

interface PromotionState {
  loading: boolean;
  promotion: Product[];
  error: string | null;
}

const initialState: PromotionState = {
  loading: false,
  promotion: [],
  error: null,
};

const promotion = (state = initialState, action: AnyAction): PromotionState => {
  switch (action.type) {
    case 'GET_PROMOTION_REQUEST_BY_HANDLE':
      return { ...state, loading: true, error: null };

    case 'GET_PROMOTION_SUCCESS_BY_HANDLE':
      return { ...state, loading: false, promotion: action.payload };

    case 'GET_PROMOTION_FAIL_BY_HANDLE':
    case 'PROMOTION_ERROR':
      return { ...state, loading: false, error: action.payload };

    case 'ADD_TO_PROMOTION':
      if (state.promotion.find((item) => item._id === action.payload)) {
        return state;
      }
      return {
        ...state,
        promotion: [...state.promotion, { _id: action.payload } as Product],
      };

    case 'REMOVE_FROM_PROMOTION':
      return {
        ...state,
        promotion: state.promotion.filter((item) => item._id !== action.payload),
      };

    default:
      return state;
  }
};

export default  promotion;
