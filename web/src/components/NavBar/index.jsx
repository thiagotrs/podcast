import React, { useState } from 'react'
import { StyledNavBar, NavBarBrand, NavBarNav, NavBarAction, Button } from './styles'
import { Link, NavLink, useHistory } from 'react-router-dom'
import Title from '../Title'
import { IconButton  } from '../Button'
import { ConfirmModal } from '../Modal'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'

const NavBar = () => {
    const history = useHistory()

    const [isOpen, setIsOpen] = useState(false)
    const [toggleMenu, setToggleMenu] = useState(false)

    const openModal = () => {
        setIsOpen(true)
    }

    const onConfirm = answerFlag => {
        if(answerFlag) {
            history.push('/logout')
        }
        setIsOpen(false)
    }

    return(
        <StyledNavBar isOpen={toggleMenu}>
            <NavBarBrand>
                <IconButton active onClick={() => setToggleMenu(!toggleMenu)}>{toggleMenu ? <AiOutlineClose /> : <AiOutlineMenu />}</IconButton>
                <Title><Link to="/">Podcast App</Link></Title>
            </NavBarBrand>
            <NavBarNav>
                <NavLink exact to="/">Podcasts</NavLink>
                <NavLink exact to="/playlists">Playlists</NavLink>
            </NavBarNav>
            <NavBarAction>
                <Button onClick={openModal}>Logout</Button>
            </NavBarAction>
            <ConfirmModal 
                title="Log Out" 
                onClose={() => setIsOpen(false)} 
                isOpen={isOpen} 
                question="Do you want to Log Out?" 
                onConfirm={onConfirm} 
            />
        </StyledNavBar>
    )
}

export default NavBar