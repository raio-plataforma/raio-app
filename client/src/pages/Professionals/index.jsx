import React, { useEffect } from "react"
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import TextField from '@material-ui/core/TextField'
import states from '../../assets/states.json'
import Tables from '../../comps/Tables'
import { Container, Group, Background } from './style'
import { getState } from '../../utils/formatter'

const headCells = [
  { id: 'name', numeric: false, disablePadding: false, label: 'Nome' },
  { id: 'email', numeric: false, disablePadding: false, label: 'E-mail' },
  { id: 'gender', numeric: false, disablePadding: true, label: 'Gênero' },
  { id: 'city', numeric: false, disablePadding: false, label: 'Cidade' }
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

  const clearList = professionals
    .filter(ent => ent._id)
    .map(ent => ({
      id: ent._id,
      name: ent.name,
      email: ent.email,
      gender: ent.gender,
      city: `${ent.city} - ${getState(ent.home_state, states)}`
    }))
    const classes = useStyles();
    
  return (
    <Background className="container clearfix et_menu_container">
      <Container>
        <div className={classes.root}>
          <Autocomplete
            multiple
            fullWidth
            options={clearList}
            getOptionLabel={option => option.name_enterprise}
            filterSelectedOptions
            renderInput={params => (
              <TextField
                {...params}
                color="secondary"
                label="Pesquisar Profissionais"
                placeholder="Digite sua pesquisa"
              />
            )}
          />
        </div>
        <Group>
          {
            typeof professionals !== 'undefined' && professionals.length > 0 ?
            (
              <Tables 
                title="Profissionais"
                headCells={headCells}
                list={clearList} 
              />
            ) :
            (
              <Alert severity="warning">Não há profissionais cadastrados</Alert>
            )
          }
        </Group>
      </Container>
    </Background>
  )
}

export default ProfessionalsList
