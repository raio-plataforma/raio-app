import React from 'react'

import PropTypes from 'prop-types'
import { Route } from 'react-router'

import { ThemeProvider } from '@material-ui/styles'
import { Router, Switch } from 'react-router-dom'
import { StoreProvider } from 'easy-peasy'
import theme from './utils/theme'
import history from './history'

import Header from './comps/Header'
import AppBody from './comps/AppBody'
import Users from './pages/Signup/User'
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/index'
import Admin from './pages/Dashboard/Admin/Admin'
import Enterprise from './pages/Signup/Enterprise'
import PrivateRoute from './components/PrivateRoute'
import VacancyList from './pages/Vacancy/VacancyList'
import AllEnterprises from './pages/Enterprises/index'
import EditUser from './pages/Edit/User'
import EditProfessional from './pages/Edit/Professional'
import Professional from './pages/Signup/Professional'
import VacancyRegister from './pages/Vacancy/VacancyRegister'
import SearchEnterprise from './pages/Search/SearchEnterprise'
import SearchProfessionals from './pages/Search/SearchProfessionals'
import ResultSearchEnterprise from './pages/Search/ResultSearchEnterprise'
import ResultSearchProfessionals from './pages/Search/ResultSearchProfessionals'



const App = ({ store }) => {
  return (
    <StoreProvider store={store}>
      <Router history={history}>
      <ThemeProvider theme={theme}>
        <>
          <Header
            isOpened={true}
          />
          <AppBody>
            <Route path="/" exact component={Login} />
            <Route path="/cadastro" exact component={Users} />
            <Switch>
              <PrivateRoute
                path='/listagem/vagas/:id'
                component={VacancyList}
              />
              <PrivateRoute path='/cadastro/vaga' component={VacancyRegister} />
              <PrivateRoute path='/cadastro/empresa' component={Enterprise} />
              <PrivateRoute
                path='/cadastro/profissional'
                component={Professional}
              />
              <PrivateRoute path='/dashboard/admin' exact component={Admin} />
              <PrivateRoute
                path='/dashboard/admin/empresas'
                component={AllEnterprises}
              />
              <PrivateRoute
                path='/editar/usuario/:user_id'
                component={EditUser}
              />
              <PrivateRoute
                path='/editar/profissional/:id'
                component={EditProfessional}
              />
              <PrivateRoute
                path='/dashboard/profissional'
                component={Dashboard}
              />
              <PrivateRoute
                path='/dashboard/empresa'
                component={Dashboard}
              />
              <Route
                path='/busca/profissionais'
                component={SearchProfessionals}
              />
              <Route
                path='/resultados/profissionais'
                component={ResultSearchProfessionals}
              />
              <Route path='/busca/empresas' component={SearchEnterprise} />
              <Route
                path='/resultados/empresas'
                component={ResultSearchEnterprise}
              />
            </Switch>
          </AppBody>
        </>
        </ThemeProvider>
      </Router>
    </StoreProvider>
  )
}

App.propTypes = {
  store: PropTypes.object.isRequired,
}

export default App
