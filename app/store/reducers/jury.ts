import { AnyAction } from "redux";

interface JuryState {
  loading: boolean;
  applied: boolean;
  error: string | null;
  approvals: Record<string, boolean>;       // jury approvals
  normalApprovals: Record<string, boolean>; // normal approvals
}

const initialState: JuryState = {
  loading: false,
  applied: false,
  error: null,
  approvals: {},
  normalApprovals: {},
};

const jury = (state = initialState, action: AnyAction): JuryState => {
  switch (action.type) {
    case "APPLY_JURY_REQUEST":
    case "APPROVE_JURY_REQUEST":
    case "APPROVE_NORMAL_REQUEST":
      return { ...state, loading: true, error: null };

    case "APPLY_JURY_SUCCESS":
      return { ...state, loading: false, applied: true };

    case "APPROVE_JURY_SUCCESS":
      return {
        ...state,
        loading: false,
        approvals: { ...state.approvals, [action.payload.userId]: action.payload.approve },
      };

    case "APPROVE_NORMAL_SUCCESS":
      return {
        ...state,
        loading: false,
        normalApprovals: { ...state.normalApprovals, [action.payload.userId]: action.payload.approve },
      };

    case "APPLY_JURY_FAIL":
    case "APPROVE_JURY_FAIL":
    case "APPROVE_NORMAL_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default jury;
