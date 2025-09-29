import { Product } from "../../types/Product";
import { AnyAction } from "redux";

interface ProductState {
  items: Product[];
  editProduct: Product | null;
  rdxProduct: Product | null; // product fetched by ID or handle
  loading: boolean;
  error: string | null;
  count: number; // total products count from backend
}

const initialState: ProductState = {
  items: [],
  editProduct: null,
  rdxProduct: null,
  loading: false,
  error: null,
  count: 0,
};

const reducer = (state: ProductState = initialState, action: AnyAction): ProductState => {
  switch (action.type) {
    /** Loading states **/
    case "FETCH_ALL_PRODUCTS_REQUEST":
    case "POST_PRODUCT_REQUEST":
    case "EDIT_PRODUCT_REQUEST":
    case "DELETE_PRODUCT_REQUEST":
      return { ...state, loading: true, error: null, rdxProduct : null };

    case "FETCH_PRODUCT_BY_ID_REQUEST":
    case "FETCH_PRODUCT_BY_HANDLE_REQUEST":
      return { ...state, loading: true, error: null, rdxProduct: null }; // clear previous product

    /** Success states **/
    case "FETCH_ALL_PRODUCTS_SUCCESS":
      return {
        ...state,
        items: action.payload,
        count: action.payload.length,
        loading: false,
      };

    case "POST_PRODUCT_SUCCESS":
      return {
        ...state,
        items: [action.payload, ...state.items],
        count: state.count + 1,
        loading: false,
      };

    case "EDIT_PRODUCT_SUCCESS":
      return {
        ...state,
        items: state.items.map((design) =>
          design._id === action.payload._id ? action.payload : design
        ),
        loading: false,
      };

    case "DELETE_PRODUCT_SUCCESS":
      return {
        ...state,
        items: state.items.filter((design) => design._id !== action.payload),
        count: state.count > 0 ? state.count - 1 : 0,
        loading: false,
      };

    case "FETCH_PRODUCT_BY_ID_SUCCESS":
    case "FETCH_PRODUCT_BY_HANDLE_SUCCESS":
      return {
        ...state,
        rdxProduct: action.payload,
        loading: false,
      };

    /** Fail states **/
    case "FETCH_ALL_PRODUCTS_FAIL":
    case "POST_PRODUCT_FAIL":
    case "EDIT_PRODUCT_FAIL":
    case "DELETE_PRODUCT_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "FETCH_PRODUCT_BY_ID_FAIL":
    case "FETCH_PRODUCT_BY_HANDLE_FAIL":
      return { ...state, loading: false, error: action.payload, rdxProduct: null }; // clear product on fail

    /** Edit product selection **/
    case "SET_EDIT_PRODUCT":
      return { ...state, editProduct: action.payload };

    case "CLEAR_EDIT_PRODUCT":
      return { ...state, editProduct: null, rdxProduct: null };

    default:
      return state;
  }
};

export default reducer;
