import { Container } from "@material-ui/core";
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useStoreActions, useStoreState } from 'easy-peasy'
import Alert from '@material-ui/lab/Alert'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Delete from '@material-ui/icons/Delete';

import {
  color as selfDeclaration,
  gender,
} from '../Signup/dicioFields'
import NewModal from '../../comps/Modal'
import Select from '../../comps/Select'
import Button from '../../comps/Button'
import loading from '../../assets/loading.svg'
import { StyledForm } from './style'
import { Title } from "../Signup/styles";
import Titulo from "../../components/Titulo";
import Erro from "../../components/erro";
import Carregando from "../../components/loading/carregando";

const EditUser = ({ match }) => {
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  const { register, handleSubmit, errors, getValues, setValue } = useForm()
  const [modalStatus, setModalStatus] = useState(false)
  const editUser = useStoreActions(actions => actions.user.editUser)
  const deleteUser = useStoreActions(actions => actions.user.deleteUser)
  const user = useStoreState(state => state.user.user)
  const userType = useStoreState(state => state.auth.auth.user)
  const getUser = useStoreActions(actions => actions.user.getUser)

  useEffect(() => {
    if ((String(userType.type) !== 'undefined') && (!user.id)) {
      getUser(userType.type)
    }

    if (String(user.name) !== 'undefined') {
      setCarregando(false);
    }
  })


  const onSubmit = (data) => {
    const formatted = {
      id: user.id,
      type: user.type,
      ...data
    }
    editUser(formatted)
  }


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
                  <Titulo> Editar perfil de usuário </Titulo>

                  <StyledForm onSubmit={handleSubmit(onSubmit)}>
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

                    <Grid container spacing={2}>
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

                    <center>
                      <br />
                      <Button type="submit" variant="contained">Confirmar</Button>
                    </center>

                  </StyledForm>

                  <br /><br /><br /><br /><br /><br /><br /><br />
                  <center>
                    <Typography variant="h4">Zona de alerta</Typography>
                    <hr />
                    <br />
                    <Button variant="contained" color="secondary" onClick={() => setModalStatus(true)} >
                      <Delete /> Deletar Perfil
                    </Button>
                    <br /><br /><br /><br />
                  </center>

                  <NewModal
                    isOpen={modalStatus}
                    onClose={() => setModalStatus(false)}
                    title="Deseja realmente excluir sua conta?"
                  >
                    <Button onClick={() => deleteUser(user.id)} color="primary"><Delete />Excluir</Button>
                  </NewModal>

                </Container>
              )
            }
          </div>
        )
      }
    </div>
  )

}

export default EditUser
