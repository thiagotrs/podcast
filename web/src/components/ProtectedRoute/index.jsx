import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect, withRouter } from 'react-router-dom'

const ProtectedRoute = ({component:Component, isAuth, ...rest}) => {
    return (isAuth
        ? <Route {...rest} component={Component} />
        : <Redirect to="/login" />
    )
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.isAuth
    }
}

export default withRouter(connect(mapStateToProps)(ProtectedRoute))