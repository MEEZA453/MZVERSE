import {Product} from '../../types/Product'
import {AnyAction} from 'redux'
export default (state:Product[] = [], action : AnyAction):Product[] => {
  switch (action.type) {
    case 'FETCH_ALL_PRODUCTS':
      return [...state, ...action.payload];

    case 'POST_PRODUCT':
      return [...state, action.payload];

    case 'CREATE-ORDER':
      return [...state, ...action.payload];

    case 'DELETE_PRODUCT':
      return state.filter((design) => design._id !== action.payload);

    default:
      return state;
  }
};
