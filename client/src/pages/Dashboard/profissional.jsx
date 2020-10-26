import React, { useState, useEffect } from 'react'

import Carregando from "../../components/loading/carregando";
import { Button, Container, Grid, Paper } from "@material-ui/core";
import Profile from "./Profile";
import Erro from '../../components/erro';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import config from '../../config';
import ApiVaga from '../../api/vaga';
import ApiCandidaturas from '../../api/candidaturas';

const PaginaDashboardProfissional = () => {
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  const toggleMenu = useStoreActions(actions => actions.ui.toggleMenu)
  const user = useStoreState(state => state.user.user)
  const userType = useStoreState(state => state.auth.auth.user)
  const getUser = useStoreActions(actions => actions.user.getUser)

  const [VagaAll, setVagaAll] = useState(null)
  const [CandidaturasAll, setCandidaturasAll] = useState(null)

  useEffect(() => {
    if ((String(userType.type) !== 'undefined') && (String(user._id) == 'undefined')) {
      getUser(userType.type);
    }

    if ((String(CandidaturasAll) !== 'null') && (String(VagaAll) !== 'null') && (String(user._id) !== 'undefined')) {
      setCarregando(false);
    } else {
      ApiVaga.prototype.getAllCount("Atraindo candidatos").then((response) => { setVagaAll(response) });
      ApiCandidaturas.prototype.getAllCount(user.id).then((response) => { setCandidaturasAll(response) });
    }


    if (localStorage.getItem('menuAutoAbrir') == 'true') {
      setTimeout(() => { toggleMenu(true); localStorage.setItem('menuAutoAbrir', 'false'); }, 500);
      setTimeout(() => { toggleMenu(false) }, 2500);
    }

  }, [VagaAll, CandidaturasAll, user, userType, getUser, setCarregando, carregando]);



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
                          <Link to="/vagas">
                            <Paper className="dashboard-paper">
                              <h1>Vagas</h1>
                              <p><b>{VagaAll.countFormatado}</b></p>
                            </Paper>
                          </Link>
                        </Grid>
                        <Grid item sm={6} xs={6}>
                          <Link to="/painel/profissional/candidaturas">
                            <Paper className="dashboard-paper">
                              <h1>Candidaturas</h1>
                              <p><b>{CandidaturasAll.countFormatado}</b></p>
                            </Paper>
                          </Link>
                        </Grid>
                      </Grid>

                    </Grid>

                    <Grid item sm={3} xs={12}>

                      <Paper className="dashboard-paper">
                        <Profile
                          id={user._id}
                          name={user.name}
                          icon={<img src={config.pastaFotoPerfil + user?.fotoPerfil} width="100%" />}
                          associate={user.apan_associate}
                          type={"Profissional"}
                          bio={user.bio}
                          pcd={user.pcd}
                          segments={user.identity_segments}
                        />
                        <center>
                          <br />
                          <Link to="/perfil/editar/profissional">
                            <Button variant="contained" color="secondary"><EditIcon /> Editar currículo</Button>
                          </Link>
                        </center>
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
                          <Link to="/vagas">
                            <Paper className="dashboard-paper">
                              <h1>Vagas em aberto</h1>
                              <p><b>{VagaAll.countFormatado}</b></p>
                            </Paper>
                          </Link>
                        </Grid>
                        <Grid item sm={6} xs={6}>
                          <Link to="/painel/profissional/candidaturas">
                            <Paper className="dashboard-paper">
                              <h1>Candidaturas</h1>
                              <p><b>{CandidaturasAll.countFormatado}</b></p>
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

export default PaginaDashboardProfissional;