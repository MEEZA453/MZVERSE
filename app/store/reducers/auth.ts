import { AnyAction } from 'redux';

type User = {
  _id: string;
  name: string;
  email: string;
  token: string;
  handle?: string;
  instagram : string,
   bio : string
};

type AuthState = {
  user: User | null;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  error: null,
};

const authReducer = (state = initialState, action: AnyAction): AuthState => {
  switch (action.type) {
    case 'REGISTER_SUCCESS':
    case 'LOGIN_SUCCESS':
    case 'GOOGLE_LOGIN_SUCCESS':
      return { ...state, user: action.payload, error: null };
    case 'SET_HANDLE_REQUEST':
      return { ...state }; // Optionally add loading flag
           case 'GET_USER_BY_HANDLE_REQUEST':
      return { ...state }; // Optionally set loading here if needed

    case 'GET_USER_BY_HANDLE_SUCCESS':
      return {
        ...state,
        user: action.payload, // ✅ CORRECT PLACE TO SET USER
        error: null,
      };

    case 'SET_HANDLE_SUCCESS':
      return {
        ...state,
        user: {
          ...state.user,
          handle: action.payload.handle,
        },
        error: null,
      };

    case 'REGISTER_FAIL':
    case 'LOGIN_FAIL':
      case 'GOOGLE_LOGIN_FAIL':
          case 'SET_HANDLE_FAIL':
      return { ...state, user: null, error: action.payload };

    case 'LOGOUT':
      return { ...state, user: null, error: null };
// frontend: store/reducers/authReducer.ts (update switch)
case 'SEND_OTP_REQUEST':
case 'VERIFY_OTP_REQUEST':
  return { ...state } // add loading flags if desired

case 'SEND_OTP_SUCCESS':
  // payload could contain info like { email, expiresIn }
  return { ...state, error: null }

case 'EMAIL_LOGIN_SUCCESS': // when OTP verified
  return { ...state, user: action.payload, error: null }

case 'SEND_OTP_FAIL':
case 'VERIFY_OTP_FAIL':
  return { ...state, error: action.payload }

    default:
      return state;
  }
};

export default authReducer;
