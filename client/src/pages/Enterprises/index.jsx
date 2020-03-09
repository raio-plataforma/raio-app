import React, { useEffect } from "react"
import { Link } from 'react-router-dom'
// import Autocomplete from '@material-ui/lab/Autocomplete'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { makeStyles } from '@material-ui/core/styles'
import ViewListIcon from '@material-ui/icons/ViewList'
import Alert from '@material-ui/lab/Alert'
// import TextField from '@material-ui/core/TextField'

import Tables from '../../comps/Tables'
import { IfElse } from '../../components/If'
import { Container, Group, Background } from './style'

const headCells = [
  { id: 'name_enterprise', numeric: false, disablePadding: true, label: 'Empresa' },
  { id: 'name', numeric: false, disablePadding: false, label: 'Responsável' },
  { id: 'email', numeric: false, disablePadding: false, label: 'E-mail' },
  { id: 'phone', numeric: false, disablePadding: false, label: 'Telefone' },
  { id: 'segments', numeric: false, disablePadding: false, label: 'Segmento' }
];

const useStyles = makeStyles(theme => ({
  root: {
    width: '50%',
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
}));

const EnterprisesList = () => {
  const enterprises = useStoreState(state => state.enterprise.enterprises)
  const getAllEnterprises = useStoreActions(actions => actions.enterprise.getAllEnterpriseUsers)

  useEffect(() => {
    getAllEnterprises()
  }, [getAllEnterprises])

  const clearList = enterprises
    .filter(ent => ent.enterprise_id)
    .map(ent => ({
      id: ent.enterprise_id,
      name_enterprise: ent.name_enterprise,
      name: ent.name,
      email: ent.email,
      phone: ent.phone,
      segments: ent.business_segments
    }))
    const classes = useStyles();

  return (
    <Background className="container clearfix et_menu_container">
      <Container>
        <div className={classes.root}>
          {/* <Autocomplete
            multiple
            fullWidth
            id="tags-outlined"
            options={clearList}
            getOptionLabel={option => option.name_enterprise}
            filterSelectedOptions
            renderInput={params => (
              <TextField
                {...params}
                color="secondary"
                label="Pesquisar Empresas"
                placeholder="Digite sua pesquisa"
              />
            )}
          /> */}
          <Link to="/busca/empresas">Pesquisar Empresas</Link>
        </div>
        <Group>
          <IfElse
            condition={
              typeof enterprises !== 'undefined' && enterprises.length > 0
            }
            True={
              <Tables 
                title="Empresas"
                headCells={headCells}
                list={clearList} 
                actions={[
                  {
                    action: '/listagem/vagas/',
                    btn: <ViewListIcon />,
                    type: 'link', // link or btn
                    tooltip: 'Ver lista de vagas postadas'
                  }
                ]}
              />
            }
            False={
              <Alert severity="warning">Não há empresas cadastradas</Alert>
            }
          />
        </Group>
      </Container>
    </Background>
  )
}

export default EnterprisesList
