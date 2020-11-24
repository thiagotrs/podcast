import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../store/ducks/auth'
import Title from '../../components/Title'
import { CenterContainer, LoginBox, Input, GroupButton, Button, ButtonLink } from './styles'
import { AiOutlineGoogle } from 'react-icons/ai'

const LoginPage = ({ isAuth, error, login }) => {
    const [email, setEmail] = useState('')

    const [pass, setPass] = useState('')

    const submitHandler = event => {
        event.preventDefault();
        login(email, pass);
    }

    return (
        !isAuth
        ? <CenterContainer>
            <LoginBox onSubmit={submitHandler}>
                <Title>Podcast App</Title>
                {error && <p>{error}</p>}
                <Input type="email" id="email" placeholder="Email" value={email} required onChange={event => setEmail(event.target.value)} />
                <Input type="password" id="pass" placeholder="Password" value={pass} required onChange={event => setPass(event.target.value)} />
                <GroupButton>
                    <Button type="submit">Sign In</Button>
                    <ButtonLink to="/signup">Sign Up</ButtonLink>
                    <ButtonLink 
                        ext="http://localhost:4000/auth/google" 
                        rel="noopener noreferrer"
                        bgcolor="#f63c27"
                    ><AiOutlineGoogle /> Sign In with Google</ButtonLink>
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

export default connect(mapStateToProps, { login })(LoginPage)