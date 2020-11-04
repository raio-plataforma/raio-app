import React, { Component } from "react"
import Button from "../../comps/Button";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core"
import Titulo from "../../components/Titulo";
import Erro from "../../components/erro";
import Carregando from "../../components/loading/carregando";

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

      await this.setState({
        isLoaded: true,
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
          <Container center="true" maxWidth="md">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Titulo>Cadastro de Vaga</Titulo>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    name="title"
                    fullWidth
                    error={errors.title !== undefined}
                    helperText={errors.title && errors.title.message}
                    inputRef={register({
                      required: 'Esse campo é obrigatório'
                    })}
                    label="Nome da Vaga"
                    variant="filled"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    fullWidth
                    options={functions.sort()}
                    renderInput={params => (
                      <TextField
                        {...params}
                        name="function"
                        inputRef={register({
                          required: 'Esse campo é obrigatório'
                        })}
                        color="secondary"
                        label="Função"
                        variant="filled"
                        placeholder="Digite sua pesquisa"
                        error={errors.function !== undefined}
                        helperText={errors.function && errors.function.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="requirements"
                    fullWidth
                    multiline
                    rows="5"
                    error={errors.requirements !== undefined}
                    helperText={errors.requirements && errors.requirements.message}
                    inputRef={register({
                      required: 'Esse campo é obrigatório'
                    })}
                    label="Requisitos"
                    variant="filled"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Select
                    name="state"
                    error={errors.state !== undefined}
                    helperText={errors.state && errors.state.message}
                    onChange={(e) => handleCities(e)}
                    options={stateList(states)}
                    register={register({
                      required: 'Esse campo é obrigatório'
                    })}
                    label="Estado"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Autocomplete
                    fullWidth
                    freeSolo
                    disabled={citiesFromStates.length === 0}
                    options={citiesFromStates.map(city => city.name).sort()}
                    renderInput={params => (
                      <TextField
                        {...params}
                        name="city"
                        inputRef={register({
                          required: 'Esse campo é obrigatório'
                        })}
                        color="primary"
                        label="Cidade"
                        variant="filled"
                        placeholder="Busque a cidade"
                        error={errors.city !== undefined}
                        helperText={errors.city && errors.city.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="start"
                    onChange={(e) => handleDateChange({ [e.target.name]: e.target.value })}
                    label="Data Inicial"
                    type="date"
                    fullWidth
                    variant="filled"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="end"
                    onChange={(e) => handleDateChange({ [e.target.name]: e.target.value })}
                    label="Data Final"
                    type="date"
                    fullWidth
                    variant="filled"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="cache"
                    type="number"
                    fullWidth
                    error={errors.cache !== undefined}
                    helperText={errors.cache && errors.cache.message}
                    inputRef={register({
                      required: 'Esse campo é obrigatório'
                    })}
                    label="Cachê"
                    variant="filled"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Checkbox
                    name="hiring_type"
                    options={hiringType}
                    register={register}
                  />
                </Grid>
                <Grid item xs={12}>
                  <SwitchLabels
                    name="sumirNomeEmpresa"
                    label="Esconder nome da empresa na página publica da vaga?"
                    register={register}
                  />
                </Grid>
              </Grid>
              <Success msg={status} />
              <Error msg={registerError} />

              <center>
                <br />
                <Button type="submit" variant="contained">
                  Enviar
              </Button>
              </center>
            </form>
            <br /><br />
          </Container>
        )
      } else {
        return (
          <Carregando />
        )
      }
  }
}