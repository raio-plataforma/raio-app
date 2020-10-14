import React, { useState, useEffect } from 'react'

import Carregando from "../../components/loading/carregando";
import { Container, Grid, Paper } from "@material-ui/core";
import Profile from "./Profile";
import Erro from '../../components/erro';
import { useStoreActions, useStoreState } from 'easy-peasy';

const PaginaDashboardEmpresa = () => {
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  const toggleMenu = useStoreActions(actions => actions.ui.toggleMenu)
  const user = useStoreState(state => state.user.user)
  const userType = useStoreState(state => state.auth.auth.user)
  const getUser = useStoreActions(actions => actions.user.getUser)


  useEffect(() => {
    if( (String(userType.type) !== 'undefined') && (String(user.id) == 'undefined') ){
      getUser(userType.type);
    }

    if (localStorage.getItem('menuAutoAbrir') == 'true') {
      setTimeout(()=>{toggleMenu(true);localStorage.setItem('menuAutoAbrir', 'false');}, 500);
      setTimeout(()=>{toggleMenu(false)}, 2500);
    }

    if(carregando == true){
      setCarregando(false);
    }
  }, [setCarregando, carregando]);



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
                    <Grid item sm={3} xs={12}>

                      <Paper className="dashboard-paper">
                        <Profile
                          id={user._id}
                          name={user.enterprise_name || user.name}
                          icon={<img src="https://i.imgur.com/gRmLJPQ.jpg" width="100%" />}
                          associate={user.apan_associate}
                          type={userType.type === "enterprise" ? "Empresa" : "Profissional"}
                          bio={userType.type === "enterprise" ? user.presentation : user.bio}
                          pcd={user.pcd}
                          segments={userType.type === "enterprise" ? user.business_segments : user.identity_segments}
                        />
                      </Paper>

                    </Grid>
                    <Grid item sm={9} xs={12}>

                      <Grid container spacing={2}>
                        <Grid item sm={3} xs={6}>
                          <Paper className="dashboard-paper">
                            <h1>Candidatos</h1>
                            <p><b>100</b></p>
                          </Paper>
                        </Grid>
                        <Grid item sm={3} xs={6}>
                          <Paper className="dashboard-paper">
                            <h1>Candidatos</h1>
                            <p><b>100</b></p>
                          </Paper>
                        </Grid>
                        <Grid item sm={3} xs={6}>
                          <Paper className="dashboard-paper">
                            <h1>Candidatos</h1>
                            <p><b>100</b></p>
                          </Paper>
                        </Grid>
                        <Grid item sm={3} xs={6}>
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