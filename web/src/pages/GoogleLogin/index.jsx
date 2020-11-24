import React, { useEffect } from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import { loginGoogle } from '../../store/ducks/auth'

const GoogleLogin = ({ loginGoogle }) => {
    const token = new URLSearchParams(useLocation().search).get("token");

    useEffect(() => {
        loginGoogle(token);
    }, [loginGoogle, token]);

    return (<Redirect to="/" />)
}

export default connect(null, { loginGoogle })(GoogleLogin)
