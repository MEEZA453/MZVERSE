import { combineReducers } from 'redux';
import design from './design';
import cart from './cart';
import auth from './auth'

const rootReducer = combineReducers({
  design,
  cart,
  auth
});

export type RootState = ReturnType<typeof rootReducer>; // ✅ Type for useSelector

export default rootReducer;
