import React, { useEffect } from "react"
import { useStoreState, useStoreActions } from 'easy-peasy'
import Alert from '@material-ui/lab/Alert'

import { Container, Group, Background } from './style'
import { IfElse } from '../../components/If'
import Tables from '../../comps/Tables'
import Button from "../../comps/Button";
import Grid from "@material-ui/core/Grid";

const headCells = [
  { id: 'enterprise_name', numeric: false, disablePadding: true, label: 'Empresa' },
  { id: 'title', numeric: false, disablePadding: false, label: 'Título' },
  { id: 'function', numeric: false, disablePadding: false, label: 'Funções' },
  { id: 'requirements', numeric: false, disablePadding: false, label: 'Requisitos' },
  { id: 'location', numeric: false, disablePadding: false, label: 'Endereço' },
  { id: 'cache', numeric: true, disablePadding: false, label: 'Cachê' },
  { id: 'status', numeric: true, disablePadding: false, label: 'Status' }
];

const VacancyList = ({ match }) => {
  const vacancies = useStoreState(state => state.vacancy.vacancies)
  const getAllVacancies = useStoreActions(actions => actions.vacancy.getAllVacancies)

  useEffect(() => {
    const id = match.params && match.params.id
    getAllVacancies(id)
  }, [getAllVacancies, match.params])
  return (
    <Background>
      <Container>
        <div style={{marginBottom:50}}>
          <a href="/dashboard/profissional">
            <Button
                variant="contained"
            >Voltar</Button>
          </a>
        </div>
        <Group>
          <IfElse
            condition={typeof vacancies !== 'undefined' && vacancies.length > 0}
            True={
              <Tables 
                title="Vagas"
                headCells={headCells}
                list={vacancies} 
                linkMoreCampo="id"
                link="/vaga/"
              />
            }
            False={
              <Alert severity="warning">Não há vagas cadastradas</Alert>
            }
          />
        </Group>
      </Container>
    </Background>
  )
}

export default VacancyList
