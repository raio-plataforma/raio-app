import React, { Component, useEffect } from "react"

import { Container, Group, Background } from '../Vacancy/style'
import Grid from "@material-ui/core/Grid";
import { Title } from "../Signup/styles"
import Loading from "../../components/loading/index";
import { Button, Typography } from "@material-ui/core";

export default class Pagina404 extends Component {
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
    await this.setState({ isLoaded: true })
  }

  render() {
    if (this.state.erro !== null) {
      return (
        <Title style={{ color: '#fff' }}>
          ERRO: {this.state.erro}
        </Title>
      )
    } else
      if (this.state.isLoaded == true) {
        return (
          <Container center="true" >
              <Typography variant="h2" style={{ textAlign: 'center', fontWeight: 'bold' }}>404</Typography>
              <Typography variant="body1" style={{ textAlign: 'center' }}>Página não encontrada.</Typography>
              <center>
                <br />
                <Button onClick={()=>{window.location.href = "/"}} variant="contained" color="primary">Voltar a home.</Button>
              </center>
          </Container>
        )
      } else {
        return (
          <Loading />
        )
      }
  }
}