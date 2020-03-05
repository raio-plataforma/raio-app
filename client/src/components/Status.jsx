import React from 'react'
import { If } from './If'
import Text from './Text'

export const Error = ({ msg }) => (
  <If condition={typeof msg === 'string'}>
    <Text
      color="#f14668"
      size=".75rem"
      margin="0 0 .75rem 0"
      weight="600"
    >
      {msg}
    </Text>
  </If>
)

export const Success = ({ msg }) => (
  <If condition={msg !== ''}>
    <Text
      color="#1ee81e"
      size=".75rem"
      margin="0 0 .75rem 0"
      weight="600"
    >
      {msg}
    </Text>
  </If>
)
