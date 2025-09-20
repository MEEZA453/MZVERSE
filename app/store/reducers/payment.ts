import { AnyAction } from "redux";

interface PaymentState {
  loading: boolean;
  order?: any;         // Single product order
  capture?: any;       // Single product capture result
  cartOrder?: any;     // Multi-product (cart) order
  cartCapture?: any;   // Multi-product (cart) capture result
  wallet: any[];
  error: string | null;
}

const initialState: PaymentState = {
  loading: false,
  order: undefined,
  capture: undefined,
  cartOrder: undefined,
  cartCapture: undefined,
  wallet: [],
  error: null,
};

const paymentReducer = (state = initialState, action: AnyAction): PaymentState => {
  switch (action.type) {
    // 🔹 Requests
    case "CREATE_ORDER_REQUEST":
    case "CAPTURE_PAYMENT_REQUEST":
    case "CREATE_CART_ORDER_REQUEST":
    case "CAPTURE_CART_PAYMENT_REQUEST":
    case "CONNECT_ACCOUNT_REQUEST":
    case "WITHDRAW_REQUEST":
    case "WALLET_REQUEST":
      return { ...state, loading: true, error: null };

    // 🔹 Single product success
    case "CREATE_ORDER_SUCCESS":
      return { ...state, loading: false, order: action.payload };
    case "CAPTURE_PAYMENT_SUCCESS":
      return { ...state, loading: false, capture: action.payload };

    // 🔹 Cart (multi-product) success
    case "CREATE_CART_ORDER_SUCCESS":
      return { ...state, loading: false, cartOrder: action.payload };
    case "CAPTURE_CART_PAYMENT_SUCCESS":
      return { ...state, loading: false, cartCapture: action.payload };

    // 🔹 Other success cases
    case "CONNECT_ACCOUNT_SUCCESS":
      return { ...state, loading: false };
    case "WITHDRAW_SUCCESS":
      return { ...state, loading: false };
    case "WALLET_SUCCESS":
      return { ...state, loading: false, wallet: action.payload };

    // 🔹 Failures
    case "CREATE_ORDER_FAIL":
    case "CAPTURE_PAYMENT_FAIL":
    case "CREATE_CART_ORDER_FAIL":
    case "CAPTURE_CART_PAYMENT_FAIL":
    case "CONNECT_ACCOUNT_FAIL":
    case "WITHDRAW_FAIL":
    case "WALLET_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default paymentReducer;
