import * as api from "../../api"
import { AppDispatch } from "../store";
import { Product } from "../../types/Product";

// Get User Cart
export const getUserCart = (token: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: "GET_CART_REQUEST" });

    const { data } = await api.getUserCart(token);

    dispatch({ type: "GET_CART_SUCCESS", payload: data.cart.items });
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch({ type: "GET_CART_FAIL", payload: errorMsg });
  }
};

// Add to Cart
export const addToCart = (productId: string, token: string) => async (dispatch: AppDispatch) => {
  try {
    await api.addToCart(productId, token);

    dispatch({ type: "ADD_TO_CART", payload: productId });
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch({ type: "CART_ERROR", payload: errorMsg });
  }
};

// Remove from Cart
export const removeFromCart = (productId: string, token: string) => async (dispatch: AppDispatch) => {
  try {
    await api.removeFromCart(productId, token);

    dispatch({ type: "REMOVE_FROM_CART", payload: productId });
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch({ type: "CART_ERROR", payload: errorMsg });
  }
};

// Clear Cart
export const clearCart = (token: string) => async (dispatch: AppDispatch) => {
  try {
    await api.clearCart(token);

    dispatch({ type: "CLEAR_CART" });
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch({ type: "CART_ERROR", payload: errorMsg });
  }
};
