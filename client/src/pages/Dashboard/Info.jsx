import React from 'react'
import styled from 'styled-components'

import Title from './../../comps/Title'
import Text from './../../comps/Text'

const StyledInfo = styled.div`
  width: 100%;
  margin-right: 70px;
  
  .sec {
    margin-bottom: 20px;
    border-bottom: 2px solid rgba(26,26,26, .2);
    &:last-child {
      border-bottom-color: transparent;
    } 

    h6 {
      color: #200122;
    }
  }

  .values {
    display: flex;
    
    justify-content: space-between;

    .field {
      width: 30%;
      display: flex;
      flex-direction: column;

      strong {
        color: #200122;
      }
    }
  }
`

function Info({infoList}) {
  return (
    <StyledInfo className='info'>
      {
        infoList.map(info => (
          <div className="sec" key={info.title}>
            <Title align="left" size="xs"><strong>{info.title}</strong></Title>
            <div className="values">
              {
                info.values.map(val => (
                  <div className="field" key={val.campo}>
                    <Text color="primary"><strong>{val.campo}</strong></Text>
                    <Text color="secondary">{val.valor}</Text>
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
