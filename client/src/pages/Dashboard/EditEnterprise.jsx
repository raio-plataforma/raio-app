import React, { useState, useEffect } from 'react'
import axios from 'axios'
import history from '../../history'
import { useForm } from 'react-hook-form'
import { useStoreActions, useStoreState } from 'easy-peasy'
import Typography from '@material-ui/core/Typography'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import uuid from 'uuid'

import Button from '../../comps/Button'
import Checkboxes from '../../components/Checkboxes'
import Radios from '../../components/Radios'
import { Error } from '../../components/Status'
import ChipOptions from '../../comps/ChipOptions'
import { parseDate } from '../../utils/formatters'
import states from '../../assets/states.json'
import {
  segment,
  actions,
  functions,
  identitySegments,
  cnpj_type
} from '../Signup/dicioFields'
import { formatCheckboxFields } from '../../utils/service'

import { WrapEdit } from './style'

const Enterprise = ({ match }) => {
  const { register, handleSubmit, errors, setValue } = useForm()
  const user = useStoreState(state => state.user.user)
  const getUserById = useStoreActions(actions => actions.user.getUserById)
  const registerCompany = useStoreActions(actions => actions.register.registerEditCompany)
  const registerError = useStoreState(state => state.register.error)
  const [showBlock, handleBlock] = React.useState(false);
  const onSubmit = async(data) => {
    const formatted = {
      ...data,
      foundation_date: parseDate(data.foundation_date),
      apan_associate: data.apanAssociate,
      identity_segments: formatCheckboxFields(data.identitySegments),
      other_states: formatCheckboxFields(data.otherStates),
      diversity_functions: formatCheckboxFields(data.diversityFunctions),
      business_segments: formatCheckboxFields(data.businessSegments),
      business_fields: formatCheckboxFields(data.businessFields),
      identity_content: data.identityContent,
      type: 'enterprise'
    }

    try {
      await axios.put(`/api/enterprise/${match.params.enterprise_id}`, formatted)
      return history.push('/dashboard/empresa')
    }
    catch (err) {
      console.log(err)
      const error = {
        user: err.response.data && err.response.data.register
      }
      console.log(error)
      // return actions.setErrors(error)
    }
    
    // registerCompany(formatted)
  }
  // console.log(user.other_states)
  const handleRadio = (field, selectedOption) => setValue(field, (selectedOption.toLowerCase() === 'true'))
  const handleShowBlock = value => {
    handleRadio('identityContent', value)
    handleBlock(value)
  }
  
  
  useEffect(() => {
    register({ name: 'identityContent' });
    register({ name: 'apanAssociate' });
    Object.keys(user).length === 0 && getUserById(match.params.enterprise_id)
  }, [register, getUserById]);

  return (
    <WrapEdit className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h4" component="h2">Formulário de Edição da Empresa</Typography>

          <TextField
            label="Nome da Empresa"
            error={errors.enterprise_name}
            helperText={errors.enterprise_name && errors.enterprise_name.message}
            fullWidth
            defaultValue={user.enterprise_name}
            name="enterprise_name"
            variant="filled"
            inputRef={register({
              required: 'Esse campo é obrigatório',
            })}
          />

          <TextField
            label="Nome do Responsável"
            error={errors.name}
            helperText={errors.name && errors.name.message}
            fullWidth
            defaultValue={user.name}
            name="name"
            variant="filled"
            inputRef={register({
              required: 'Esse campo é obrigatório',
            })}
          />

          <TextField
            label="E-mail do Responsável"
            error={errors.email}
            helperText={errors.email && errors.email.message}
            fullWidth
            type="email"
            defaultValue={user.email}
            name="email"
            variant="filled"
            inputRef={register({
              required: 'Esse campo é obrigatório',
            })}
          />

        <TextField
          label="Data de Fundação"
          type="date"
          error={errors.foundatio_date}
          helperText={errors.foundatio_date && errors.foundatio_date.message}
          fullWidth
          name="foundation_date"
          variant="filled"
          inputRef={register({
            required: 'Esse campo é obrigatório',
          })}
        />

        <ChipOptions 
          name="links" 
          label="Links para site e redes socias da empresa"
          error={errors.links && errors.links.message}
          defaultValues={user.links}
          register={register({
            required: 'Esse campo é obrigatório',
            minLength: {
              value: 10,
              message: 'Insira pelo menos um link'
            }
          })}
        />

        <TextField
          id="filled-multiline-static"
          label="Apresentação da Empresa"
          multiline
          rows="5"
          defaultValue={user.presentation}
          error={errors.presentation}
          error={errors.presentation && errors.presentation.message}
          fullWidth
          name="presentation"
          variant="filled"
          inputRef={register({
            required: 'Esse campo é obrigatório',
            minLength: {
              value: 10,
              message: 'Fale um pouco mais sobre sua empresa'
            }
          })}
        />
        
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Estado</InputLabel>
          <Select
            label="Estado"
            error={errors.state && errors.state.message}
            name="state"
            fullWidth
            variant="filled"
            value={user.state}
            firstValue="Estado Sede"
            register={register}
          >
            {states.map(item =>
              <option value={item.id} key={item.id}>{item.name}</option>
            )}
          </Select>
        </FormControl>

        <TextField
          label="Cidade"
          error={errors.city}
          helperText={errors.city && errors.city.message}
          fullWidth
          defaultValue={user.city}
          name="city"
          variant="filled"
          inputRef={register({
            required: 'Esse campo é obrigatório',
          })}
        />

          <Checkboxes
            label="Outros estados que a empresa tem atuação"
            register={register}
            defaultValues={user.other_states}
            fields={states}
            name="otherStates"
          />
          
          <Checkboxes
            label="Segmento de atuação"
            register={register}
            defaultValues={user.business_segments}
            fields={segment}
            name="businessSegments"
          />
          <Checkboxes
            label="Campos de atuação"
            defaultValues={user.business_fields}
            register={register}
            fields={actions}
            name="businessFields"
          />
          <Checkboxes
            label="Funções que busca diversificar na empresa"
            defaultValues={user.diversity_functions}
            register={register}
            fields={functions}
            name="diversityFunctions"
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Qual o tipo do seu CNPJ?</InputLabel>
            <Select
              register={register}
              fullWidth
              variant="filled"
              value={user.cnpj_type}
              firstValue="Tipo de CNPJ"
              name="cnpj_type"
              
              error={errors.cnpjType && errors.cnpjType.message}
            >
              {cnpj_type.map(item =>
                <option value={item} key={uuid()}>{item}</option>
              )}
            </Select>
          </FormControl>

          <Radios
            label="Sua empresa é vocacionada para conteúdo identitário?"
            name="identityContent"
            defaultValue={user.identity_content}
            error={errors.identityContent && errors.identityContent.message}
            onChange={e => handleShowBlock(e.target.value)}
          />
        {
          showBlock && (
            <Checkboxes
              label="Se sim, em qual segmento?"
              fields={identitySegments}
              name="identitySegments"
              register={register}
            />
          )
        }

          <Radios
            label="A empresa é associado(a) da APAN?"
            name="apanAssociate"
            defaultValue={user.apan_associate}
            error={errors.apanAssociate && errors.apanAssociate.message}
            onChange={e => handleRadio('apanAssociate', e.target.value)}
          />

          <Error msg={registerError && registerError.enterprise} />

            <Button variant="contained" type="submit">
              Enviar
            </Button>

        </form>
    </WrapEdit>
  )
}

export default Enterprise