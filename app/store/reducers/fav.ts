import { AnyAction } from 'redux';
import { Product } from '../../types/Product';

interface FavoritesState {
  loading: boolean;
  favourites: Product[];
  error: string | null;
}

const initialState: FavoritesState = {
  loading: false,
  favourites: [],
  error: null,
};

const favourites = (state = initialState, action: AnyAction): FavoritesState => {
  switch (action.type) {
    case 'GET_FAVORITES_REQUEST_BY_HANDLE':
      return { ...state, loading: true, error: null };

    case 'GET_FAVORITES_SUCCESS_BY_HANDLE':
      return { ...state, loading: false, favourites: action.payload };

    case 'GET_FAVORITES_FAIL_BY_HANDLE':
    case 'FAVORITES_ERROR':
      return { ...state, loading: false, error: action.payload };

    case 'ADD_TO_FAVORITES':
      if (state.favourites.find((item) => item._id === action.payload)) {
        return state;
      }
      return {
        ...state,
        favourites: [...state.favourites, { _id: action.payload } as Product],
      };

    case 'REMOVE_FROM_FAVORITES':
      return {
        ...state,
        favourites: state.favourites.filter((item) => item._id !== action.payload),
      };

    default:
      return state;
  }
};

export default favourites;
