import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { register } from '../../store/ducks/auth'
import Title from '../../components/Title'
import { CenterContainer, LoginBox, Input, GroupButton, Button, ButtonLink } from './styles'

const SignupPage = ({ isAuth, error, register }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    const submitHandler = event => {
        event.preventDefault();
        register(name, email, pass);
    }

    return (
        !isAuth
        ? <CenterContainer>
            <LoginBox onSubmit={submitHandler}>
                <Title>Podcast App</Title>
                {error && <p>{error}</p>}
                <Input type="text" id="name" placeholder="Name" value={name} required onChange={event => setName(event.target.value)} />
                <Input type="email" id="email" placeholder="Email" value={email} required onChange={event => setEmail(event.target.value)} />
                <Input type="password" id="pass" placeholder="Password" value={pass} required onChange={event => setPass(event.target.value)} />
                <GroupButton>
                    <Button type="submit">Sign Up</Button>
                    <ButtonLink to="/login">Go to Sign In</ButtonLink>
                </GroupButton>
            </LoginBox>
        </CenterContainer>
        : <Redirect to="/" />
    )
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.isAuth,
        error: state.auth.error
    }
}

export default connect(mapStateToProps, { register })(SignupPage)