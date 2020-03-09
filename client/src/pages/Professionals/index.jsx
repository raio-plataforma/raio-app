import React, { useEffect, useState } from "react"
import { useStoreState, useStoreActions } from 'easy-peasy'
import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import { Link } from 'react-router-dom'
// import TextField from '@material-ui/core/TextField'

import Button from '../../comps/Button'
import Tables from '../../comps/Tables'
import { IfElse } from '../../components/If'
import { Container, Group, Background } from './style'

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Nome' },
  { id: 'email', numeric: false, disablePadding: false, label: 'E-mail' },
  { id: 'phone', numeric: false, disablePadding: false, label: 'Telefone' },
  { id: 'gender', numeric: false, disablePadding: false, label: 'Gênero' },
  { id: 'self_declaration', numeric: false, disablePadding: false, label: 'Auto-declaração' }
];

const useStyles = makeStyles(theme => ({
  root: {
    width: '50%',
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
}));

const ProfessionalsList = () => {
  const professionals = useStoreState(state => state.professional.professionals)
  const getAllProfessionals = useStoreActions(actions => actions.professional.getAllProfessionals)

  useEffect(() => {
    getAllProfessionals()
  }, [getAllProfessionals])

  return (
    <Background className="container clearfix et_menu_container">
      <Container>
        <div>
          <Button>
            <Link to={'/busca/profissionais'}>
              Buscar Profissionais
              </Link>
          </Button>
          {/* <TextField 
            label="Filled" 
            onChange={(e) => handleResults(e.target.value)} 
            variant="filled" /> */}
        </div>
        <Group>
          <IfElse
            condition={
              typeof professionals !== 'undefined' && professionals.length > 0
            }
            True={
              <Tables 
                title="Profissionais"
                headCells={headCells}
                list={professionals} 
              />
            }
            False={
              <Alert severity="warning">Não há profissionais cadastrados</Alert>
            }
          />
        </Group>
      </Container>
    </Background>
  )
}

export default ProfessionalsList
