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
  separated_functions,
  cnpj_type,
  identitySegments
} from '../Signup/dicioFields'
import { dateToString, parseDate } from '../../utils/formatter'
import Checkbox from '../../comps/Checkbox'
import Switch from '../../comps/Switch'
import Select from '../../comps/Select'
import Button from '../../comps/Button'
import ChipOptions from '../../comps/ChipOptions'
import loading from '../../assets/loading.svg'
import { StyledForm } from './style'

const EditEnterprise = ({ match }) => {
  const { register, handleSubmit, errors } = useForm()
  const [isLoading, setLoading] = useState(true)
  const [hasError, setError] = useState(false)
  const [numCols, setCols] = useState(3)
  const [hasIdentity, toggleIdentity] = useState(false)
  const getEnterpriseById = useStoreActions(actions => actions.enterprise.getEnterpriseById)
  const editEnterprise = useStoreActions(actions => actions.enterprise.editEnterprise)
 
  const enterprise = useStoreState(state => state.enterprise.enterprises)
  const error = useStoreState(state => state.enterprise.error)

  
  useEffect(() => {
    (!enterprise || Object.values(enterprise).length === 0) && getEnterpriseById(match.params.id)
    if (enterprise && Object.values(enterprise).length > 0) {
      setLoading(false)
    }

    enterprise && enterprise.cnpj ? setCols(3) : setCols(4)
    enterprise && enterprise.identity_content ? toggleIdentity(true) : toggleIdentity(false)
  
  }, [enterprise, getEnterpriseById])

  const onSubmit = (data) => {
    const formatted = {
      ...data,
      type: 'enterprise',
      id: enterprise.id,
      foundation_date: parseDate(data.foundation_date)
    }
    console.log('data =>', formatted)
    // editEnterprise(formatted)
  }

  const hideOptionCNPJ = check => {
    check ? setCols(3) : setCols(4) 
  }      

  const stateList = list => list.map(uf => ({value: uf.id, name: uf.name}))
  
  return (
    <section className="container">
      <Typography variant="h2" style={{textAlign: 'center', fontWeight: 'bold'}}>Editar Profissional</Typography>

      {isLoading ? <img src={loading} /> :
        hasError ? 
        <Alert severity="warning">Erro ao localizar a empresa</Alert> :
        (<StyledForm onSubmit={handleSubmit(onSubmit)}>
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
            inputRef={register({
              required: 'Esse campo é obrigatório'
            })}
            InputLabelProps={{
              shrink: true,
            }}
          />

         
      
        
        
{/*
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Select 
              name="state"
              value={enterprise.state}
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

          <Grid item xs={6}>
            <Autocomplete
              fullWidth
              freeSolo
              defaultValue={enterprise.city}
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
        <Grid item xs={12}>
          <Checkbox
            name="other_states"
            label="Outros Estados"
            options={stateList(states).sort()}
            value={enterprise.other_states}
            register={register}
          />
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Select 
              name="education"
              value={enterprise.education}
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
              defaultValue={enterprise.formation_institution}
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
                value={enterprise.pcd}
                register={register}
              />
            </Grid>
            <Grid item xs={numCols}>
              <Switch
                name="apan_associate"
                label="Associado APAN"
                value={enterprise.apan_associate}
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
                value={enterprise.cnpj}
                register={register({
                  required: 'Esse campo é obrigatório'
                })}
              />
            </Grid>
            {numCols === 3 && 
              <Grid item xs={numCols}>
                <Select 
                  name="cnpj_type"
                  value={enterprise.cnpj_type}
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
            <Typography variant="h5">Áreas de atuação</Typography>
          {
            separated_functions.map(check => (
              <>
              <Checkbox
                name="expertise_areas"
                label={check.title}
                options={check.list.sort()}
                value={enterprise.expertise_areas}
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
            value={enterprise.identity_content}
            register={register}
          />
          </Grid>
          {hasIdentity && <Grid item xs={12}>
            <Checkbox
              name="identity_segments"
              label="Segmentos identitários"
              options={identitySegments}
              value={enterprise.identity_segments[0]}
              register={register}
            />
          </Grid>}*/}
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
            label="Apresentação da empresa"
            variant="filled"
          />
        </Grid> 
          <Button type="submit" variant="contained" color="primary">Confirmar</Button>
        </StyledForm>)
      }
    </section>
  )
  
}

export default EditEnterprise