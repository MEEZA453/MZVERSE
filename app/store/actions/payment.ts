import * as api from "../../api";
import { AppDispatch } from "../store";

// 1. Create Order
export const createOrder =
  (token: string, productId: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: "CREATE_ORDER_REQUEST" });

      const { data } = await api.createRazorpayOrder(token, productId);

      dispatch({ type: "CREATE_ORDER_SUCCESS", payload: data });

      // 👉 Return response so component can use it
      return data;
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || error.message;
      dispatch({ type: "CREATE_ORDER_FAIL", payload: errorMsg });

      // Return failure object
      return { success: false, message: errorMsg };
    }
  }
// 2. Capture Payment
export const capturePayment = (token: string, payload: any) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: "CAPTURE_PAYMENT_REQUEST" });
    const { data } = await api.captureRazorpayPayment(token, payload);
    dispatch({ type: "CAPTURE_PAYMENT_SUCCESS", payload: data });
    return data;
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch({ type: "CAPTURE_PAYMENT_FAIL", payload: errorMsg });
  }
};

// 3. Connect Razorpay Account
export const connectAccount = (token: string, razorpayAccountId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: "CONNECT_ACCOUNT_REQUEST" });
    const { data } = await api.connectRazorpayAccount(token, razorpayAccountId);
    dispatch({ type: "CONNECT_ACCOUNT_SUCCESS", payload: data.user });
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch({ type: "CONNECT_ACCOUNT_FAIL", payload: errorMsg });
  }
};

// 4. Withdraw Balance
export const withdrawBalance = (token: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: "WITHDRAW_REQUEST" });
    const { data } = await api.withdrawBalance(token);
    dispatch({ type: "WITHDRAW_SUCCESS", payload: data });
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch({ type: "WITHDRAW_FAIL", payload: errorMsg });
  }
};

// 5. Get Wallet Transactions
export const getWalletTransactions = (token: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: "WALLET_REQUEST" });
    const { data } = await api.getWalletTransactions(token);
    dispatch({ type: "WALLET_SUCCESS", payload: data });
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch({ type: "WALLET_FAIL", payload: errorMsg });
  }
};
export const createCartOrder =
  (token: string, cartItems: { productId: string }[]) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: "CREATE_CART_ORDER_REQUEST" });

      const { data } = await api.createRazorpayCartOrder(token, cartItems);

      dispatch({ type: "CREATE_CART_ORDER_SUCCESS", payload: data });

      return data;
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || error.message;
      dispatch({ type: "CREATE_CART_ORDER_FAIL", payload: errorMsg });
      return { success: false, message: errorMsg };
    }
  };

// 🔹 4. Capture Cart Payment
export const captureCartPayment =
  (token: string, payload: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: "CAPTURE_CART_PAYMENT_REQUEST" });

      const { data } = await api.captureRazorpayCartPayment(token, payload);

      dispatch({ type: "CAPTURE_CART_PAYMENT_SUCCESS", payload: data });

      return data;
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || error.message;
      dispatch({ type: "CAPTURE_CART_PAYMENT_FAIL", payload: errorMsg });
      return { success: false, message: errorMsg };
    }
  };