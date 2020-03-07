import React, {
  useState,
  useEffect
} from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components'
import jwtDecode from 'jwt-decode'
import { useStoreActions, useStoreState } from 'easy-peasy'

import Modal from '../components/Modal'
import SignupPopup from '../components/popups/Signup'
import Button from '../components/Button'
import { IfElse } from '../components/If'

import setAuthToken from '../utils/setAuthToken'
import { isEmpty, getUserType } from '../utils/service'

const Wrapper = styled.nav`
  background-color: #200122;
  padding: 5px;
  z-index: 30;
  position: relative;
`

const StyledLogo = styled.img`
  margin-left: 30px;
`

const StyledLink = styled.a`
  lineHeight: 1.5;
  padding-bottom: calc(.5em - 1px);
  padding-left: calc(.75em - 1px);
  padding-right: calc(.75em - 1px);
  padding-top: calc(.5em - 1px);
  border-radius: 4px;
  font-size: 1rem;
  margin-bottom: .5rem;
  margin-right: 10px;
  border: none;
  text-decoration: none;
  color: #FC9B55;
  &:hover {
    color: #fff;
  }
`

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #FC9B55;
  &:hover {
    color: #fff;
  }
`

const Header = () => {
  const [modalStatus, setModalStatus] = useState(false)
  const setAuth = useStoreActions(actions => actions.auth.setAuth)
  const logoutUser = useStoreActions(actions => actions.auth.logoutUser)
  const auth = useStoreState(state => state.auth.auth)

  useEffect(() => {
    if (localStorage.jwtToken) {
      // Set the auth token header auth
      setAuthToken(localStorage.jwtToken)

      // Decode token and get user info and exp
      const decoded = jwtDecode(localStorage.jwtToken)

      // Set user and auth
      setAuth({
        isAuthenticated: !isEmpty(decoded),
        user: decoded
      })

      // Check for expired token
      const currentTime = Date.now() / 1000
      if (decoded.exp < currentTime) {
        // Logout user
        // Clear current profile
        // Redirect to login
        logoutUser()
      }
    }
  }, [setAuth, logoutUser])

  const type = getUserType(auth && auth.user.type)

  return (
    <Wrapper
      className="navbar"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a href="https://raio.agency/">
          <StyledLogo
            src="https://raio.agency/wp-content/uploads/2020/01/RAIO_logo.png"
            width="274.141"
            height="93.594"
            alt="RIO Logo"
          />
        </a>
        <button
          type="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <StyledLink
                background="#200122"
                color="#FC9B55"
                href="https://raio.agency/"
              >
                Home
              </StyledLink>
              <IfElse
                condition={auth && auth.isAuthenticated}
                True={
                  <>
                    <Button>
                      <StyledNavLink to={`/dashboard/${type}`}>
                        Dashboard
                      </StyledNavLink>
                    </Button>
                    <Button
                      background="#200122"
                      color="#FC9B55"
                      onClick={logoutUser}
                    >
                      Sair
                    </Button>
                  </>
                }
                False={
                  <>
                    <Button onClick={() => setModalStatus(!modalStatus)}>
                      Cadastre-se
                    </Button>
                    <Button>
                      <StyledNavLink to="/">
                        Entrar
                      </StyledNavLink>
                    </Button>
                  </>
                }
              />
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalStatus}
        onClose={() => setModalStatus(false)}
        width="500px"
      >
        <SignupPopup
          toggleModalStatus={() => setModalStatus(!modalStatus)}
        />
      </Modal>
    </Wrapper>
  );
}

export default Header;
