import styled from 'styled-components'

export const Form = styled.form`
  width: 50%;
  margin: 25px;
  padding: 30px;
`

export const Success = styled.div`
  color: #79A9D2;
  font-weight: 600;
  margin-top: 20px;
`

export const Background = styled.div`
  height: 100%;

  h2 {
    text-align: center;
    font-weight: bold;
    margin-bottom: 20px;
  }

  form {
    > * {
      margin: 5px 0;
    }
  }
`

export const WrapButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`

export const Title = styled.h1`
  color:#F9A639;
  font-size: 40px;
`