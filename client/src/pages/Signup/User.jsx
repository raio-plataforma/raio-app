import React, {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {useStoreActions, useStoreState} from 'easy-peasy'
import uuid from 'uuid'

import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '../../comps/Button'
import Select from '../../comps/Select'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {Error} from '../../components/Status'

import {emailValidation} from '../../utils/service'
import {
    gender,
    color
} from './dicioFields'
import history from '../../history'

import {Form, Background, WrapButton} from './styles'

const Users = () => {
    const {register, handleSubmit, errors, getValues, reset} = useForm();

    const registerUser = useStoreActions(actions => actions.register.registerUser);
    const [modalStatus, setModalStatus] = useState(false);
    const registerError = useStoreState(state => state.register.error);
    const registerSuccess = useStoreState(state => state.register.success);
    const labelName = localStorage.user_type === 'enterprise' ? 'Nome do Responsável' : 'Nome';

    console.log(registerSuccess);

    const onSubmit = (data) => {
        const formatted = {
            ...data,
            confirm_password: data.confirmPassword,
            self_declaration: data.selfDeclaration,
            type: localStorage.user_type
        };

        reset();

        registerUser(formatted);
    };

    useEffect(() => {
        console.log('????????????');

    }, []);

    const onSave = () => {
        window.location = '/';
    };

    if(registerSuccess && registerSuccess.user)
    {
        setTimeout(()=>{
            onSave();
        }, 500);
    }

    return (
        <section className="container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Typography
                    color="primary"
                    variant="h3"
                    style={{textAlign: 'center', margin: '30px 0'}}
                    component="h2">Formulário de inscrição do Usuário</Typography>

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


                <Error msg={registerError && registerError.user}/>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Button
                            color="primary"
                            variant="contained"
                            type="submit"
                            styles={{display: 'block', width: '100%'}}
                        >
                            Enviar
                        </Button>
                    </Grid>
                </Grid>

            </form>

            <Snackbar open={registerSuccess && registerSuccess.user} autoHideDuration={3000}
                      onClose={() => setModalStatus(false)}>
                <Alert elevation={6} variant="filled" onClose={() => onSave()} severity="success">
                    Usuário cadastrado com sucesso!
                </Alert>
            </Snackbar>
        </section>
    )
}

export default Users
