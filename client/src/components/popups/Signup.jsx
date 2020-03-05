import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'


import Button from '../../comps/Button'

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
        <Link to="/cadastro" onClick={() => handleClick("enterprise")}>
          <Button variant="primary" size="lg">
            Empresa
          </Button>
        </Link>
        <Link to="/cadastro" onClick={() => handleClick("professional")}>
          <Button variant="primary" size="lg">
            Profissional
          </Button>
        </Link>
    </Wrapper>
  )
}


export default SignupPopup