import { AnyAction } from "@reduxjs/toolkit";
import { Product } from "../../types/Product";
// Define types for different search results
type User = {
  _id: string;
  name: string;
  email: string;
  token: string;
  handle?: string;
  instagram: string;
  bio: string;
};


interface Post {
  loading: boolean;
  posts: Post[];
  post: Post | null;
  postsOfUser : Post[]
  votes: any[];      // votes for a single post
  allVotes: any[];   // all votes (admin/analytics)
  error: string | null;
}


// Extend Search State
type SearchState = {
  loading: boolean;
  userResult: User[];   // multiple results possible
  postResult: Post[];
  assetResult:Product[];
  error: string | null;
};

const initialState: SearchState = {
  loading: false,
  userResult: [],
  postResult: [],
  assetResult: [],
  error: null,
};

const search = (state = initialState, action: AnyAction): SearchState => {
  switch (action.type) {
    case "SEARCH_USERS_REQUEST":
    case "SEARCH_POSTS_REQUEST":
    case "SEARCH_ASSETS_REQUEST":
      return { ...state, loading: true, error: null };

    case "SEARCH_USERS_SUCCESS":
      return { ...state, loading: false, userResult: action.payload };
    case "SEARCH_POSTS_SUCCESS":
      return { ...state, loading: false, postResult: action.payload };
    case "SEARCH_ASSETS_SUCCESS":
      return { ...state, loading: false, assetResult: action.payload };

    case "SEARCH_USERS_FAIL":
    case "SEARCH_POSTS_FAIL":
    case "SEARCH_ASSETS_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default search;
