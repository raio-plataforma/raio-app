import React, { Fragment } from 'react'
import styled from 'styled-components'

import Flexbox from '../Flexbox'
import seloPlans from '../../assets/selo.png'

const InfoDelete = ({ toggleModalStatus }) => {

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
        <a href="https://raio.agency/planos">
          <img src={seloPlans} />
        </a>
      </Flexbox>
    </Fragment>
  )
}


export default InfoDelete;

const Title = styled.h1`
  color: #FFFFFF;
`;