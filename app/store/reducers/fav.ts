import { AnyAction } from 'redux';
import { Product } from '../../types/Product';

interface FavoritesState {
  loading: boolean;
  favourites: Product[]; // populated favorites
  error: string | null;
}

const initialState: FavoritesState = {
  loading: false,
  favourites: [],
  error: null,
};

const favourites = (state = initialState, action: AnyAction): FavoritesState => {
  switch (action.type) {
    case 'GET_FAVORITES_REQUEST':
      return { ...state, loading: true, error: null };

    case 'GET_FAVORITES_SUCCESS':
      return { ...state, loading: false, favourites: action.payload };

    case 'GET_FAVORITES_FAIL':
    case 'FAVORITES_ERROR':
      return { ...state, loading: false, error: action.payload };

    case 'ADD_TO_FAVORITES':
      // Only add if not already present
      if (state.favourites.find((item) => item._id === action.payload)) {
        return state;
      }
      return {
        ...state,
        favourites: [...state.favourites, { _id: action.payload } as Product], // lightweight
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
