export const TOGGLE = 'TOGGLE';
export const SET_EPISODE = 'SET_EPISODE';

const INITIAL_STATE = {
    episode: {
        title: "",
        description: "",
        link: "",
        enclosure: {
            url: ""
        },
        image: ""
    },
    isPlaying: false
}

const podcastReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case TOGGLE:
            return {...state, isPlaying: !state.isPlaying};
        case SET_EPISODE:
            return {episode: action.payload.episode, isPlaying: false};
        default:
            return state;
    }    
}

export default podcastReducer;

export const toggle = () => ({ type: TOGGLE })

export const setEpisode = episode => ({ type: SET_EPISODE, payload: { episode } })