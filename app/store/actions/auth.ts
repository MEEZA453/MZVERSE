import * as api from '../../api';
import { AppDispatch } from '../store';


export const getUserByHandle = (handle: string , token : string) => async (dispatch: AppDispatch) => {

  try {
    dispatch({ type: 'GET_USER_BY_HANDLE_REQUEST' });
    const { data } = await api.getUserByHandle(handle , token);

    dispatch({
      type: 'GET_USER_BY_HANDLE_SUCCESS',
      payload: data,
    });
  } catch (error: any) {
    const errMsg = error.response?.data?.message || error.message;
    dispatch({
      type: 'GET_USER_BY_HANDLE_FAIL',
      payload: errMsg,
    });
  }
};
export const searchUsers = (query: string, token: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: 'SEARCH_USERS_REQUEST' });

    const { data } = await api.searchUsers(query, token);

    dispatch({
      type: 'SEARCH_USERS_SUCCESS',
      payload: data, // assuming `data` contains an array of users
    });
  } catch (error: any) {
    const errMsg = error.response?.data?.message || error.message;
    dispatch({
      type: 'SEARCH_USERS_FAIL',
      payload: errMsg,
    });
  }
};
export const sendEmailOtpAction = (email: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: 'SEND_OTP_REQUEST' })
    const { data } = await api.sendEmailOtp(email)
    console.log(data)
    dispatch({ type: 'SEND_OTP_SUCCESS', payload: data })
    return data
  } catch (error: any) {
    const errMsg = error.response?.data?.message || error.message
    dispatch({ type: 'SEND_OTP_FAIL', payload: errMsg })
    throw new Error(errMsg)
  }
}

export const verifyEmailOtpAction = (payload: { email: string, otp: string }) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: 'VERIFY_OTP_REQUEST' })
    const { data } = await api.verifyEmailOtp(payload)

    // Server should return user object + token (same shape as google login)
    dispatch({ type: 'EMAIL_LOGIN_SUCCESS', payload: data })
    localStorage.setItem('profile', JSON.stringify(data))
    return data
  } catch (error: any) {
    const errMsg = error.response?.data?.message || error.message
    dispatch({ type: 'VERIFY_OTP_FAIL', payload: errMsg })
    throw new Error(errMsg)
  }
}

export const resendEmailOtpAction = (email: string) => async (dispatch: AppDispatch) => {
  try {
    await api.resendOtp(email)
    dispatch({ type: 'RESEND_OTP_SUCCESS' })
  } catch (error: any) {
    const errMsg = error.response?.data?.message || error.message
    dispatch({ type: 'RESEND_OTP_FAIL', payload: errMsg })
    throw new Error(errMsg)
  }
}



export const getProductById = (handle: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: 'GET_PRODUCT_REQUEST' });

    const { data } = await api.getProductById(handle);

    dispatch({ type: 'GET_PRODUCT_SUCCESS', payload: data });
  } catch (error: any) {
    const errMsg = error.response?.data?.message || error.message;
    dispatch({ type: 'GET_PRODUCT_FAIL', payload: errMsg });
  }
};

export const googleLoginAction = (token: string) => async (dispatch: AppDispatch) => {
  try {
    const { data } = await api.googleLogin(token);

    dispatch({ type: 'GOOGLE_LOGIN_SUCCESS', payload: data });

    // Optionally store in localStorage
    localStorage.setItem('profile', JSON.stringify(data));

    return data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({ type: 'GOOGLE_LOGIN_FAIL', payload: errorMessage });
    throw new Error(errorMessage);
  }
};
export const updateProfileAction = (
  userId: string,
  formData: FormData,
  token : string,
) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: 'UPDATE_PROFILE_REQUEST' })

    const { data } = await api.updateUserProfile(userId, formData , token)

    dispatch({ type: 'UPDATE_PROFILE_SUCCESS', payload: data })
// localStorage.setItem('profile', JSON.stringify(data.user));
    return data
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || error.message
    dispatch({ type: 'UPDATE_PROFILE_FAIL', payload: errorMsg })
    throw new Error(errorMsg)
  }
}

export const setHandleAction = (userId: string, handle: string, token: string) => 
  async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: 'SET_HANDLE_REQUEST' });

      const { data } = await api.setUserHandle(userId, handle, token);

      dispatch({ type: 'SET_HANDLE_SUCCESS', payload: data.user });

      // Update localStorage with new handle
      const stored = JSON.parse(localStorage.getItem('profile') || '{}');
      const updatedProfile = { ...stored, handle: data.user.handle };
      localStorage.setItem('profile', JSON.stringify(updatedProfile));

      return data.user;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message;
      dispatch({ type: 'SET_HANDLE_FAIL', payload: message });
      throw new Error(message);
    }
  };
export const register = (user: { name: string; id: string; password: string }) => 
  async (dispatch: AppDispatch) => {
    try {
      const { data } = await api.registerUser(user);
      dispatch({ type: 'REGISTER_SUCCESS', payload: data });
      return data;
    } catch (error: any) {
      const errMsg = error.response?.data?.message || error.message;
      dispatch({ type: 'REGISTER_FAIL', payload: errMsg });
      throw errMsg; // Rethrow so frontend can catch it
    }
};

export const login = (user: { id: string; password: string }) => async (dispatch: AppDispatch) => {
  try {
    const { data } = await api.loginUser(user);

    dispatch({ type: 'LOGIN_SUCCESS', payload: data });

    return data; // ✅ Return data to access in component
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message;

    dispatch({ type: 'LOGIN_FAIL', payload: errorMessage });

    // ❗️Throw error to be caught in component's catch block
    throw new Error(errorMessage);
  }
};

export const logout = () => (dispatch: AppDispatch) => {
  dispatch({ type: 'LOGOUT' });
};
