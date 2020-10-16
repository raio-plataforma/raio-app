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
import './assets/global.css';
import Pagina404 from './pages/404/404'
import PaginaDashboardEmpresa from './pages/Dashboard/empresa'
import PaginaDashboardProfissional from './pages/Dashboard/profissional'
import PaginaDashboardAdmin from './pages/Dashboard/admin'
import PaginaVagaEmpresa from './pages/Vacancy/vagaEmpresa'
import PaginaVaga from './pages/Vacancy/vagaPage'

const App = ({ store }) => {
  return (
    <StoreProvider store={store}>
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <Header isOpened={true} />
          <AppBody>
            <Switch>
              {/* Rotas sem protenção de login */}
              <Route path="/entrar" exact={true} component={Login} />
              <Route path="/cadastro" exact={true} component={Users} />
              <Route path="/recuperar/senha" exact={true} component={Forgot} />
              <Route path="/redefinir/senha/:token" component={Reset} />
              <Route path='/vagas' component={AllVacancies}  exact={true} />
              <Route path='/vaga/:slug' component={PaginaVaga} />

              <Switch>
                {/* Pos cadastro, dados restantes do cadastro de conta */}
                <PrivateRoute path='/cadastro/empresa' component={Enterprise} exact={true} />
                <PrivateRoute path='/cadastro/profissional' component={Professional} exact={true} />

                {/* Painel da empresa */}
                <PrivateRoute path='/painel/empresa/cadastro/vaga' component={VacancyRegister} exact={true} />
                <PrivateRoute path='/painel/empresa/vaga/:id' component={PaginaVagaEmpresa} />
                <PrivateRoute path='/painel/empresa/vagas' component={VacancyList} exact={true} />
                <PrivateRoute path='/painel/empresa' component={PaginaDashboardEmpresa} exact={true} />

                {/* Painel do profissional */}
                <PrivateRoute path='/painel/profissional/candidaturas' component={MyJobs} exact={true} />
                <PrivateRoute path='/painel/profissional' component={PaginaDashboardProfissional} exact={true} />

                {/* Paginas de perfil */}
                <PrivateRoute path='/perfil/editar/usuario' component={EditUser} exact={true} />
                <PrivateRoute path='/perfil/editar/empresa' component={EditEnterprise} exact={true} />
                <PrivateRoute path='/perfil/editar/profissional' component={EditProfessional} exact={true} />

                {/* Painel do admin */}
                <PrivateRoute path='/painel/admin/buscar/profissionais' component={SearchProfessionals} exact={true} />
                <PrivateRoute path='/painel/admin/profissionais' component={AllProfessionals} exact={true} />
                <PrivateRoute path='/painel/admin/empresas' component={AllEnterprises} exact={true} />
                <PrivateRoute path='/painel/admin' exact component={PaginaDashboardAdmin} exact={true} />

                {/* Rotas que não sei pra que serve ainda */}
                <Route path='/resultados/profissionais' component={ResultSearchProfessionals} exact={true} />
                <Route path='/busca/empresas' component={SearchEnterprise} exact={true} />
                <Route path='/resultados/empresas' component={ResultSearchEnterprise} exact={true} />

                {/* Redirecionamento de rotas antigas */}
                <Redirect path='/painel/profissional/vagas' to='/vagas' />
                <Redirect path='/dashboard/admin/profissionais' to='/painel/admin/profissionais' />
                <Redirect path='/dashboard/admin/empresas' to='/painel/admin/empresas' />
                <Redirect path='/dashboard/admin' to='/painel/admin' />
                <Redirect path='/reset/:token' to='/redefinir/senha/:token' />
                <Redirect path='/esqueci-senha' to='/recuperar/senha' />
                <Redirect path='/listagem/candidaturas' to='/painel/profissional/candidaturas' />
                <Redirect path='/listagem/vagas/:id' to='/painel/empresa/vagas' />
                <Redirect path='/cadastro/vaga' to='/painel/empresa/cadastro/vaga' />
                <Redirect path='/dashboard/empresa' to='/painel/empresa' />
                <Redirect path='/dashboard/enterprise' to='/painel/empresa' />
                <Redirect path='/dashboard/profissional' to='/painel/profissional' />
                <Redirect path='/dashboard/professional' to='/painel/profissional' />
                <Redirect path='/listagem/vagas' to='/vagas' />
                <Redirect path='/editar/usuario/:user_id' to='/perfil/editar/usuario' />
                <Redirect path='/editar/empresa/:id' to='/perfil/editar/empresa' />
                <Redirect path='/editar/profissional/:id' to='/perfil/editar/profissional' />
                <Redirect path='/editar/usuario' to='/perfil/editar/usuario' />
                <Redirect path='/editar/empresa' to='/perfil/editar/empresa' />
                <Redirect path='/editar/profissional' to='/perfil/editar/profissional' />
                <Redirect path='/vaga/:id' to='/painel/empresa/vaga/:id' />
                <Redirect path='/busca/profissionais' to='/painel/admin/buscar/profissionais' />
                <Redirect path='/' to='/entrar' />

                {/* Pagina 404 */}
                <Route path='/*' exact={true} component={Pagina404} />
              </Switch>
            </Switch>
          </AppBody>
        </ThemeProvider>
      </Router>
    </StoreProvider>
  )
}

App.propTypes = {
  store: PropTypes.object.isRequired,
}

export default App
