import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const CenterContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    padding: 16px;

    @media(min-width: 768px) {
        padding: 0;
    }
`

export const LoginBox = styled.form`
    background-color: #25262c;
    //border-radius: 8px;
    padding: 16px;
    overflow: hidden;
    text-align: center;

    @media(min-width: 768px) {
        margin: 16px;
        width: 754px;
    }
`
export const Input = styled.input`
    background-color: #191a1f;
    border: 0;
    padding: 16px;
    //border-radius: 8px;
    color: #fff;
    font-size: 20px;
    width:100%;
    margin: 8px 0;
`
export const Button = styled.button`
    border: 0;
    background-color: #44449a;
    color: #fff;
    padding: 12px;
    //border-radius: 8px;
    font-size: 16px;

    &:hover {
        background-color: #ebba16;
        color: #1b1c22;
    }
`

const AnchorButtonLink = styled.a`
    border: 0;
    background-color: ${props => props.bgcolor ? props.bgcolor : '#44449a'};
    color: #fff;
    padding: 12px;
    //border-radius: 8px;
    font-size: 16px;

    svg {
        display: inline;
    }

    &:hover {
        background-color: #ebba16;
        color: #1b1c22;
    }
`

const StyledButtonLink = styled(Link)`
    border: 0;
    background-color: ${props => props.bgcolor ? props.bgcolor : '#44449a'};
    color: #fff;
    padding: 12px;
    //border-radius: 8px;
    font-size: 16px;

    svg {
        display: inline;
    }

    &:hover {
        background-color: #ebba16;
        color: #1b1c22;
    }
`

export const ButtonLink = ({ ext, ...rest }) => {
    return ext ? <AnchorButtonLink href={ext} {...rest} /> : <StyledButtonLink {...rest} />
}


export const GroupButton = styled.div`
    display: flex;
    flex-direction: column;

    button,
    a {
        margin-bottom: 4px;
    }

    @media(min-width: 768px) {
        flex-direction: row;
        button,
        a {
            margin-bottom: 0px;
            margin-right: 8px;

            padding: 16px;
            font-size: 20px;
        }
    }
`