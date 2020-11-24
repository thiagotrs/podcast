import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
    PlaylistsList,
    Playlist,
    PlaylistBody,
    PlaylistHeader,
    Input
} from './styles'
import Title from '../../components/Title'
import Main from '../../components/Main'
import Header from '../../components/Header'
import NavBar from '../../components/NavBar'
import { Button, ButtonLink } from '../../components/Button'
import { FormModal } from '../../components/Modal'
import Loading from '../../components/Loading'

import { loadPlaylists, addPlaylist, resetPlaylistMessages } from '../../store/ducks/playlists';

const PlaylistsPage = ({ playlists, loadPlaylists, addPlaylist, resetPlaylistMessages, error, success, loading }) => {

    useEffect(() => {
        loadPlaylists()
    }, [loadPlaylists])

    useEffect(() => {
        if(success) setIsOpen(false)
    }, [success])

    const [isOpen, setIsOpen] = useState(false)

    const onSubmit = (event) => {
        const title = event.target.elements.title.value
        const description = event.target.elements.description.value
        addPlaylist({ title, description })
        event.preventDefault()
    }

    const openModal = () => {
        resetPlaylistMessages()
        setIsOpen(true)
    }

    if(loading) {
        return (
            <>
                <Header>
                    <NavBar />
                </Header>
                <Loading />
            </>
        )
    }

    return (
        <>
            <Header>
                <NavBar />
            </Header>
            <Main>
                <PlaylistHeader>
                    <Title>My Playlists</Title>
                    <Button onClick={openModal}>+ Add</Button>
                </PlaylistHeader>
                <PlaylistsList>
                    {playlists?.map(ep => (
                        <Playlist key={ep.id}>
                            <PlaylistBody>
                                <p><strong>{ep.title}</strong></p>
                                <p><em>{ep.description}</em></p>
                            </PlaylistBody>
                            <ButtonLink to={`/playlist/${ep.id}`}>Open</ButtonLink>
                        </Playlist>
                    ))}
                </PlaylistsList>
            </Main>
            <FormModal title="Add Playlist" onClose={() => setIsOpen(false)} isOpen={isOpen} onSubmit={onSubmit} error={error}>
                <Input type="text" name="title" id="title" placeholder="Title" required />
                <Input type="text" name="description" id="description" placeholder="Description" />
            </FormModal>
        </>
    )
}

const mapStateToProps = state => {
    return {
        playlists: state.playlists.playlists,
        error: state.playlists.error,
        success: state.playlists.success,
        loading: state.playlists.loading
    }
}

export default connect(mapStateToProps, { loadPlaylists, addPlaylist, resetPlaylistMessages })(PlaylistsPage)