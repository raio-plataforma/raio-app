import React, { Fragment } from 'react'
import styled from 'styled-components'

import Flexbox from '../Flexbox'
import welcome from '../../assets/raio_bemvindo.png'

const BoasVindas = () => {
  return (
    <Fragment>
      <Flexbox
        width="100%"
        center
        margin={{
          top: 10,
          bottom: 20,
          left: 0,
          right: 0
        }}
      >
        <img src={welcome} />
      </Flexbox>
    </Fragment>
  )
}


export default BoasVindas;