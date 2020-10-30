import React, { Component } from "react"
import Carregando from "../../../components/loading/carregando"
import Erro from "../../../components/erro"
import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, TextField } from "@material-ui/core"
import ApiUser from "../../../api/user"
import Titulo from "../../../components/Titulo"
import Alert from "@material-ui/lab/Alert"
import ApiVaga from "../../../api/vaga"
import ApiCandidaturas from "../../../api/candidaturas"
import Board from 'react-trello'

export default class admVagasProcessoSeletivoPagina extends Component {
  constructor(props) {
    super(props);
    this.state = {
      json: null,
      erro: null,
      isLoaded: false,
      eventBus: undefined
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


    // Definindo quais são os campos que irá aparecer no quadro do "trello".
    const boardData = {
      lanes: [
        {
          id: 'Inscrito',
          title: 'Inscritos',
          label: '',
          cards: []
        },
        {
          id: 'Triagem de perfil',
          title: 'Triagem de perfil',
          label: '',
          cards: []
        },
        {
          id: 'Validação  tech',
          title: 'Validação  tech',
          label: '',
          cards: []
        },
        {
          id: 'Validade de disponibilidade',
          title: 'Validade de disponibilidade',
          label: '',
          cards: []
        },
        {
          id: 'Top',
          title: 'Selecionados',
          label: '',
          cards: []
        },
        {
          id: 'Contratado',
          title: 'Contratados',
          label: '',
          cards: []
        }
      ]
    }

    // Adicionando candidatos a lane
    candidatos.forEach(candidato => {
      candidato.createdAt = new Date(candidato.createdAt).toLocaleDateString();
      var lane = boardData.lanes.find(x => x.id == candidato.status);
      if (lane) {
        lane.cards.push({
          id: candidato._id,
          title: candidato._user.name + " (" + candidato.userProf.idade + ")",
          description: candidato.userProf.city + " - " + candidato.userProf.stateName,
          label: candidato.createdAt,
          metadata: {
            user_id: candidato.userProf.user_id
          }
        });
      }
    });
    boardData.lanes[0].label = candidatos.length;


    // Passando para o state html variaveis 
    await this.setState({
      isLoaded: true,
      vaga,
      userLogado,
      candidatos,
      boardData
    });
  }

  async onCardMoveAcrossLanes(shelf, fromLaneId, toLaneId, cardId, index) {
    if (toLaneId === "Top") {
      this.setModalTopStatus(true, cardId, fromLaneId, toLaneId);
    } else {
      try {
        const resposta = await ApiCandidaturas.prototype.putStatusById(cardId, { status: toLaneId });
        if (resposta.resposta.n == 1) {
          shelf.setModalSucessoStatus("Status do candidato alterado!");
        } else {
          shelf.setState({ isLoaded: false, erro: resposta })
        }
      } catch (error) {
        shelf.setState({ isLoaded: false, erro: error })
      }
    }
  }

  onCardClick(cardId, metadata, laneId) {
    window.open("/perfil/profissional/" + metadata.user_id, "_blank");
  }

  async setEventBus(shelf, eventBus) {
    shelf.setState({
      eventBus
    })
  }

  async setModalSucessoStatus(modalSucessoMsg) {
    this.setState({
      modalSucessoMsg
    })
  }

  async setModalTopStatus(modalTopStatus, idCandidato = null, toLaneIdCandidato = null, fromLaneIdCandidato = null) {
    if (idCandidato == null) {
      console.log(this.state);
      this.state.eventBus.publish({ type: 'MOVE_CARD', fromLaneId: 'Top', toLaneId: this.state.toLaneIdCandidato, cardId: this.state.idCandidato, index: 0 });
    }
    this.setState({
      modalTopStatus,
      idCandidato,
      toLaneIdCandidato,
      fromLaneIdCandidato
    })
  }

  async onClickButtonConfirmarComentario(shelf) {
    try {
      let comentario = document.getElementById("comentario").value;
      const resposta = await ApiCandidaturas.prototype.putStatusById(shelf.state.idCandidato, { status: shelf.state.fromLaneIdCandidato, comentario });
      if (resposta.resposta.n == 1) {
        document.getElementById("comentario").value = "";
        this.setModalTopStatus(false, "fecharSalvando");
        shelf.setModalSucessoStatus("Status do candidato alterado!");
      } else {
        shelf.setState({ isLoaded: false, erro: resposta })
      }
    } catch (error) {
      shelf.setState({ isLoaded: false, erro: error })
    }
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
              <Titulo> Processo Seletivo da vaga:</Titulo>
              <center><h1>{this.state.vaga.title}</h1></center>
            </Container>

            <Container center="true" maxWidth="xlg">
              <Board
                data={this.state.boardData}
                onCardClick={this.onCardClick}
                eventBusHandle={(eventBus) => { this.setEventBus(this, eventBus) }}
                onCardMoveAcrossLanes={(fromLaneId, toLaneId, cardId, index) => { this.onCardMoveAcrossLanes(this, fromLaneId, toLaneId, cardId, index) }}
              />
            </Container>

            <Container center="true" maxWidth="md">
              <Snackbar open={this.state.modalSucessoMsg} autoHideDuration={5000} onClose={() => this.setModalSucessoStatus(false)}>
                <Alert elevation={6} variant="filled" onClose={() => this.setModalSucessoStatus(false)} severity="success">
                  {this.state.modalSucessoMsg}
                </Alert>
              </Snackbar>
            </Container>


            <Dialog
              fullWidth
              open={this.state.modalTopStatus}
              onClose={() => this.setModalTopStatus(false)}
              aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Comentario da seleção</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  fullWidth
                  multiline
                  rows="3"
                  margin="dense"
                  id="comentario"
                  name="comentario"
                  label="Digite o motivo do por que selecinou esse candidato, pontos fracos e fortes."
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => this.setModalTopStatus(false)} color="primary"> Cancelar </Button>
                <Button onClick={() => { this.onClickButtonConfirmarComentario(this) }} type="submit" color="primary"> Confirmar </Button>
              </DialogActions>
            </Dialog>

          </div>
        )
      } else {
        return (
          <Carregando />
        )
      }
  }
}