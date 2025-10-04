import { AnyAction } from "redux";

interface AssetState {
  assetsOfPost: any[];
  postsOfAsset: any[];
  loading: boolean;
  error: string | null;
  requestMessage: string | null; // For attach request notifications
  approveMessage: string | null; // For approve/reject notifications
}

const initialState: AssetState = {
  assetsOfPost: [],
  postsOfAsset: [],
  loading: false,
  error: null,
  requestMessage: null,
  approveMessage: null,
};

const attach = (state = initialState, action: AnyAction): AssetState => {
  switch (action.type) {
    // Existing asset requests
    
    case "GET_ASSETS_REQUEST":
    return { ...state, loading: true, assetsOfPost : null, error: null };
    case "ATTACH_ASSET_REQUEST":
      case "GET_ASSET_POSTS_REQUEST":
          case "DETACH_ASSET_REQUEST":
    case "REQUEST_ATTACH_ASSET_REQUEST":
    case "APPROVE_ATTACH_REQUEST":
      return { ...state, loading: true, error: null };

    // Attach asset success
case "ATTACH_ASSET_SUCCESS":
  return {
    ...state,
    loading: false,
    error: null,
    assetsOfPost: state.assetsOfPost.some(a => a._id === action.payload._id)
      ? state.assetsOfPost
      : [...state.assetsOfPost, action.payload],
  };

    // Detach asset success
    case "DETACH_ASSET_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        assetsOfPost: state.assetsOfPost.filter(a => a._id !== action.payload),
      };

    // Get assets of post
    case "GET_ASSETS_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        assetsOfPost: action.payload,
      };

    // Get posts of an asset
    case "GET_ASSET_POSTS_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        postsOfAsset: action.payload,
      };

    // Request attach asset success
    case "REQUEST_ATTACH_ASSET_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        requestMessage: action.payload,
      };

    // Approve/reject attach request success
    case "APPROVE_ATTACH_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        approveMessage: action.payload,
      };

    // Failures
    case "ATTACH_ASSET_FAIL":
    case "DETACH_ASSET_FAIL":
    case "GET_ASSETS_FAIL":
    case "GET_ASSET_POSTS_FAIL":
    case "REQUEST_ATTACH_ASSET_FAIL":
    case "APPROVE_ATTACH_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default attach;
