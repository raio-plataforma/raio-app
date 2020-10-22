import React, { Component } from "react"

import Carregando from "../../components/loading/carregando"
import Erro from "../../components/erro"
import { Button, Container, Grid, Paper, Typography } from "@material-ui/core"
import ScheduleIcon from '@material-ui/icons/Schedule';
import { formatMoney } from "../../utils/formatter"
import { Link } from "react-router-dom"
import htmlParser from "html-react-parser"
import { useStoreActions, useStoreState } from "easy-peasy"
import ApiProfissional from "../../api/profissional"
import ApiUser from "../../api/user"
import Star from '@material-ui/icons/Star'
import PcD from '@material-ui/icons/Accessible'
import BusinessIcon from '@material-ui/icons/Business';

export default class profissionalPagina extends Component {
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
    let userId = this.props.match.params.userId;
    if (String(userId) == "userLogado") {
      let userLogado = await ApiUser.prototype.getUserLogado(localStorage.getItem("user_type"));
      userId = userLogado.id;
      window.history.pushState("", "", "/perfil/profissional/"+userId);
    }

    let user = await ApiUser.prototype.getById(userId, ()=>{ window.location.href = "/404";});
    let userProfissional = await ApiProfissional.prototype.getById(userId);

    // verificando tipo do usuario
    if (user.type !== "professional") {
      window.location.href = "/404";
      return;
    }

    // Formatando
    userProfissional.createAt = new Date(userProfissional.createAt).toLocaleDateString();
    userProfissional.bio = userProfissional.bio.replace(/\n/g, "<br />");

    // Passando para o state html variaveis 
    await this.setState({
      isLoaded: true,
      userProfissional,
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
          <Container center="true" maxWidth="md" className="PaginaVaga PaginaProfissional">
            <br remove-mobile="true" /><br remove-mobile="true" /><br />

            <Grid container spacing={2}>
              <Grid item xs={12} md={12} className="colunaEsqurda">
                <Grid container spacing={2}>
                  <Grid item xs={4} md={2}>
                    <img src="https://i.imgur.com/gRmLJPQ.jpg" width="100%" className="foto-perfil" />
                  </Grid>
                  <Grid item xs={8} md={10}>
                    <Typography variant="h1" >{this.state.user.name} ({this.state.userProfissional.idade} anos) </Typography>
                    <Typography variant="h2" >{this.state.userProfissional.education} - {this.state.userProfissional.formation_institution}</Typography>
                    <Typography variant="h3" >{this.state.userProfissional.city} - {this.state.userProfissional.stateName}</Typography>
                    {this.state.userProfissional.apan_associate && (
                      <Typography variant="body1" className="display-inline">
                        <Star style={{ verticalAlign: "middle", marginRight: "5px", marginLeft: "5px" }} />
                        Associado APAN
                      </Typography>)
                    }
                    {this.state.userProfissional.pcd && (
                      <Typography variant="body1" className="display-inline">
                        <PcD style={{ verticalAlign: "middle", marginRight: "5px", marginLeft: "5px" }} />
                        PcD
                      </Typography>)
                    }
                    {this.state.userProfissional.cnpj && (
                      <Typography variant="body1" className="display-inline">
                        <BusinessIcon style={{ verticalAlign: "middle", marginRight: "5px", marginLeft: "5px" }} />
                        Possui CNPJ - {this.state.userProfissional.cnpj_type}
                      </Typography>)
                    }
                  </Grid>
                </Grid>
                <hr color="laranja" />
                <br />
                <Typography variant="h2" >Contatos e links:</Typography>
                <Typography variant="body1">
                  - Telefone: <a href={"tel:"+this.state.user.phone} title={"Clique para telefonar"}>{this.state.user.phone}</a>
                </Typography>
                <Typography variant="body1">
                  - <a href={this.state.userProfissional.links}>{this.state.userProfissional.links}</a>
                </Typography>
                <br />
                <Typography variant="h2" >Biografia:</Typography>
                <Typography variant="body1">
                  {htmlParser(this.state.userProfissional.bio)}
                </Typography>
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