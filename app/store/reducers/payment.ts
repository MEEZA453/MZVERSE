import { AnyAction } from "redux";

interface PaymentState {
  loading: boolean;
  success: boolean;
  transaction: any | null;
  error: string | null;
  method: "paypal" | "razorpay" | null;
}

const initialState: PaymentState = {
  loading: false,
  success: false,
  transaction: null,
  error: null,
  method: null,
};

const payment = (state = initialState, action: AnyAction): PaymentState => {
  switch (action.type) {
    case "CREATE_ORDER_REQUEST":
    case "CAPTURE_ORDER_REQUEST":
      return { ...state, loading: true, error: null, success: false, method: action.meta || null };

    case "CREATE_ORDER_SUCCESS":
      return {
        ...state,
        loading: false,
        transaction: action.payload,
        success: false,
        method: action.meta || null,
      };

    case "CAPTURE_ORDER_SUCCESS":
      return {
        ...state,
        loading: false,
        transaction: action.payload,
        success: true,
        method: action.meta || null,
      };

    case "CREATE_ORDER_FAIL":
    case "CAPTURE_ORDER_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
        method: action.meta || null,
      };

    default:
      return state;
  }
};

export default payment;
