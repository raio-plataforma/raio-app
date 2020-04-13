import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import Star from '@material-ui/icons/Star'
import PcD from '@material-ui/icons/Accessible'
import Title from './../../comps/Title'
import Text from './../../comps/Text'
import Button from '../../comps/Button'
import { getKeys } from '../../utils/formatter'

const StyledProfile = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: space-between;
  margin-right: 40px;

  .main-info {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .image {
    width: 80px;
    height: 80px;
    border-radius: 100%;
    color: #f7cc94;
    background: #200122;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .associate {
    display: flex;
    align-items: center;
  }

  .bio {
    text-align: justify;
    word-break: break-all;
  }

  .segments {
    color: #200122;
    text-align: center;
    margin-top: 20px;
  }

  h2, h3, h4, h6 {
    color: #200122;
  }

  a {
    text-decoration: none;
  }
`

function Profile({ id, icon, name, associate, bio, type, segments, pcd }) {
  return (
    <StyledProfile className='profile'>
      <div class="main-info">
        <span className="image">{icon}</span>
        <Title size="md"><strong>{name}</strong></Title>
        <Title size="xs"><strong>Perfil {type}</strong></Title>
        { associate && (
          <div className="associate">
            <Star color="secondary" />
            <Text color="secondary">Associado APAN</Text>
          </div>) 
        }
        { pcd && (
          <div className="associate">
            <PcD color="secondary" />
            <Text color="secondary">PcD</Text>
          </div>) 
        }
      </div>

      <section className="segments">
        <Title size="xs">{type === "Empresa" ? 'Apresentação' : 'Bio'}</Title>
        <Text className="bio" color="secondary">{bio}</Text>
      </section>

      {segments && segments.length > 0 &&
      <section className="segments">
        <Title size="xs">Segmentos de atuação</Title>
        <Text color="secondary">{segments.join(', ') || 'Nenhum'}</Text>
      </section>}

      <Link 
        className="fixed-bottom"
        to={`/editar/${type.toLowerCase()}/${id}`}>
          <Button
            variant="contained"
            color="primary"
            size="lg"
          >
            Editar dados de {type}
          </Button>
        </Link>
    </StyledProfile>
  )
}

export default Profile