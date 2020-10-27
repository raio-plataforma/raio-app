import React, { Component } from "react"
import Button from "../../comps/Button";
import Grid from "@material-ui/core/Grid";
import ApiMercadoPago from "../../models/mercadopago"
import { Container, Paper, Typography } from "@material-ui/core"
import { Title } from "../Signup/styles"
import ApiVaga from "../../api/vaga"
import Loading from "../../components/loading/index";
import Titulo from "../../components/Titulo";
import PaymentIcon from '@material-ui/icons/Payment';
import CardProfissional from "../../components/CardProfissional";
import htmlParser from "html-react-parser"
import CommentIcon from '@material-ui/icons/Comment';
import Erro from "../../components/erro";
import Carregando from "../../components/loading/carregando";
import config from "../../config";

export default class PaginaVagaEmpresa extends Component {
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
    let listaVagas = await ApiVaga.prototype.getById(id, () => { window.location.href = "/dashboard/empresa"; });

    // Colocando paragrafo nos comentarios
    try {
      listaVagas.comentarioTop1 = listaVagas.comentarioTop1.replace(/\n/g, "<br />");
      listaVagas.comentarioTop2 = listaVagas.comentarioTop2.replace(/\n/g, "<br />");
      listaVagas.comentarioTop3 = listaVagas.comentarioTop3.replace(/\n/g, "<br />");
    } catch (error) { }

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
        linkChekoutPagamento: linkPagamento,
        loopTop3: [1, 2, 3]
      });
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
          <Container center="true" maxWidth="lg" className="PaginaVagaDetalhesEmpresa">
            <Titulo> Vaga: </Titulo>
            <center><h1>{this.state.listaVagas.title}</h1></center>


            {
              this.state.listaVagas.status == 'Aguardando pagamento' ? (
                <Container center="true" maxWidth="md" className="AguardandoPagamento">
                  <br /><br />
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4} remove-mobile="true">
                      <center><img src="/undraw_Credit_card_re_blml.svg" width="93%"></img></center>
                    </Grid>

                    <Grid item xs={12} md={8}>
                      <h1>Aguardando pagamento</h1>
                      <Typography variant="body1" color="initial">Essa vaga ainda não está vinculada em nosso site pois, está aguardando ser paga, só apos o pagamento ser aprovado que a vaga estará visivel no site para os candidatos.</Typography>
                      <br />
                      <b><h2 style={{ margin: "0px 0px 10px" }}>R$ {this.state.listaVagas.valorDevedor}</h2></b>
                      <Button variant="contained" onClick={() => { window.open(this.state.linkChekoutPagamento, '_blank') }}>
                        <PaymentIcon /> Pagar com Mercado Pago
                      </Button>
                    </Grid>
                  </Grid>
                </Container>
              ) : (<></>)
            }



            {
              this.state.listaVagas.status == 'Pagamento negado' ? (
                <Container center="true" maxWidth="md" className="PagamentoNegado">
                  <br /><br />
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4} remove-mobile="true">
                      <center><img src="/undraw_cancel_u1it.svg" width="93%"></img></center>
                    </Grid>

                    <Grid item xs={12} md={8}>
                      <h1>Pagamento negado :(</h1>
                      <Typography variant="body1" color="initial">Parece que o pagamento foi negado pela operadora de cartão ou pelo mercado pago, você precisa entrar em contato com seu banco para resolver essa pendencia, apos fazer isso tente fazer o pagamento novamente usando o botão a baixo.</Typography>
                      <br />
                      <b><h2 style={{ margin: "0px 0px 10px" }}>R$ {this.state.listaVagas.valorDevedor}</h2></b>
                      <Button variant="contained" onClick={() => { window.open(this.state.linkChekoutPagamento, '_blank') }}>
                        <PaymentIcon /> Pagar com Mercado Pago
                      </Button>
                    </Grid>
                  </Grid>
                </Container>
              ) : (<></>)
            }



            {
              this.state.listaVagas.status == 'Atraindo candidatos' ? (
                <Container center="true" maxWidth="lg" className="AtraindoCandidatos">
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4} remove-mobile="true">
                      <center><img src="/undraw_email_capture_x8kv.png" width="85%"></img></center>
                    </Grid>

                    <Grid item xs={12} md={8}>
                      <br /><br />
                      <h1>Sua vaga está em processo de atração de candidatos!</h1>
                      <Typography variant="body1" color="initial">
                        Quando sua vaga está nesse processo significa a vaga está visivel ao publico em nosso site, agora é o momento de esperar as candidaturas acontecerem isso pode demorar algumas semanas.
                      </Typography>
                      <br />
                      <Typography variant="body1" color="initial">
                        Apos chegar a 10 candidaturas sua vaga entrará em processo de Seleção, esse processo é quando a equipe RAIO começa a trabalhar na seleção dos 3 melhores taletons para sua vaga.
                      </Typography>
                    </Grid>
                  </Grid>
                </Container>
              ) : (<></>)
            }


            {
              this.state.listaVagas.status == 'Aguardando seleção' ? (
                <Container center="true" maxWidth="lg" className="AguardandoSelecao">
                  <br /><br />
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4} remove-mobile="true">
                      <center><img src="/undraw_filter_4kje.svg" width="70%"></img></center>
                    </Grid>

                    <Grid item xs={12} md={8}>
                      <h1>Sua vaga está em processo de seleção dos talentos!</h1>
                      <Typography variant="body1" color="initial">
                        A equipe RAIO está trabalhando para selecionar os 3 melhores talentos para tí, apartir das pessoas que se inscreveram na sua vaga.
                      </Typography>
                      <br />
                      <Typography variant="body1" color="initial">
                        Esse processo pode demorar até 1 semana, apos ele você poderá ver o nome, foto, telefone e muito mais sobre os 3 candidatos mais talentosos do seu processo.
                      </Typography>
                    </Grid>
                  </Grid>
                </Container>
              ) : (<></>)
            }


            {
              this.state.listaVagas.status == 'Candidatos selecionados' ? (
                <Container center="true" maxWidth="lg" className="CandidatosSelecionados">
                  <br /><br />
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4} remove-mobile="true">
                      <center><img src="/undraw_personal_info_0okl.svg" width="95%"></img></center>
                    </Grid>

                    <Grid item xs={12} md={8}>
                      <h1>Candidatos selecionados!</h1>
                      <Typography variant="body1" color="initial">
                        E chegamos ao ultimo processo da sua vaga, selecionamentos os 3 melhores talentos que participaração do processo seletivo.
                      </Typography>
                      <br />
                      <Typography variant="body1" color="initial">
                        Logo a baixo irá encontrar dados sobre os 3 melhores talentos e tambem comentarios da equipe RAIO justificando por que esse candidato foi a escolha.
                      </Typography>
                    </Grid>

                  </Grid>
                </Container>
              ) : (<></>)
            }



            {
              this.state.listaVagas.status == 'Fechada' ? (
                <Container center="true" maxWidth="md" className="Fechada">
                  <br /><br />
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <center>
                        <h1>Fechada!</h1>
                        <Typography variant="body1" color="initial">
                          A equipe RAIO marcou essa vaga como fechada.
                      </Typography>
                        <br />
                        <Typography variant="body1" color="initial">
                          Para mais detalhes do por que entre em contato com a equipe.
                      </Typography>
                      </center>
                    </Grid>
                  </Grid>
                </Container>
              ) : (<></>)
            }



            {
              this.state.listaVagas.status == 'Arquivada' ? (
                <Container center="true" maxWidth="md" className="Arquivada">
                  <br /><br />
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <center>
                        <h1>Arquivada!</h1>
                        <Typography variant="body1" color="initial">
                          A equipe RAIO marcou essa vaga como arquivada.
                      </Typography>
                        <br />
                        <Typography variant="body1" color="initial">
                          Para mais detalhes do por que entre em contato com a equipe.
                      </Typography>
                      </center>
                    </Grid>
                  </Grid>
                </Container>
              ) : (<></>)
            }


            {
              (
                (this.state.listaVagas.status == 'Candidatos selecionados') ||
                (this.state.listaVagas.status == 'Arquivada') ||
                (this.state.listaVagas.status == 'Fechada')
              ) ? (
                  <Container center="true" maxWidth="md" className="ListaTop3">
                    <br /><br /><br /><br />
                    {
                      this.state.loopTop3.map(index => (
                        <>
                          {
                            this.state.listaVagas['top' + index] &&
                            <Grid item xs={12}>
                              <br />
                              <CardProfissional
                                posicaoTop={index}
                                id={this.state.listaVagas['top' + index]['_id']}
                                img={config.pastaFotoPerfil + this.state.listaVagas['top' + index]['fotoPerfil']}
                                nome={this.state.listaVagas['top' + index]['name']}
                                idade={this.state.listaVagas['top' + index + 'Prof']['idade']}
                                educacao={this.state.listaVagas['top' + index + 'Prof']['education']}
                                univercidade={this.state.listaVagas['top' + index + 'Prof']['formation_institution']}
                                cidade={this.state.listaVagas['top' + index + 'Prof']['city']}
                                estado={this.state.listaVagas['top' + index + 'Prof']['stateName']}
                                apan_associate={this.state.listaVagas['top' + index + 'Prof']['apan_associate']}
                                pcd={this.state.listaVagas['top' + index + 'Prof']['pcd']}
                                cnpj={this.state.listaVagas['top' + index + 'Prof']['cnpj']}
                                cnpj_type={this.state.listaVagas['top' + index + 'Prof']['cnpj_type']}
                              />
                            </Grid>
                          }

                          {
                            this.state.listaVagas['comentarioTop' + index] &&
                            <Grid item xs={12}>
                              <Paper className="dashboard-paper" style={{ marginTop: "-10px" }}>
                                <hr style={{ borderColor: "#BA3B29" }} />
                                <Grid container spacing={2}>
                                  <Grid item xs={3} md={1}>
                                    <center>
                                      <br />
                                      <CommentIcon style={{ color: "#BA3B29", fontSize: 50 }} />
                                    </center>
                                  </Grid>
                                  <Grid item xs={9} md={11}>
                                    <h2>Comentário:</h2>
                                    <p>{htmlParser(this.state.listaVagas['comentarioTop' + index])}</p>
                                  </Grid>
                                </Grid>
                              </Paper>
                            </Grid>
                          }
                        </>
                      ))
                    }
                    <br /><br /><br /><br />
                  </Container>
                ) : (<></>)
            }

          </Container>
        )
      } else {
        return (
          <Carregando />
        )
      }
  }
}