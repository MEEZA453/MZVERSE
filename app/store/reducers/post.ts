import { AnyAction } from 'redux';
import { Post } from '../../types/Post';

interface PostState {
  loading: boolean;
  posts: Post[];
  post: Post | null;
   postsOfUserLoading: boolean;
  postsOfUser : Post[]
  votes: any[];      // votes for a single post
  allVotes: any[];   // all votes (admin/analytics)
  error: string | null;
    editPost: Post | null;
}

const initialState: PostState = {
  loading: true,
   postsOfUserLoading: false,
  posts: [],
  post: null,
  postsOfUser:[],
  votes: [],
  allVotes: [],
  error: null,
  editPost : null
};

const posts = (state = initialState, action: AnyAction): PostState => {
  switch (action.type) {
    /** Post actions **/
    case 'CREATE_POST_REQUEST':
  
    case 'VOTE_POST_REQUEST':
    case 'DELETE_POST_REQUEST':
    case 'EDIT_POST_REQUEST':
      return { ...state, loading: true, error: null };
  case 'FETCH_POSTS_REQUEST':
    case 'FETCH_POSTS_BY_HANDLE_REQUEST':
    case 'FETCH_POST_REQUEST':
      return { ...state,  postsOfUserLoading: true, post : null, error: null  };

    case 'CREATE_POST_SUCCESS':
      return { ...state, loading: false, posts: [action.payload, ...state.posts] };

    case 'FETCH_POSTS_BY_HANDLE_SUCCESS':
      return { ...state, loading: false, postsOfUserLoading: false, postsOfUser: action.payload };

    case 'FETCH_POSTS_SUCCESS':
      return { ...state, loading: false, posts: action.payload };

    case 'FETCH_POST_SUCCESS':
      return { ...state, loading: false, post: action.payload };

    case 'EDIT_POST_SUCCESS':
      return {
        ...state,
        loading: false,
        posts: state.posts.map((p) =>
          p._id === action.payload._id ? action.payload : p
        ),
        post: state.post && state.post._id === action.payload._id ? action.payload : state.post,
      };

    case 'DELETE_POST_SUCCESS':
      return {
        ...state,
        loading: false,
        posts: state.posts.filter((p) => p._id !== action.payload),
        post: state.post && state.post._id === action.payload ? null : state.post,
      };

    case 'VOTE_POST_SUCCESS':
      return {
        ...state,
        loading: false,
        posts: state.posts.map((p) =>
          p._id === action.payload._id ? action.payload : p
        ),
        post:
          state.post && state.post._id === action.payload._id
            ? action.payload
            : state.post,
        votes: action.payload?.votes ?? state.votes,
      };

    case 'CREATE_POST_FAIL':
    case 'FETCH_POSTS_FAIL':
    case 'FETCH_POSTS_BY_HANDLE_FAIL':
    case 'FETCH_POST_FAIL':
    case 'VOTE_POST_FAIL':
    case 'DELETE_POST_FAIL':
    case 'EDIT_POST_FAIL':
      return { ...state, loading: false, postsOfUserLoading: false, error: action.payload };

    /** Vote actions **/
    case 'FETCH_VOTES_REQUEST':
    case 'FETCH_VOTES_USER_REQUEST':
    case 'FETCH_ALL_VOTES_REQUEST':
    case 'DELETE_VOTE_REQUEST':
      return { ...state, loading: true, error: null };

    case 'FETCH_VOTES_SUCCESS':
    case 'FETCH_VOTES_USER_SUCCESS':
      return { ...state, loading: false, votes: action.payload };

    case 'FETCH_ALL_VOTES_SUCCESS':
      return { ...state, loading: false, allVotes: action.payload };

    case 'DELETE_VOTE_SUCCESS':
      return {
        ...state,
        loading: false,
        post: action.payload,
      votes: action.payload?.votes ?? state.votes,
        posts: state.posts.map((p) =>
          p._id === action.payload._id ? action.payload : p
        ),
      };

    case 'FETCH_VOTES_FAIL':
    case 'FETCH_ALL_VOTES_FAIL':
    case 'DELETE_VOTE_FAIL':
      return { ...state, loading: false, error: action.payload };


       case "SET_EDIT_POST":
      return { ...state, editPost: action.payload };

    case "CLEAR_EDIT_POST":
      return { ...state, editPost: null };

  
    default:
      return state;
      
  }
};


export default posts;
