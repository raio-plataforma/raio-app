import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useStoreActions, useStoreState } from 'easy-peasy'
import Alert from '@material-ui/lab/Alert'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import {
  color as selfDeclaration,
  gender,
} from '../Signup/dicioFields'
import Select from '../../comps/Select'
import Button from '../../comps/Button'
import loading from '../../assets/loading.svg'
import { StyledForm } from './style'

const EditUser = ({ match }) => {
  const { register, handleSubmit, errors, getValues, setValue } = useForm()
  const [isLoading, setLoading] = useState(true)
  const [hasError, setError] = useState(false)
  const getUserById = useStoreActions(actions => actions.user.getUserById)
  const editUser = useStoreActions(actions => actions.user.editUser)
  const user = useStoreState(state => state.user.user)
  const error = useStoreState(state => state.user.error)
  
  useEffect(() => {
    Object.values(user).length === 0 && getUserById(match.params.user_id)
    if (user && user.name) {
      setLoading(false)
    }
  
  }, [user, getUserById])

  const onSubmit = (data) => {
    const formatted = {
      id: user.id,
      type: user.type,
      ...data
    }
    editUser(formatted)
  }

  return (
    <section className="container">
    <Typography variant="h2" style={{textAlign: 'center', fontWeight: 'bold'}}>Editar Usuário</Typography>

    {isLoading ? <img src={loading} /> :
        hasError ? 
        <Alert severity="warning">Erro ao localizar o usuário</Alert> :
        (<StyledForm onSubmit={handleSubmit(onSubmit)}>
        <TextField
          name="name"
          fullWidth
          error={errors.name && errors.name.message}
          helperText={errors.name && errors.name.message}
          inputRef={register({
            required: 'Esse campo é obrigatório'
          })}
          defaultValue={user.name}
          label="Nome do Usuário"
          variant="filled"
        />
        <TextField
          name="phone"
          fullWidth
          defaultValue={user.phone}
          error={errors.phone && errors.phone.message}
          helperText={errors.phone && errors.phone.message}
          inputRef={register({
            required: 'Esse campo é obrigatório'
          })}
          label="Telefone"
          variant="filled"
        />
        <TextField
          name="email"
          fullWidth
          defaultValue={user.email}
          error={errors.email && errors.email.message}
          helperText={errors.email && errors.email.message}
          inputRef={register({
            required: 'Esse campo é obrigatório'
          })}
          label="E-mail"
          variant="filled"
        />

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Select 
              name="self_declaration"
              value={user.self_declaration}
              error={errors.self_declaration && errors.self_declaration.message}
              helperText={errors.self_declaration && errors.self_declaration.message}
              inputRef={register({
                required: 'Esse campo é obrigatório'
              })}
              options={selfDeclaration}
              register={register}
              label="Auto-declaração"
            />
          </Grid>

          <Grid item xs={6}>
            <Select 
              name="gender"
              options={gender}
              value={user.gender}
              error={errors.gender && errors.gender.message}
              helperText={errors.gender && errors.gender.message}
              inputRef={register({
                required: 'Esse campo é obrigatório'
              })}
              register={register}
              label="Gênero"
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained">Confirmar</Button>
      </StyledForm>)
      }
    </section>
  )
  
}

export default EditUser