import React, { useEffect } from "react"
import { useStoreState, useStoreActions } from 'easy-peasy'
import Alert from '@material-ui/lab/Alert'

import { Container, Group, Background } from './style'
import { IfElse } from '../../components/If'
import Tables from '../../comps/Tables'

const headCells = [
  { id: 'enterprise_name', numeric: false, disablePadding: true, label: 'Empresa' },
  { id: 'title', numeric: false, disablePadding: false, label: 'Título' },
  { id: 'function', numeric: false, disablePadding: false, label: 'Funções' },
  { id: 'requirements', numeric: false, disablePadding: false, label: 'Requisitos' },
  { id: 'location', numeric: false, disablePadding: false, label: 'Endereço' },
  { id: 'cache', numeric: true, disablePadding: false, label: 'Cachê' },
  { id: 'total_period', numeric: true, disablePadding: false, label: 'Período' }
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
        <Group>
          <IfElse
            condition={typeof vacancies !== 'undefined' && vacancies.length > 0}
            True={
              <Tables 
                title="Vagas"
                headCells={headCells}
                list={vacancies} 
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
