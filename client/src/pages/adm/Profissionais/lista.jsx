import React, { Component } from "react"

import Carregando from "../../../components/loading/carregando"
import Erro from "../../../components/erro"
import { Button, Container, Grid, Paper, Snackbar, Typography } from "@material-ui/core"
import ApiUser from "../../../api/user"
import Tables from '../../../comps/Tables'
import Titulo from "../../../components/Titulo"
import EditIcon from '@material-ui/icons/Edit';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Alert from "@material-ui/lab/Alert"
import ApiVaga from "../../../api/vaga"
import ApiEmpresa from "../../../api/empresa"
import ApiProfissional from "../../../api/profissional"

export default class admProfissionaisListaPagina extends Component {
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
      { id: 'user_id.name', numeric: false, disablePadding: true, label: 'Nome' },
      { id: 'user_id.gender', numeric: false, disablePadding: false, label: 'Gênero' },
      { id: 'user_id.email', numeric: false, disablePadding: true, label: 'E-mail' },
      { id: 'user_id.phone', numeric: false, disablePadding: false, label: 'Telefone' },
      { id: 'education', numeric: false, disablePadding: false, label: 'Educação' }
    ]


    // Passando para o state html variaveis 
    await this.setState({
      userLogado,
      tablesHeads
    });

    await this.carregarDadosTabela();

  }

  async carregarDadosTabela() {
    await this.setState({
      isLoaded: false,
    })

    let profissionalLista = await ApiProfissional.prototype.getTodos();

    await this.setState({
      isLoaded: true,
      profissionalLista
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
              <Titulo> Profissionais </Titulo>

              <Tables
                title="Lista de profissionais cadastradas"
                headCells={this.state.tablesHeads}
                list={this.state.profissionalLista}
                actions={[
                  {
                    actionCampo: "userId",
                    action: "/perfil/profissional/",
                    btn: <VisibilityIcon />,
                    type: 'link', // link or btn
                    target: '_blank',
                    tooltip: 'Ver perfil'
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