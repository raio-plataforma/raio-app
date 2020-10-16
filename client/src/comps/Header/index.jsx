import React, { useState, useEffect } from 'react'
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
  StyledNavLink
} from './style';

import setAuthToken from '../../utils/setAuthToken'
import { isEmpty, getUserType } from '../../utils/service'
import LinkButtonNav from './linkButtonNav'
import HomeIcon from '@material-ui/icons/Home';
import WorkIcon from '@material-ui/icons/Work';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HistoryIcon from '@material-ui/icons/History';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonIcon from '@material-ui/icons/Person';
import BusinessIcon from '@material-ui/icons/Business';

const Header = () => {
  const [modalStatus, setModalStatus] = useState(false)
  const setAuth = useStoreActions(actions => actions.auth.setAuth)
  const logoutUser = useStoreActions(actions => actions.auth.logoutUser)
  const toggleMenu = useStoreActions(actions => actions.ui.toggleMenu)
  const auth = useStoreState(state => state.auth.auth)
  const { menuOpened } = useStoreState(state => state.ui)
  const userType = useStoreState(state => state.auth.auth.user)
  const user = useStoreState(state => state.user.user)
  const urlAtual = new URL(window.location.href)


  useEffect(() => {
    if (urlAtual.searchParams.get("cadastro") == "true") {
      setModalStatus(true);
    }

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
          <a href="/">
            <StyledLogo
              src="https://raio.agency/wp-content/uploads/2020/01/RAIO_logo.png"
              width="160"
              alt="RAIO Logo"
            />
          </a>
          <CloseButton
            aria-label="menu"
            onClick={() => toggleMenu(!menuOpened)}
            isOpened={menuOpened}
          />
        </Grid>

        <StyledAside className={menuOpened && 'opened'} >
          <div className="buttons">
            {auth && auth.isAuthenticated ? (
              <div className="navbarUserLogado">
                <LinkButtonNav to={`/dashboard/${type}`}> <HomeIcon /> Início </LinkButtonNav>

                {
                  userType.type === "enterprise" ? (
                    <div className="navbarEmpresas">
                      <LinkButtonNav to={`/painel/empresa/vagas`}> <WorkIcon /> Vagas </LinkButtonNav>
                      <LinkButtonNav to={`/perfil/editar/empresa`}> <EditIcon /> Editar empresa </LinkButtonNav>
                      <LinkButtonNav to={`/perfil/editar/usuario`}> <EditIcon /> Editar usuário </LinkButtonNav>
                    </div>
                  ) : (<></>)
                }


                {
                  userType.type === "professional" ? (
                    <div className="navbarProfissional">
                      <LinkButtonNav to={`/vagas`}> <WorkIcon /> Vagas </LinkButtonNav>
                      <LinkButtonNav to={`/painel/profissional/candidaturas`}> <HistoryIcon /> Candidaturas </LinkButtonNav>
                      <LinkButtonNav to={`/perfil/editar/profissional`}> <EditIcon /> Editar currículo </LinkButtonNav>
                      <LinkButtonNav to={`/perfil/editar/usuario`}> <EditIcon /> Editar usuário </LinkButtonNav>
                    </div>
                  ) : (<></>)
                }


                {
                  userType.type === "admin" ? (
                    <div className="navbarAdmin">
                      <LinkButtonNav to={`/painel/admin/empresas`}> <BusinessIcon /> Empresas </LinkButtonNav>
                      <LinkButtonNav to={`/painel/admin/buscar/profissionais`}> <PersonIcon /> Profissional </LinkButtonNav>
                      <LinkButtonNav to={`/painel/admin/vagas`}> <WorkIcon /> Vagas </LinkButtonNav>
                      <LinkButtonNav to={`/perfil/editar/usuario`}> <EditIcon /> Editar usuário </LinkButtonNav>
                    </div>
                  ) : (<></>)
                }


                <LinkButtonNav to={`/`} onClick={() => { logoutUser() }}> <ExitToAppIcon /> Sair </LinkButtonNav>
              </div>
            ) : (
                <div className="navbarUserDeslogado">
                  <LinkButtonNav to={`/vagas`}> <WorkIcon /> Vagas </LinkButtonNav>
                  <LinkButtonNav to={`/`} onClick={() => { setModalStatus(!modalStatus); }}> <PersonAddIcon /> Cadastre-se </LinkButtonNav>
                  <LinkButtonNav to={`/`}> <AccountCircleIcon /> Entrar </LinkButtonNav>
                </div>
              )
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
