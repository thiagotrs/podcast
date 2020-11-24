import styled from 'styled-components'

export const StyledEpisode = styled.div`
    /* background-color: #0c101b; */
    border: 1px solid #9ca8b0;
    display: flex;
    margin: 8px 0;
    border-radius: 8px;
    overflow: hidden;
    align-items: center;
    height: 100px;
    color: #fff;

    img {
        width: 100px;
        height: 100px;
        object-fit: cover;
    }

    button {
        margin-left: auto;
        margin-right: 8px;
        flex-grow: 0;
        flex-shrink: 0;
    }
`

export const EpisodeBody = styled.div`
    width: 100%;
    margin: 0 8px;
    font-size: 0.9em;

    @media(min-width: 768px) {
        font-size: 1em;
    }
`