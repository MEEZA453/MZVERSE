import { combineReducers } from 'redux';
import design from './design';
import cart from './cart'; // update this to TS if needed

const rootReducer = combineReducers({
  design,
  cart,
});

export type RootState = ReturnType<typeof rootReducer>; // ✅ Type for useSelector

export default rootReducer;
