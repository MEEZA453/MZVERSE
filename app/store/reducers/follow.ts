import { AnyAction } from 'redux';

interface FollowState {
  loading: boolean;
  followers: any[];
  following: any[];
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
      return { ...state, loading: false, following: [...state.following, action.payload] };

    case 'UNFOLLOW_SUCCESS':
      return { ...state, loading: false, following: state.following.filter(id => id !== action.payload) };

    case 'GET_FOLLOWERS_SUCCESS':
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
