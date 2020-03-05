import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import Flexbox from '../Flexbox'
import Button from '../../comps/Button'

const InfoDelete = ({ toggleModalStatus }) => {

  const handleClick = action => {
    return toggleModalStatus()
  }

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
      </Flexbox>
      <Flexbox
        justify="space-evenly"
        width="100%"
        align="center"
      >
        <Link to="/" onClick={() => handleClick()}>
          <Button>
            Excluir
          </Button>
        </Link>

        <Link to="/" onClick={() => handleClick()}>
          <Button>
            Cancelar
          </Button>
        </Link>
      </Flexbox>
    </Fragment>
  )
}


export default InfoDelete;

const Title = styled.h1`
  color: #FFFFFF;
`;