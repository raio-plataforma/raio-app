import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledButton = styled.button`
  ${props => `min-width: ${props.minWidth || '120px'};`}
  ${props => props.margin && props.margin.top && `margin-top: ${props.margin.top};`}
  ${props => `margin-bottom: ${(props.margin && props.margin.bottom) || '.5rem'};`}
  ${props => props.margin && props.margin.left && `margin-left: ${props.margin.left};`}
  ${props => `margin-right: ${(props.margin && props.margin.right) || '10px'};`}
  ${props => `color: ${props.color || '#fc9b44'};`}
  ${props => `background: ${props.background || '#fc9b44'};`}
  line-height: 1.5;
  padding-bottom: calc(.5em - 1px);
  padding-left: calc(.75em - 1px);
  padding-right: calc(.75em - 1px);
  padding-top: calc(.5em - 1px);
  border-radius: 4px;
  font-size: 1rem;
  &:hover {
    color: #fff;
  }
  border: none;
  text-decoration: none;
`

const Button = ({ type, onClick, children, disabled, styles, isLoading }) => (
  <StyledButton
    className={`button ${isLoading ? 'is-loading' : ''} ${styles}`}
    disabled={disabled}
    type={type}
    onClick={onClick}
  >
    {children}
  </StyledButton>
)

export default Button

const { node, bool, string, shape, oneOfType, number } = PropTypes

Button.propTypes = {
  isLoading: bool,
  /** Children nodes. */
  children: node,
  /** Disable button. */
  disabled: bool,
  /** Button type. */
  type: string,
  /** Button min-width. */
  minWidth: string,
  /** Button margin. */
  margin: shape({
    top: oneOfType([string, number]),
    bottom: oneOfType([string, number]),
    left: oneOfType([string, number]),
    right: oneOfType([string, number])
  }),
}

Button.defaultProps = {
  isLoading: false,
  type: 'button',
  disabled: false,
  style: 'is-rounded normal is-danger',
  margin: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
}