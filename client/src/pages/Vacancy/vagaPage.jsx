import React, { Component } from "react"

import ApiMercadoPago from "../../models/mercadopago"
import ApiVaga from "../../api/vaga"
import Carregando from "../../components/loading/carregando"
import Erro from "../../components/erro"
import { Button, Container, Grid, Paper, Typography } from "@material-ui/core"
import ScheduleIcon from '@material-ui/icons/Schedule';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { formatMoney } from "../../utils/formatter"
import { Link } from "react-router-dom"
import htmlParser from "html-react-parser"
import { useStoreActions, useStoreState } from "easy-peasy"
import ApiProfissional from "../../api/profissional"
import ApiUser from "../../api/user"

export default class PaginaVaga extends Component {
  constructor(props) {
    super(props);
    this.state = {
      json: null,
      erro: null,
      isLoaded: false
    };
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    const slug = this.props.match.params.slug;
    let user = await ApiUser.prototype.getUserLogado(localStorage.getItem("user_type"));
    let vaga = await ApiVaga.prototype.getBySlugOrId(slug, () => { window.location.href = "/404"; }, user.id);

    // verificando status da vaga
    if (vaga.status !== "Visivel") {
      window.location.href = "/404";
    }

    vaga.createAt = new Date(vaga.createAt).toLocaleDateString();
    vaga.requirements = vaga.requirements.replace(/\n/g, "<br />");

    await this.setState({
      isLoaded: true,
      vaga,
      user
    });
  }

  render() {

    if (this.state.erro !== null) {
      return (
        <Erro erro={this.state.erro} />
      )
    } else
      if (this.state.isLoaded == true) {
        return (
          <Container center="true" maxWidth="md" className="PaginaVaga">
            <br remove-mobile="true" /><br remove-mobile="true" /><br />

            <Grid container spacing={2}>
              <Grid item xs={12} md={8} className="colunaEsqurda">
                <Typography variant="body1" remove-mobile="true">
                  <ScheduleIcon style={{ verticalAlign: "middle", marginRight: "5px" }} />
                  Publicada em {this.state.vaga.createAt}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={4} md={2}>
                    <img src="https://i.imgur.com/gRmLJPQ.jpg" width="100%" className="foto-perfil" />
                    <center><Typography variant="h3" >{this.state.vaga.enterprise_name}</Typography></center>
                  </Grid>
                  <Grid item xs={8} md={10}>
                    <Typography variant="h1" >{this.state.vaga.title}</Typography>
                    <Typography variant="h2" >{this.state.vaga.function}</Typography>
                    <Typography variant="h3" >{this.state.vaga.city} - {this.state.vaga.stateName}</Typography>
                    {
                      this.state.vaga.hiring_type.map(h => (
                        <Typography variant="h4" style={{ display: "inline-block" }}>{h}, </Typography>
                      ))
                    }
                  </Grid>
                </Grid>
                <hr color="laranja" />
                <br />
                <Typography variant="h2" >Descrição:</Typography>
                <Typography variant="body1">
                  {htmlParser(this.state.vaga.requirements)}
                </Typography>
              </Grid>

              <Grid item xs={12} md={4} className="colunaDireita">
                <Paper className="dashboard-paper">
                  <center>
                    <h1>Cachê: <br /> R$ {formatMoney(this.state.vaga.cache, 2, ",", ".")}</h1>

                    <br />
                    {
                      this.state.user.email ? (
                        <>
                          {
                            this.state.vaga.btnCandidateSe == "true" ? (
                              <Button variant="contained" color="secondary" onClick={() => { ApiProfissional.prototype.applyJob({ id: this.state.vaga._id, user_id: this.state.user.id }, '') }}>
                                Candidate-se
                              </Button>
                            ) : (
                                <div>
                                  <p>Você já está participando do processo seletivo dessa vaga!</p>
                                </div>
                              )
                          }
                        </>
                      ) : (
                          <div>
                            <p>Para se candidatar a essa vaga você deve ter uma conta profissional na plataforma da RAIO, crie sua conta grátis agora mesmo.</p>
                            <a href="/entrar?cadastro=true">
                              <Button variant="contained" color="secondary">
                                Cadastre-se no site
                              </Button>
                            </a>
                          </div>
                        )
                    }
                  </center>
                </Paper>
              </Grid>
            </Grid>

            <br /><br /><br /><br />
          </Container>
        )
      } else {
        return (
          <Carregando />
        )
      }
  }
}