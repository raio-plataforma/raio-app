import React from 'react'
import ButtonMaterial from '@material-ui/core/Button'
import PropTypes from 'prop-types'
const Button = ({ type, onClick, children, disabled, styles, isLoading, color, variant }) => {

  return (
    <ButtonMaterial
      variant={variant}
      color={color}
      disabled={disabled}
      type={type}
      onClick={onClick}
      style={{margin: '5px'}}
      className={`button ${isLoading ? 'is-loading' : ''} ${styles}`}
    >
      {children}
    </ButtonMaterial>
  )
}

export default Button

const { node, bool, string } = PropTypes

Button.propTypes = {
  isLoading: bool,
  /** Children nodes. */
  children: node,
  /** Disable button. */
  disabled: bool,
  /** Button type. */
  type: string,
  /** Button min-width. */
  minWidth: string
}

Button.defaultProps = {
  isLoading: false,
  type: 'button',
  disabled: false,
  variant: undefined,
  color: 'primary',
  style: 'is-rounded normal is-danger'
}