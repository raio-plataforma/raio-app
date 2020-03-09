import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import { useStoreActions, useStoreState } from 'easy-peasy'
import Email from '@material-ui/icons/Mail'
import Senha from '@material-ui/icons/Lock'
import FormControl from '@material-ui/core/FormControl'
import FilledInput from '@material-ui/core/FilledInput'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormHelperText from '@material-ui/core/FormHelperText'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

import Flexbox from '../../components/Flexbox'
import Form from '../../components/Form'
import { Error } from '../../components/Status'
import Button from '../../comps/Button'

import {
  Background
} from './style'
import { emailValidation } from '../../utils/service'
import history from '../../history'

const Login = () => {
  const { register, handleSubmit, errors } = useForm()
  const authUser = useStoreActions(actions => actions.auth.authUser)
  const auth = useStoreState(state => state.auth.auth)
  const loginError = useStoreState(state => state.auth.error)
  const [showAlert, handleAlert] = React.useState(false);
  const onSubmit = (data) => authUser(data)
  console.log(loginError)

  useEffect(() => {
    if (auth) {
      const { user: { type = '' }, isAuthenticated } = auth
      if (isAuthenticated) return history.push(`/dashboard/${type}`)
    }

    if(loginError && loginError.message)
      handleAlert(true)
  }, [auth, loginError])

  return (
    <Background>
      <Flexbox center>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h4" component="h2" gutterBottom>
            Entre na Raio
          </Typography>
          
          <FormControl fullWidth style={{margin: '10px 0'}} variant="filled">
            <InputLabel htmlFor="filled-adornment-password">E-mail</InputLabel>
            <FilledInput
              type="text"
              name="email"
              error={errors.email}
              inputRef={register({
                required: 'Esse campo é obrigatório',
                pattern: {
                  value: emailValidation(),
                  message: 'Insira um endereço de e-mail válido'
                }
              })}
              endAdornment={
                <InputAdornment position="end">
                    <Email />
                </InputAdornment>
              }
            />
            {errors.email && (<FormHelperText error>{errors.email.message}</FormHelperText>)}
          </FormControl>

          <FormControl fullWidth variant="filled">
            <InputLabel htmlFor="filled-adornment-password">Senha</InputLabel>
            <FilledInput
              type="password"
              name="password"
              error={errors.password}
              inputRef={register({
                required: 'Esse campo é obrigatório',
                minLength: {
                  value: 6,
                  message: 'A senha deve ter no mínimo 6 caracteres'
                }
              })}
              endAdornment={
                <InputAdornment position="end">
                    <Senha />
                </InputAdornment>
              }
            />
            {errors.password && (<FormHelperText error>{errors.password.message}</FormHelperText>)}
          </FormControl>
          

          <Snackbar open={showAlert} autoHideDuration={36000} onClose={() => handleAlert(false)}>
            <Alert 
              variant="filled"
              onClose={() => handleAlert(false)}
              severity="error">
              {loginError && loginError.message}
            </Alert>
          </Snackbar>
          
          <Link to="/esqueci-senha">
            <Button>
                esqueceu sua senha?
            </Button>
          </Link>

          <Button variant="contained" type="submit">
            Entrar
          </Button>
        </Form>
      </Flexbox>
    </Background>
  )
}

export default Login