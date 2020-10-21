import React, { useEffect, useState } from "react"
import { useStoreState, useStoreActions } from 'easy-peasy'
import Alert from '@material-ui/lab/Alert'
import { Container, Group, Background } from './style'
import { IfElse } from '../../components/If'
import Tables from '../../comps/Tables'
import Button from "../../comps/Button";
import Grid from "@material-ui/core/Grid";
import Erro from "../../components/erro"
import Carregando from "../../components/loading/carregando"
import Titulo from "../../components/Titulo"

const headCells = [
  { id: 'enterprise_name', numeric: false, disablePadding: true, label: 'Empresa' },
  { id: 'title', numeric: false, disablePadding: false, label: 'Título' },
  { id: 'function', numeric: false, disablePadding: false, label: 'Funções' },
  { id: 'requirements', numeric: false, disablePadding: false, label: 'Requisitos' },
  { id: 'location', numeric: false, disablePadding: false, label: 'Endereço' },
  { id: 'cache', numeric: true, disablePadding: false, label: 'Cachê' },
  { id: 'status', numeric: true, disablePadding: false, label: 'Status' }
];

const VacancyList = () => {
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  const vacancies = useStoreState(state => state.vacancy.vacancies)
  const getAllVacancies = useStoreActions(actions => actions.vacancy.getAllVacancies)
  const user = useStoreState(state => state.user.user)
  const userType = useStoreState(state => state.auth.auth.user)
  const getUser = useStoreActions(actions => actions.user.getUser)


  useEffect(() => {
    if ((String(userType.type) !== 'undefined') && (!user.enterprise_id)) {
      getUser(userType.type)
    }

    if ((user.enterprise_id) && (String(vacancies) == 'undefined')) {
      getAllVacancies(user.enterprise_id);
    }

    if (String(vacancies) !== 'undefined') {
      setCarregando(false);
    }
  });



  return (
    <div className="pageRender">
      { erro !== null ? (
        <Erro erro={erro} />
      ) : (
          <div>
            { carregando == true ? (
              <Carregando />
            ) : (
                <Container center="true" maxWidth="lg">
                  <Titulo> Vagas </Titulo>

                  <Tables
                    title="Vagas cadastradas na sua empresa"
                    headCells={headCells}
                    list={vacancies}
                    linkMoreCampo="id"
                    link="/vaga/"
                    btnAddLink="/cadastro/vaga"
                    btnAddLabel="Adicionar nova"
                  />
                </Container>
              )
            }
          </div>
        )
      }
    </div>
  )

}

export default VacancyList
