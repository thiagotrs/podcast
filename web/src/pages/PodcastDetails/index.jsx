import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import Episode from '../../components/Episode'
import Title from '../../components/Title'
import Main from '../../components/Main'
import Header from '../../components/Header'
import NavBar from '../../components/NavBar'
import Panel from '../../components/Panel'
import { ConfirmModal, FormModal } from '../../components/Modal'
import { EpisodesList, SelectInput } from './styles'

import { loadPodcast } from '../../store/ducks/podcast';
import { unsubscribePodcast } from '../../store/ducks/podcasts'
import { loadPlaylists } from '../../store/ducks/playlists'
import { addPlaylistItem, resetPlaylistItemMessages } from '../../store/ducks/playlist'
import { setEpisode } from '../../store/ducks/player'
import Loading from '../../components/Loading'

const PodcastDetailsPage = ({ setEpisode, loadPodcast, podcast, playlists, player, unsubscribePodcast, loadPlaylists, addPlaylistItem, resetPlaylistItemMessages, error, success, loading }) => {
    
    const { id } = useParams()
    const history = useHistory()

    useEffect(() => {
        loadPodcast(id);
    }, [loadPodcast, id])

    useEffect(() => {
        if(success) setIsPlaylistOpen(false)
    }, [success])

    const [isOpen, setIsOpen] = useState(false)
    const [isPlaylistOpen, setIsPlaylistOpen] = useState(false)
    const [tempEpisode, setTempEpisode] = useState()

    const openModal = () => {
        setIsOpen(true)
    }

    const onConfirm = answerFlag => {
        if(answerFlag) {
            unsubscribePodcast(podcast.id)
            history.push('/')
        }
        setIsOpen(false)
    }

    const onSubmit = event => {
        const id = Number(event.target.elements.playlist.value)
        addPlaylistItem(id, tempEpisode)
        event.preventDefault()
    }

    const openPlaylistModal = ep => {
        resetPlaylistItemMessages()
        setTempEpisode(ep)
        loadPlaylists()
        setIsPlaylistOpen(true)
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
                <Panel item={podcast} onClickButton={openModal} />
            </Header>
            <Main>
                <Title>Latest Episodes</Title>
                <EpisodesList>
                    {podcast?.items.map(ep => (
                        <Episode key={ep.link} ep={ep} podcastImage={podcast.image} player={player} doAction={openPlaylistModal} setEpisode={setEpisode} />
                    ))}
                </EpisodesList>
            </Main>
            <ConfirmModal 
                title="Del Podcast" 
                onClose={() => setIsOpen(false)} 
                isOpen={isOpen} 
                question="Do you want to unsubscribe?" 
                onConfirm={onConfirm} 
            />
            <FormModal title="Select Playlist" onClose={() => setIsPlaylistOpen(false)} isOpen={isPlaylistOpen} onSubmit={onSubmit} error={error}>
                <SelectInput name="playlist" id="playlist" required>
                    {playlists.map(plist => <option value={plist.id} key={plist.id}>{plist.title}</option>)}
                </SelectInput>
            </FormModal>
        </>
    )
}

const mapStateToProps = state => {
    return {
        podcast: state.podcast.podcast,
        player: state.player,
        playlists: state.playlists.playlists,
        error: state.playlist.error,
        success: state.playlist.success,
        loading: state.podcast.loading
    }
}

export default connect(
    mapStateToProps, 
    { 
        loadPodcast, 
        setEpisode, 
        unsubscribePodcast, 
        loadPlaylists, 
        addPlaylistItem, 
        ConfirmModal, 
        resetPlaylistItemMessages 
    }
)(PodcastDetailsPage)