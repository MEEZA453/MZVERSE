import { AnyAction } from 'redux'

interface ProfileState {
  loading: boolean
  success: boolean
  error: string | null
}

const initialState: ProfileState = {
  loading: false,
  success: false,
  error: null,
}

const profileReducer = (state = initialState, action: AnyAction): ProfileState => {
  switch (action.type) {
    case 'UPDATE_PROFILE_REQUEST':
      return { ...state, loading: true, success: false, error: null }

    case 'UPDATE_PROFILE_SUCCESS':
      return { ...state, loading: false, success: true, error: null }

    case 'UPDATE_PROFILE_FAIL':
      return { ...state, loading: false, error: action.payload, success: false }

    default:
      return state
  }
}

export default profileReducer
