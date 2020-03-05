import React from 'react'
import styled from 'styled-components'

const StyledText = styled.p`
  ${props => `font-size: ${props.size || '11px'};`}
  ${props => `color: ${props.color || '#000'};`}
  ${props => `font-weight: ${props.weight || '400'};`}
  ${props => `margin: ${props.margin || '0'};`}
`


const Text = ({ children, ...props }) => <StyledText {...props}>{children}</StyledText>

export default Text