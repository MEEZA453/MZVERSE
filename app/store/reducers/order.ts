import { AnyAction } from "redux";

interface FreeProductState {
  orderLoading: boolean;
  unlocked: Record<string, string>;   // productId → unlockToken
  pendingPayments: Record<string, number>; // productId → amount
  error: string | null;
  notification: string | null;        // frontend messages
}

const initialState: FreeProductState = {
  orderLoading: false,
  unlocked: {},
  pendingPayments: {},
  error: null,
  notification: null
};

const freeProducts = (state = initialState, action: AnyAction): FreeProductState => {
  switch (action.type) {
    case "UNLOCK_PRODUCT_REQUEST":
    case "DOWNLOAD_PRODUCT_REQUEST":
      return { ...state, orderLoading: true, error: null, notification: null };

    case "UNLOCK_PRODUCT_SUCCESS":
      return {
        ...state,
        orderLoading: false,
        unlocked: { ...state.unlocked, [action.payload.productId]: action.payload.unlockToken },
        error: null,
        notification: "Order Created Successfully"
      };

    case "PAID_PRODUCT_FLOW":
      return {
        ...state,
        orderLoading: false,
        pendingPayments: { ...state.pendingPayments, [action.payload.productId]: action.payload.amount },
        notification: "Redirecting to payment..."
      };

    case "UNLOCK_PRODUCT_FAIL":
    case "DOWNLOAD_PRODUCT_FAIL":
      return { ...state, orderLoading: false, error: action.payload, notification: null };

    default:
      return state;
  }
};

export default freeProducts;
