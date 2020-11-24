import { API_URL } from '../../config'
import { logout } from './auth'

export const LOAD_PODCAST_INIT = 'LOAD_PODCAST_INIT';
export const LOAD_PODCAST = 'LOAD_PODCAST';

const INITIAL_STATE = {
    podcast: {
        id: "", 
        title: "", 
        link: "", 
        description: "", 
        image: "", 
        feed: "", 
        items: [
            {
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
    loading: false
}

const podcastReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LOAD_PODCAST_INIT:
            return {...state, loading: true}
        case LOAD_PODCAST:
            return {...state, podcast: {...action.podcast}, loading: false};
        default:
            return state;
    }    
}

export default podcastReducer;

export const loadPodcast = id => async dispatch => {
    try {
        dispatch({ type: LOAD_PODCAST_INIT })
        const response = await fetch(`${API_URL}/api/channel/${id}/episodes/`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        });
        if(!response.ok) throw new Error()
        const podcast = await response.json();
        dispatch({ type: LOAD_PODCAST, podcast })
        /* if(response.status === 404) {
            const { error } = await response.json();
            dispatch({ type: LOAD_PODCAST_FAIL, error })
        } else {
            if(!response.ok) throw new Error()
            const podcast = await response.json();
            dispatch({ type: LOAD_PODCAST, podcast })
        } */
    } catch (err) {
        dispatch(logout());
    }
}