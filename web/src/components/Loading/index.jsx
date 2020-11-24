import React from 'react'
import loadingImg from './loading.gif'
import { CenterContainer, LoadingImg } from './styles'

const Loading = () => {
    return (
        <CenterContainer>
            <LoadingImg src={loadingImg} alt="loading..."/>
        </CenterContainer>
    )
}

export default Loading
