import React, { useState } from "react"
import { useForm } from 'react-hook-form'
import { useStoreActions, useStoreState } from 'easy-peasy'
import Alert from '@material-ui/lab/Alert'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Select from '../../comps/FormSelect'
import states from '../../assets/states.json'
import cities from '../../assets/cities.json'

import {
  functions,
  hiringType,
} from '../Signup/dicioFields'
import Button from '../../comps/Button'
import Checkbox from '../../comps/Checkbox'
import { Error, Success } from '../../components/Status'
import { parseDate, normalizeArrayData } from '../../utils/formatter'
import history from '../../history'



const Vacancy = () => {
  const {
    register,
    handleSubmit,
    errors,
    reset
  } = useForm()

  const registerJob = useStoreActions(actions => actions.enterprise.registerJob)
  const registerError = useStoreState(state => state.enterprise.error)
  const [selectedDate, setSelectedDate] = React.useState({})
  const [status, setStatus] = useState('')
  const [citiesFromStates, setCities] = useState([])
  const handleDateChange = (date) => {
    setSelectedDate({...selectedDate, ...date});
  };

  const handleCities = state => {
    const filteredCities = cities.filter(city => city.state_id == state)
    setCities(filteredCities)
  }
  
  const stateList = list => list.map(uf => ({value: uf.id, name: uf.name}))

  const onSubmit = data => {
    const period = `${parseDate(selectedDate.start)}-${parseDate(selectedDate.end)}`
   
    const formatted = {
      ...data,
      hiring_type: normalizeArrayData(data.hiring_type),
      total_period: period
    }
    registerJob(formatted)
  }

  return (
    <section className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h2" style={{textAlign: 'center', fontWeight: 'bold', margin: '20px 0'}}>
          Cadastro de Vaga
        </Typography>
        <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            name="title"
            fullWidth
            error={errors.title && errors.title.message}
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
                error={errors.function && errors.function.message}
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
            error={errors.requirements && errors.requirements.message}
            helperText={errors.requirements && errors.requirements.message}
            inputRef={register({
              required: 'Esse campo é obrigatório'
            })}
            label="Requisitos"
            variant="filled"
          />
        </Grid>
        <Grid container spacing={2}>
        <Grid item xs={6}>
          <Select 
            name="state"
            error={errors.state && errors.state.message}
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
                error={errors.city && errors.city.message}
                helperText={errors.city && errors.city.message}
              />
            )}
          />
        </Grid>
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
            error={errors.cache && errors.cache.message}
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
      </Grid>
        <Success msg={status} />
        <Error msg={registerError} />
       
        <Button type="submit" variant="contained">
          Enviar
        </Button>
      </form>
    </section>
  )
}

export default Vacancy;