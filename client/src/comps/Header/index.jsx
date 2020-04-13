import React, { useState,useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { useStoreActions, useStoreState } from 'easy-peasy'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import CloseButton from './CloseButton'
  
import Modal from '../../comps/Modal'
import SignupPopup from '../../components/popups/Signup'
import Button from '../Button'
import {
  Wrapper,
  StyledLogo,
  StyledAside,
  StyledNavLink} from './style';
  
  import setAuthToken from '../../utils/setAuthToken'
  import { isEmpty, getUserType } from '../../utils/service'
  

  
  const Header = () => {
    const [modalStatus, setModalStatus] = useState(false)
    const setAuth = useStoreActions(actions => actions.auth.setAuth)
    const logoutUser = useStoreActions(actions => actions.auth.logoutUser)
    const toggleMenu = useStoreActions(actions => actions.ui.toggleMenu)
    const auth = useStoreState(state => state.auth.auth)
    const { menuOpened } = useStoreState(state => state.ui)
    

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
        className={`navbar ${menuOpened && 'opened'}`}
        role="navigation"
        aria-label="main navigation"
      >
        <Container>
          <Grid container justify="space-between">
            <a href="https://raio.agency/">
              <StyledLogo
                src="https://raio.agency/wp-content/uploads/2020/01/RAIO_logo.png"
                width="274.141"
                height="93.594"
                alt="RAIO Logo"
              />
            </a>
            <CloseButton
              aria-label="menu"
              onClick={() => toggleMenu(!menuOpened)}
              isOpened={menuOpened}
            />
          </Grid>
          <StyledAside 
            className={menuOpened && 'opened'}
          >
            <div className="buttons">
              <a
                href="https://raio.agency/"
                onClick={() => toggleMenu(!menuOpened)}
              >
                <Button>Home</Button>
              </a>
              {
                auth && auth.isAuthenticated ?
                (<>
                  <NavLink to={`/dashboard/${type}`}>
                    <Button onClick={() => toggleMenu(!menuOpened)}>
                      Dashboard
                    </Button>
                  </NavLink>
                  <Button
                    onClick={() => toggleMenu(!menuOpened)}
                  ><span onClick={logoutUser}>Sair</span></Button>
                </>) :
                (<>
                  <Button onClick={() => toggleMenu(!menuOpened)}>
                    <span onClick={() => setModalStatus(!modalStatus)}>
                      Cadastre-se
                    </span>
                  </Button>
                  <Button onClick={() => toggleMenu(false)}>
                    <StyledNavLink to="/">
                      Entrar
                    </StyledNavLink>
                  </Button>
                </>)
              }
            </div>
          </StyledAside>
        </Container>
        <Modal
          title="Cadastre-se"
          isOpen={modalStatus}
          onClose={() => setModalStatus(false)}
        >
          <SignupPopup
            toggleModalStatus={() => setModalStatus(!modalStatus)}
          />
        </Modal>
      </Wrapper>
    )
  }
  
  export default Header
  