import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../../comps/Button'
import PersonIcon from '@material-ui/icons/Person';
import BusinessIcon from '@material-ui/icons/Business';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
const SignupPopup = ({ toggleModalStatus }) => {
  const handleClick = userType => {
    // Where I set what type of user is being registered
    localStorage.setItem('user_type', userType)
    return toggleModalStatus()
  }

  return (
    <Wrapper>
        <Link to="/cadastro" className="LinkButtonNav" onClick={() => handleClick("enterprise")}>
          <Button variant="primary" size="lg">
            <BusinessIcon /> Empresa
          </Button>
        </Link>
        <Link to="/cadastro" className="LinkButtonNav" onClick={() => handleClick("professional")}>
          <Button variant="primary" size="lg">
            <PersonIcon /> Profissional
          </Button>
        </Link>
    </Wrapper>
  )
}


export default SignupPopup