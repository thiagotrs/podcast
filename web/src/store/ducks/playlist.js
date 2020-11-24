import { API_URL } from '../../config'
import { logout } from './auth'

export const LOAD_PLAYLIST_INIT = 'LOAD_PLAYLIST_INIT';
export const LOAD_PLAYLIST = 'LOAD_PLAYLIST';
export const ADD_PLAYLIST_ITEM = 'ADD_PLAYLIST_ITEM';
export const ADD_PLAYLIST_ITEM_FAIL = 'ADD_PLAYLIST_ITEM_FAIL';
export const ADD_PLAYLIST_ITEM_SUCCESS = 'ADD_PLAYLIST_ITEM_SUCCESS';
export const DELETE_PLAYLIST_ITEM = 'DELETE_PLAYLIST_ITEM';
export const DELETE_PLAYLIST_ITEM_FAIL = 'DELETE_PLAYLIST_ITEM_FAIL';
export const RESET_PLAYLIST_ITEM_MESSAGES = 'RESET_PLAYLIST_ITEM_MESSAGES';

const INITIAL_STATE = {
    playlist: {
        id: "", 
        title: "", 
        description: "", 
        episodes: [
            {
                id: "",
                title: "",
                description: "",
                link: "",
                enclosure: {
                    url: "",
                    duration: ""
                },
                image: ""
            }
        ]
    },
    error: '',
    success: false,
    loading: false
}

const playlistReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LOAD_PLAYLIST_INIT:
            return {...state, loading: true}
        case LOAD_PLAYLIST:
            return { playlist: {...action.playlist}, loading: false};
        case RESET_PLAYLIST_ITEM_MESSAGES:
        case ADD_PLAYLIST_ITEM:
            return { ...state, error: '', success: false };
        case ADD_PLAYLIST_ITEM_FAIL:
            return { ...state, error: action.error };
        case ADD_PLAYLIST_ITEM_SUCCESS:
            return { playlist: {...state.playlist, episodes: [...state.playlist.episodes, {...action.episode}]}, error: '', success: true };
        case DELETE_PLAYLIST_ITEM:
            return { playlist: {
                ...state.playlist,
                episodes: [...state.playlist.episodes.filter(list => list.id !== action.episodeId)] 
            } };
        default:
            return state;
    }    
}

export default playlistReducer;

export const loadPlaylist = id => async dispatch => {
    try {
        dispatch({ type: LOAD_PLAYLIST_INIT })
        const response = await fetch(`${API_URL}/api/playlist/${id}/episodes/`,{
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        });
        if(!response.ok) throw new Error()
        const playlist = await response.json();
        dispatch({ type: LOAD_PLAYLIST, playlist })
    } catch (err) {
        dispatch(logout());
    }
}

export const addPlaylistItem = (id, ep) => async dispatch => {
    try {
        dispatch({ type: ADD_PLAYLIST_ITEM })
        const response = await fetch(`${API_URL}/api/playlist/${id}/episodes/`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            },
            body: JSON.stringify({ ...ep })
        });
        if(response.status === 400 || response.status === 404) {
            const { error } = await response.json();
            dispatch({ type: ADD_PLAYLIST_ITEM_FAIL, error })
        } else {
            if(!response.ok) throw new Error()
            const episode = await response.json();
            dispatch({ type: ADD_PLAYLIST_ITEM_SUCCESS, episode })
        }
    } catch (err) {
        dispatch(logout());
    }
}

export const delPlaylistItem = (playlistId, episodeId) => async dispatch => {
    try {
        const response = await fetch(`${API_URL}/api/playlist/${playlistId}/episodes/${episodeId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        });
        if(response.status === 404) {
            const { error } = await response.json();
            dispatch({ type: DELETE_PLAYLIST_ITEM_FAIL, error })
        } else {
            if(!response.ok) throw new Error()
            dispatch({ type: DELETE_PLAYLIST_ITEM, episodeId })
        }
    } catch (err) {
        dispatch(logout());
    }
}

export const resetPlaylistItemMessages = () => ({ type: RESET_PLAYLIST_ITEM_MESSAGES })