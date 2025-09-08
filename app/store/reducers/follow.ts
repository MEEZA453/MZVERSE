import { AnyAction } from 'redux';

interface User {
  _id: string;
  name: string;
  handle: string;
  profile: string;
}

interface FollowState {
  loading: boolean;
  followers: User[];   // store full objects
  following: User[];   // store full objects
  error: string | null;
}

const initialState: FollowState = {
  loading: false,
  followers: [],
  following: [],
  error: null,
};

const follow = (state = initialState, action: AnyAction): FollowState => {
  switch (action.type) {
    case 'FOLLOW_REQUEST':
    case 'UNFOLLOW_REQUEST':
    case 'GET_FOLLOWERS_REQUEST':
    case 'GET_FOLLOWING_REQUEST':
      return { ...state, loading: true, error: null };

    case 'FOLLOW_SUCCESS':
      // Add new user object to following (avoid duplicates)
      if (!state.following.some(f => f._id === action.payload._id)) {
        return {
          ...state,
          loading: false,
          following: [...state.following, action.payload],
        };
      }
      return { ...state, loading: false };

    case 'UNFOLLOW_SUCCESS':
      return {
        ...state,
        loading: false,
        following: state.following.filter(f => f._id !== action.payload),
      };

    case 'GET_FOLLOWERS_SUCCESS':
      // payload should be array of user objects
      return { ...state, loading: false, followers: action.payload };

    case 'GET_FOLLOWING_SUCCESS':
      return { ...state, loading: false, following: action.payload };

    case 'FOLLOW_FAIL':
    case 'UNFOLLOW_FAIL':
    case 'GET_FOLLOWERS_FAIL':
    case 'GET_FOLLOWING_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default follow;
