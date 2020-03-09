import React from 'react'
import styled from 'styled-components'

const StyledForm = styled.form`
  width: 100%;
  padding: 20px;
  margin: 0 200px;
  border-radius: 20px;

  > * {
    margin: 10px 0;
  }
  @media(max-width: 991px) {
    margin: 0 100px;
  }
`

const Form = ({ children, onSubmit }) => 
  <StyledForm onSubmit={onSubmit}>
    {children}
  </StyledForm>

export default Form