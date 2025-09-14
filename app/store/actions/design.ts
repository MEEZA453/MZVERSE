import * as api from "../../api";
import { AppDispatch } from "../store";
import { Product } from "../../types/Product";

// ✅ Post design
export const postDesign = (post: FormData, token: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: "POST_PRODUCT_REQUEST" });
    const { data } = await api.postDesign(post, token);
    dispatch({ type: "POST_PRODUCT_SUCCESS", payload: data.product });
  } catch (error: any) {
    dispatch({ type: "POST_PRODUCT_FAIL", payload: error.message });
    console.log("Error posting design:", error.message);
  }
};
export const getDesignById =
  (id: string, token?: string) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: "FETCH_PRODUCT_BY_ID_REQUEST" });
      const { data } = await api.getDesignById(id, token);
      dispatch({
        type: "FETCH_PRODUCT_BY_ID_SUCCESS",
        payload: data.product,
      });
    } catch (err: any) {
      dispatch({
        type: "FETCH_PRODUCT_BY_ID_FAIL",
        payload: err.message,
      });
      console.log("Error fetching product by ID:", err.message);
    }
  };

// ✅ Fetch product by HANDLE
export const getDesignByHandle =
  (handle: string, token?: string) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: "FETCH_PRODUCT_BY_HANDLE_REQUEST" });
      const { data } = await api.getDesignByHandle(handle, token);
      dispatch({
        type: "FETCH_PRODUCT_BY_HANDLE_SUCCESS",
        payload: data.product,
      });
    } catch (err: any) {
      dispatch({
        type: "FETCH_PRODUCT_BY_HANDLE_FAIL",
        payload: err.message,
      });
      console.log("Error fetching product by handle:", err.message);
    }
  };

// ✅ Fetch all designs

// ✅ Fetch all designs with authorization
export const getDesign =
  (token?: string) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: "FETCH_ALL_PRODUCTS_REQUEST" });

      const { data } = await api.getDesign(token);

      dispatch({
        type: "FETCH_ALL_PRODUCTS_SUCCESS",
        payload: data.results, // ✅ backend sends { results: [...] }
      });
    } catch (err: any) {
      dispatch({
        type: "FETCH_ALL_PRODUCTS_FAIL",
        payload: err.message,
      });
      console.log("Error fetching products:", err.message);
    }
  };


// ✅ Delete design
export const deleteDesign = (id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: "DELETE_PRODUCT_REQUEST" });
    await api.deleteDesign(id);
    dispatch({ type: "DELETE_PRODUCT_SUCCESS", payload: id });
  } catch (err: any) {
    dispatch({ type: "DELETE_PRODUCT_FAIL", payload: err.message });
    console.log("Error deleting product:", err.message);
  }
};

// ✅ Edit design
export const editDesign = (id: string, post: FormData, token: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: "EDIT_PRODUCT_REQUEST" });
    const { data } = await api.editDesign(id, post, token);
    dispatch({ type: "EDIT_PRODUCT_SUCCESS", payload: data.product });
  } catch (err: any) {
    dispatch({ type: "EDIT_PRODUCT_FAIL", payload: err.message });
    console.log("Error editing product:", err.message);
  }
};
