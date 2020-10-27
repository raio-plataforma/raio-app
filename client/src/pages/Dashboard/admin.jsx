import React, { useState, useEffect } from 'react'

import Carregando from "../../components/loading/carregando";
import { Button, Container, Grid, Paper } from "@material-ui/core";
import Profile from "./Profile";
import Erro from '../../components/erro';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import config from '../../config';
import ApiProfissional from '../../api/profissional';
import ApiEmpresa from '../../api/empresa';
import { GoogleProvider, GoogleDataChart } from 'react-analytics-widget';
import ApiUser from '../../api/user';
import ApiVaga from '../../api/vaga';

const PaginaDashboardAdmin = () => {
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  const toggleMenu = useStoreActions(actions => actions.ui.toggleMenu)
  const user = useStoreState(state => state.user.user)
  const userType = useStoreState(state => state.auth.auth.user)
  const getUser = useStoreActions(actions => actions.user.getUser)

  const [ProfissionalAll, setProfissionalAll] = useState(null)
  const [EmpresaAll, setEmpresaAll] = useState(null)
  const [AdmAll, setAdmAll] = useState(null)
  const [VagaAll, setVagaAll] = useState(null)


  useEffect(() => {
    if ((String(userType.type) !== 'undefined') && (String(user.id) == 'undefined')) {
      getUser(userType.type);
    }

    if ((String(ProfissionalAll) !== 'null') && (String(EmpresaAll) !== 'null') && (String(user.id) !== 'undefined')) {
      setCarregando(false);
    } else {
      ApiProfissional.prototype.getAllCount().then((response) => { setProfissionalAll(response) });
      ApiEmpresa.prototype.getAllCount().then((response) => { setEmpresaAll(response) });
      ApiUser.prototype.getAllCount("admin").then((response) => { setAdmAll(response) });
      ApiVaga.prototype.getAllCount("Aguardando seleção").then((response) => { setVagaAll(response) });
    }


    if (localStorage.getItem('menuAutoAbrir') == 'true') {
      setTimeout(() => { toggleMenu(true); localStorage.setItem('menuAutoAbrir', 'false'); }, 500);
      setTimeout(() => { toggleMenu(false) }, 2500);
    }

  }, [ProfissionalAll, user, userType, getUser, setCarregando, carregando]);



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

                  <br /><br />

                  <Grid container spacing={2}>
                    <Grid item sm={6} xs={12} remove-pc="true">

                      <Grid container spacing={2}>
                        <Grid item sm={6} xs={6}>
                          <Link to="/painel/admin/vagas">
                            <Paper className="dashboard-paper">
                              <h1>Vagas</h1>
                              <p><b>{VagaAll.countFormatado}</b></p>
                            </Paper>
                          </Link>
                        </Grid>
                        <Grid item sm={6} xs={6}>
                          <Link to="/painel/admin/empresas">
                            <Paper className="dashboard-paper">
                              <h1>Empresas</h1>
                              <p><b>{EmpresaAll.countFormatado}</b></p>
                            </Paper>
                          </Link>
                        </Grid>
                        <Grid item sm={6} xs={6}>
                          <Link to="/painel/admin/profissionais">
                            <Paper className="dashboard-paper">
                              <h1>Profissionais</h1>
                              <p><b> {ProfissionalAll.countFormatado}</b></p>
                            </Paper>
                          </Link>
                        </Grid>
                        <Grid item sm={6} xs={6}>
                          <Link to="/painel/admin/administradores">
                            <Paper className="dashboard-paper">
                              <h1>Administradores</h1>
                              <p><b>{AdmAll.countFormatado}</b></p>
                            </Paper>
                          </Link>
                        </Grid>
                      </Grid>

                    </Grid>

                    <Grid item sm={3} xs={12}>

                      <Paper className="dashboard-paper">
                        <Profile
                          id={user._id}
                          name={"RAIO"}
                          icon={<img src="https://i.imgur.com/llkK8fn.png" width="100%" />}
                          type={"Admin"}
                          bio={"Curadoria de talentos e oportunidades que conecta profissionais, projetos e empresas do setor audiovisual, com objetivo de contribuir com a equidade de gênero e raça para consolidação de um mercado audiovisual mais diverso e representativo."}
                        />
                      </Paper>

                    </Grid>
                    <Grid item sm={3} xs={12}>

                      <Paper className="dashboard-paper">
                        <Profile
                          id={user._id}
                          name={user.name}
                          icon={<img src={config.pastaFotoPerfil + user?.fotoPerfil} width="100%" />}
                          associate={user.apan_associate}
                          type={"Usuario"}
                        />
                        <center>
                          <br />
                          <Link to="/perfil/editar/usuario">
                            <Button variant="contained" color="secondary"><EditIcon /> Editar usuário</Button>
                          </Link>
                        </center>
                      </Paper>

                    </Grid>

                    <Grid item sm={6} xs={12} remove-mobile="true">

                      <Grid container spacing={2}>
                        <Grid item sm={6} xs={6}>
                          <Link to="/painel/admin/vagas">
                            <Paper className="dashboard-paper">
                              <h1>Vagas</h1>
                              <p><b>{VagaAll.countFormatado}</b></p>
                            </Paper>
                          </Link>
                        </Grid>
                        <Grid item sm={6} xs={6}>
                          <Link to="/painel/admin/empresas">
                            <Paper className="dashboard-paper">
                              <h1>Empresas</h1>
                              <p><b>{EmpresaAll.countFormatado}</b></p>
                            </Paper>
                          </Link>
                        </Grid>
                        <Grid item sm={6} xs={6}>
                          <Link to="/painel/admin/profissionais">
                            <Paper className="dashboard-paper">
                              <h1>Profissionais</h1>
                              <p><b> {ProfissionalAll.countFormatado}</b></p>
                            </Paper>
                          </Link>
                        </Grid>
                        <Grid item sm={6} xs={6}>
                          <Link to="/painel/admin/administradores">
                            <Paper className="dashboard-paper">
                              <h1>Administradores</h1>
                              <p><b>{AdmAll.countFormatado}</b></p>
                            </Paper>
                          </Link>
                        </Grid>
                      </Grid>

                    </Grid>

                  </Grid>

                </Container>
              )
            }
          </div>
        )
      }
    </div>
  )

}

export default PaginaDashboardAdmin;