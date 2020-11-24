import { API_URL } from '../../config'
import { logout } from './auth'

export const LOAD_PODCASTS_INIT = 'LOAD_PODCASTS_INIT';
export const LOAD_PODCASTS = 'LOAD_PODCASTS';
export const SUBSCRIBE_PODCAST = 'SUBSCRIBE_PODCAST';
export const SUBSCRIBE_PODCAST_FAIL = 'SUBSCRIBE_PODCAST_FAIL';
export const SUBSCRIBE_PODCAST_SUCCESS = 'SUBSCRIBE_PODCAST_SUCCESS';
export const UNSUBSCRIBE_PODCAST = 'UNSUBSCRIBE_PODCAST';
export const UNSUBSCRIBE_PODCAST_FAIL = 'UNSUBSCRIBE_PODCAST';
export const RESET_MESSAGES = 'RESET_MESSAGES'


const INITIAL_STATE = {
    podcasts: [
        {
            id: "",
            title: "",
            link: "",
            description: "",
            image: "",
            feed: ""
        }
    ],
    error: '',
    success: false,
    loading: false
}

const podcastsReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LOAD_PODCASTS_INIT:
            return {...state, loading: true}
        case LOAD_PODCASTS:
            return {...state, podcasts: [...action.podcasts], loading: false};
        case RESET_MESSAGES:
        case SUBSCRIBE_PODCAST:
            return {...state, error: '', success: false};
        case SUBSCRIBE_PODCAST_FAIL:
            return {...state, error: action.error};
        case SUBSCRIBE_PODCAST_SUCCESS:
            return {...state, podcasts: [...state.podcasts, action.podcast], error: '', success: true };
        case UNSUBSCRIBE_PODCAST:
            return {...state, podcasts: [...state.podcasts.filter(pod => pod.id !== action.id)]};
        case UNSUBSCRIBE_PODCAST_FAIL:
            return {...state, error: action.error};
        default:
            return state;
    }    
}

export default podcastsReducer;

export const loadPodcasts = () => async dispatch => {
    try {
        dispatch({ type: LOAD_PODCASTS_INIT })
        const response = await fetch(`${API_URL}/api/channels/`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        });
        if(!response.ok) throw new Error()
        const podcasts = await response.json();
        dispatch({ type: LOAD_PODCASTS, podcasts })
    } catch (err) {
        dispatch(logout());
    }
}

export const subscribePodcast = url => async dispatch => {
    try {
        dispatch({ type: SUBSCRIBE_PODCAST })
        const response = await fetch(`${API_URL}/api/channel/`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ feed: url })
        });
        if(response.status === 400) {
            const { error } = await response.json();
            dispatch({ type: SUBSCRIBE_PODCAST_FAIL, error })
        } else {
            if(!response.ok) throw new Error()
            const podcast = await response.json();
            dispatch({ type: SUBSCRIBE_PODCAST_SUCCESS, podcast })
        }
    } catch (err) {
        dispatch(logout());
    }
}

export const unsubscribePodcast = id => async dispatch => {
    try {
        const response = await fetch(`${API_URL}/api/channel/${id}/`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        if(response.status === 404) {
            const { error } = await response.json();
            dispatch({ type: UNSUBSCRIBE_PODCAST_FAIL, error })
        } else {
            if(!response.ok) throw new Error()
            dispatch({ type: UNSUBSCRIBE_PODCAST, id })
        }
    } catch (err) {
        dispatch(logout());
    }
}

export const resetMessages = () => ({ type: RESET_MESSAGES })