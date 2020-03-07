import styled from 'styled-components'
import React, {useState,useEffect} from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'
  
const StyledBody = styled.div`
  color: #ef9448;
  position: relative;
  transition: .3s all ease-in-out;
  left: 0;
  
  &.opened {
    left: -320px;
  }

  button:hover {
    &[type='button'] {
      color: #200122;
    }
  }

  .MuiFormLabel-root {
    color: #ef9448;
  }
`

const AppBody = ({ children }) => {
  const {menuOpened} = useStoreState(state => state.ui)

  return (
    <StyledBody className={menuOpened && 'opened'}>
      { children }
    </StyledBody>
  )
}
  
  export default AppBody
  