const initialState = {
  loading: false,
  product: null,
  error: null,
};
 const getProductOfUser = (state = initialState, action: any) => {
  switch (action.type) {
    case 'GET_PRODUCT_REQUEST':
      return { ...state, loading: true, error: null };

    case 'GET_PRODUCT_SUCCESS':
      return { ...state, loading: false, product: action.payload };

    case 'GET_PRODUCT_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
export default getProductOfUser
