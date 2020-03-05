import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import ButtonMaterial from '@material-ui/core/Button'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'

const StyledCard = styled(Card)`
  &.role-card {
    background-color: #f7cc94;
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    a {
      color:#200122;
      cursor: pointer;
    }
  }
`;

const RoleCard = ({ title, to, icon, children }) => {
  return (
    <StyledCard className='role-card'>
      <CardContent>
        <div>{icon}</div>
        <Link to={to}>{title}</Link>
        {children}
      </CardContent>
    </StyledCard>
  )
}

export default RoleCard
