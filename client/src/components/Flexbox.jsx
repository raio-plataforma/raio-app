import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { px } from '../utils/service'

const Flexbox = styled(({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  )
})`
  display: flex;

  ${props => props.horizontal && `
    flex-direction: row;
  `}
  ${props => props.vertical && `
    flex-direction: column;
  `}

  ${props => props.center && `
    align-items: center;
    justify-content: center;
    height: 100%;
  `}

  ${props => props.end && `
    align-items: end;
    justify-content: flex-end;
  `}

  ${props => props.justify && `
    justify-content: ${props.justify};
  `}

  ${props => props.align && `
    align-items: ${props.align};
  `}

  ${props => props.width && `
    width: ${props.width};
  `}

  ${props => props.margin && props.margin.top && `margin-top: ${px(props.margin.top)};`}
  ${props => props.margin && props.margin.bottom && `margin-bottom: ${px(props.margin.bottom)};`}
  ${props => props.margin && props.margin.left && `margin-left: ${px(props.margin.left)};`}
  ${props => props.margin && props.margin.right && `margin-right: ${px(props.margin.right)};`}

  ${props => props.padding && props.padding.top && `padding-top: ${px(props.padding.top)};`}
  ${props => props.padding && props.padding.bottom && `padding-bottom: ${px(props.padding.bottom)};`}
  ${props => props.padding && props.padding.left && `padding-left: ${px(props.padding.left)};`}
  ${props => props.padding && props.padding.right && `padding-right: ${px(props.padding.right)};`}
`

// decouple PropTypes only facility design props
const { shape, oneOfType, string, number } = PropTypes

Flexbox.propTypes = {
  horizontal: PropTypes.bool,
  vertical: PropTypes.bool,
  center: PropTypes.bool,
  end: PropTypes.bool,
  justify: PropTypes.oneOf(['space-around', 'space-between', 'center', 'space-evenly', 'flex-end']),
  align: PropTypes.oneOf(['center', 'flex-end', 'flex-start']),
  width: PropTypes.string,
  /** The margin property. */
  margin: shape({
    top: oneOfType([string, number]),
    bottom: oneOfType([string, number]),
    left: oneOfType([string, number]),
    right: oneOfType([string, number])
  }),
  /** The padding property. */
  padding: shape({
    top: oneOfType([string, number]),
    bottom: oneOfType([string, number]),
    left: oneOfType([string, number]),
    right: oneOfType([string, number])
  })
}

Flexbox.defaultProps = {
  margin: {},
  padding: {},
}

Flexbox.displayName = 'Flexbox'

export default Flexbox
