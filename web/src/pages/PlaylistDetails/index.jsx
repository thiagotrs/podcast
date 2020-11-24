import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import {
    PlaylistsList,
    PlaylistHeader
} from './styles'
import Episode from '../../components/Episode'
import Title from '../../components/Title'
import Main from '../../components/Main'
import Header from '../../components/Header'
import NavBar from '../../components/NavBar'
import { Button } from '../../components/Button'
import { ConfirmModal } from '../../components/Modal'
import Loading from '../../components/Loading'

import { delPlaylist } from '../../store/ducks/playlists';
import { loadPlaylist, delPlaylistItem } from '../../store/ducks/playlist'
import { setEpisode } from '../../store/ducks/player'

const PlaylistDetailsPage = ({ playlist, player, loadPlaylist, delPlaylistItem, delPlaylist, setEpisode, loading }) => {

    const { id } = useParams()
    const history = useHistory()

    useEffect(() => {
        loadPlaylist(id);
    }, [loadPlaylist, id])

    const [isOpen, setIsOpen] = useState(false)
    const [isEpisodeOpen, setIsEpisodeOpen] = useState(false)
    const [tempEpisode, setTempEpisode] = useState()

    const openModal = () => {
        setIsOpen(true)
    }

    const onConfirm = answerFlag => {
        if(answerFlag) {
            delPlaylist(playlist.id)
            history.push('/playlists')
        }
        setIsOpen(false)
    }

    const openEpisodeModal = ep => {
        setTempEpisode(ep)
        setIsEpisodeOpen(true)
    }

    const onEpisodeConfirm = answerFlag => {
        if(answerFlag) {
            delPlaylistItem(id, tempEpisode.id)
        }
        setIsEpisodeOpen(false)
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
                    <Title>{playlist.title}</Title>
                    <Button onClick={openModal}>Delete Playlist</Button>
                </PlaylistHeader>
                <PlaylistsList>
                    {playlist?.episodes?.map(ep => (
                        <Episode key={ep.link} ep={ep} podcastImage={ep.image} player={player} doAction={openEpisodeModal} setEpisode={setEpisode} active />
                    ))}
                </PlaylistsList>
            </Main>
            <ConfirmModal 
                title="Del Playlist" 
                onClose={() => setIsOpen(false)} 
                isOpen={isOpen} 
                question="Do you want to delete playlist?" 
                onConfirm={onConfirm} />
            <ConfirmModal 
                title="Remove Episode" 
                onClose={() => setIsEpisodeOpen(false)} 
                isOpen={isEpisodeOpen} 
                question="Do you want to remove episode?" 
                onConfirm={onEpisodeConfirm} />
        </>
    )
}

const mapStateToProps = state => {
    return {
        playlist: state.playlist.playlist,
        player: state.player,
        loading: state.playlist.loading
    }
}

export default connect(
    mapStateToProps, 
    { loadPlaylist, delPlaylistItem, delPlaylist, setEpisode }
)(PlaylistDetailsPage)