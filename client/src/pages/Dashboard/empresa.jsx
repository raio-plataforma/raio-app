import React, { useState, useEffect } from 'react'

import Carregando from "../../components/loading/carregando";
import { Button, Container, Grid, Paper } from "@material-ui/core";
import Profile from "./Profile";
import Erro from '../../components/erro';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';

const PaginaDashboardEmpresa = () => {
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  const toggleMenu = useStoreActions(actions => actions.ui.toggleMenu)
  const user = useStoreState(state => state.user.user)
  const userType = useStoreState(state => state.auth.auth.user)
  const getUser = useStoreActions(actions => actions.user.getUser)


  useEffect(() => {
    if ((String(userType.type) !== 'undefined') && (String(user._id) == 'undefined')) {
      getUser(userType.type);
    }

    if ((String(user._id) !== 'undefined')) {
      setCarregando(false);
    }


    if (localStorage.getItem('menuAutoAbrir') == 'true') {
      setTimeout(() => { toggleMenu(true); localStorage.setItem('menuAutoAbrir', 'false'); }, 500);
      setTimeout(() => { toggleMenu(false) }, 2500);
    }

  }, [user, userType, getUser, setCarregando, carregando]);



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
                          <Paper className="dashboard-paper">
                            <h1>Vagas ativas</h1>
                            <p><b>1</b></p>
                          </Paper>
                        </Grid>
                        <Grid item sm={6} xs={6}>
                          <Paper className="dashboard-paper">
                            <h1>Candidatos</h1>
                            <p><b>100</b></p>
                          </Paper>
                        </Grid>
                      </Grid>

                    </Grid>

                    <Grid item sm={3} xs={12}>

                      <Paper className="dashboard-paper">
                        <Profile
                          id={user._id}
                          name={user.enterprise_name || user.name}
                          icon={<img src="https://i.imgur.com/gRmLJPQ.jpg" width="100%" />}
                          associate={user.apan_associate}
                          type={"Empresa"}
                          bio={user.presentation}
                          pcd={user.pcd}
                          segments={user.business_segments}
                        />
                        <center>
                          <br />
                          <Link to="/perfil/editar/empresa">
                            <Button variant="contained" color="secondary"><EditIcon /> Editar empresa</Button>
                          </Link>
                        </center>
                      </Paper>

                    </Grid>
                    <Grid item sm={3} xs={12}>

                      <Paper className="dashboard-paper">
                        <Profile
                          id={user._id}
                          name={user.name}
                          icon={<img src="https://i.imgur.com/gRmLJPQ.jpg" width="100%" />}
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
                          <Paper className="dashboard-paper">
                            <h1>Vagas ativas</h1>
                            <p><b>1</b></p>
                          </Paper>
                        </Grid>
                        <Grid item sm={6} xs={6}>
                          <Paper className="dashboard-paper">
                            <h1>Candidatos</h1>
                            <p><b>100</b></p>
                          </Paper>
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

export default PaginaDashboardEmpresa;