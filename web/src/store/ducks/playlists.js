import { API_URL } from '../../config'
import { logout } from './auth'

export const LOAD_PLAYLISTS_INIT = 'LOAD_PLAYLISTS_INIT';
export const LOAD_PLAYLISTS = 'LOAD_PLAYLISTS';
export const ADD_PLAYLIST = 'ADD_PLAYLIST';
export const ADD_PLAYLIST_FAIL = 'ADD_PLAYLIST_FAIL';
export const ADD_PLAYLIST_SUCCESS = 'ADD_PLAYLIST_SUCCESS';
export const DELETE_PLAYLIST = 'DELETE_PLAYLIST';
export const DELETE_PLAYLIST_FAIL = 'DELETE_PLAYLIST_FAIL';
export const RESET_PLAYLIST_MESSAGES = 'RESET_PLAYLIST_MESSAGES';

const INITIAL_STATE = {
    playlists: [
        {
            id: "", 
            title: "", 
            description: ""
        }
    ],
    error: '',
    success: false,
    loading: false
}

const playlistsReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LOAD_PLAYLISTS_INIT:
            return {...state, loading: true}
        case LOAD_PLAYLISTS:
            return { ...state, playlists: [...action.playlists], loading: false };
        case RESET_PLAYLIST_MESSAGES:
        case ADD_PLAYLIST:
            return { ...state, error: '', success: false };
        case ADD_PLAYLIST_FAIL:
            return { ...state, error: action.error };
        case ADD_PLAYLIST_SUCCESS:
            return { ...state, playlists: [...state.playlists, {...action.playlist}], error: '', success: true };
        case DELETE_PLAYLIST:
            return { ...state, playlists: [...state.playlists.filter(list => list.id !== action.id)] };
        case DELETE_PLAYLIST_FAIL:
            return { ...state, error: action.error };
        default:
            return state;
    }    
}

export default playlistsReducer;

export const loadPlaylists = () => async dispatch => {
    try {
        dispatch({ type: LOAD_PLAYLISTS_INIT })
        const response = await fetch(`${API_URL}/api/playlists/`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        });
        if(!response.ok) throw new Error()
        const playlists = await response.json();
        dispatch({ type: LOAD_PLAYLISTS, playlists })
    } catch (err) {
        dispatch(logout());
    }
}

export const addPlaylist = plist => async dispatch => {
    try {
        dispatch({ type: ADD_PLAYLIST })
        const response = await fetch(`${API_URL}/api/playlist/`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            },
            body: JSON.stringify({ ...plist })
        });
        if(response.status === 400) {
            const { error } = await response.json();
            dispatch({ type: ADD_PLAYLIST_FAIL, error })
        } else {
            if(!response.ok) throw new Error()
            const playlist = await response.json();
            dispatch({ type: ADD_PLAYLIST_SUCCESS, playlist })
        }
    } catch (err) {
        dispatch(logout());
    }
}

export const delPlaylist = id => async dispatch => {
    try {
        const response = await fetch(`${API_URL}/api/playlist/${id}/`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        if(response.status === 404) {
            const { error } = await response.json();
            dispatch({ type: DELETE_PLAYLIST_FAIL, error })
        } else {
            if(!response.ok) throw new Error()
            dispatch({ type: DELETE_PLAYLIST, id })
        }
    } catch (err) {
        dispatch(logout());
    }
}

export const resetPlaylistMessages = () => ({ type: RESET_PLAYLIST_MESSAGES })