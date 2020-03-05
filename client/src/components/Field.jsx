import React from 'react'
import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`
export const Label = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: #FFFFFF;
  margin-right: 5px;
`
export const Text = styled.p`
  font-size: 16px; 
  color: #FFFFFF; 
  overflow-wrap: break-word;
`

const parseArray = data => data.join(", ")

const Field = ({ name, content }) => (
  <Wrapper>
    <Label>{name}</Label>
    <Text>{Array.isArray(content) ? parseArray(content) : content}</Text>
  </Wrapper>
)

export default Field