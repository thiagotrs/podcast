import styled from 'styled-components'

export const PodcastHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #fff;
    margin-bottom: 16px;
`

export const PodcastsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    grid-gap: 16px;

    a {
        display: flex;
        background-color: #44449a;
        color: #fff;
        width: 100%;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
`

export const Input = styled.input`
    background-color: #fff;
    border: 0;
    padding: 12px;
    color: #191a1f;
    font-size: 20px;
    width:100%;
    //margin: 8px 0;
`