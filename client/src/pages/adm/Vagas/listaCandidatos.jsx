import React, { Component } from "react"
import Carregando from "../../../components/loading/carregando"
import Erro from "../../../components/erro"
import { Button, Container, Grid, Paper, Snackbar, TextField, Typography } from "@material-ui/core"
import ApiUser from "../../../api/user"
import Titulo from "../../../components/Titulo"
import Alert from "@material-ui/lab/Alert"
import ApiVaga from "../../../api/vaga"
import ApiCandidaturas from "../../../api/candidaturas"
import CardProfissional from "../../../components/CardProfissional"

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
                  <CardProfissional 
                    id={candidato._user._id}
                    img={"https://i.imgur.com/gRmLJPQ.jpg"}
                    nome={candidato._user.name}
                    idade={candidato.userProf.idade}
                    educacao={candidato.userProf.education}
                    univercidade={candidato.userProf.formation_institution}
                    cidade={candidato.userProf.city}
                    estado={candidato.userProf.stateName}
                    apan_associate={candidato.userProf.apan_associate}
                    pcd={candidato.userProf.pcd}
                    cnpj={candidato.userProf.cnpj}
                    cnpj_type={candidato.userProf.cnpj_type}
                  />
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