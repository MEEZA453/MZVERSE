import { AnyAction } from "redux";

interface RazorpayConnectState {
  loading: boolean;          // For fetching connect URL
  error: string | null;      // Errors for both URL fetch and callback
  connectUrl: string | null; // The Razorpay Connect URL
  callbackLoading: boolean;  // For handling callback
  callbackSuccess: boolean;  // Callback result
  callbackError: string | null; // Callback errors
}

const initialState: RazorpayConnectState = {
  loading: false,
  error: null,
  connectUrl: null,
  callbackLoading: false,
  callbackSuccess: false,
  callbackError: null,
};

const razorpayConnect = (state = initialState, action: AnyAction): RazorpayConnectState => {
  switch (action.type) {
    // ---- Fetch Connect URL ----
    case "RAZORPAY_CONNECT_REQUEST":
      return { ...state, loading: true, error: null };

    case "RAZORPAY_CONNECT_SUCCESS":
      return { ...state, loading: false, connectUrl: action.payload };

    case "RAZORPAY_CONNECT_FAIL":
      return { ...state, loading: false, error: action.payload };

    // ---- Handle Callback ----
    case "RAZORPAY_CONNECT_CALLBACK_REQUEST":
      return { ...state, callbackLoading: true, callbackError: null, callbackSuccess: false };

    case "RAZORPAY_CONNECT_CALLBACK_SUCCESS":
      return { ...state, callbackLoading: false, callbackSuccess: true, callbackError: null };

    case "RAZORPAY_CONNECT_CALLBACK_FAIL":
      return { ...state, callbackLoading: false, callbackSuccess: false, callbackError: action.payload };

    default:
      return state;
  }
};

export default razorpayConnect;
