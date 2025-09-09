import { AnyAction } from "@reduxjs/toolkit";
import { Product } from "../../types/Product";

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
  _id: string;
  title: string;
  content: string;
  authorId: string;
}

type SearchState = {
  loading: boolean;
  searched: boolean;       // 🔹 track if a search has been performed
  userResult: User[];
  postResult: Post[];
  assetResult: Product[];
  error: string | null;
};

const initialState: SearchState = {
  loading: false,
  searched: false,
  userResult: [],
  postResult: [],
  assetResult: [],
  error: null,
};

const search = (state = initialState, action: AnyAction): SearchState => {
  switch (action.type) {
    /** 🔍 Requests - keep previous results to avoid flash **/
    case "SEARCH_USERS_REQUEST":
      return { ...state, loading: true, error: null, searched: true };
    case "SEARCH_POSTS_REQUEST":
      return { ...state, loading: true, error: null, searched: true };
    case "SEARCH_ASSETS_REQUEST":
      return { ...state, loading: true, error: null, searched: true };

    /** ✅ Success **/
    case "SEARCH_USERS_SUCCESS":
      return { ...state, loading: false, userResult: action.payload, error: null };
    case "SEARCH_POSTS_SUCCESS":
      return { ...state, loading: false, postResult: action.payload, error: null };
    case "SEARCH_ASSETS_SUCCESS":
      return { ...state, loading: false, assetResult: action.payload, error: null };

    /** ❌ Failures **/
    case "SEARCH_USERS_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "SEARCH_POSTS_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "SEARCH_ASSETS_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default search;
