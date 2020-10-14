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
import Titulo from '../../components/Titulo'

const Forgot = () => {
    const { register, handleSubmit, errors } = useForm()
    const [modalStatus, setModalStatus] = useState(false)
    const [modalMsg, setModalMsg] = useState('')
    const [modalStatusError, setModalStatusError] = useState(false)
    const [modalMsgError, setModalMsgError] = useState('')
    const authUser = useStoreActions(actions => actions.auth.forgotPwd)
    const auth = useStoreState(state => state.auth.forgot)
    const loginError = useStoreState(state => state.auth.error)
    const onSubmit = (data) => authUser(data)

    useEffect(() => {
        if (auth) {
            setModalMsg(auth.resp.data)
            setModalStatus(true)
        }

        if (loginError && loginError.recovery) {
            setModalMsgError(loginError.recovery)
            setModalStatusError(true)
        }

        if (loginError && loginError.message) {
            setModalMsg(loginError.message)
            setModalStatus(true)
        }

    }, [auth, loginError])


    return (
        <Container
            maxWidth="sm"
            center="true"
            style={{
                height: 'calc(100vh - 107px)',
                display: 'flex',
                alignItems: 'center'
            }}
        >
            <Grid container alignItems="stretch" justify="space-between">
                <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
                    <Titulo> Informe seu email </Titulo>

                    <FormControl fullWidth style={{ margin: '10px 0' }} variant="filled">
                        <InputLabel htmlFor="filled-adornment-password">E-mail</InputLabel>
                        <FilledInput
                            type="text"
                            name="email"
                            error={errors.email !== undefined}
                            inputRef={register({
                                required: 'Esse campo é obrigatório',
                                pattern: {
                                    value: emailValidation(),
                                    message: 'Insira um endereço de e-mail válido'
                                }
                            })}
                            endAdornment={
                                <InputAdornment position="end">
                                    <Email color="primary" />
                                </InputAdornment>
                            }
                        />
                        {errors.email && (<FormHelperText error>{errors.email.message}</FormHelperText>)}
                        {onSubmit.recovery && (<FormHelperText error>{onSubmit.recovery}</FormHelperText>)}
                    </FormControl>
                    <center hide={""+modalStatus}>
                        <Button variant="contained" type="submit">
                            Recuperar
                    </Button>
                    </center>
                </form>
            </Grid>
            <Snackbar open={modalStatus}>
                <Alert elevation={6} variant="filled" severity="success">
                    {modalMsg}
                </Alert>
            </Snackbar>
            <Snackbar open={modalStatusError} autoHideDuration={3000} onClose={() => setModalStatusError(false)}>
                <Alert elevation={6} variant="filled" onClose={() => setModalStatusError(false)} severity="error">
                    {modalMsgError}
                </Alert>
            </Snackbar>
        </Container>
    )
}

export default Forgot
