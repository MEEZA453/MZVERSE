import { combineReducers } from 'redux';
import design from './design';
import cart from './cart';
import auth from './auth'
import getProductOfUser from './getProductOfUser';

const rootReducer = combineReducers({
  design,
  cart,
  auth, 
  getProductOfUser
});

export type RootState = ReturnType<typeof rootReducer>; // ✅ Type for useSelector

export default rootReducer;
