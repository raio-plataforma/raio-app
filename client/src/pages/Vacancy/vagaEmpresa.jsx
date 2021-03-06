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
import ApiCandidaturas from "../../api/candidaturas";

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
    let candidatos = await ApiCandidaturas.prototype.getByJobId(listaVagas._id);

    // Fazendo conta do valor a ser pago
    var porcentagemDeLucro = 30;
    var valorCalculoDesconto = parseFloat(listaVagas.cache * ((100 - porcentagemDeLucro) / 100));
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
        candidatos,
        linkChekoutPagamento: linkPagamento
      });
      console.log(this.state);
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
                      <Typography variant="body1" color="initial">Essa vaga ainda não está vinculada em nosso site.  Estamos aguardando a identificação do pagamento. Com a identificação do pagamento, a vaga estará visível no site para receber candidaturas.</Typography>
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
                      <h1>Pagamento negado</h1>
                      <Typography variant="body1" color="initial">Parece que o pagamento foi negado pela operadora de cartão ou pelo mercado pago. Solicitamos a gentileza de contatar seu banco ou operadora de crédito para resolver essa pendência. Depois de resolvido tente fazer o pagamento novamente usando o botão a baixo. </Typography>
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
                        Quando sua vaga está nessa etapa, significa que a vaga está visível ao público em nosso site. Agora é o momento de esperar o cadastro das candidaturas. Isso pode levar alguns dias.
                      </Typography>
                      <br />
                      <Typography variant="body1" color="initial">
                        Após chegar a 10 candidaturas ou atingirmos 7 dias de publicação, sua vaga entrará migrará para etapa de Seleção, esse momento do processo é quando a equipe RAIO começa a trabalhar na seleção dos melhores talentos para sua vaga.
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
                        A equipe RAIO está trabalhando para selecionar os melhores talentos para você, a partir das pessoas que se inscreveram na sua vaga.
                      </Typography>
                      <br />
                      <Typography variant="body1" color="initial">
                        Esse processo pode levar até 10 dias. Em seguida você poderá acessar as informações das candidaturas mais talentosas para ocupar sua vaga.
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
                        E chegamos a última etapa para o preenchimento da sua vaga, selecionamos os melhores talentos que participaram do processo seletivo.
                      </Typography>
                      <br />
                      <Typography variant="body1" color="initial">
                        Logo a baixo encontrará informações sobre cada um dos talentos, bem como comentários da equipe RAIO, com intuito de apoiar sua decisão.
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
                          Para mais detalhes entre em contato: comercial@raio.agency
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
                          Para mais detalhes contate: comercial@raio.agency
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
                      this.state.candidatos.map((candidato, index) => (
                        <>
                          {
                            ((candidato.status == "Top") || candidato.status == "Contratado") ? (
                              <>
                                {
                                  candidato._id &&
                                  <Grid item xs={12}>
                                    <br />
                                    <CardProfissional
                                      posicaoTop={true}
                                      id={candidato._user._id}
                                      img={config.pastaFotoPerfil + candidato._user.fotoPerfil}
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
                                  </Grid>
                                }

                                {
                                  candidato.comentario &&
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
                                          <p>{htmlParser((candidato.comentario).replace(/\n/g, "<br />"))}</p>
                                        </Grid>
                                      </Grid>
                                    </Paper>
                                  </Grid>
                                }
                              </>
                            ) : (<></>)
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