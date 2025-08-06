import { AnyAction } from 'redux';

type User = {
  _id: string;
  name: string;
  email: string;
  token: string;
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

    case 'REGISTER_FAIL':
    case 'LOGIN_FAIL':
      case 'GOOGLE_LOGIN_FAIL':
      return { ...state, user: null, error: action.payload };

    case 'LOGOUT':
      return { ...state, user: null, error: null };

    default:
      return state;
  }
};

export default authReducer;
