import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useStoreActions, useStoreState } from 'easy-peasy'
import Alert from '@material-ui/lab/Alert'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import states from '../../assets/states.json'
import cities from '../../assets/cities.json'
import { formations, separated_functions, cnpj_type, identitySegments } from '../Signup/dicioFields'
import { dateToString, parseDate, normalizeArrayData } from '../../utils/formatter'
import Checkbox from '../../comps/Checkbox'
import Switch from '../../comps/Switch'
import Select from '../../comps/Select'
import Text from '../../comps/Text'
import ChipOptions from '../../comps/ChipOptions'
import loading from '../../assets/loading.svg'
import { StyledForm } from './style'
import Titulo from '../../components/Titulo'
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import Erro from '../../components/erro'
import Carregando from '../../components/loading/carregando'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Button, Card, CardActions, CardHeader, CardMedia, IconButton } from '@material-ui/core'
import ApiPhoto from '../../api/userPhoto'
import config from '../../config'
import DeleteIcon from '@material-ui/icons/Delete';

const EditProfessional = ({ match }) => {
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  const { register, handleSubmit, errors } = useForm()
  const [numCols, setCols] = useState(4)
  const [hasIdentity, toggleIdentity] = useState(false)
  const getProfessionalById = useStoreActions(actions => actions.professional.getProfessionalById)
  const editProfessional = useStoreActions(actions => actions.professional.editProfessional)
  const professional = useStoreState(state => state.professional.professional)
  const error = useStoreState(state => state.professional.error)
  const user = useStoreState(state => state.user.user)
  const userType = useStoreState(state => state.auth.auth.user)
  const getUser = useStoreActions(actions => actions.user.getUser)
  const [cnpjState, setCnpjState] = useState(false);
  const [userPhotos, setUserPhotos] = useState(true)
  const stateList = list => list.map(uf => ({ value: uf.id, name: uf.name }))

  useEffect(() => {
    if ((String(userType.type) !== 'undefined') && (!user._id)) {
      getUser(userType.type);
    }

    if ((user._id) && (String(professional) == 'undefined')) {
      getProfessionalById(user._id);
    }

    if ((String(userPhotos) !== 'undefined') && (String(professional) !== 'undefined')) {
      setCarregando(false);

      if (professional.cnpj == true) {
        setCnpjState(true);
      }
    } else {
      ApiPhoto.prototype.getAll({ _user: user.id }).then((response) => {
        for (let index = 0; index < response.resposta.length; index++) {
          response.resposta[index].createdAt = new Date(response.resposta[index].createdAt).toLocaleDateString();
        }
        setUserPhotos(response)
      });
    }

    professional && professional.identity_content ? toggleIdentity(true) : toggleIdentity(false)
  }, [user, userType, getUser, professional, getProfessionalById, setCarregando, setErro]);

  const deletarFoto = (id) => {
    ApiPhoto.prototype.deleteById(id);
    window.location.href = "/carregando?redirect=/perfil/editar/profissional#galeria-trabalhos";
  }

  const onSubmit = (data) => {
    const formatted = {
      ...data,
      id: professional.id,
      birthday: parseDate(data.birthday),
      expertise_areas: normalizeArrayData(data.expertise_areas),
      identity_segments: normalizeArrayData(data.identity_segments),
      type: 'professional'
    }

    editProfessional(formatted)
  }

  const hideOptionCNPJ = check => {
    check ? setCnpjState(true) : setCnpjState(false);
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
                  <Titulo> Editar perfil profissional </Titulo>

                  <StyledForm onSubmit={handleSubmit(onSubmit)} >
                    <TextField
                      name="birthday"
                      label="Data de Nascimento"
                      type="date"
                      fullWidth
                      defaultValue={dateToString(professional.birthday)}
                      variant="filled"
                      inputRef={register({
                        required: 'Esse campo é obrigatório'
                      })}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />

                    <Grid item xs={12}>
                      <Select
                        name="state"
                        value={professional.state}
                        error={errors.state && errors.state.message}
                        helperText={errors.state && errors.state.message}
                        inputRef={register({
                          required: 'Esse campo é obrigatório'
                        })}
                        options={stateList(states)}
                        register={register}
                        label="Estado"
                      />
                    </Grid>

                    <TextField
                      name="address"
                      fullWidth
                      defaultValue={professional.address}
                      error={errors.address && errors.address.message}
                      helperText={errors.address && errors.address.message}
                      inputRef={register({
                        required: 'Esse campo é obrigatório'
                      })}
                      label="Endereço"
                      variant="filled"
                    />


                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Select
                          name="home_state"
                          value={professional.home_state}
                          error={errors.home_state && errors.home_state.message}
                          helperText={errors.home_state && errors.home_state.message}
                          inputRef={register({
                            required: 'Esse campo é obrigatório'
                          })}
                          options={stateList(states)}
                          register={register}
                          label="Estado de residência"
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <Autocomplete
                          fullWidth
                          freeSolo
                          defaultValue={professional.city}
                          options={cities.map(city => city.name).sort()}
                          renderInput={params => (
                            <TextField
                              {...params}
                              name="city"
                              inputRef={register({
                                required: 'Esse campo é obrigatório'
                              })}
                              color="primary"
                              label="Cidade"
                              variant="filled"
                              placeholder="Busque a cidade"
                              error={errors.city && errors.city.message}
                              helperText={errors.city && errors.city.message}
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item md={4} xs={6}>
                        <Select
                          name="education"
                          value={professional.education}
                          error={errors.education && errors.education.message}
                          helperText={errors.education && errors.education.message}
                          inputRef={register({
                            required: 'Esse campo é obrigatório'
                          })}
                          options={formations}
                          register={register}
                          label="Nível de escolaridade"
                        />
                      </Grid>
                      <Grid item md={4} xs={6}>
                        <TextField
                          name="formation_institution"
                          fullWidth
                          defaultValue={professional.formation_institution}
                          error={errors.formation_institution && errors.formation_institution.message}
                          helperText={errors.formation_institution && errors.formation_institution.message}
                          inputRef={register}
                          label="Instituição ou processo de formação"
                          variant="filled"
                        />
                      </Grid>
                      <Grid item md={4} xs={6}>
                        <TextField
                          required
                          name="ano_formacao"
                          fullWidth
                          defaultValue={professional.ano_formacao}
                          error={errors.ano_formacao && errors.ano_formacao.message}
                          helperText={errors.ano_formacao && errors.ano_formacao.message}
                          inputRef={register}
                          label="Ano de formação"
                          variant="filled"
                          type="number"
                          min="1800"
                          max="2200"
                        />
                      </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                      <Grid item xs={numCols}>
                        <Switch
                          name="pcd"
                          label="PcD (Pessoas com deficiência)"
                          value={professional.pcd}
                          register={register}
                        />
                      </Grid>
                      <Grid item xs={numCols}>
                        <Switch
                          name="apan_associate"
                          label="Associado APAN"
                          value={professional.apan_associate}
                          register={register}
                        />
                      </Grid>
                      <Grid item xs={numCols}>
                        <Switch
                          name="cnpj"
                          label="Tem CNPJ"
                          error={errors.cnpj_type && errors.cnpj_type.message}
                          onChange={(e) => hideOptionCNPJ(e.target.checked)}
                          value={professional.cnpj}
                          register={register}
                        />
                      </Grid>
                      {cnpjState === true &&
                        <>
                          <Grid item xs={6}>
                            <Select
                              name="cnpj_type"
                              value={professional.cnpj_type}
                              error={errors.cnpj_type && errors.cnpj_type.message}
                              helperText={errors.cnpj_type && errors.cnpj_type.message}
                              options={cnpj_type}
                              register={register}
                              label="Tipo de CNPJ"
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              name="cnpj_number"
                              fullWidth
                              value={professional.cnpj_number}
                              error={errors.cnpj_number && errors.cnpj_number.message}
                              helperText={errors.cnpj_number && errors.cnpj_number.message}
                              inputRef={register}
                              label="Digite o numero do seu CNPJ"
                              variant="filled"
                            />
                          </Grid>
                        </>
                      }

                    </Grid>
                    <Grid item xs={12}>
                      <ChipOptions
                        name="links"
                        value={typeof professional.links === 'string' ?
                          professional.links.toLowerCase().split(',') :
                          professional.links
                        }
                        label="Link para sites, portfólios e redes sociais"
                        error={errors.links && errors.links.message}
                        register={register({
                          required: 'Esse campo é obrigatório',
                          minLength: {
                            value: 10,
                            message: 'Insira pelo menos um link'
                          }
                        })}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Text>Áreas de atuação</Text>
                      {
                        separated_functions.map(check => (
                          <>
                            <Checkbox
                              name="expertise_areas"
                              label={check.title}
                              options={check.list.sort()}
                              value={professional.expertise_areas}
                              register={register}
                            />
                          </>
                        ))
                      }
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="bio"
                        fullWidth
                        multiline
                        rows="5"
                        defaultValue={professional.bio}
                        error={errors.bio && errors.bio.message}
                        helperText={errors.bio && errors.bio.message}
                        inputRef={register({
                          required: 'Esse campo é obrigatório'
                        })}
                        label="Bio"
                        variant="filled"
                      />
                    </Grid>
                    <center>
                      <br />
                      <Button type="submit" variant="contained" color="primary">Confirmar</Button>
                      <br /><br /><br />
                    </center>
                  </StyledForm>


                  <br /><br />
                  <center id="galeria-trabalhos">
                    <Titulo> Galeria de trabalhos: </Titulo>
                    <br />
                    <form
                      id='uploadForm'
                      action='/api/userPhotos/upload'
                      method='post'
                      encType="multipart/form-data">
                      <input type="hidden" name="_user" id="_user" defaultValue={user.id}></input>
                      <input type="hidden" name="_userProfessional" id="_userProfessional" defaultValue={user._id}></input>
                      <label htmlFor="arquivo">
                        <Button variant="contained" component="label" className="btn-transparente">
                          <CloudUploadIcon /> Subir nova foto de trabalho
                          <input type="file" name="arquivo" id="arquivo" accept="image/x-png,image/gif,image/jpeg" onChange={() => { document.getElementById('uploadForm').submit(); }} style={{ display: "none" }} />
                        </Button>
                      </label>
                    </form>
                    <br /><br /><br />
                    <Grid container spacing={1}>
                      {
                        userPhotos?.resposta?.map((foto) => (
                          <Grid item xs={12} md={3}>
                            <Card className="card">
                              <CardHeader
                                subheader={foto.createdAt}
                                action={
                                  <IconButton onClick={() => { deletarFoto(foto._id) }} aria-label="Deletar" title="Deletar Foto">
                                    <DeleteIcon />
                                  </IconButton>
                                }
                              />
                              <img className="item-galeria" src={config.pastaFotoUser + foto.arquivo} />
                            </Card>
                          </Grid>
                        ))
                      }
                    </Grid>
                  </center>

                  <br /><br />
                  <center>
                    <Titulo> Atalhos para editar outros perfis: </Titulo>
                    <br />

                    <Link to="/perfil/editar/usuario" style={{ padding: "10px" }}>
                      <Button variant="contained" color="primary"><EditIcon /> Editar perfil de usuário</Button>
                    </Link>

                    <br remove-pc="true" /><br remove-pc="true" />

                    {
                      userType.type === "enterprise" ? (
                        <Link to="/perfil/editar/empresa" style={{ padding: "10px" }}>
                          <Button variant="contained" color="primary"><EditIcon /> Editar perfil da empresa</Button>
                        </Link>
                      ) : (<></>)
                    }
                  </center>
                  <br /><br />
                </Container>
              )
            }
          </div>
        )
      }
    </div>
  )


}

export default EditProfessional
