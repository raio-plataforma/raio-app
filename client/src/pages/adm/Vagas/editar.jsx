import React, { Component } from "react"
import Carregando from "../../../components/loading/carregando"
import Erro from "../../../components/erro"
import { Button, Container, Grid, Paper, Snackbar, TextField, Typography } from "@material-ui/core"
import ApiUser from "../../../api/user"
import Titulo from "../../../components/Titulo"
import Alert from "@material-ui/lab/Alert"
import ApiVaga from "../../../api/vaga"
import StatusVagaJSON from "../../../assets/statusVaga.json";
import FormSelect from "../../../comps/FormSelect"
import ApiCandidaturas from "../../../api/candidaturas"
import AttachFileIcon from '@material-ui/icons/AttachFile';
import Autocomplete from "@material-ui/lab/Autocomplete"

export default class admVagasEditarPagina extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.state = {
      json: null,
      erro: null,
      isLoaded: false
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

    // Passando para o state html variaveis 
    await this.setState({
      isLoaded: true,
      vaga,
      userLogado,
      candidatos
    });
    console.log(this.state);

  }

  async submitForm(e) {
    e.preventDefault();
    let dadosFormFormado = {};
    let dadosInputsForm = new FormData(e.target);
    dadosInputsForm.forEach((valor, chave) => {
      if (valor != "") {
        dadosFormFormado[chave] = valor;
      }
    });
    try {
      dadosFormFormado.top1 = (dadosFormFormado.top1.split(" - "))[1];
      dadosFormFormado.top2 = (dadosFormFormado.top2.split(" - "))[1];
      dadosFormFormado.top3 = (dadosFormFormado.top3.split(" - "))[1];
    } catch (error) { }

    await this.setState({ isLoaded: true, erro: null });

    try {
      const resposta = await ApiVaga.prototype.putById(this.state.vaga._id, dadosFormFormado);
      if (resposta.job) {
        this.setModalSucessoStatus("Vaga editada com sucesso!");
      } else {
        await this.setState({ isLoaded: false, erro: resposta })
      }
    } catch (error) {
      await this.setState({ isLoaded: false, erro: error })
    }
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
            <Container center="true" maxWidth="md">
              <Titulo> Editando vaga:</Titulo>
              <center><h1>{this.state.vaga.title}</h1></center>
              <br /><br />

              <form onSubmit={this.submitForm}>
                <input type="hidden" name="title" defaultValue={this.state.vaga.title}></input>

                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <FormSelect
                      name="status"
                      label="Status"
                      options={StatusVagaJSON}
                      value={this.state.vaga.status}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Autocomplete
                      fullWidth
                      freeSolo
                      autoHighlight={true}
                      options={this.state.candidatos}
                      renderOption={option => <>{option._user?.name}</>}
                      getOptionLabel={option => option._user?.name + " - " + option._user?._id}
                      defaultValue={this.state.vaga.top1}
                      renderInput={params => (
                        <TextField
                          {...params}
                          name="top1"
                          color="primary"
                          label="Candidato Top 1"
                          variant="filled"
                          placeholder="Digite o nome do candidato top 1"
                        />
                      )}
                    />
                  </Grid>


                  <Grid item xs={6}>
                    <Autocomplete
                      fullWidth
                      freeSolo
                      value={this.state.vaga.top2}
                      autoHighlight={true}
                      options={this.state.candidatos}
                      getOptionLabel={option => option._user?.name + " - " + option._user?._id}
                      renderOption={option => <>{option._user?.name}</>}
                      renderInput={params => (
                        <TextField
                          {...params}
                          name="top2"
                          color="primary"
                          label="Candidato Top 2"
                          variant="filled"
                          placeholder="Digite o nome do candidato top 2"
                          value={this.state.vaga.top2}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      name="comentarioTop1"
                      fullWidth
                      multiline
                      rows="5"
                      label="Comentario sobre o candidato top 1"
                      variant="filled"
                      defaultValue={this.state.vaga.comentarioTop1}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      name="comentarioTop2"
                      fullWidth
                      multiline
                      rows="5"
                      label="Comentario sobre o candidato top 2"
                      variant="filled"
                      defaultValue={this.state.vaga.comentarioTop2}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Autocomplete
                      fullWidth
                      freeSolo
                      value={this.state.vaga.top3}
                      autoHighlight={true}
                      options={this.state.candidatos}
                      getOptionLabel={option => option._user?.name + " - " + option._user?._id}
                      renderOption={option => <>{option._user?.name}</>}
                      renderInput={params => (
                        <TextField
                          {...params}
                          name="top3"
                          color="primary"
                          label="Candidato Top 3"
                          variant="filled"
                          placeholder="Digite o nome do candidato top 3"
                          value={this.state.vaga.top3}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      name="comentarioTop3"
                      fullWidth
                      multiline
                      rows="5"
                      label="Comentario sobre o candidato top 3"
                      variant="filled"
                      defaultValue={this.state.vaga.comentarioTop3}
                    />
                  </Grid>

                  {/* <Grid item xs={12}>
                    <center>
                      <Button variant="contained" component="label" className="btn-transparente" >
                        <AttachFileIcon/> Selecione o PDF da curadoria dos talentos
                        <input type="file" accept="application/pdf" style={{ display: "none" }} />
                      </Button>
                    </center>
                  </Grid> */}

                </Grid>

                <center>
                  <br /><br />
                  <Button type="submit" variant="contained" color="primary" size="large"> Salvar </Button>
                </center>
                <br /><br /><br /><br />
              </form>

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