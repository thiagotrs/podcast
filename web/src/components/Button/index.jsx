import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const IconButton = styled.button`
    color: #fff;
    svg {
        display: inline;
        fill: ${props => props.active ? '#fff' : 'transparent'};
    }
`

export const Button = styled.button`
    background-color: #ebba16;
    color: #1b1c22;
    padding: 12px;
    border: 1px solid transparent;
`

export const ButtonLink = styled(Link)`
    background-color: ${props => props.outline ? 'transparent' : '#ebba16'};
    color: ${props => props.outline ? '#ebba16' : '#1b1c22'} !important;
    padding: 12px;
    border: 1px solid ${props => props.outline ? '#ebba16' : 'transparent'};
`