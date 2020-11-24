import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { setEpisode, toggle } from '../../store/ducks/player'

import { PlayerStyle, ProgressBar, Bar, PlayerBody, Cover, PlayerInfo } from './styles'
import PlayButton from '../PlayButton'

const Player = ({ player, toggle }) => {
    const playerRef = useRef(null);

    const [currentTime, setCurrentTime] = useState(playerRef.current?.currentTime);
    const [durationTime, setDurationTime] = useState(playerRef.current?.duration);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(playerRef.current?.currentTime);
            setDurationTime(playerRef.current?.duration);
        }, 1000);

        return () => {
            clearInterval(timer);
        }
    })

    useEffect(() => {
        if(player.episode.enclosure.url) {
            playerRef.current.load();
            playerRef.current.play();
            toggle();
        }
    }, [player.episode.enclosure.url, playerRef, toggle])

    const togglePlay = () => {
        if (player.isPlaying) {
            playerRef.current.pause();
        } else {
            playerRef.current.play();
        }
        toggle();
    }

    return (
        <PlayerStyle hidden={!player.episode.enclosure.url}>
            <audio ref={playerRef}><source src={player.episode.enclosure.url} type="audio/mpeg" /></audio>
            <ProgressBar>
                <Bar value={((currentTime * 100) / durationTime) || 0} />
            </ProgressBar>
            <PlayerBody>
                <Cover src={player.episode.image} alt="" />
                <PlayerInfo>
                    <p>{player.episode.title}</p>
                    <p><strong>{new Date((currentTime * 1000) - 75600000).toLocaleTimeString()} / {new Date((durationTime * 1000) - 75600000).toLocaleTimeString()}</strong></p>
                </PlayerInfo>
                <PlayButton onClick={togglePlay} data-paused={playerRef.current?.paused} />
            </PlayerBody>
        </PlayerStyle>
    );
}

const mapStateToProps = state => {
    return {
        player: state.player,
    }
}

export default connect(mapStateToProps, { setEpisode, toggle })(Player)
