import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import { useStoreActions, useStoreState } from 'easy-peasy'

import Email from '@material-ui/icons/Mail'
import Senha from '@material-ui/icons/Lock'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import FilledInput from '@material-ui/core/FilledInput'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormHelperText from '@material-ui/core/FormHelperText'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import { Error } from '../../components/Status'
import Button from '../../comps/Button'
import Title from '../../comps/Title'

import {
  Background
} from './style'
import { emailValidation } from '../../utils/service'
import history from '../../history'
import ApiMercadoPago from '../../models/mercadopago'

const Invoice = () => {
  const { register, handleSubmit, errors } = useForm()
  const [modalStatus, setModalStatus] = useState(false)
  const [modalMsg, setModalMsg] = useState('')
  const authUser = useStoreActions(actions => actions.auth.authUser)
  const auth = useStoreState(state => state.auth.auth)
  const loginError = useStoreState(state => state.auth.error)
  const onSubmit = (data) => authUser(data)

  useEffect(() => {
    if (auth) {
      const { user: { type = '' }, isAuthenticated } = auth
      // if (isAuthenticated) return history.push(`/dashboard/${type}`)
    }

    if(loginError && loginError.message){
      setModalMsg(loginError.message)
      setModalStatus(true)
    }
  }, [auth, loginError])

  return (
    <Container
      center="true"
      style={{
        height: 'calc(100vh - 107px)',
        display: 'flex',
        alignItems: 'center'}}
        >
        <Grid container alignItems="stretch" justify="space-between">
          <form style={{width: '100%'}} onSubmit={handleSubmit(onSubmit)}>
            <Title>
              Criando uma fatura
            </Title>
            <Typography variant="subtitle1" color="initial">Valor de R$ 10,00</Typography>

          <Button variant="contained" type="submit" onClick={()=>{ApiMercadoPago.prototype.createInvoice()}}>
            Pagar com o Mercado Pago
          </Button>
          </form>
        </Grid>
        <Snackbar open={modalStatus} autoHideDuration={3000} onClose={() => setModalStatus(false)}>
          <Alert elevation={6} variant="filled" onClose={() => setModalStatus(false)} severity="error">
            {modalMsg}
          </Alert>
        </Snackbar>
    </Container>
  )
}

export default Invoice
