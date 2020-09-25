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

    for (var j = 0; j < listaVagas.length; ++j) {
      if (listaVagas[j].id == id) {
        listaVagas = listaVagas[j];
        break;
      } else
        if (listaVagas[j]._id == id) {
          listaVagas = listaVagas[j];
          break;
        } else {
          listaVagas = [];
          window.location.href = "/dashboard/empresa";
        }
    }

    let preparandoBotao = await ApiMercadoPago.prototype.prepararBotaoDePagamento();
    if(preparandoBotao !== "ERRO"){
      await this.setState({
        isLoaded: true,
        listaVagas,
        botaoPagamento: preparandoBotao
      });
    }else{
      await this.setState({
        erro: "Ocorreu um erro ao criar o botao de pagamento, tente novamente mais tarde."
      });
    }

  }

  render() {
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
            <form style={{ width: '100%' }} >
              <Title style={{ color: '#fff' }}>
                Vaga: {this.state.listaVagas.title}
              </Title>


              <IfElse
                condition={typeof this.state.listaVagas.status == 'pago'}
                True={
                  <Alert severity="warning">Essa vaga já foi paga o valor devido!</Alert>
                }
                False={
                  <div>
                    <Typography variant="body2" color="initial">Essa vaga ainda não está vinculada em nosso site pois, está aguardando ser paga, só apos o pagamento ser aprovado que a vaga estará visivel no site para os candidatos, e que você poderá ver os candidatos inscrito na vaga.</Typography>
                    <br />
                    <b><Typography variant="subtitle1" color="initial">Valor para pagamento da vaga é de R$ 10,00</Typography></b>

                    <Button variant="contained" onClick={() => { ApiMercadoPago.prototype.criarPagamento() }}>
                      Pagar com Mercado Pago
                    </Button>

                    <p>Novo - vvvvv</p>

                    <form method="POST">
                      <script
                        src="https://www.mercadopago.com.br/integrations/v1/web-payment-checkout.js"
                        data-preference-id={this.state.botaoPagamento}>
                      </script>
                    </form>
                  </div>
                }
              />



            </form>
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