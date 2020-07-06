import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useStoreActions, useStoreState } from 'easy-peasy'
import Person from '@material-ui/icons/Person'

import Enterprise from '@material-ui/icons/AccountBalanceOutlined'
import Delete from '@material-ui/icons/Delete';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Loading from "../../components/loading";
import { getInfo } from './user_info'
// import uuid from 'uuid'

import Profile from './Profile'
import Info from './Info'
import Modal from '../../components/Modal'
import NewModal from '../../comps/Modal'
import Button from '../../comps/FormButton'
import welcome from '../../assets/raio_bemvindo.png'
import seloPlans from '../../assets/selo.png'
import loading from '../../assets/loading.svg'
// import {
//   Background,
// } from './style'

const Dashboard = () => {
  const userType = useStoreState(state => state.auth.auth.user)
  const getUser = useStoreActions(actions => actions.user.getUser)
  const user = useStoreState(state => state.user.user)
  const hasVacancies = user.vacancies - user.usedVacancies > 0;

  const [modalStatus, setModalStatus] = useState(false)
  const [modalInfoPlans, setModalInfoPlans] = useState(false)
  const [modalBoasVindas, setModalBoasVindas] = useState(false)

  useEffect(() => {
    typeof userType.type !== 'undefined' && getUser(userType.type)
    // if (userType.type === "professional") setModalBoasVindas(true)
    // if (userType.type === "enterprise") setModalInfoPlans(true)

    // setTimeout(() => {
    //   setModalBoasVindas(false)
    //   setModalInfoPlans(false)
    // }, 3000)

  }, [userType, getUser])

  return (
    <Container>
      {Object.values(user).length ? (
      <>
        <Paper style={{backgroundColor: '#f7cc94', padding: '15px'}}>
          <Grid container>
            <Grid item xs={4}>
              <Profile
                id={user._id}
                name={user.enterprise_name || user.name}
                icon={ userType.type === "enterprise" ?
                  <Enterprise style={{ fontSize: 60 }} /> :
                  <Person style={{ fontSize: 60 }} /> }
                associate={user.apan_associate}
                type={userType.type === "enterprise" ? "Empresa" : "Profissional"}
                bio={userType.type === "enterprise" ? user.presentation : user.bio}
                pcd={user.pcd}
                segments={userType.type === "enterprise" ? user.business_segments : user.identity_segments}
              />

            </Grid>
            <Grid item xs={8}>
              <Info
                infoList={getInfo(user, userType.type)}
              />
            </Grid>
          </Grid>

        </Paper>

      <Container>
      {userType.type === "enterprise" ?
        (<>
          {!hasVacancies ? <Link to="/cadastro/vaga">
              <Button variant="contained">
                Cadastrar Vagas
              </Button>
            </Link> :
            <a href="http://raio.agency/planos">
              <Button variant="contained">
                Cadastrar Vagas
              </Button>
            </a>
            }
            { !(user && user.usedVacancies > 0) &&
            (<Link to={`/listagem/vagas/${user.enterprise_id}`}>
              <Button
                variant="contained"
                color="primary"

              >
                Ver minhas vagas
              </Button>
            </Link>) }
            <Link to={'/busca/profissionais'}>
              <Button
                variant="contained"
                color="primary"
              >
                Buscar profissional
              </Button>
            </Link>
        </>) :
        (<>
        <Link to={`/listagem/vagas`}>
          <Button
            variant="contained"
            color="primary"
          >
            Ver vagas
          </Button>
        </Link>
          <Button
            variant="contained"
            color="primary"
          >
            Ver minhas candidaturas
          </Button>
        </>)
      }


      <Link to={`/editar/usuario/${user.user_id}`}>
        <Button
          variant="contained"
          color="primary"
        >
          Editar Dados de Acesso
        </Button>
      </Link>

        <Button
          variant="contained"
          color="primary"

          onClick={() => setModalStatus(true)}
        >
          Deletar Perfil
        </Button>
      </Container>

      <Modal
        isOpen={modalBoasVindas}
        onClose={() => setModalBoasVindas(false)}
        width="300px"
      >
        <img  style={{width: '300px'}} src={welcome} alt={''} />
      </Modal>

      <NewModal
        isOpen={modalStatus}
        onClose={() => setModalStatus(false)}
        title="Deseja realmente excluir sua conta?"
      >
        <Button color="dark"><Delete />Excluir</Button>
      </NewModal>
        <Modal
        isOpen={modalInfoPlans}
        onClose={() => setModalInfoPlans(false)}
        width="300px"
      >
       <img src={seloPlans} alt={''} />
       </Modal>
      </>) :
       <Loading/>}
    </Container>
  )
}

export default Dashboard
