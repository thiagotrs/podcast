import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { PodcastsGrid, PodcastHeader, Input } from './styles'
import Title from '../../components/Title'
import Main from '../../components/Main'
import NavBar from '../../components/NavBar'
import Header from '../../components/Header'
import { Button } from '../../components/Button'
import { loadPodcasts, subscribePodcast, resetMessages } from '../../store/ducks/podcasts'
import { FormModal } from '../../components/Modal'
import Loading from '../../components/Loading'

const PodcastsPage = ({podcasts, loadPodcasts, subscribePodcast, resetMessages, error, success, loading}) => {
    useEffect(() => {
        loadPodcasts();
    }, [loadPodcasts]);

    useEffect(() => {
        if(success) setIsOpen(false)
    }, [success])

    const [isOpen, setIsOpen] = useState(false)

    const onSubmit = (event) => {
        subscribePodcast(event.target.elements.feed.value)
        event.preventDefault()
    }

    const openModal = () => {
        resetMessages()
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
                <PodcastHeader>
                    <Title>My Podcasts</Title>
                    <Button onClick={openModal}>Subscribe</Button>
                </PodcastHeader>
                <PodcastsGrid>
                    {podcasts.map(pod => (
                    <Link to={`/podcast/${pod.id}`} key={pod.id}>
                        {pod.image
                            ? <img src={pod.image} alt={pod.title} />
                            : <span>{pod.title}</span>}
                    </Link>))}
                </PodcastsGrid>
            </Main>
            <FormModal title="Add Podcast" onClose={() => setIsOpen(false)} isOpen={isOpen} onSubmit={onSubmit} error={error}>
                <Input type="url" name="feed" id="feed" placeholder="Feed URL" required />
            </FormModal>
        </>
    )
}

const mapStateToProps = state => {
    return {
        podcasts: state.podcasts.podcasts,
        error: state.podcasts.error,
        success: state.podcasts.success,
        loading: state.podcasts.loading
    }
}

export default connect(mapStateToProps, { loadPodcasts, subscribePodcast, resetMessages })(PodcastsPage)
