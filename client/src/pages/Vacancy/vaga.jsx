import React, { Component, useEffect } from "react"
import { useStoreState, useStoreActions } from 'easy-peasy'
import Alert from '@material-ui/lab/Alert'

import { Container, Group, Background } from './style'
import { IfElse } from '../../components/If'
import Tables from '../../comps/Tables'
import Button from "../../comps/Button";
import Grid from "@material-ui/core/Grid";
import ApiMercadoPago from "../../models/mercadopago"
import { CircularProgress, Typography } from "@material-ui/core"
import { Title } from "../Signup/styles"
import ApiVaga from "../../models/vaga"
import Loading from "../../components/loading/index";

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
    const id = this.props.match.params.id;
    let listaVagas = await ApiVaga.prototype.getTodas();
    console.log(listaVagas);

    // Validando se o id da vaga está valido
    let b = false;
    for (var j = 0; j < listaVagas.length; ++j) {
      if (listaVagas[j].id == id) {
        listaVagas = listaVagas[j];
        b = true;
        break;
      } else
        if (listaVagas[j]._id == id) {
          listaVagas = listaVagas[j];
          b = true;
          break;
        }
    }
    if (b == false) { window.location.href = "/dashboard/empresa"; }

    // Fazendo conta do valor a ser pago
    var valorCalculoDesconto = parseFloat(listaVagas.cache * (50 / 100));
    listaVagas.valorDevedor = parseFloat(parseFloat(listaVagas.cache) - parseFloat(valorCalculoDesconto));

    // Gerando link de pagamento para colocar no botoão
    let linkPagamento = await ApiMercadoPago.prototype.criarLinkDePagamento(listaVagas);
    if (linkPagamento == "ERRO") {
      await this.setState({
        isLoaded: true,
        erro: "Ocorreu um erro ao criar o botao de pagamento, tente novamente mais tarde."
      });
    } else {
      await this.setState({
        isLoaded: true,
        listaVagas,
        linkChekoutPagamento: linkPagamento
      });
    }

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
          <Container
            center="true"
            style={{
              height: 'calc(100vh - 107px)',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Grid container alignItems="stretch" justify="space-between">
              <Title style={{ color: '#fff' }}>
                Vaga: {this.state.listaVagas.title}
              </Title>


              <IfElse
                condition={this.state.listaVagas.status == 'Visivel'}
                True={
                  <div>
                    <br />
                    <Alert severity="warning">Essa vaga já foi paga o valor devido!</Alert>
                  </div>
                }
                False={
                  <div>
                    <Typography variant="body2" color="initial">Essa vaga ainda não está vinculada em nosso site pois, está aguardando ser paga, só apos o pagamento ser aprovado que a vaga estará visivel no site para os candidatos, e que você poderá ver os candidatos inscrito na vaga.</Typography>
                    <br />
                    <b><Typography variant="subtitle1" color="initial">Valor para pagamento da vaga é de R$ {this.state.listaVagas.valorDevedor}</Typography></b>

                    <Button variant="contained" onClick={() => { window.open(this.state.linkChekoutPagamento, '_blank') }}>
                      Pagar com Mercado Pago
                    </Button>

                  </div>
                }
              />

            </Grid>
          </Container>
        )
      } else {
        return (
          <Loading />
        )
      }
  }
}