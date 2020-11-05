import React, { useEffect, useState } from 'react';
import { Container } from "@material-ui/core";
import { useForm } from 'react-hook-form'
import { useStoreActions, useStoreState } from 'easy-peasy'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import states from '../../../assets/states.json'
import cities from '../../../assets/cities.json'
import { functions, hiringType } from '../../Signup/dicioFields'
import Button from '../../../comps/Button'
import Checkbox from '../../../comps/Checkbox'
import { Error, Success } from '../../../components/Status'
import { parseDate, normalizeArrayData } from '../../../utils/formatter'
import Titulo from "../../../components/Titulo";
import SwitchLabels from "../../../comps/Switch";
import Carregando from "../../../components/loading/carregando";
import Erro from "../../../components/erro";
import cicloCacheJSON from "../../../assets/cicloCache.json";
import Select from '../../../comps/Select';
import ApiEmpresa from '../../../api/empresa';
import ApiVaga from '../../../api/vaga';


const AdmCriarVagaPagina = () => {
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null)

  const { register, handleSubmit, errors, reset } = useForm()
  const registerError = useStoreState(state => state.enterprise.error)
  const [selectedDate, setSelectedDate] = React.useState({})
  const [status, setStatus] = useState('')
  const [citiesFromStates, setCities] = useState([])
  const stateList = list => list.map(uf => ({ value: uf.id, name: uf.name }))
  const [listaEmpresas, setListaEmpresas] = useState([])


  useEffect(() => {
    console.log(listaEmpresas);

    if (String(listaEmpresas) == "") {
      ApiEmpresa.prototype.getTodas().then((response) => { setListaEmpresas(response) })
    } else {
      setCarregando(false);
    }

  }, [listaEmpresas]);

  const handleDateChange = (date) => {
    setSelectedDate({ ...selectedDate, ...date });
  };

  const handleCities = state => {
    const filteredCities = cities.filter(city => city.state_id == state)
    setCities(filteredCities)
  }

  const onSubmit = data => {
    setCarregando(true);
    try {
      const period = `${parseDate(selectedDate.start)}-${parseDate(selectedDate.end)}`

      for (let s in states) {
        if (states[s].id === Number(data.state)) data.stateName = states[s].name
      }

      try {
        data.enterprise_id = (data.enterprise_id.split(" - "))[1];
      } catch (error) { }

      const formatted = {
        ...data,
        hiring_type: normalizeArrayData(data.hiring_type),
        total_period: period,
        status: 'Atraindo candidatos'
      }

      ApiVaga.prototype.postAdmin(formatted).then((response)=>{
        console.log(response);
        if(response){
          window.location.href = "/vaga/"+response._id;
        }
      });
    } catch (error) {
      setErro("Ocorreu um erro, verifique todos os campos digitados e tente novamente!");
    }
  }


  return (
    <div className="pageRender">
      { erro !== null ? (
        <Erro erro={erro} />
      ) : (
          <div>
            { carregando == true ? (
              <Carregando />
            ) : (
                <Container center="true" maxWidth="md">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Titulo>Cadastro de nova Vaga para empresa</Titulo>

                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Autocomplete
                          fullWidth
                          options={listaEmpresas}
                          renderOption={option => <>{option.enterprise_name}</>}
                          getOptionLabel={option => option.enterprise_name + " - " + option._id}
                          renderInput={params => (
                            <TextField
                              {...params}
                              name="enterprise_id"
                              inputRef={register({
                                required: 'Esse campo é obrigatório'
                              })}
                              color="secondary"
                              label="Empresa (Nome ou id)"
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
                          required
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
                          required
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
                          required
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
                      <Grid item xs={4}>
                        <Select
                          required
                          name="ciclo_cache"
                          error={errors.ciclo_cache !== undefined}
                          helperText={errors.ciclo_cache && errors.ciclo_cache.message}
                          onChange={(e) => handleCities(e)}
                          options={cicloCacheJSON}
                          register={register({
                            required: 'Esse campo é obrigatório'
                          })}
                          label="Ciclo de pagamento"
                        />
                      </Grid>
                      <Grid item xs={8}>
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
                          required
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
            }
          </div>
        )
      }
    </div>
  )
}

export default AdmCriarVagaPagina;
