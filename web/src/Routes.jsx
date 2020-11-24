import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import PodcastDetailsPage from './pages/PodcastDetails'
import PodcastsPage from './pages/Podcasts'
import SignupPage from './pages/Signup'
import LoginPage from './pages/Login'
import Logout from './components/Logout'
import ProtectedRoute from './components/ProtectedRoute'
import PlaylistsPage from './pages/Playlists'
import PlaylistDetailsPage from './pages/PlaylistDetails'
import GoogleLogin from './pages/GoogleLogin'

const Routes = () => {
    return (
        <Switch>
            <Route path="/token" exact component={GoogleLogin} />
            <Route path="/signup" exact component={SignupPage} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="/logout" exact component={Logout} />
            <ProtectedRoute path="/podcast/:id" exact component={PodcastDetailsPage} />
            <ProtectedRoute path="/playlist/:id" exact component={PlaylistDetailsPage} />
            <ProtectedRoute path="/playlists" exact component={PlaylistsPage} />
            <ProtectedRoute path="/" exact component={PodcastsPage} />
            <Redirect from="*" to="/login" />
        </Switch>
    )
}

export default Routes
