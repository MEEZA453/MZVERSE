import * as api from "../../api";
import { AppDispatch } from "../store";

// Apply Jury
export const applyJury = (message: string, token: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: "APPLY_JURY_REQUEST" });

    const { data } = await api.applyJury(message, token);

    dispatch({ type: "APPLY_JURY_SUCCESS", payload: data });
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch({ type: "APPLY_JURY_FAIL", payload: errorMsg });
  }
};

// Approve/Deny Jury
export const approveJury = (userId: string, approve: boolean, token: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: "APPROVE_JURY_REQUEST" });

    const { data } = await api.approveJury(userId, approve, token);

    dispatch({ type: "APPROVE_JURY_SUCCESS", payload: { userId, approve, data } });
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch({ type: "APPROVE_JURY_FAIL", payload: errorMsg });
  }
};
export const approveNormal = (userId: string, approve: boolean, token: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: "APPROVE_NORMAL_REQUEST" });

    const { data } = await api.approveNormal(userId, approve, token);

    dispatch({ type: "APPROVE_NORMAL_SUCCESS", payload: { userId, approve, data } });
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch({ type: "APPROVE_NORMAL_FAIL", payload: errorMsg });
  }
};