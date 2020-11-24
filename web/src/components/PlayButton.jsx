import styled from 'styled-components'

const PlayButton = styled.button`
    background-size: contain;
    padding: 8px;
    border: 0;
    width: 45px;
    height: 45px;
    border-radius: 45px;
    background-color: #ebba16;
    border: 1px solid #fff;

    display: flex;
    justify-content: center;
    align-items: center;

    &::after {
        content: ' ';
        transition: all 200ms;
        margin: 0 !important;
        padding: 0;
    }

    &[data-paused="true"]::after {
        width:0;
        height: 0;
        border-top: 8px solid #0000;
        border-bottom: 8px solid #0000;
        border-left: 16px solid #fff;
        border-right: 0;
    }

    &[data-paused="false"]::after {
        border-left: 8px solid #fff;
        border-right: 8px solid #fff;
        width: 20px;
        height: 20px;
        border-top: 0;
        border-bottom: 0;
    }
`

export default PlayButton