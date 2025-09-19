import { combineReducers } from 'redux';
import design from './design';
import cart from './cart';
import auth from './auth'
import getProductOfUser from './getProductOfUser';
import favourites from './fav';
import posts from './post'
import follow from './follow'
import search from './search'
import highlight from './highlight'
import notification from "./notification";
import promotion from './promotion';
import jury from './jury';
import profile from './profile';
import attach from './attach';
import freeProducts from './order';
import payment from './payment';
import razorpayConnect from './razorpayConnect';
const rootReducer = combineReducers({
  design,
  cart,
  auth, 
  getProductOfUser,
  favourites,
  posts,
  follow,
  search,
  highlight , 
  promotion,
  profile,
  notification,
  jury,
  attach,
  freeProducts,
  payment,
  razorpayConnect,
});

export type RootState = ReturnType<typeof rootReducer>; // ✅ Type for useSelector

export default rootReducer;
