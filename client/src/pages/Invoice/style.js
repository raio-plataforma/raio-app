import styled from 'styled-components';
import { Link } from 'react-router-dom'

export const FullWidth = styled.div`
  width: 100%;
  padding: 40px;
`

export const InputWrapper = styled.div`
  margin-bottom: 20px;
`

export const Background = styled.div`
  height: calc(100vh - 200px);

  button[type='submit'] {
    display: block;
    width: 100%;
  }

  h2 {
    text-align: center;
  }
`

export const Title = styled.h1`
  color:#000;
  font-size: 40px;
`