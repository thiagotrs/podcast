import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Routes from './Routes'
import { autoLogin } from './store/ducks/auth'

import Container from './components/Container'
import Player from './components/Player/index'

const App = ({ isAuth, autoLogin }) => {

    useEffect(() => { autoLogin() })

    return (
        <BrowserRouter>
            <Container>
                <Routes />
                {isAuth && (<Player />)}
            </Container>
        </BrowserRouter>
    )
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, { autoLogin })(App)
