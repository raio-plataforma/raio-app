import React, { useState, useEffect } from 'react'

import Carregando from "../../components/loading/carregando";
import { Container, Grid, Paper } from "@material-ui/core";
import Profile from "./Profile";
import Erro from '../../components/erro';

const PaginaDashboardEmpresa = () => {
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  


  useEffect(() => {
    window.scrollTo(0, 0);

    setCarregando(false);
  }, []);


  
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
                          id="1"
                          name="TESTE"
                          icon="a"
                          associate=".."
                          type="Empresa"
                          bio="dnhawudjawoidjoawida"
                          pcd="pcd"
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