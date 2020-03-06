import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useStoreActions, useStoreState } from 'easy-peasy'
import Typography from '@material-ui/core/Typography'
import uuid from 'uuid'

import Button from '../../comps/Button'
import TextField from '@material-ui/core/TextField';
import Radios from '../../components/Radios'
import Select from '../../components/Select'
import ChipOptions from '../../comps/ChipOptions'
import TransferList from '../../comps/TransferList'
import Switch from '../../comps/Switch'
import FormHelperText from '@material-ui/core/FormHelperText'

import states from '../../assets/states.json'
import {
  functions,
  registryTypes,
  formations,
  identitySegments,
} from './dicioFields'
import { formatCheckboxFields } from '../../utils/service'

import { Form, Background, Title } from './styles'

const Professionals = () => {
  const {
    register,
    handleSubmit,
    errors,
    setValue
  } = useForm()

  const registerUser = useStoreActions(actions => actions.register.registerProfessional)
  const registerError = useStoreState(state => state.register.error)
  const splitData = data => data.split(',')
  const onSubmit = (data) => {
    const formatted = {
      ...data,
      birthday: data.birthday,
      cnpj_type: data.cnpjType,
      identity_content: data.identityContent,
      identity_segments: formatCheckboxFields(data.identitySegments),
      expertise_areas: splitData(data.expertiseAreas),
      apan_associate: data.apanAssociate,
      formation_institution: data.formationInstitution,
      home_state: data.homeState,
      type: 'professional'
    }
    registerUser(formatted)
  }

  const handleRadio = (field, selectedOption) => setValue(field, (selectedOption.toLowerCase() === 'true'))

  useEffect(() => {
    register({ name: 'pcd' });
    register({ name: 'cnpj' });
    register({ name: 'identityContent' });
    register({ name: 'apanAssociate' });
  }, [register]);

  // TODO: req hasNoRegister p/ validar se o usuário tem algum registro como profissional ou empresa. Se sim, redireciona para o dashboard, se não, mantém na página.
  console.log('id', identitySegments, functions)
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
        
        <TransferList 
          label="Áreas de atuação" 
          name="expertiseAreas" 
          register={register} 
          list={functions} 
        />
          <Radios
            label="PcD (Pessoa com deficiência)"
            error={errors.pcd && errors.pcd.message}
            onChange={e => handleRadio('pcd', e.target.value)}
            name="pcd"
          />
          
          <Switch label="bla" name='blahh' />

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

          {/* <InputText
            name="city"
            type="text"
            register={register({
              required: 'Esse campo é obrigatório',
            })}
            label="Cidade de Residência"
            placeholder="Cidade"
            error={errors.city && errors.city.message}
          /> */}

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
            register={register}
          >
            {formations.map(item =>
              <option value={item} key={uuid()}>{item}</option>
            )}
          </Select>

         
        <TextField
          label="Qual foi a instituição ou processo de formação? "
          error={errors.formationInstitution}
          helperText={errors.formationInstitution && errors.formationInstitution.message}
          fullWidth
          name="formationInstitution"
          variant="filled"
          inputRef={register({
            required: 'Esse campo é obrigatório',
          })}
        />

          <Radios
            label="Possui CNPJ"
            onChange={e => handleRadio('cnpj', e.target.value)}
            error={errors.cnpj && errors.cnpj.message}
            name="cnpj"
          />

          <Select
            label="Se sim, qual o tipo do seu CNPJ ?"
            error={errors.cnpjType && errors.cnpjType.message}
            name="cnpjType"
            firstValue="Tipo de CNPJ"
            register={register}
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

          {/* <Checkboxes
            label="Se sim, em qual segmento?"
            register={register}
            fields={identitySegments}
            name="identitySegments" */}
          />

        <TransferList 
          label="Em qual segmento?"
          name="identitySegments"
          register={register} 
          list={identitySegments} 
        />

          {/* <Checkboxes
            label="Áreas de atuação"
            register={register}
            fields={functions}
            name="expertiseAreas"
          /> */}

          <Radios
            label="É associado(a) da APAN"
            error={errors.apanAssociate && errors.apanAssociate.message}
            onChange={e => handleRadio('apanAssociate', e.target.value)}
            name="apanAssociate"
          />

          {/* <Textarea
            label="Mini Bio"
            placeholder="Insira uma apresentação sua"
            rows={5}
            error={errors.bio && errors.bio.message}
            name="bio"
            register={register({
              required: 'Esse campo é obrigatório',
              minLength: {
                value: 15,
                message: 'Apresentação curta demais'
              }
            })}
          /> */}

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