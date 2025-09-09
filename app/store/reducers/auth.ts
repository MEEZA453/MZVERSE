import { AnyAction } from 'redux';

type User = {
  _id: string;
  name: string;
  email: string;
  token: string;
  handle?: string;
  instagram: string;
  bio: string;
};

type AuthState = {
  user: User | null;
  error: string | null;
  loading: boolean;
};

const initialState: AuthState = {
  user: null,
  error: null,
  loading: false,
};

const authReducer = (state = initialState, action: AnyAction): AuthState => {
  switch (action.type) {
    /** 🔐 Requests **/
    case 'REGISTER_REQUEST':
    case 'LOGIN_REQUEST':
    case 'GOOGLE_LOGIN_REQUEST':
    case 'SET_HANDLE_REQUEST':
    case 'GET_USER_BY_HANDLE_REQUEST': // 👈 don’t clear user, just set loading
    case 'SEND_OTP_REQUEST':
    case 'VERIFY_OTP_REQUEST':
    case 'EMAIL_LOGIN_REQUEST':
      return { ...state, loading: true, error: null };

    /** ✅ Success **/
    case 'REGISTER_SUCCESS':
    case 'LOGIN_SUCCESS':
    case 'GOOGLE_LOGIN_SUCCESS':
    case 'EMAIL_LOGIN_SUCCESS':
      return { ...state, user: action.payload, loading: false, error: null };

    case 'GET_USER_BY_HANDLE_SUCCESS':
      return { ...state, user: action.payload, loading: false, error: null };

    case 'SET_HANDLE_SUCCESS':
      return {
        ...state,
        loading: false,
        user: state.user ? { ...state.user, handle: action.payload.handle } : null,
        error: null,
      };

    case 'SEND_OTP_SUCCESS':
      return { ...state, loading: false, error: null };

    /** ❌ Failures **/
    case 'REGISTER_FAIL':
    case 'LOGIN_FAIL':
    case 'GOOGLE_LOGIN_FAIL':
    case 'SET_HANDLE_FAIL':
    case 'GET_USER_BY_HANDLE_FAIL':
    case 'SEND_OTP_FAIL':
    case 'VERIFY_OTP_FAIL':
    case 'EMAIL_LOGIN_FAIL':
      return { ...state, loading: false, error: action.payload };

    /** 🚪 Logout **/
    case 'LOGOUT':
      return { ...state, user: null, loading: false, error: null };

    default:
      return state;
  }
};

export default authReducer;
