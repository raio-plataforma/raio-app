import React, { Component } from "react"
import Carregando from "../../../components/loading/carregando"
import Erro from "../../../components/erro"
import { Button, Container, Grid, Paper, Snackbar, Typography } from "@material-ui/core"
import ApiUser from "../../../api/user"
import Tables from '../../../comps/Tables'
import Titulo from "../../../components/Titulo"
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Alert from "@material-ui/lab/Alert"
import ApiVaga from "../../../api/vaga"
import ViewWeekIcon from '@material-ui/icons/ViewWeek';

export default class admVagasListaPagina extends Component {
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
      { id: 'title', numeric: false, disablePadding: true, label: 'Titulo' },
      { id: 'function', numeric: false, disablePadding: false, label: 'Função' },
      { id: 'enterprise_name', numeric: false, disablePadding: true, label: 'Empresa' },
      { id: 'stateName', numeric: false, disablePadding: false, label: 'Estado' },
      { id: 'city', numeric: false, disablePadding: false, label: 'Cidade' },
      { id: 'status', numeric: false, disablePadding: false, label: 'Status' }
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

    let vagasList = await ApiVaga.prototype.getTodas("", "Aguardando seleção");

    await this.setState({
      isLoaded: true,
      vagasList
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
              <Titulo> Vagas </Titulo>

              <Tables
                title="Lista de vagas a serem trabalhadas"
                headCells={this.state.tablesHeads}
                list={this.state.vagasList}
                btnAddLink="/painel/admin/cadastro/vaga"
                btnAddLabel={(<span><AddIcon style={{marginLeft:"0px"}}/> Criar nova</span>)}
                actions={[
                  {
                    actionCampo: "_id",
                    action: "/painel/admin/editar/vaga/",
                    btn: <EditIcon />,
                    type: 'link', // link or btn
                    tooltip: 'Editar vaga'
                  },
                  {
                    actionCampo: "_id",
                    action: "/painel/admin/processo/seletivo/vaga/",
                    btn: <ViewWeekIcon />,
                    type: 'link', // link or btn
                    tooltip: 'Processo Seletivo'
                  },
                  // {
                  //   actionCampo: "_id",
                  //   action: "/painel/admin/candidatos/vaga/",
                  //   btn: <FormatListBulletedIcon />,
                  //   type: 'link', // link or btn
                  //   target: '_blank',
                  //   tooltip: 'Lista de candidatos'
                  // },
                  {
                    actionCampo: "_id",
                    action: "/vaga/",
                    btn: <VisibilityIcon />,
                    type: 'link', // link or btn
                    target: '_blank',
                    tooltip: 'Ver pagina da vaga'
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