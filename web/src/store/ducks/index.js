import { combineReducers } from 'redux'

import podcastReducer from './podcast'
import podcastsReducer from './podcasts'
import playerReducer from './player'
import authReducer from './auth'
import playlistsReducer from './playlists'
import playlistReducer from './playlist'

const rootReducer = combineReducers({
    podcast: podcastReducer,
    podcasts: podcastsReducer,
    player: playerReducer,
    auth: authReducer,
    playlists: playlistsReducer,
    playlist: playlistReducer
});

export default rootReducer;