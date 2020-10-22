import React, { Component } from "react"
import Carregando from "../../../components/loading/carregando"
import Erro from "../../../components/erro"
import { Button, Container, Grid, Paper, Snackbar, TextField, Typography } from "@material-ui/core"
import ApiUser from "../../../api/user"
import Titulo from "../../../components/Titulo"
import Alert from "@material-ui/lab/Alert"
import ApiVaga from "../../../api/vaga"
import ApiCandidaturas from "../../../api/candidaturas"
import Star from '@material-ui/icons/Star'
import PcD from '@material-ui/icons/Accessible'
import BusinessIcon from '@material-ui/icons/Business';

export default class admVagasListaCandidatosPagina extends Component {
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
    const id = this.props.match.params.id;
    let userLogado = await ApiUser.prototype.getUserLogado(localStorage.getItem("user_type"));
    let vaga = await ApiVaga.prototype.getBySlugOrId(id, () => { window.location.href = "/404"; }, userLogado.id);
    let candidatos = await ApiCandidaturas.prototype.getByJobId(vaga._id);

    // verificando tipo do usuario
    if (userLogado.type !== "admin") {
      window.location.href = "/404";
      return;
    }

    console.log(candidatos);

    // Passando para o state html variaveis 
    await this.setState({
      isLoaded: true,
      vaga,
      userLogado,
      candidatos
    });

  }

  async setModalSucessoStatus(modalSucessoMsg) {
    this.setState({
      modalSucessoMsg
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
          <div className="pageRender">
            <Container center="true" maxWidth="md">
              <Titulo> Candidatos da vaga:</Titulo>
              <center><h1>{this.state.vaga.title}</h1></center>
              <br/><br/>

              {
                this.state.candidatos.map(candidato => (
                  <Paper className="dashboard-paper">
                    <a title="Clique para abrir o perfil" href={"/perfil/profissional/"+candidato._user._id} target="_blank">
                    <Grid container spacing={2}>
                      <Grid item xs={2}>
                        <img src={"https://i.imgur.com/gRmLJPQ.jpg"} width="90%" className="foto-perfil" />
                      </Grid>
                      <Grid item xs={10}>
                        <h1>{candidato._user.name} ({candidato.userProf.idade} anos) </h1>
                        <Typography variant="body1" >{candidato.userProf.education} - {candidato.userProf.formation_institution}</Typography>
                        <Typography variant="body1" >{candidato.userProf.city} - {candidato.userProf.stateName}</Typography>
                        {candidato.userProf.apan_associate && (
                          <Typography variant="body1" className="display-inline">
                            <Star style={{ verticalAlign: "middle", marginRight: "5px", marginLeft: "0px" }} />
                            Associado APAN
                          </Typography>)
                        }
                        {candidato.userProf.pcd && (
                          <Typography variant="body1" className="display-inline">
                            <PcD style={{ verticalAlign: "middle", marginRight: "5px", marginLeft: "5px" }} />
                            PcD
                          </Typography>)
                        }
                        {candidato.userProf.cnpj && (
                          <Typography variant="body1" className="display-inline">
                            <BusinessIcon style={{ verticalAlign: "middle", marginRight: "5px", marginLeft: "5px" }} />
                            Possui CNPJ - {candidato.userProf.cnpj_type}
                          </Typography>)
                        }
                      </Grid>
                    </Grid>
                    </a>
                  </Paper>
                ))
              }

              <Snackbar open={this.state.modalSucessoMsg} autoHideDuration={5000} onClose={() => this.setModalSucessoStatus(false)}>
                <Alert elevation={6} variant="filled" onClose={() => this.setModalSucessoStatus(false)} severity="success">
                  {this.state.modalSucessoMsg}
                </Alert>
              </Snackbar>
            </Container>
          </div>
        )
      } else {
        return (
          <Carregando />
        )
      }
  }
}