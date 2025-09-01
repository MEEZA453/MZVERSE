import * as api from "../../api";
import { AppDispatch } from "../store";

// Get all notifications
export const getNotifications = (token: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: "NOTIFICATION_REQUEST" });
    const { data } = await api.getNotifications(token);
    dispatch({ type: "NOTIFICATION_SUCCESS", payload: data });
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch({ type: "NOTIFICATION_FAIL", payload: errorMsg });
  }
};

  // Mark all as read
  export const markAllNotificationsRead = (token: string) => async (dispatch: AppDispatch) => {
    try {
      await api.markAllNotificationsRead(token);
      dispatch({ type: "MARK_ALL_READ" });
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || error.message;
      dispatch({ type: "NOTIFICATION_FAIL", payload: errorMsg });
    }
  };

// Mark single as read
export const markNotificationRead = (id: string, token: string) => async (dispatch: AppDispatch) => {
  try {
    await api.markNotificationRead(id, token);
    dispatch({ type: "MARK_ONE_READ", payload: id });
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch({ type: "NOTIFICATION_FAIL", payload: errorMsg });
  }
};

// Delete notification
export const deleteNotification = (id: string, token: string) => async (dispatch: AppDispatch) => {
  try {
    await api.deleteNotification(id, token);
    dispatch({ type: "DELETE_NOTIFICATION", payload: id });
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch({ type: "NOTIFICATION_FAIL", payload: errorMsg });
  }
};
