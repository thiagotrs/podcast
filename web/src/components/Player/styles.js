import styled from 'styled-components'

export const PlayerStyle = styled.div`
    position: fixed;
    z-index: 10;
    bottom: 0;
    width: 100%;
    height: 80px;
    background-color: #ebba16;
    display: flex;
    flex-direction: column;
    color: #fff;
    /* padding: 0 8px 8px; */
    font-size: 0.9em;

    &[hidden] {
        display: none;
    }
`

export const ProgressBar = styled.div`
    width: 100%;
    height: 10px;

`

export const Bar = styled.div`
    width: ${props => props.value}%;
    height: 10px;
    background-color: rgba(0,0,0,0.7);
`

export const PlayerBody = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    height: 70px;

    img {
        height: 50px;
    }

    div {
        color: #1b1c22;
        margin: 0 8px;
    }

    button {
        flex-shrink: 0;
        flex-grow: 0;
    }
`

export const Cover = styled.img`

`

export const PlayerInfo = styled.div`

`