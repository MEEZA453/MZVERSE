import * as api from "../../api";
import { AppDispatch } from "../store";

// Attach asset
export const requestAttachAsset = (
  postId: string,
  assetId: string,
  message: string,
  token: string
) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: "REQUEST_ATTACH_ASSET_REQUEST" });

    const { data } = await api.requestAttachAsset(postId, assetId, message, token);

    dispatch({
      type: "REQUEST_ATTACH_ASSET_SUCCESS",
      payload: data.message,
    });
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch({
      type: "REQUEST_ATTACH_ASSET_FAIL",
      payload: errorMsg,
    });
  }
};

// Approve or reject an attach request (asset creator action)
export const approveAttachRequest = (
  notificationId: string,
  approve: boolean,
  token: string
) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: "APPROVE_ATTACH_REQUEST" });

    const { data } = await api.approveAttachRequest(notificationId, approve, token);

    dispatch({
      type: "APPROVE_ATTACH_SUCCESS",
      payload: data.message,
    });
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch({
      type: "APPROVE_ATTACH_FAIL",
      payload: errorMsg,
    });
  }
};
// Detach asset
export const detachAsset = (postId: string, assetId: string, token: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: "DETACH_ASSET_REQUEST" });

    // ✅ Backend should return just the assetId removed
    const { data } = await api.detachAsset(postId, assetId, token);

    dispatch({ type: "DETACH_ASSET_SUCCESS", payload: data.assetId });
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch({ type: "DETACH_ASSET_FAIL", payload: errorMsg });
  }
};

// Get assets of a post
export const getAssetsOfPost = (postId: string, token: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: "GET_ASSETS_REQUEST" });

    const { data } = await api.getAssetsOfPost(postId, token);

    dispatch({ type: "GET_ASSETS_SUCCESS", payload: data.assets });
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch({ type: "GET_ASSETS_FAIL", payload: errorMsg });
  }
};

// Get posts of an asset
export const getPostsOfAsset = (assetId: string, token: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: "GET_ASSET_POSTS_REQUEST" });

    const { data } = await api.getPostsOfAsset(assetId, token);

    dispatch({ type: "GET_ASSET_POSTS_SUCCESS", payload: data.posts });
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch({ type: "GET_ASSET_POSTS_FAIL", payload: errorMsg });
  }
};
