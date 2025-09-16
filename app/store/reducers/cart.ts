import { AnyAction } from "redux";
import { Product } from "../../types/Product";

interface CartItem {
  product: Product;
  quantity?: number;
}

interface CartState {
  loading: boolean;
  items: CartItem[];
  error: string | null;
}

const initialState: CartState = {
  loading: false,
  items: [],
  error: null,
};

const cart = (state = initialState, action: AnyAction): CartState => {
  switch (action.type) {
    case "GET_CART_REQUEST":
      return { ...state, loading: true, error: null };

    case "GET_CART_SUCCESS":
      return {
        ...state,
        loading: false,
        items: action.payload, // payload should already be CartItem[]
      };

    case "GET_CART_FAIL":
    case "CART_ERROR":
      return { ...state, loading: false, error: action.payload };

    case "ADD_TO_CART":
      if (state.items.find((item) => item.product._id === action.payload._id)) {
        return state; // no duplicates
      }
      return {
        ...state,
        items: [...state.items, action.payload], // payload = { product, quantity }
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter(
          (item) => item.product._id !== action.payload
        ),
      };

    case "CLEAR_CART":
      return {
        ...state,
        items: [],
      };

    default:
      return state;
  }
};

export default cart;
