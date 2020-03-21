import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useStoreActions, useStoreState } from 'easy-peasy'
import Alert from '@material-ui/lab/Alert'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import states from '../../assets/states.json'
import cities from '../../assets/cities.json'
import {
  formations,
  functions,
  cnpj_type
} from '../Signup/dicioFields'
import { dateToString, parseDate } from '../../utils/formatter'
import Checkbox from '../../comps/Checkbox'
import Switch from '../../comps/Switch'
import Select from '../../comps/Select'
import Button from '../../comps/Button'
import ChipOptions from '../../comps/ChipOptions'
import loading from '../../assets/loading.svg'
import { StyledForm } from './style'

const EditProfessional = ({ match }) => {
  const { register, handleSubmit, errors, getValues, setValue } = useForm()
  const [isLoading, setLoading] = useState(true)
  const [hasError, setError] = useState(false)
  const [numCols, setCols] = useState(3)
  const getProfessionalById = useStoreActions(actions => actions.professional.getProfessionalById)
  // const editUser = useStoreActions(actions => actions.user.editUser)
 
  const professional = useStoreState(state => state.professional.professional)
  const error = useStoreState(state => state.professional.error)
  // getProfessionalById(match.params.id)
  // console.log(match.params.id)
  // console.log(professional)
  
  useEffect(() => {
    (!professional || Object.values(professional).length === 0) && getProfessionalById(match.params.id)
    if (professional && Object.values(professional).length > 0) {
      setLoading(false)
    }

    professional && professional.cnpj ? setCols(3) : setCols(4)
  
  }, [professional, getProfessionalById])

  const onSubmit = (data) => {
    const formatted = {
      ...data,
      type: 'professional',
      id: professional.id,
      birthday: parseDate(data.birthday)
    }
    console.log(parseDate(data.birthday))
    console.log('data =>', formatted)
    // editUser(formatted)
  }

  const hideOptionCNPJ = check => {
    check ? setCols(3) : setCols(4) 
    console.log(check)
  }      

  const stateList = list => list.map(uf => ({value: uf.id, name: uf.name}))
  console.log(numCols)
  return (
    <section className="container">
      <Typography variant="h2" style={{textAlign: 'center', fontWeight: 'bold'}}>Editar Profissional</Typography>

      {isLoading ? <img src={loading} /> :
        hasError ? 
        <Alert severity="warning">Erro ao localizar o usuário</Alert> :
        (<StyledForm onSubmit={handleSubmit(onSubmit)}>
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
          <Grid item xs={6}>
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
              label="Formação"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="formation_institution"
              fullWidth
              defaultValue={professional.formation_institution}
              error={errors.formation_institution && errors.formation_institution.message}
              helperText={errors.formation_institution && errors.formation_institution.message}
              inputRef={register({
                required: 'Esse campo é obrigatório'
              })}
              label="Instituição ou processo de formação"
              variant="filled"
            />
          </Grid>
        </Grid>

          <Grid container spacing={2}>
            <Grid item xs={numCols}>
              <Switch
                name="pcd"
                label="PcD"
                value={professional.pcd}
                register={register}
              />
            </Grid>
            <Grid item xs={numCols}>
              <Switch
                name="apan_associate"
                label="Associado APAN"
                value={professional.apan_associate}
                register={register({
                  required: 'Esse campo é obrigatório'
                })}
              />
            </Grid>
            <Grid item xs={numCols}>
              <Switch
                name="cnpj"
                label="Possui CNPJ"
                error={errors.cnpj_type && errors.cnpj_type.message}
                onChange={(e) => hideOptionCNPJ(e.target.checked)}
                value={professional.cnpj}
                register={register({
                  required: 'Esse campo é obrigatório'
                })}
              />
            </Grid>
            {numCols === 3 && 
              <Grid item xs={numCols}>
                <Select 
                  name="cnpj_type"
                  value={professional.cnpj_type}
                  error={errors.cnpj_type && errors.cnpj_type.message}
                  helperText={errors.cnpj_type && errors.cnpj_type.message}
                  inputRef={register({
                    required: 'Esse campo é obrigatório'
                  })}
                  options={cnpj_type}
                  register={register}
                  label="Tipo de CNPJ"
                />
              </Grid>
            }
            
          </Grid>
          <Grid item xs={12}>
            <ChipOptions 
              name="links"
              value={typeof professional.links === 'string' ?
                professional.links.toLowerCase().split(',') :
                professional.links
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
          <Checkbox
            name="expertise_areas"
            label="Áreas de atuação"
            options={Object.keys(professional.expertise_areas[0])}
            value={professional.expertise_areas[0]}
            register={register}
          />
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
          <Button type="submit" variant="contained" color="primary">Confirmar</Button>
        </StyledForm>)
      }
    </section>
  )
  
}

export default EditProfessional