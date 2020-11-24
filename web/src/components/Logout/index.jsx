import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../store/ducks/auth'

const Logout = ({ logout }) => {
    useEffect(() => { logout() }, [logout])

    return <Redirect to="/login" />
}

export default connect(null, { logout })(Logout)