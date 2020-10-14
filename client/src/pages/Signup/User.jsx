import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useStoreActions, useStoreState } from 'easy-peasy'
import uuid from 'uuid'

import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '../../comps/Button'
import Select from '../../comps/Select'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { Error } from '../../components/Status'

import { emailValidation } from '../../utils/service'
import {
  gender,
  color
} from './dicioFields'

import { Form, Background, WrapButton, Title } from './styles'
import { Container } from '@material-ui/core'
import Titulo from '../../components/Titulo'

const Users = () => {
  const { register, handleSubmit, errors, getValues, reset } = useForm()

  const registerUser = useStoreActions(actions => actions.register.registerUser)
  const [modalStatus, setModalStatus] = useState(false)
  const registerError = useStoreState(state => state.register.error)
  const labelName = localStorage.user_type === 'enterprise' ? 'Nome do Responsável' : 'Nome'
  const onSubmit = (data) => {
    console.log(data);
    const formatted = {
      ...data,
      confirm_password: data.confirmPassword,
      self_declaration: data.selfDeclaration,
      type: localStorage.user_type
    }

    reset()
    setModalStatus(true)
    setTimeout(() => {
      registerUser(formatted)
    }, 3000)
  }

  useEffect(() => {
    if (typeof localStorage.user_type === 'undefined') return setModalStatus(true)
  }, []);

  return (
    <Container center="true" maxWidth="md" >
      <form className="form-sem-espaco" width="auto" onSubmit={handleSubmit(onSubmit)}>
        <Titulo> Formulário de inscrição do Usuário </Titulo>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="email"
              fullWidth
              error={errors.email && errors.email.message}
              helperText={errors.email && errors.email.message}
              inputRef={register({
                required: 'Esse campo é obrigatório',
                pattern: {
                  value: emailValidation(),
                  message: 'Insira um endereço de e-mail válido'
                }
              })}
              label="Endereço de e-mail"
              variant="filled"
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              name="password"
              fullWidth
              type="password"
              error={errors.password && errors.password.message}
              helperText={errors.password && errors.password.message}
              inputRef={register({
                required: 'Insira uma senha',
              })}
              label="Senha"
              variant="filled"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="confirmPassword"
              fullWidth
              type="password"
              error={errors.confirmPassword && errors.confirmPassword.message}
              helperText={errors.confirmPassword && errors.confirmPassword.message}
              inputRef={register({
                required: 'Confirme sua senha',
                validate: {
                  isMatch: value => value === getValues().password || 'As senhas não combinam, tente novamente',
                },
                minLength: {
                  value: 6,
                  message: 'A senha precisa ter no mínimo 6 caracteres'
                }
              })}
              label="Confirme sua senha"
              variant="filled"
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="name"
              fullWidth
              error={errors.name && errors.name.message}
              helperText={errors.name && errors.name.message}
              inputRef={register({
                required: 'Esse campo é obrigatório'
              })}
              label={labelName}
              variant="filled"
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="phone"
              fullWidth
              error={errors.phone && errors.phone.message}
              helperText={errors.phone && errors.phone.message}
              inputRef={register({
                required: 'Esse campo é obrigatório',
                pattern: {
                  message: 'Insira apenas números'
                },
                maxLength: {
                  value: 11,
                  message: 'Máximo de onze números'
                }
              })}
              label="Contato Telefonico (DDD + nº)"
              variant="filled"
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Select
              name="gender"
              error={errors.gender && errors.gender.message}
              helperText={errors.gender && errors.gender.message}
              inputRef={register({
                required: 'Esse campo é obrigatório'
              })}
              options={gender}
              register={register}
              label="Gênero"
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              name="selfDeclaration"
              error={errors.selfDeclaration && errors.selfDeclaration.message}
              helperText={errors.selfDeclaration && errors.selfDeclaration.message}
              inputRef={register({
                required: 'Esse campo é obrigatório'
              })}
              options={color}
              register={register}
              label="Auto Declaração"
            />
          </Grid>
        </Grid>


        <Error msg={registerError && registerError.user} />

        <center>
          <br />
          <Button type="submit" variant="contained" color="primary">Enviar</Button>
        </center>

      </form>

      <Snackbar open={modalStatus} autoHideDuration={3000} onClose={() => setModalStatus(false)}>
        <Alert elevation={6} variant="filled" onClose={() => setModalStatus(false)} severity="success">
          Usuário cadastrado com sucesso!
          </Alert>
      </Snackbar>
    </Container>
  )
}

export default Users