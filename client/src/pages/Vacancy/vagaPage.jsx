import React, { Component } from "react"
import ApiVaga from "../../api/vaga"
import Carregando from "../../components/loading/carregando"
import Erro from "../../components/erro"
import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper, TextField, Typography } from "@material-ui/core"
import ScheduleIcon from '@material-ui/icons/Schedule';
import { formatMoney } from "../../utils/formatter"
import htmlParser from "html-react-parser"
import ApiProfissional from "../../api/profissional"
import ApiUser from "../../api/user"
import config from "../../config"
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';

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
    let user = await ApiUser.prototype.getUserLogado(localStorage.getItem("user_type"), false);
    let vaga = await ApiVaga.prototype.getBySlugOrId(slug, () => { window.location.href = "/404"; }, user.id);

    // verificando status da vaga
    if (vaga.status !== "Atraindo candidatos") {
      window.location.href = "/404";
      return;
    }

    vaga.createdAt = new Date(vaga.createdAt).toLocaleDateString();
    vaga.requirements = vaga.requirements.replace(/\n/g, "<br />");

    await this.setState({
      isLoaded: true,
      vaga,
      user
    });
  }

  async submitForm(e, shelf) {
    e.preventDefault();
    let dadosCamposPersonalizado = [];
    let dadosInputsForm = new FormData(e.target);
    dadosInputsForm.forEach((valor, chave) => {
      if (valor != "") {
        dadosCamposPersonalizado.push({
          nome: chave,
          valor
        })
      }
    });

    await shelf.setState({ isLoaded: true, erro: null });

    ApiProfissional.prototype.applyJob({
      _job: shelf.state.vaga._id,
      _user: shelf.state.user.id,
      dadosCamposPersonalizado
    }, '');
  }

  async setModalCandidaturaStatus(modalCandidaturaStatus) {
    this.setState({
      modalCandidaturaStatus
    })
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
                  Publicada em {this.state.vaga.createdAt}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={4} md={2}>
                    {
                      this.state.vaga.sumirNomeEmpresa == false ? (
                        <div>
                          <img src={config.pastaLogotipo + this.state.vaga.enterprise_id.logotipo} width="100%" className="foto-perfil" />
                          <center><Typography variant="h3" >{this.state.vaga.enterprise_name}</Typography></center>
                        </div>
                      ) : (
                          <div>
                            <img src={config.pastaLogotipo + "SemLogo.png"} width="100%" className="foto-perfil" />
                          </div>
                        )
                    }
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
                      this.state.user.type == "professional" ? (
                        <>
                          {
                            this.state.vaga.btnCandidateSe == "true" ? (
                              <>
                                {
                                  this.state.vaga.camposPersonalizadoCandidatura == "" ? (
                                    <Button variant="contained" color="secondary" onClick={() => { ApiProfissional.prototype.applyJob({ _job: this.state.vaga._id, _user: this.state.user.id }, '') }}>
                                      <PlaylistAddCheckIcon /> Candidatura simplificada
                                    </Button>
                                  ) : (
                                      <Button variant="contained" color="secondary" onClick={() => this.setModalCandidaturaStatus(true)}>
                                        <ListAltIcon /> Candidatar-se
                                      </Button>
                                    )
                                }
                              </>
                            ) : (
                                <div>
                                  <p>Você já está participando do processo seletivo dessa vaga!</p>
                                </div>
                              )
                          }
                        </>
                      ) : (
                          <div>
                            <p>Para se candidatar a essa vaga você deve ter uma <b>conta de profissional</b> na plataforma da RAIO, crie sua conta grátis agora mesmo.</p>
                            <a href="/entrar?cadastro=true">
                              <Button variant="contained" color="secondary">
                                <PersonAddIcon /> Cadastre-se no site
                              </Button>
                            </a>
                          </div>
                        )
                    }
                  </center>
                </Paper>
              </Grid>
            </Grid>



            <Dialog
              fullWidth
              open={this.state.modalCandidaturaStatus}
              onClose={() => this.setModalCandidaturaStatus(false)}
              aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Formulario de candidatura</DialogTitle>
              <form onSubmit={(e)=>{this.submitForm(e, this)}}>
                <DialogContent>
                  {
                    this.state.vaga.camposPersonalizadoCandidatura.map((campo) => (
                      <TextField
                        required
                        fullWidth
                        margin="dense"
                        type={campo.tipo}
                        id={campo.nome}
                        name={campo.nome}
                        label={campo.nome}
                        helperText={campo.info}
                      />
                    ))
                  }
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => this.setModalCandidaturaStatus(false)} color="primary"> Cancelar </Button>
                  <Button type="submit" color="primary"> Confirmar </Button>
                </DialogActions>
              </form>
            </Dialog>

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