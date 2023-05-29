import { LOGIN_USER_ERROR, LOGIN_USER_LOADING, LOGIN_USER_SUCCESS, LOGOUT } from "./user_types"

const initialState = {
    token: null,
    user: null,
    auth: false,
    loading: false,
    error: false
}

export default function userReducer(state=initialState, action)
{
    const {type, payload} = action
    switch(type)
    {
        case LOGIN_USER_LOADING: {
            return {
                ...state, loading: true
            }
        }
        case LOGIN_USER_SUCCESS: {
            return {
                ...state, loading: false, error: false, user: payload.user, token: payload.token, auth: true
            }
        }
        case LOGIN_USER_ERROR: {
            return {
                ...state, loading: false, error: true
            }
        }
        case LOGOUT: {
            return initialState
        }
        default: {
            return state;
        }
    }
}