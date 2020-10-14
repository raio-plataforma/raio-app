import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import Star from '@material-ui/icons/Star'
import PcD from '@material-ui/icons/Accessible'
import Title from './../../comps/Title'
import Text from './../../comps/Text'
import Button from '../../comps/Button'
// import { getKeys } from '../../utils/formatter'

const StyledProfile = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: space-between;
  margin-right: 0px;

  .main-info {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .image {
    width: 80px;
    height: 80px;
    border-radius: 100%;
    color: #f2be8a;
    background: #601819;
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
    color: #ba3b29;
    text-align: center;
    margin-top: 20px;
  }

  h2, h3, h4, h6 {
    color: #ba3b29;
  }

  a {
    text-decoration: none;
  }
`

function Profile({ id, icon, name, associate, bio, type, segments, pcd }) {
  return (
    <StyledProfile className='profile profile-color-font'>
      <div className="main-info">
        <span className="image">{icon}</span>
        <Title size="md"><strong>{name}</strong></Title>
        <Title size="xs"><strong>Perfil {type}</strong></Title>
        {associate && (
          <div className="associate">
            <Star color="secondary" />
            <Text color="secondary">Associado APAN</Text>
          </div>)
        }
        {pcd && (
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

      {/* <Link
        className="fixed-bottom"
        to={`/editar/${type.toLowerCase()}/${id}`}>
        <Button
          variant="contained"
          color="primary"
          size="large"
        >
          Editar dados de {type}
        </Button>
      </Link> */}
    </StyledProfile>
  )
}

export default Profile
