import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useStoreActions, useStoreState } from 'easy-peasy'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '../../../comps/Button'
import Select from '../../../comps/Select'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { Error } from '../../../components/Status'
import { emailValidation } from '../../../utils/service'
import { Container } from '@material-ui/core'
import Titulo from '../../../components/Titulo'
import Erro from '../../../components/erro'
import Carregando from '../../../components/loading/carregando'

const CriarAdmPagina = () => {
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState(null)

  const { register, handleSubmit, errors, getValues, reset } = useForm()
  const registerUser = useStoreActions(actions => actions.register.registerUser)
  const [modalStatus, setModalStatus] = useState(false)
  const registerError = useStoreState(state => state.register.error)


  const onSubmit = (data) => {
    setCarregando(true);

    const formatted = {
      ...data,
      confirm_password: data.confirmPassword,
      type: "admin"
    }

    setTimeout(() => {
      registerUser(formatted);
    }, 1000)
  }

  useEffect(() => {
    if (registerError && registerError.user) {
      setCarregando(false);
      setErro(registerError.user);
    }

  }, [registerError, localStorage]);




  return (
    <div className="pageRender">
      { erro !== null ? (
        <Erro erro={erro} />
      ) : (
          <div>
            { carregando == true ? (
              <Carregando />
            ) : (
                <Container center="true" maxWidth="md">
                  <Titulo> Criar nova conta de administrador </Titulo>

                  <form className="form-sem-espaco" width="auto" onSubmit={handleSubmit(onSubmit)}>

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
                      label="Endereço de e-mail do adm"
                      variant="filled"
                    />
                    <br /><br />

                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField
                          name="password"
                          fullWidth
                          type="password"
                          error={errors.password && errors.password.message}
                          helperText={errors.password && errors.password.message}
                          inputRef={register({
                            required: 'Insira uma senha para o adm',
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
                          label="Confirme sua senha do adm"
                          variant="filled"
                        />
                      </Grid>
                    </Grid>
                    <br />

                    <TextField
                      name="name"
                      fullWidth
                      error={errors.name && errors.name.message}
                      helperText={errors.name && errors.name.message}
                      inputRef={register({
                        required: 'Esse campo é obrigatório'
                      })}
                      label="Nome do adm"
                      variant="filled"
                    />
                    <br /><br />

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
          </div>
        )
      }
    </div>
  )


}

export default CriarAdmPagina