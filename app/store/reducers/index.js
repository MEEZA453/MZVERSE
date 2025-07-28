import { combineReducers } from 'redux';
import design from './design';
import cart from './cart';

const rootReducer = combineReducers({
  design,
  cart,
});

export default rootReducer;
