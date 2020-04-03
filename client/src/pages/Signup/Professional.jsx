import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useStoreActions, useStoreState } from 'easy-peasy'
import Typography from '@material-ui/core/Typography'

import Button from '../../comps/Button'
import Checkbox from '../../comps/Checkbox'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Switch from '../../comps/Switch'
import Select from '../../comps/Select'
import ChipOptions from '../../comps/ChipOptions'

import states from '../../assets/states.json'
import cities from '../../assets/cities.json'

import {
  cnpj_type,
  formations,
  identitySegments,
  separated_functions
} from './dicioFields'
import { formatCheckboxFields } from '../../utils/service'
import { parseDate, normalizeArrayData } from '../../utils/formatter'

import { Form, Background, Title } from './styles'

const Professionals = () => {
  const {
    register,
    handleSubmit,
    errors,
    setValue
  } = useForm()

  const [numCols, setCols] = useState(4)
  const [hasIdentity, toggleIdentity] = useState(false)
  const [citiesFromStates, setCities] = useState([])
  const registerUser = useStoreActions(actions => actions.register.registerProfessional)
  const registerError = useStoreState(state => state.register.error)
  const stateList = list => list.map(uf => ({value: uf.id, name: uf.name}))
  const [filteredStates, setStates] = useState(states.map(uf => uf.name))

  const hideOptionCNPJ = check => {
    check ? setCols(3) : setCols(4) 
  }  
  const handleCities = state => {

    const filteredCities = cities.filter(city => city.state_id == state)
    const filteredStates = states.filter(uf => uf.id != state).map(uf => uf.name)
    setCities(filteredCities)
    setStates(filteredStates)
  }
  const onSubmit = (data) => {
    const formatted = {
      ...data,
      birthday: parseDate(data.birthday),
      expertise_areas: normalizeArrayData(data.expertise_areas),
      identity_segments: normalizeArrayData(data.identity_segments),
      type: 'professional'  
    }
    // console.log('=>', formatted)
    registerUser(formatted)
  }



  // TODO: req hasNoRegister p/ validar se o usuário tem algum registro como profissional ou empresa. Se sim, redireciona para o dashboard, se não, mantém na página.
  return (
    <Background className="container center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="birthday"
              label="Data de Nascimento"
              type="date"
              fullWidth
              variant="filled"
              error={errors.birthday && errors.birthday.message}
              helperText={errors.birthday && errors.birthday.message}
              inputRef={register({
                required: 'Esse campo é obrigatório'
              })}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Select 
            name="home_state"
            error={errors.home_state && errors.home_state.message}
            onChange={(e) => handleCities(e)}
            options={stateList(states)}
            register={register({
              required: 'Esse campo é obrigatório'
            })}
            label="Estado de residência"
          />
        </Grid>
        
        <Grid item xs={6}>
          <Autocomplete
            fullWidth
            freeSolo
            options={citiesFromStates.map(city => city.name).sort()}
            renderInput={params => (
              <TextField
                {...params}
                name="city"
                inputRef={register({
                  required: 'Esse campo é obrigatório'
                })}
                color="primary"
                label="Cidade de residência"
                variant="filled"
                placeholder="Busque a cidade"
                error={errors.city && errors.city.message}
                helperText={errors.city && errors.city.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            name="address"
            fullWidth
            error={errors.address && errors.address.message}
            helperText={errors.address && errors.address.message}
            inputRef={register({
              required: 'Esse campo é obrigatório'
            })}
            label="Endereço de residência"
            variant="filled"
          />
        </Grid>
      </Grid>
      
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Select 
            name="state"
            error={errors.home_state && errors.home_state.message}
            register={register({
              required: 'Esse campo é obrigatório'
            })}
            options={stateList(states)}
            label="Naturalidade"
          />
        </Grid>
      </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Select 
              name="education"
              error={errors.education && errors.education.message}
              register={register({
                required: 'Esse campo é obrigatório'
              })}
              options={formations}
              label="Formação"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="formation_institution"
              fullWidth
              error={errors.formation_institution && errors.formation_institution.message}
              helperText={errors.formation_institution && errors.formation_institution.message}
              inputRef={register}
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
                register={register}
              />
            </Grid>
            <Grid item xs={numCols}>
              <Switch
                name="apan_associate"
                label="Associado APAN"
                register={register}
              />
            </Grid>
            <Grid item xs={numCols}>
              <Switch
                name="cnpj"
                label="Possui CNPJ"
                error={errors.cnpj_type && errors.cnpj_type.message}
                onChange={(e) => hideOptionCNPJ(e.target.checked)}
                register={register}
              />
            </Grid>
            {numCols === 3 && 
              <Grid item xs={numCols}>
                <Select 
                  name="cnpj_type"
                  error={errors.cnpj_type && errors.cnpj_type.message}
                  helperText={errors.cnpj_type && errors.cnpj_type.message}
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
            <Typography variant="h5">Áreas de atuação</Typography>
          {
            separated_functions.map(check => (
              <>
              <Checkbox
                key={check}
                name="expertise_areas"
                label={check.title}
                error={errors.expertiseAreas && errors.expertiseAreas.message}
                options={check.list.sort()}
                register={register}
              />
              </>
            ))
          }
          </Grid>
          <Grid item xs={12}>
          <Switch
            name="identity_content"
            label="Empresa voltada para conteúdo identitário?"
            onChange={(e) => toggleIdentity(e.target.checked)}
            register={register}
          />
          </Grid>
          {hasIdentity && <Grid item xs={12}>
            <Checkbox
              name="identity_segments"
              label="Segmentos identitários"
              options={identitySegments}
              register={register}
            />
          </Grid>}
          <Grid item xs={12}>
          <TextField
            name="bio"
            fullWidth
            multiline
            rows="5"
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
        </form>
    </Background>
  )
}

export default Professionals