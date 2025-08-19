import { AnyAction } from 'redux';

interface FollowState {
  loading: boolean;
  followers: string[]; // store only IDs
  following: string[]; // store only IDs
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
      if (!state.following.includes(action.payload)) {
        return { ...state, loading: false, following: [...state.following, action.payload] };
      }
      return { ...state, loading: false };

    case 'UNFOLLOW_SUCCESS':
      return { ...state, loading: false, following: state.following.filter(id => id !== action.payload) };

    case 'GET_FOLLOWERS_SUCCESS':
      // Convert to IDs if objects are returned
      const followerIds = action.payload.map((f: any) => (typeof f === 'string' ? f : f._id));
      return { ...state, loading: false, followers: followerIds };

    case 'GET_FOLLOWING_SUCCESS':
      const followingIds = action.payload.map((f: any) => (typeof f === 'string' ? f : f._id));
      return { ...state, loading: false, following: followingIds };

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
