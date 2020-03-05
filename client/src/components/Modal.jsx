import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const ModalStyled = styled.div`
  display: ${props => !props.isOpen ? 'none' : 'block'}; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  bottom: 0;
  overflow: auto; /* Enable scroll if needed */
  background-color: transparent; /* Fallback color */
  
`

const ModalContentStyled = styled.div`
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: ${props => `${props.width}`}; /* Could be more or less, depending on screen size */
  background-color: #fc9b44;
  border: none;
  border-radius: 4px;
`

const CloseButtonStyled = styled.div`
  color: rgba(0,0,0,.3);
  float: right;
  font-size: 28px;
  font-weight: bold;

  &:hover,
  &:focus {
    color: #FFFF;
    text-decoration: none;
    cursor: pointer;
  }
`


const Modal = ({ children, isOpen, onClose, width }) => (
  <ModalStyled isOpen={isOpen}>
    <ModalContentStyled width={width}>
      <CloseButtonStyled onClick={onClose}>&times;</CloseButtonStyled>
      {children}
    </ModalContentStyled>
  </ModalStyled>
)

Modal.propTypes = {
  /** Flag used to control modal open and close */
  isOpen: PropTypes.bool,
  /** Width of modal content in percent (%) */
  width: PropTypes.string,
  /** Function used when closing modal */
  onClose: PropTypes.func.isRequired
}

Modal.defaultProps = {
  opened: false,
  width: 30
}

/** @component */
export default Modal