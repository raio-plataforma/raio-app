import React from 'react'

import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router'

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
import AllVacancies from './pages/Vacancy/AllVacancies'
import AllEnterprises from './pages/Enterprises'
import AllProfessionals from './pages/Professionals'
import EditUser from './pages/Edit/User'
import EditProfessional from './pages/Edit/Professional'
import EditEnterprise from './pages/Edit/Enterprise'
import Professional from './pages/Signup/Professional'
import VacancyRegister from './pages/Vacancy/VacancyRegister'
import SearchEnterprise from './pages/Search/SearchEnterprise'
import SearchProfessionals from './pages/Search/SearchProfessionals'
import ResultSearchEnterprise from './pages/Search/ResultSearchEnterprise'
import ResultSearchProfessionals from './pages/Search/ResultSearchProfessionals'
import MyJobs from './pages/JobProfessional/MyJobs'
import Forgot from './pages/Login/Forgot'
import Reset from './pages/Login/Reset'
import PaginaVaga from './pages/Vacancy/vaga'

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
            <Route path="/esqueci-senha" exact component={Forgot} />
            <Route path="/reset/:token" component={Reset} />
            <Route path="/cadastro" exact component={Users} />
            <Switch>
              <PrivateRoute path='/dashboard/admin' exact component={Admin} />
              <PrivateRoute
                path='/listagem/vagas/:id'
                component={VacancyList}
              />
              <PrivateRoute
                path='/listagem/vagas'
                component={AllVacancies}
              />
              <PrivateRoute path='/cadastro/vaga' component={VacancyRegister} />
              <PrivateRoute path='/vaga/:id' component={PaginaVaga} />
              <PrivateRoute path='/cadastro/empresa' component={Enterprise} />
              <PrivateRoute
                path='/cadastro/profissional'
                component={Professional}
              />
              <PrivateRoute
                path='/dashboard/admin/empresas'
                component={AllEnterprises}
              />
              <PrivateRoute
                path='/dashboard/admin/profissionais'
                component={AllProfessionals}
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
                path='/editar/empresa/:id'
                component={EditEnterprise}
              />
              <PrivateRoute
                path='/dashboard/profissional'
                component={Dashboard}
              />
              <PrivateRoute
                path='/dashboard/empresa'
                component={Dashboard}
              />
              <PrivateRoute
                path='/dashboard/enterprise'
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
              <Route
                  path='/listagem/candidaturas'
                  component={MyJobs}
              />
              {/*<Redirect from='*' to='/' />*/}
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
