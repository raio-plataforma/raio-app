import React from 'react'
import styled from 'styled-components'

import Star from '@material-ui/icons/Star'
import Typography from '@material-ui/core/Typography'

const StyledInfo = styled.div`
  width: 100%;
  margin-right: 70px;
  
  .sec {
    margin-bottom: 20px;
    border-bottom: 2px solid rgba(26,26,26, .2);
    &:last-child {
      border-bottom-color: transparent;
    } 
  }

  .values {
    display: flex;
    justify-content: space-between;

    .field {
      flex: 33.3%;
    }
  }
`

function Info({infoList}) {
  
  return (
    <StyledInfo className='info'>
      {
        infoList.map(info => (
          <div className="sec">
            <Typography component="h3" variant="h6"><strong>{info.title}</strong></Typography>
            <div className="values">
              {
                info.values.map(val => (
                  <div className="field">
                    <Typography color="secondary"><strong>{val.campo}</strong></Typography>
                    <Typography color="secondary">{val.valor}</Typography>
                  </div>
                ))
              }
            </div>
          </div>
        ))
      }
    </StyledInfo>
  )
}

export default Info