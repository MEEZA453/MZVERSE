import * as api from "../../api";
import { AppDispatch } from "../store";

// ----- PayPal -----
export const createPaypalOrder = (productId: string, token: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: "CREATE_ORDER_REQUEST", meta: "paypal" });

    const { data } = await api.createPaypalOrder(productId, token);

    dispatch({ type: "CREATE_ORDER_SUCCESS", payload: data, meta: "paypal" });
    return data; // for PayPal Buttons
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch({ type: "CREATE_ORDER_FAIL", payload: errorMsg, meta: "paypal" });
  }
};

export const capturePaypalOrder = (orderId: string, token: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: "CAPTURE_ORDER_REQUEST", meta: "paypal" });

    const { data } = await api.capturePaypalOrder(orderId, token);

    dispatch({ type: "CAPTURE_ORDER_SUCCESS", payload: data, meta: "paypal" });
    return data;
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch({ type: "CAPTURE_ORDER_FAIL", payload: errorMsg, meta: "paypal" });
  }
};

// ----- Razorpay -----
export const createRazorpayOrder = (productId: string, token: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: "CREATE_ORDER_REQUEST", meta: "razorpay" });

    const { data } = await api.createRazorpayOrder(productId, token);

    dispatch({ type: "CREATE_ORDER_SUCCESS", payload: data, meta: "razorpay" });
    return data; // contains razorpay order_id & key
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch({ type: "CREATE_ORDER_FAIL", payload: errorMsg, meta: "razorpay" });
  }
};

export const captureRazorpayPayment = (payload: any, token: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: "CAPTURE_ORDER_REQUEST", meta: "razorpay" });

    const { data } = await api.captureRazorpayPayment(payload, token);

    dispatch({ type: "CAPTURE_ORDER_SUCCESS", payload: data, meta: "razorpay" });
    return data;
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch({ type: "CAPTURE_ORDER_FAIL", payload: errorMsg, meta: "razorpay" });
  }
};
