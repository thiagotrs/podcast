import styled from 'styled-components'

export const BackDrop = styled.div`
    position: absolute;
    z-index: 1000;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #00000080;
    padding: 12px;
    //-webkit-backdrop-filter: blur(10px);
    //backdrop-filter: blur(5px);

    &[hidden] {
        display: none;
    }
`

export const StyledModal = styled.div`
    background-color: #44449a; //#25262c;
    overflow: hidden;
    //text-align: center;
    width: 100%;
    display: flex;
    flex-direction: column;
    color: #fff;

    @media(min-width: 768px) {
        margin: 16px;
        width: 500px;
    }
`

export const ModalHeader = styled.header`
    padding: 8px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const ModalBody = styled.div`
    padding: 8px 16px;
`

export const ModalFooter = styled.footer`
    padding: 8px 16px;
    display: flex;
`

export const Button = styled.button`
    border: 0;
    background-color: #44449a;
    color: #fff;
    padding: 12px;
    font-size: 16px;

    &:hover {
        background-color: #ebba16;
        color: #1b1c22;
    }
`