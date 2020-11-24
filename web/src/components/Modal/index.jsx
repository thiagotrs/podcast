import React from 'react'
import { createPortal } from 'react-dom'
import { BackDrop, StyledModal, ModalHeader, ModalBody, ModalFooter, Button } from './styles'
import { IconButton } from '../Button'
import Title from '../Title'
import { AiOutlineClose } from 'react-icons/ai'

export const Modal = ({ title, onClose, isOpen, children }) => {
    return (isOpen &&
        <BackDrop>
            <StyledModal>
                <ModalHeader>
                    <Title>{title}</Title>
                    <IconButton active style={{fontSize: '2em', display: 'inlineFlex'}} onClick={onClose}>
                        <AiOutlineClose />
                    </IconButton>
                </ModalHeader>
                {children}
            </StyledModal>
        </BackDrop>
    )
}

export const ConfirmModal = ({ question, onConfirm, ...rest  }) => createPortal((
    <Modal {...rest}>
        <ModalBody>{question}</ModalBody>
        <ModalFooter>
            <Button onClick={() => onConfirm(true)}>Confirm</Button>
            <Button onClick={() => onConfirm(false)}>Cancel</Button>
        </ModalFooter>
    </Modal>
), document.getElementById('modal'))

export const FormModal = ({ children, onSubmit, modalRef, error, ...rest  }) => createPortal((
    <Modal {...rest}>
        <form id="form" onSubmit={onSubmit}>
            <ModalBody>
                {children}
                {error && <p><strong>{error}</strong></p>}
            </ModalBody>
            <ModalFooter>
                <Button type="submit">Submit</Button>
            </ModalFooter>
        </form>
    </Modal>
), document.getElementById('modal'))
