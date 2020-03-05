import React from 'react'
import styled from 'styled-components'

const StyledLabel = styled.label`
  color: #000;
  font-weight: 600;
`

const Label = ({ children }) => <StyledLabel className="label">{children}</StyledLabel>

export default Label