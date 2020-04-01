import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import Star from '@material-ui/icons/Star'
import PcD from '@material-ui/icons/Accessible'
import Typography from '@material-ui/core/Typography'
import Button from '../../comps/Button'
import { getKeys } from '../../utils/formatter'

const StyledProfile = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

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
  }

  .segments {
    color: #200122;
    text-align: center;
    margin-top: 20px;
  }
`

function Profile({ id, icon, name, associate, bio, type, segments, pcd }) {
  return (
    <StyledProfile className='profile'>
      <div class="main-info">
        <span className="image">{icon}</span>
        <Typography component="h2" variant="h4"><strong>{name}</strong></Typography>
        <Typography component="h3" variant="h6"><strong>Perfil {type}</strong></Typography>
        { associate && (
          <div className="associate">
            <Star color="secondary" />
            <Typography color="secondary">Associado APAN</Typography>
          </div>) 
        }
        { pcd && (
          <div className="associate">
            <PcD color="secondary" />
            <Typography color="secondary">PcD</Typography>
          </div>) 
        }
      </div>

      <section className="segments">
        <Typography component="h3" variant="h6">{type === "Empresa" ? 'Apresentação' : 'Bio'}</Typography>
        <Typography className="bio" color="secondary">{bio}</Typography>
      </section>

      {segments && segments.length > 0 &&
      <section className="segments">
        <Typography component="h3" variant="h6">Segmentos de atuação</Typography>
        <Typography color="secondary">{getKeys(segments[0]) || 'Nenhum'}</Typography>
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