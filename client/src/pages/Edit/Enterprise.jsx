import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useStoreActions, useStoreState } from 'easy-peasy'
import Alert from '@material-ui/lab/Alert'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import states from '../../assets/states.json'
import cities from '../../assets/cities.json'
import {
  actions,
  segment,
  identitySegments,
  cnpj_type,
  functions
} from '../Signup/dicioFields'
import { dateToString, parseDate, normalizeArrayData } from '../../utils/formatter'
import Checkbox from '../../comps/Checkbox'
import Switch from '../../comps/Switch'
import Select from '../../comps/Select'
import ChipOptions from '../../comps/ChipOptions'
import loading from '../../assets/loading.svg'
import { StyledForm } from './style'
import { Button, Container } from '@material-ui/core'
import { Title } from '../Signup/styles'
import Titulo from '../../components/Titulo'
import Carregando from '../../components/loading/carregando'
import Erro from '../../components/erro'
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import config from '../../config'

const EditEnterprise = ({ match }) => {
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  const { register, handleSubmit, errors } = useForm()
  const [citiesFromStates, setCities] = useState([])
  const [hasIdentity, toggleIdentity] = useState(false)
  const getEnterpriseById = useStoreActions(actions => actions.enterprise.getEnterpriseById)
  const editEnterprise = useStoreActions(actions => actions.enterprise.editEnterprise)

  const enterprise = useStoreState(state => state.enterprise.enterprises)
  const [filteredStates, setStates] = useState(states.map(uf => uf.name))
  const error = useStoreState(state => state.enterprise.error)


  const user = useStoreState(state => state.user.user)
  const userType = useStoreState(state => state.auth.auth.user)
  const getUser = useStoreActions(actions => actions.user.getUser)


  useEffect(() => {
    if ((String(userType.type) !== 'undefined') && (!user.enterprise_id)) {
      getUser(userType.type);
    }

    if ((user.enterprise_id) && (String(enterprise) == '')) {
      getEnterpriseById(user.enterprise_id);
    }

    if (!String(enterprise) == '') {
      setCarregando(false);
    }

    enterprise && enterprise.identity_content ? toggleIdentity(true) : toggleIdentity(false)
  }, [enterprise, getEnterpriseById, user, userType, getUser, setCarregando])


  const onSubmit = (data) => {
    const formatted = {
      ...data,
      type: 'enterprise',
      id: enterprise.id,
      links: data.links.split(','),
      foundation_date: parseDate(data.foundation_date),
      other_states: normalizeArrayData(data.other_states),
      business_segments: normalizeArrayData(data.business_segments),
      business_fields: normalizeArrayData(data.business_fields),
      diversity_functions: normalizeArrayData(data.diversity_functions),
      identity_segments: normalizeArrayData(data.identity_segments)
    }
    // console.log('data =>', formatted)
    editEnterprise(formatted)
  }



  const handleCities = state => {
    const filteredCities = cities.filter(city => city.state_id == state)
    const filteredStates = states.filter(uf => uf.id != state).map(uf => uf.name)
    setCities(filteredCities)
    setStates(filteredStates)
  }

  const stateList = list => list.map(uf => ({ value: uf.id, name: uf.name }))





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
                  <Titulo> Editar perfil da empresa </Titulo>


                  <center className="editarLogotipo">
                    {
                      user.logotipo ?
                        <img src={config.pastaLogotipo + user.logotipo} width="100px" className="foto-perfil" />
                        :
                        <img src={config.pastaLogotipo + "SemLogo.png"} width="100px" className="foto-perfil" />
                    }
                    <br /><br />
                    <form
                      id='uploadForm'
                      action='/api/enterprise/upload/logotipo'
                      method='post'
                      encType="multipart/form-data">
                      <input type="hidden" name="_id" id="_id" defaultValue={enterprise.id}></input>
                      <label htmlFor="arquivo">
                        <Button variant="contained" component="label" className="btn-transparente">
                          <CloudUploadIcon /> Mudar logo
                          <input type="file" name="arquivo" id="arquivo" accept="image/*" onChange={() => { document.getElementById('uploadForm').submit(); }} style={{ display: "none" }} />
                        </Button>
                      </label>
                    </form>
                    <br /><br /><br />
                  </center>


                  <StyledForm onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                      name="enterprise_name"
                      fullWidth
                      defaultValue={enterprise.enterprise_name}
                      error={errors.enterprise_name && errors.enterprise_name.message}
                      helperText={errors.enterprise_name && errors.enterprise_name.message}
                      inputRef={register({
                        required: 'Esse campo é obrigatório'
                      })}
                      label="Nome da Empresa"
                      variant="filled"
                    />

                    <TextField
                      name="foundation_date"
                      label="Data de Fundação"
                      type="date"
                      fullWidth
                      defaultValue={dateToString(enterprise.foundation_date)}
                      variant="filled"
                      error={errors.foundation_date && errors.foundation_date.message}
                      helperText={errors.foundation_date && errors.foundation_date.message}
                      inputRef={register({
                        required: 'Esse campo é obrigatório'
                      })}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />


                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Select
                          name="state"
                          value={enterprise.state}
                          error={errors.state && errors.state.message}
                          helperText={errors.state && errors.state.message}
                          onChange={(e) => handleCities(e)}
                          options={stateList(states)}
                          register={register({
                            required: 'Esse campo é obrigatório'
                          })}
                          label="Estado"
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <Autocomplete
                          fullWidth
                          freeSolo
                          disabled={citiesFromStates.length === 0}
                          defaultValue={enterprise.city}
                          options={citiesFromStates.map(city => city.name).sort()}
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

                    <Grid item xs={12}>
                      <Checkbox
                        name="other_states"
                        label="Outros estados onde a empresa tem atuação"
                        options={filteredStates}
                        error={errors.other_states && errors.other_states.message}
                        value={enterprise.other_states && enterprise.other_states[0]}
                        register={register}
                      />
                    </Grid>

                    <Grid container spacing={2}>
                      <Grid item xs={5}>
                        <Switch
                          name="apan_associate"
                          label="Associado APAN"
                          value={enterprise.apan_associate}
                          register={register}
                        />
                      </Grid>
                      <Grid item xs={7}>
                        <Select
                          name="cnpj_type"
                          value={enterprise.cnpj_type}
                          error={errors.cnpj_type && errors.cnpj_type.message}
                          helperText={errors.cnpj_type && errors.cnpj_type.message}
                          options={cnpj_type}
                          register={register({
                            required: 'Esse campo é obrigatório'
                          })}
                          label="Tipo de CNPJ"
                        />
                      </Grid>
                    </Grid>

                    <Grid item xs={12}>
                      <Checkbox
                        value={enterprise.busines_segments && enterprise.busines_segments}
                        label="Segmento de atuação"
                        register={register}
                        options={segment}
                        name="business_segments"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Checkbox
                        label="Campos de atuação"
                        register={register}
                        options={actions}
                        name="business_fields"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Checkbox
                        label="Funções que busca diversificar na empresa"
                        value={enterprise.diversity_functions && enterprise.diversity_functions}
                        register={register}
                        options={functions}
                        name="diversity_functions"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Switch
                        name="identity_content"
                        label="Empresa voltada para conteúdo identitário?"
                        onChange={(e) => toggleIdentity(e.target.checked)}
                        value={enterprise.identity_content}
                        register={register}
                      />
                    </Grid>
                    {hasIdentity && <Grid item xs={12}>
                      <Checkbox
                        name="identity_segments"
                        label="Segmentos identitários"
                        options={identitySegments}
                        value={enterprise.identity_segments && enterprise.identity_segments}
                        register={register}
                      />
                    </Grid>}

                    <Grid item xs={12}>
                      <ChipOptions
                        name="links"
                        value={typeof enterprise.links === 'string' ?
                          enterprise.links.toLowerCase().split(',') :
                          enterprise.links
                        }
                        label="Links para site e redes sociais da empresa"
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
                      <TextField
                        name="presentation"
                        fullWidth
                        multiline
                        rows="5"
                        defaultValue={enterprise.presentation}
                        error={errors.presentation && errors.presentation.message}
                        helperText={errors.presentation && errors.presentation.message}
                        inputRef={register({
                          required: 'Esse campo é obrigatório'
                        })}
                        label="Descrição da Empresa"
                        variant="filled"
                      />
                    </Grid>
                    <center>
                      <br />
                      <Button type="submit" variant="contained" color="primary">Confirmar</Button>
                    </center>
                  </StyledForm>
                  <br /><br />

                  <br /><br />
                  <center>
                    <Titulo> Atalhos para editar outros perfis: </Titulo>
                    <br />

                    <Link to="/perfil/editar/usuario" style={{ padding: "10px" }}>
                      <Button variant="contained" color="primary"><EditIcon /> Editar perfil de usuário</Button>
                    </Link>

                    <br remove-pc="true" /><br remove-pc="true" />

                    {
                      userType.type === "professional" ? (
                        <Link to="/perfil/editar/profissional" style={{ padding: "10px" }}>
                          <Button variant="contained" color="primary"><EditIcon /> Editar perfil do profissional</Button>
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

export default EditEnterprise