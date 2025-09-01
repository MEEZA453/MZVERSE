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
  notification
});

export type RootState = ReturnType<typeof rootReducer>; // ✅ Type for useSelector

export default rootReducer;
