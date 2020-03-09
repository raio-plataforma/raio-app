import React, { useState } from "react"
import { useForm } from 'react-hook-form'
import { useStoreActions, useStoreState } from 'easy-peasy'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import history from '../../history'

import { functions } from '../../pages/Signup/dicioFields'
import Button from '../../comps/Button'
import Checkbox from '../../comps/Checkbox'
import Form from '../../components/Form'
import { Error, Success } from '../../components/Status'
import { parseDate } from '../../utils/formatters'
import { Background, Group, WrapButton } from './style'


const Vacancy = () => {
  const {
    register,
    handleSubmit,
    errors,
    reset
  } = useForm()

  const registerJob = useStoreActions(actions => actions.enterprise.registerJob)
  const registerError = useStoreState(state => state.enterprise.error)
  const [status, setStatus] = useState('')

  const onSubmit = async (data) => {
    const res = await registerJob({
      ...data,
      company_name: data.companyName,
      total_period: parseDate(data.start) + '-' + parseDate(data.end)
    })

    reset()

    if (res && res.status && res.status === 200) {
      setStatus(res.msg)
      return history.push('/dashboard/empresa')
    }
  }

  return (
    <Background>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Typography
          color="primary"
          variant="h3"
          component="h2"
          style={{textAlign: 'center'}}
        >Cadastro de Vaga</Typography>

        <TextField
          label="Título da Vaga"
          error={errors.title}
          helperText={errors.title && errors.title.message}
          fullWidth
          name="title"
          variant="filled"
          inputRef={register({
            required: 'Esse campo é obrigatório',
          })}
        />

        <Autocomplete
          fullWidth
          options={functions.sort()}
          filterSelectedOptions
          name="function"
          color="primary"
          renderInput={params => (
            <TextField
              {...params}
              name="function"
              color="primary"
              variant="filled"
              error={errors.function}
              helperText={errors.function && errors.function.message}
              label="Função"
              placeholder="Digite sua pesquisa"
              inputRef={register({
                required: 'Esse campo é obrigatório'
              })}
            />
          )}
        />

        <TextField
          label="Requisitos"
          error={errors.requirements}
          helperText={errors.requirements && errors.requirements.message}
          fullWidth
          multiline
          rows="5"
          name="requirements"
          variant="filled"
          inputRef={register({
            required: 'Esse campo é obrigatório',
          })}
        />

        <TextField
          label="Endereço"
          error={errors.location}
          helperText={errors.location && errors.location.message}
          fullWidth
          name="location"
          variant="filled"
          inputRef={register({
            required: 'Esse campo é obrigatório',
          })}
        />

        <Group>
          <TextField
            label="Data Inicial"
            type="date"
            error={errors.start}
            helperText={errors.start && errors.start.message}
            fullWidth
            name="start"
            variant="filled"
            inputRef={register({
              required: 'Esse campo é obrigatório'
            })}
          />
          
          <TextField
            label="Data Final"
            type="date"
            error={errors.end}
            helperText={errors.end && errors.end.message}
            fullWidth
            name="end"
            variant="filled"
            inputRef={register({
              required: 'Esse campo é obrigatório'
            })}
          />
        </Group>

        <TextField
          label="Cachê"
          type="number"
          error={errors.cache}
          helperText={errors.cache && errors.cache.message}
          fullWidth
          name="cache"
          variant="filled"
          inputRef={register({
            required: 'Esse campo é obrigatório'
          })}
        />

        <Checkbox
          label="Tipo de contratação"
          name="hiring_type"
          options={['CLT', 'RPA', 'PJ']}
          register={register}
          error={errors.hiring_type && errors.hiring_type.message}
        />
      
        <Success msg={status} />
        <Error msg={registerError} />

        <WrapButton>
          <Button
            type="submit"
            color="primary"
            variant="contained"
          >
            Enviar
          </Button>
        </WrapButton>
      </Form>
    </Background>
  )
}

export default Vacancy