import React from "react"
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Enterprise from '@material-ui/icons/AccountBalanceOutlined'
import Person from '@material-ui/icons/Person'
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import history from '../../../history';
// import { Link } from 'react-router-dom'
// import Typography from '@material-ui/core/Typography'
// import Enterprise from '@material-ui/icons/AccountBalanceOutlined'
// import Person from '@material-ui/icons/Person'
// import { WrapperChoices, Title, Background } from './style'

const DashboardWrapper = () => {
  const handleLink = (href) => history.push(href)
  return (
    <Container style={{
      height: 'calc(100vh - 108px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Paper style={{ backgroundColor: '#f7cc94', width: '50%' }}>
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div"  id="nested-list-subheader">
              Escolha uma visão
            </ListSubheader>
          }
        >
          <ListItem button onClick={() => handleLink("/dashboard/admin/empresas")}>
            <ListItemIcon>
              <Enterprise />
            </ListItemIcon>
            <ListItemText primary="Empresa" />
          </ListItem>
          <ListItem button onClick={() => handleLink("/dashboard/admin/profissionais")}>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="Profissional" />
          </ListItem>
        </List>
      </Paper>
    </Container>
  )
}

export default DashboardWrapper