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

const Reset = ({ match }) => {
    const { register, handleSubmit, errors } = useForm()
    const [modalStatus, setModalStatus] = useState(false)
    const [modalMsg, setModalMsg] = useState('')
    const authUser = useStoreActions(actions => actions.auth.resetPwd)
    const auth = useStoreState(state => state.auth.forgot)
    const loginError = useStoreState(state => state.auth.error)

    const onSubmit = (data) => {
        data.token = match.params.token;

        authUser(data)
    }

    // const urlParts = window.location.href.split('/')
    console.log(match.params.token)

    useEffect(() => {
        if (auth) {
            setModalMsg(auth.resp.data)
            setModalStatus(true)
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
                    <center><Title>Redefinir senha </Title></center>

                    <FormControl fullWidth variant="filled">
                        <InputLabel htmlFor="filled-adornment-password">Senha</InputLabel>
                        <FilledInput
                            type="password"
                            name="password"
                            error={errors.password !== undefined}
                            inputRef={register({
                                required: 'Esse campo é obrigatório',
                                minLength: {
                                    value: 6,
                                    message: 'A senha deve ter no mínimo 6 caracteres'
                                }
                            })}
                            endAdornment={
                                <InputAdornment position="end">
                                    <Senha color="primary" />
                                </InputAdornment>
                            }
                        />
                        {errors.password && (<FormHelperText error>{errors.password.message}</FormHelperText>)}
                    </FormControl>

                    <FormControl fullWidth variant="filled">
                        <InputLabel htmlFor="filled-adornment-password">Confirme a senha</InputLabel>
                        <FilledInput
                            type="password"
                            name="confirmedPassword"
                            error={errors.confirmedPassword !== undefined}
                            inputRef={register({
                                required: 'Esse campo é obrigatório',
                                minLength: {
                                    value: 6,
                                    message: 'A senha deve ter no mínimo 6 caracteres'
                                }
                            })}
                            endAdornment={
                                <InputAdornment position="end">
                                    <Senha color="primary" />
                                </InputAdornment>
                            }
                        />
                        {errors.password && (<FormHelperText error>{errors.confirmedPassword.message}</FormHelperText>)}
                    </FormControl>

                    <center>
                        <Link to="/">
                            <Button>
                                LOGIN
                        </Button>
                        </Link>
                        <Button variant="contained" type="submit">
                            Definir Senha
                    </Button>
                    </center>
                </form>
            </Grid>
            <Snackbar open={modalStatus} autoHideDuration={3000} onClose={() => setModalStatus(false)}>
                <Alert elevation={6} variant="filled" onClose={() => setModalStatus(false)} severity="success">
                    {modalMsg}
                </Alert>
            </Snackbar>
        </Container>
    )
}

export default Reset
