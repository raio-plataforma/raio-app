import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useStoreActions, useStoreState } from 'easy-peasy'
import uuid from 'uuid'

import Typography from '@material-ui/core/Typography'
import Button from '../../comps/Button'
import TextField from '@material-ui/core/TextField';
import ChipOptions from '../../comps/ChipOptions'
import FormHelperText from '@material-ui/core/FormHelperText'

import states from '../../assets/states.json'
import {
  registryTypes,
  formations,
  identitySegments,
  separated_functions
} from './dicioFields'
import Checkboxes from '../../components/Checkboxes'
import Radios from '../../components/Radios'
import Select from '../../components/Select'

import { Background } from './styles'

const Professionals = () => {
  const {
    register,
    handleSubmit,
    errors,
    setValue
  } = useForm()

  const registerUser = useStoreActions(actions => actions.register.registerProfessional)
  const registerError = useStoreState(state => state.register.error)
  
  const parseDate = date => {
    const day = date.substring(8, 10)
    const month = date.substring(5, 7) 
    const year = date.substring(0, 4)

    return `${day}/${month}/${year}`
  }

  const onSubmit = (data) => {
   
    const formatted = {
      ...data,
      birthday: parseDate(data.birthday),
      cnpj_type: data.cnpjType,
      identity_content: data.identityContent,
      identity_segments: data.identitySegments,
      expertise_areas: data.expertiseAreas,
      apan_associate: data.apanAssociate,
      home_state: data.homeState,
      type: 'professional'
    }
    console.log('formData', formatted)
    console.log(data)
    // registerUser(formatted)
  }

  const handleRadio = (field, selectedOption) => {
    setValue(field, (selectedOption.toLowerCase() === 'true'))
  }

  useEffect(() => {
    register({ name: 'pcd' });
    register({ name: 'cnpj' });
    register({ name: 'identityContent' });
    register({ name: 'apanAssociate' });
  }, [register]);

  // TODO: req hasNoRegister p/ validar se o usuário tem algum registro como profissional ou empresa. Se sim, redireciona para o dashboard, se não, mantém na página.
  return (
    <Background className="container center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography
          color="primary"
          variant="h3"
          component="h2">
          Formulário de Cadastro de Profissional
        </Typography>

        <ChipOptions
          name="links"
          label="Links para IMDB, currículo, portfólio, reel e outros"
          error={errors.links && errors.links.message}
          register={register({
            required: 'Esse campo é obrigatório',
            minLength: {
              value: 10,
              message: 'Insira pelo menos um link'
            }
          })}
        />
        
        <TextField
          label="Data de Nascimento"
          type="date"
          error={errors.birthday}
          helperText={errors.birthday && errors.birthday.message}
          fullWidth
          name="birthday"
          variant="filled"
          inputRef={register({
            required: 'Esse campo é obrigatório',
          })}
        />

        <TextField
          label="Cidade de Residência"
          error={errors.city}
          helperText={errors.city && errors.city.message}
          fullWidth
          name="city"
          variant="filled"
          inputRef={register({
            required: 'Esse campo é obrigatório',
          })}
        />

        <Typography variant="h6">Áreas de atuação</Typography>
        {
          separated_functions.map((groups, index) => (
            <Checkboxes
              key={index}
              label={groups.title}
              register={register}
              fields={groups.list}
              name="expertiseAreas"
            />
          ))
        }

        <Radios
          label="PcD (Pessoa com deficiência)"
          onChange={e => handleRadio('pcd', e.target.value)}
          name="pcd"
        />

        <Select
          label="Estado de origem"
          error={errors.homeState && errors.homeState.message}
          name="homeState"
          firstValue="Estado de origem"
          register={register}
        >
          {states.map(item =>
            <option value={item.id} key={item.id}>{item.name}</option>
          )}
        </Select>

        <Select
          label="Estado"
          error={errors.state && errors.state.message}
          name="state"
          firstValue="Estado"
          register={register}
        >
          {states.map(item =>
            <option value={item.id} key={item.id}>{item.name}</option>
          )}
        </Select>

        <TextField
          label="Endereço"
          error={errors.address}
          helperText={errors.address && errors.address.message}
          fullWidth
          name="address"
          variant="filled"
          inputRef={register({
            required: 'Esse campo é obrigatório',
          })}
        />

        <Select
          label="Formação"
          error={errors.education && errors.education.message}
          name="education"
          firstValue="Formação"

        >
          {formations.map(item =>
            <option value={item} key={uuid()}>{item}</option>
          )}
        </Select>
        
        <TextField
          label="Instituição ou processo de formação"
          error={errors.formationInstitution}
          helperText={errors.formationInstitution && errors.formationInstitution.message}
          fullWidth
          name="formationInstitution"
          variant="filled"
          inputRef={register({
            required: 'Esse campo é obrigatório',
          })}
        />
        
        
        {/* 
        <TextField
          label="Qual foi a instituição ou processo de formação? "
          error={errors.formationInstitution}
          helperText={errors.formationInstitution && errors.formationInstitution.message}
          fullWidth
          name="formationInstitution"
          variant="filled"

        /> */}

        <Radios
          label="Possui CNPJ"
          onChange={e => handleRadio('cnpj', e.target.value)}
          error={errors.cnpj && errors.cnpj.message}
          name="cnpj"
        />

        <Select
          label="Tipo do seu CNPJ"
          error={errors.cnpjType && errors.cnpjType.message}
          name="cnpjType"
          firstValue="Tipo de CNPJ"

        >
          {registryTypes.map(type => (
            <option value={type} key={uuid()}>
              {type}
            </option>
          ))}
        </Select>
          

        

        <Radios
          label="Sua empresa é vocacionada para conteúdo identitário?"
          onChange={e => handleRadio('identityContent', e.target.value)}
          error={errors.identityContent && errors.identityContent.message}
          name="identityContent"
        />

         <Checkboxes
          label="Em qual segmento?"
          name="identitySegments"
          register={register}
          fields={identitySegments}
        />

        <Radios
          label="É associado(a) da APAN"
          error={errors.apanAssociate && errors.apanAssociate.message}
          onChange={e => handleRadio('apanAssociate', e.target.value)}
          name="apanAssociate"
        />

        <TextField
          id="filled-multiline-static"
          label="Mini Bio"
          multiline
          rows="5"
          error={errors.bio}
          helperText={errors.bio && errors.bio.message}
          fullWidth
          name="bio"
          variant="filled"
          inputRef={register({
            required: 'Esse campo é obrigatório',
            minLength: {
              value: 15,
              message: 'Apresentação curta demais'
            }
          })}
        />

        <FormHelperText error>{registerError && registerError.professional}</FormHelperText>
        <Button
          type="submit"
          variant="contained"
        >
          Enviar
          </Button>
      </form>
    </Background>
  )
}

export default Professionals