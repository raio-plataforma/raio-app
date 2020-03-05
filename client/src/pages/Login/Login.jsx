import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import { useStoreActions, useStoreState } from 'easy-peasy'
import InputText from '../../components/InputText'
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
  const onSubmit = (data) => authUser(data)

  useEffect(() => {
    if (auth) {
      const { user: { type = '' }, isAuthenticated } = auth
      if (isAuthenticated) return history.push(`/dashboard/${type}`)
    }
  }, [auth])

  return (
    <Background>
      <Flexbox center>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h4" component="h2" gutterBottom>
            Entre na Raio
          </Typography>

          <InputText
            type="text"
            name="email"
            label="E-mail"
            placeholder="e-mail"
            icon="fa-envelope"
            error={errors.email && errors.email.message}
            register={register({
              required: 'Esse campo é obrigatório',
              pattern: {
                value: emailValidation(),
                message: 'Insira um endereço de e-mail válido'
              }
            })}
          />

          <InputText
            label="Senha"
            type="password"
            name="password"
            placeholder="senha"
            icon="fa-lock"
            error={errors.password && errors.password.message}
            register={register({
              required: 'Esse campo é obrigatório',
              minLength: {
                value: 6,
                message: 'A senha deve ter no mínimo 6 caracteres'
              }
            })}
          />
          
          <Error msg={loginError} />
          
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