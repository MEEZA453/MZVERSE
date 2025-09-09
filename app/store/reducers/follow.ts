import { AnyAction } from "redux";

interface User {
  _id: string;
  name: string;
  handle: string;
  profile: string;
}

interface FollowState {
  followers: User[];
  following: User[];
  error: string | null;
  loading: boolean;
}

const initialState: FollowState = {
  followers: [],
  following: [],
  error: null,
  loading: false,
};

const follow = (state = initialState, action: AnyAction): FollowState => {
  switch (action.type) {
    // 🔄 Requests 
    case "GET_FOLLOWERS_REQUEST":
    case "GET_FOLLOWING_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };

    // ✅ Real-time follow
    case "FOLLOW_SUCCESS":
      if (!state.following.some(f => f._id === action.payload._id)) {
        return {
          ...state,
          loading: false,
          following: [...state.following, action.payload],
          error: null,
        };
      }
      return { ...state, loading: false };

    // ✅ Real-time unfollow
    case "UNFOLLOW_SUCCESS":
      return {
        ...state,
        loading: false,
        following: state.following.filter(f => f._id !== action.payload),
        error: null,
      };

    // 📥 Replace lists from server
    case "GET_FOLLOWERS_SUCCESS":
      return {
        ...state,
        loading: false,
        followers: action.payload,
        error: null,
      };

    case "GET_FOLLOWING_SUCCESS":
      return {
        ...state,
        loading: false,
        following: action.payload,
        error: null,
      };

    // ❌ Failures
    case "FOLLOW_FAIL":
    case "UNFOLLOW_FAIL":
    case "GET_FOLLOWERS_FAIL":
    case "GET_FOLLOWING_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default follow;
