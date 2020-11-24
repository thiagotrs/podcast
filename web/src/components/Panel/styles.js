import styled from 'styled-components'
import Title from '../Title'

export const StyledPanel = styled.div`
    background-color: #44449a;
    padding: 0 12px;
    overflow: hidden;

    @media(min-width: 768px) {
        padding: 0;
    }
`

export const PanelContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;    
    color: #fff;
    height: 180px;

    @media(min-width: 768px) {
        width: 752px;
        margin: 0 auto;
        padding: 0;
        height: 200px;
    }
`

export const PanelBody = styled.div`
    width: 100%;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    @media(min-width: 768px) {
        width: initial;
        height: 180px;
    }

    ${Title} {
        font-size: 1.2em;
        text-align: left;
        margin: 8px 0;

        @media(min-width: 768px) {
            font-size: 1.5em;
        }
    }
`

export const PanelCover = styled.img`
    width: 150px;
    margin-right: 12px;

    @media(min-width: 768px) {
        width: 180px;
    }
`