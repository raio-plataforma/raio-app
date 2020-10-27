import React, { Component } from "react"

import Carregando from "../../../components/loading/carregando"
import Erro from "../../../components/erro"
import { Button, Container, Grid, Paper, Snackbar, Typography } from "@material-ui/core"
import ApiUser from "../../../api/user"
import Tables from '../../../comps/Tables'
import Titulo from "../../../components/Titulo"
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import Alert from "@material-ui/lab/Alert"

export default class admListaPagina extends Component {
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
    let userLogado = await ApiUser.prototype.getUserLogado(localStorage.getItem("user_type"));

    // verificando tipo do usuario
    if (userLogado.type !== "admin") {
      window.location.href = "/404";
      return;
    }

    // Definindo quais são os campos que irá aparecer na tabela.
    const tablesHeads = [
      { id: 'name', numeric: false, disablePadding: true, label: 'Nome' },
      { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
      { id: 'phone', numeric: true, disablePadding: false, label: 'Telefone' },
      { id: '', numeric: false, disablePadding: false, label: '' },
      { id: '', numeric: false, disablePadding: false, label: '' }
    ]


    // Passando para o state html variaveis 
    await this.setState({
      userLogado,
      tablesHeads
    });

    await this.carregarDadosTabela();

  }

  async onClickDeletarUser(id, shelf) {
    let deletarUser = await ApiUser.prototype.deleteById(id);

    if (deletarUser.message == "Excluído") {
      shelf.setModalSucessoStatus("Usuario excluído com sucesso!");
      shelf.carregarDadosTabela();
    } else {
      shelf.setState({
        erro: String(deletarUser)
      })
    }
  }

  async carregarDadosTabela() {
    await this.setState({
      isLoaded: false,
    })

    let usersAdmsList = await ApiUser.prototype.getTodos("admin");

    await this.setState({
      isLoaded: true,
      usersAdmsList
    });
    return;
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
            <Container center="true" maxWidth="lg">
              <Titulo> Administradores </Titulo>

              <Tables
                title="Lista de administradores cadastros"
                headCells={this.state.tablesHeads}
                list={this.state.usersAdmsList}
                btnAddLink="/painel/admin/cadastro/administrador"
                btnAddLabel={(<span><AddIcon style={{marginLeft:"0px"}}/> Criar novo</span>)}
                actions={[
                  {
                    actionCampo: "_id",
                    actionShelf: this,
                    action: this.onClickDeletarUser,
                    btn: <DeleteIcon />,
                    type: 'btn', // link or btn
                    tooltip: 'Deletar usuario'
                  }
                ]}
              />
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