import React, { useState } from "react"
import { useForm } from 'react-hook-form'
import { useStoreActions, useStoreState } from 'easy-peasy'
import Alert from '@material-ui/lab/Alert'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import {
  functions,
  hiringType,
} from '../Signup/dicioFields'
import Button from '../../comps/Button'
import Checkbox from '../../comps/Checkbox'
import { Error, Success } from '../../components/Status'
import { parseDate } from '../../utils/formatter'
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
  const handleDateChange = (date) => {
    setSelectedDate({...selectedDate, ...date});
  };

  const onSubmit = async (data) => {
    const period = `${parseDate(selectedDate.start)}-${parseDate(selectedDate.end)}`
    const res = await registerJob({
      ...data,
      company_name: data.companyName,
      total_period: period
    })

    reset()

    if (res && res.status && res.status === 200) {
      setStatus(res.msg)
      return history.push('/dashboard/empresa')
    }
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
        <Grid item xs={12}>
          <TextField
            name="location"
            fullWidth
            error={errors.location && errors.location.message}
            helperText={errors.location && errors.location.message}
            inputRef={register({
              required: 'Esse campo é obrigatório'
            })}
            label="Endereço"
            variant="filled"
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