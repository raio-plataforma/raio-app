import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useStoreActions, useStoreState } from 'easy-peasy'
import Typography from '@material-ui/core/Typography'
import uuid from 'uuid'

import Flexbox from '../../components/Flexbox'
import Button from '../../comps/Button'
import Checkboxes from '../../components/Checkboxes'
import Radios from '../../components/Radios'
import Select from '../../components/Select'
import { Error } from '../../components/Status'

import TextField from '@material-ui/core/TextField';
import ChipOptions from '../../comps/ChipOptions'
import { parseDate } from '../../utils/formatters'
import states from '../../assets/states.json'
import {
  segment,
  actions,
  functions,
  identitySegments,
  cnpj_type
} from './dicioFields'
import { formatCheckboxFields } from '../../utils/service'

import { Form, Background, WrapButton } from './styles'

const Enterprise = () => {
  const { register, handleSubmit, errors, setValue } = useForm()

  const registerCompany = useStoreActions(actions => actions.register.registerCompany)
  const registerError = useStoreState(state => state.register.error)
  const [isLoading, setLoader] = useState(false)

  const onSubmit = (data) => {
    const formatted = {
      ...data,
      foundation_date: parseDate(data.foundationDate),
      cnpj_type: data.cnpjType,
      apan_associate: data.apanAssociate,
      identity_segments: formatCheckboxFields(data.identitySegments),
      other_states: formatCheckboxFields(data.otherStates),
      diversity_functions: formatCheckboxFields(data.diversityFunctions),
      business_segments: formatCheckboxFields(data.businessSegments),
      business_fields: formatCheckboxFields(data.businessFields),
      identity_content: data.identityContent,
      type: 'enterprise'
    }
    
    registerCompany(formatted)
  }

  const programIsLoading = () => {
    setLoader(true)
    setTimeout(() => { setLoader(false) }, 2000);
  }

  const handleRadio = (field, selectedOption) => setValue(field, (selectedOption.toLowerCase() === 'true'))

  useEffect(() => {
    register({ name: 'identityContent' });
    register({ name: 'apanAssociate' });
  }, [register]);

  // TODO: req hasNoRegister p/ validar se o usuário tem algum registro como profissional ou empresa. Se sim, redireciona para o dashboard, se não, mantém na página.
  return (
    <Background>
      <Flexbox justify="center">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h4" component="h2">Formulário de Cadastro da Empresa</Typography>

        <TextField
          label="Nome da Empresa"
          error={errors.name}
          helperText={errors.name && errors.name.message}
          fullWidth
          name="enterprise_name"
          variant="filled"
          inputRef={register({
            required: 'Esse campo é obrigatório',
          })}
        />

        <TextField
          label="Data de Fundação"
          type="date"
          error={errors.foundationDate}
          helperText={errors.foundationDate && errors.foundationDate.message}
          fullWidth
          name="foundationDate"
          variant="filled"
          inputRef={register({
            required: 'Esse campo é obrigatório',
          })}
        />

        <ChipOptions 
          name="links" 
          label="Links para site e redes socias da empresa"
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
          id="filled-multiline-static"
          label="Apresentação da Empresa"
          multiline
          rows="5"
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

          <Select
            label="Estado"
            error={errors.state && errors.state.message}
            name="state"
            firstValue="Estado Sede"
            register={register}
            onChange={programIsLoading}
            isLoading={isLoading}
          >
            {states.map(item =>
              <option value={item.id} key={item.id}>{item.name}</option>
            )}
          </Select>

        <TextField
          label="Cidade"
          error={errors.city}
          helperText={errors.city && errors.city.message}
          fullWidth
          name="city"
          variant="filled"
          inputRef={register({
            required: 'Esse campo é obrigatório',
          })}
        />

          <Checkboxes
            label="Outros estados que a empresa tem atuação"
            register={register}
            fields={states}
            name="otherStates"
          />
          
          <Checkboxes
            label="Segmento de atuação"
            register={register}
            fields={segment}
            name="businessSegments"
          />
          <Checkboxes
            label="Campos de atuação"
            register={register}
            fields={actions}
            name="businessFields"
          />
          <Checkboxes
            label="Funções que busca diversificar na empresa"
            register={register}
            fields={functions}
            name="diversityFunctions"
          />

          <Select
            label="Qual o tipo do seu CNPJ?"
            register={register}
            firstValue="Tipo de CNPJ"
            name="cnpjType"
            error={errors.cnpjType && errors.cnpjType.message}
          >
            {cnpj_type.map(item =>
              <option value={item} key={uuid()}>{item}</option>
            )}
          </Select>

          <Radios
            label="Sua empresa é vocacionada para conteúdo identitário?"
            name="identityContent"
            error={errors.identityContent && errors.identityContent.message}
            onChange={e => handleRadio('identityContent', e.target.value)}
          />

          <Checkboxes
            label="Se sim, em qual segmento?"
            fields={identitySegments}
            name="identitySegments"
            register={register}
          />

          <Radios
            label="A empresa é associado(a) da APAN?"
            name="apanAssociate"
            error={errors.apanAssociate && errors.apanAssociate.message}
            onChange={e => handleRadio('apanAssociate', e.target.value)}
          />

          <Error msg={registerError && registerError.enterprise} />

          <WrapButton>
            <Button variant="contained" type="submit">
              Enviar
            </Button>
          </WrapButton>

        </Form>
      </Flexbox>
    </Background>
  )
}

export default Enterprise