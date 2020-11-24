import styled from 'styled-components'

export const Button = styled.button`
    text-decoration: none;
    padding: 12px 0;
    font-size: 1.2em;
    color: #fff;
    background-color: transparent;
    border: 0;
`

export const NavBarBrand = styled.div`
    display: flex;
    align-items: center;

    button {
        display:inline-flex;
        margin-right: 15px;
        font-size: 2em;

        @media(min-width: 768px) {
            display: none;
        }
    }
`
export const NavBarNav = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;

    a {
        text-decoration: none;
        padding: 12px 0;
        font-size: 1.2em;
        color: #fff;
    }

    @media(min-width: 768px) {
        a + a {
            margin-left: 16px;
        }
    }

    .active {
        text-decoration: underline;
    }
`
export const NavBarAction = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    @media(min-width: 768px) {
        button {
            background-color: #ebba16;
            color: #1b1c22;
            padding: 12px;
            border: 1px solid transparent;
        }
    }
`

export const StyledNavBar = styled.nav`
    background-color: #44449a;
    display: flex;
    /* align-items: center; */
    min-height: 70px;
    padding: 0 16px;
    border-bottom: 1px solid #323273;

    flex-direction: column;

    ${NavBarNav},
    ${NavBarAction} {
        display: ${props => props.isOpen ? 'flex' : 'none'}
    }

    @media(min-width: 768px) {
        flex-direction: row;

        ${NavBarBrand} {
            width: 25%;
            text-align: left;
        }

        ${NavBarNav} {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            width: 50%;
        }

        ${NavBarAction} {
            display: flex;
            flex-direction: row;
            width: 25%;
            justify-content: flex-end;
        }
    }
`