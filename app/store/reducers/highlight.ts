import { AnyAction } from 'redux';
import { Product } from '../../types/Product';

interface HighlightState {
  loading: boolean;
  highlight: Product[];
  error: string | null;
}

const initialState: HighlightState = {
  loading: false,
  highlight: [],
  error: null,
};

const highlight = (state = initialState, action: AnyAction): HighlightState => {
  switch (action.type) {
    case 'GET_HIGHLIGHT_REQUEST_BY_HANDLE':
      return { ...state, loading: true, error: null };

    case 'GET_HIGHLIGHT_SUCCESS_BY_HANDLE':
      return { ...state, loading: false, highlight: action.payload };

    case 'GET_HIGHLIGHT_FAIL_BY_HANDLE':
    case 'HIGHLIGHT_ERROR':
      return { ...state, loading: false, error: action.payload };

    case 'ADD_TO_HIGHLIGHT':
      if (state.highlight.find((item) => item._id === action.payload)) {
        return state;
      }
      return {
        ...state,
        highlight: [...state.highlight, { _id: action.payload } as Product],
      };

    case 'REMOVE_FROM_HIGHLIGHT':
      return {
        ...state,
        highlight: state.highlight.filter((item) => item._id !== action.payload),
      };

    default:
      return state;
  }
};

export default  highlight;
