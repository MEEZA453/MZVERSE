import { AnyAction } from "redux";

interface ProfileState {
  loading: boolean;
  success: boolean;
  error: string | null;
  profile: any | null; // fetched user by handle
}

const initialState: ProfileState = {
  loading: false,
  success: false,
  error: null,
  profile: null,
};

const profile = (state = initialState, action: AnyAction): ProfileState => {
  switch (action.type) {
    /** 🔄 Update profile **/
    case "UPDATE_PROFILE_REQUEST":
      return { ...state, loading: true, success: false, error: null };

    case "UPDATE_PROFILE_SUCCESS":
      return { ...state, loading: false, success: true, error: null };

    case "UPDATE_PROFILE_FAIL":
      return { ...state, loading: false, error: action.payload, success: false };

    /** 👤 Get profile by handle **/
    case "GET_USER_BY_HANDLE_REQUEST":
      return { ...state, loading: true, error: null , profile : null };

    case "GET_USER_BY_HANDLE_SUCCESS":
      return { ...state, loading: false, profile: action.payload, error: null };

    case "GET_USER_BY_HANDLE_FAIL":
      return { ...state, loading: false, error: action.payload };

    /** 🧹 Clear profile **/
    case "CLEAR_PROFILE":
      return { ...state, profile: null, success: false, error: null };

    default:
      return state;
  }
};

export default profile;
