import { API_URL } from '../../config'

export const LOGIN = 'LOGIN';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';

export const SIGNUP = 'SIGNUP'
export const SIGNUP_FAIL = 'SIGNUP_FAIL'

const INITIAL_STATE = {
    isAuth: !!localStorage.getItem('token'),
    error: null,
    token: localStorage.getItem('token'),
}

const authReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LOGIN:
            return { isAuth: true, error: null, token: action.token };
        case LOGIN_FAIL:
            return { ...state, error: action.error };
        case LOGOUT:
            return { isAuth: false, error: null, token: '' };
        default:
            return state;
    }    
}

export default authReducer;

const authTimeout = expiresIn => dispatch => {
    setTimeout(() => {
        dispatch(logout())
    }, expiresIn * 1000)
}

export const login = (email, pass) => async dispatch => {
    try {
        const response = await fetch(`${API_URL}/auth/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({ email, pass })
        });
        if(!response.ok) throw new Error()

        const { token } = await response.json();

        localStorage.setItem('token', token)
        localStorage.setItem('expirationDate', new Date(new Date().getTime() + 3600 * 1000))
        dispatch(authTimeout(3600))
        dispatch({ type: LOGIN, auth: { token } })

    } catch(err) {
        dispatch({ type: LOGIN_FAIL, error: "Email and/or pass is incorrect!" })
    }
}

export const loginGoogle = (token) => async dispatch => {
    localStorage.setItem('token', token)
    localStorage.setItem('expirationDate', new Date(new Date().getTime() + 3600 * 1000))
    dispatch(authTimeout(3600))
    dispatch({ type: LOGIN, auth: { token } })
}

export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    return { type: LOGOUT }
}

export const autoLogin = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate < new Date()) {
                dispatch(logout());
            } else {
                dispatch({ type: LOGIN, auth: { token } });
                dispatch(authTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }   
        }
    };
};

export const register = (name, email, pass) => async dispatch => {
    try {
        const response = await fetch(`${API_URL}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({ name, email, pass })
        });
        if(response.status === 400) {
            const { error } = await response.json();
            dispatch({ type: LOGIN_FAIL, error })
        } else {
            if(!response.ok) throw new Error()
            const { token } = await response.json();
            localStorage.setItem('token', token)
            localStorage.setItem('expirationDate', new Date(new Date().getTime() + 3600 * 1000))
            dispatch(authTimeout(3600))
            dispatch({ type: LOGIN, auth: { token } })
        }

    } catch(err) {
        dispatch({ type: LOGIN_FAIL, error: "Email and/or pass is incorrect!" })
    }
};