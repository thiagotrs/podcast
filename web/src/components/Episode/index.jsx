import React from 'react'
import { StyledEpisode, EpisodeBody } from './styles'
import PlayButton from '../PlayButton'
import { IconButton } from '../Button'
import { FiHeart } from 'react-icons/fi'

const Episode = ({ ep, podcastImage, player, doAction, setEpisode, active }) => {
    return (
        <StyledEpisode>
            {(ep.image || podcastImage) && <img src={ep.image || podcastImage} alt=""/>}
            <EpisodeBody>
                <p><strong>{ep.title}</strong></p>
                <div>
                    <IconButton onClick={() => doAction(ep)} active={active}>
                        <FiHeart />
                    </IconButton>
                    <span>{ep.enclosure?.duration}</span>
                </div>
            </EpisodeBody>
            <PlayButton onClick={() => ep.enclosure.url !== player.episode.enclosure.url && setEpisode(ep)} data-paused={ep.enclosure?.url === player.episode?.enclosure?.url ? !player.isPlaying : true} />
        </StyledEpisode>
    )
}

export default Episode
