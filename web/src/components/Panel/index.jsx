import React from 'react'
import { StyledPanel, PanelContainer, PanelBody, PanelCover } from './styles'
import Title from '../Title'
import { Button } from '../Button'

const Panel = ({ item, onClickButton }) => {
    return (
        <StyledPanel>
            <PanelContainer>
                {item?.image && <PanelCover src={item.image} alt=""/>}
                <PanelBody>
                    <Title>{item.title}</Title>
                    <Button onClick={onClickButton}>Unsubscribe</Button>
                </PanelBody>
            </PanelContainer>
        </StyledPanel>
    )
}

export default Panel
