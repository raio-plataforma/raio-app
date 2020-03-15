import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useStoreActions, useStoreState } from 'easy-peasy'
import Person from '@material-ui/icons/Person'

import Enterprise from '@material-ui/icons/AccountBalanceOutlined'
import Delete from '@material-ui/icons/Delete';
import { getInfo } from './user_info' 
import uuid from 'uuid'

import Profile from './Profile'
import Info from './Info'
import Modal from '../../components/Modal'
import NewModal from '../../comps/Modal'
import Button from '../../comps/Button'
import { If } from '../../components/If'
import BoasVindas from '../../components/popups/BoasVindas'
import seloPlans from '../../assets/selo.png'
import loading from '../../assets/loading.svg'
import {
  Background,
  GroupButtons,
  Container,
} from './style'



const Dashboard = () => {
  const userType = useStoreState(state => state.auth.auth.user)
  const getUser = useStoreActions(actions => actions.user.getUser)
  const user = useStoreState(state => state.user.user)
  const hasVacancies = user.vacancies - user.usedVacancies > 0;

  const [modalStatus, setModalStatus] = useState(false)
  // const [disabledButton, setDisabledButton] = useState(false) // TODO: Add count to set or unset register vacancy button
  const [modalInfoPlans, setModalInfoPlans] = useState(false)
  const [modalBoasVindas, setModalBoasVindas] = useState(false)

  useEffect(() => {
    typeof userType.type !== 'undefined' && getUser(userType.type)
    if (userType.type === "professional") setModalBoasVindas(true)
    if (userType.type === "enterprise") setModalInfoPlans(true)
  }, [userType, getUser])

  return (
    <Background>
      {Object.values(user).length ? (
      <>
      <Container className='header container clearfix et_menu_container'>
        <div className="container clearfix et_menu_container">
          <Profile
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
          <Info
            infoList={getInfo(user, userType.type)}
          />
           
        </div>
          
      </Container>
      
      <GroupButtons className="container">
        <If condition={userType.type === "enterprise"}>
          {hasVacancies ? <Link to="/cadastro/vaga">
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
          { (user && user.usedVacancies > 0) && 
          (<Link to={`/listagem/vagas/${user.enterprise_id}`}>
            <Button
              variant="contained"
              color="primary"
              size="lg"
            >
              Ver minhas vagas
            </Button>
          </Link>) }
          <Link to={'/busca/profissionais'}>
            <Button
              variant="contained"
              color="primary"
              size="lg"
            >
              Buscar profissional
            </Button>
          </Link>
        </If>
        <Link to={`/editar/usuario/${user.user_id}`}>
          <Button
            variant="contained"
            color="primary"
            size="lg"
          >
            Editar Responsável
          </Button>
        </Link>
        <Button
          variant="contained"
          color="primary"
          size="lg"
          onClick={() => setModalStatus(true)}
        >
          Deletar Perfil
        </Button>
      </GroupButtons>

      <Modal
        isOpen={modalBoasVindas}
        onClose={() => setModalBoasVindas(false)}
        width="300px"
      >
        <BoasVindas />
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
      >
       <img src={seloPlans} />
       </Modal>
      </>) : 
       <img src={loading} />}
    </Background>
  )
}

export default Dashboard