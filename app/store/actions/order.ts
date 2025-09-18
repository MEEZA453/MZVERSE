import * as api from "../../api";
import { AppDispatch } from "../store";

// Unlock logic (works for free now, extendable to paid later)
export const handleProductUnlock = (productId: string, amount: number, authToken: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: "UNLOCK_PRODUCT_REQUEST" });

    if (amount === 0) {
      // Free product → directly unlock
      const { data } = await api.unlockFreeProduct(productId, authToken);

      if (data.success) {
        dispatch({
          type: "UNLOCK_PRODUCT_SUCCESS",
          payload: { productId, unlockToken: data.token }
        });
      } else {
        dispatch({ type: "UNLOCK_PRODUCT_FAIL", payload: data.message });
      }
    } else {
      // Paid product → redirect to payment (to implement later)
      // Placeholder: you can call Stripe/Razorpay API here
      dispatch({ type: "PAID_PRODUCT_FLOW", payload: { productId, amount } });
      
    }
  } catch (err: any) {
    const msg = err.response?.data?.message || err.message;
    dispatch({ type: "UNLOCK_PRODUCT_FAIL", payload: msg });
  }
};

export const getDownloadLink = (productId: string, unlockToken: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: "DOWNLOAD_PRODUCT_REQUEST" });

    const { data } = await api.downloadProduct(productId, unlockToken);

    if (data.success) {
      dispatch({
        type: "DOWNLOAD_PRODUCT_SUCCESS",
        payload: { productId, downloadLink: data.downloadLink }
      });
    } else {
      dispatch({ type: "DOWNLOAD_PRODUCT_FAIL", payload: data.message });
    }
  } catch (err: any) {
    const msg = err.response?.data?.message || err.message;
    dispatch({ type: "DOWNLOAD_PRODUCT_FAIL", payload: msg });
  }
};
