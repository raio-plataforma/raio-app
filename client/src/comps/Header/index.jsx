import React, {useState,useEffect} from 'react';
  import { NavLink } from 'react-router-dom';
  import jwtDecode from 'jwt-decode'
  import { useStoreActions, useStoreState } from 'easy-peasy'
  
  import Modal from '../../comps/Modal'
  import SignupPopup from '../../components/popups/Signup'
  import Button from '../Button'
  import { IfElse } from '../../components/If'
  import {
    Wrapper,
    StyledLogo,
    StyledAside,
    StyledNavLink,
    StyledBurger} from './style';
  
  import setAuthToken from '../../utils/setAuthToken'
  import { isEmpty, getUserType } from '../../utils/service'
  

  
  const Header = ({ isOpened }) => {
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
        <div className="container clearfix et_menu_container">
          <div className="navbar-brand">
            <a href="https://raio.agency/">
              <StyledLogo
                src="https://raio.agency/wp-content/uploads/2020/01/RAIO_logo.png"
                width="274.141"
                height="93.594"
                alt="RIO Logo"
              />
            </a>
          </div>
            <StyledBurger
              onClick={() => toggleMenu(!menuOpened)}
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
            ><span></span></StyledBurger>

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
              <IfElse
                condition={auth && auth.isAuthenticated}
                True={
                  <>
                    <NavLink to={`/dashboard/${type}`}>
                      <Button onClick={() => toggleMenu(!menuOpened)}>
                        Dashboard
                      </Button>
                    </NavLink>
                    <Button
                      onClick={() => toggleMenu(!menuOpened)}
                    ><span onClick={logoutUser}>Sair</span></Button>
                  </>
                }
                False={
                  <>
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
                  </>
                }
              />
            </div>
          </StyledAside>
        </div>
        <Modal
          title="Cadastre-se"
          isOpen={modalStatus}
          onClose={() => setModalStatus(false)}
        >
          <SignupPopup
            toggleModalStatus={() => setModalStatus(!modalStatus)}
          />
        </Modal>

        {/* <Modal
          isOpen={modalStatus}
          onClose={() => setModalStatus(false)}
          width="500px"
        >
          <SignupPopup
            toggleModalStatus={() => setModalStatus(!modalStatus)}
          />
        </Modal> */}
      </Wrapper>
    );
  }
  
  export default Header;
  