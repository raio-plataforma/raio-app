import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useStoreActions, useStoreState } from 'easy-peasy'
import Typography from '@material-ui/core/Typography'
import uuid from 'uuid'

import Flexbox from '../../components/Flexbox'
import Button from '../../comps/Button'
import Checkbox from '../../comps/Checkbox'
import Textarea from '../../components/Textarea'
import Select from '../../components/Select'
import InputText from '../../components/InputText'
import { Error } from '../../components/Status'

import TextField from '@material-ui/core/TextField';
import ChipOptions from '../../comps/ChipOptions'
import Switch from '../../comps/Switch'

import states from '../../assets/states.json'
import {
  segment,
  actions,
  functions,
  identitySegments,
  cnpj_type
} from './dicioFields'
import { formatCheckboxFields } from '../../utils/service'
import { dateToString, parseDate, normalizeArrayData } from '../../utils/formatter'
import { Form, Background, WrapButton, Title } from './styles'

const Enterprise = () => {
  const { register, handleSubmit, errors, setValue } = useForm()

  const registerCompany = useStoreActions(actions => actions.register.registerCompany)
  const registerError = useStoreState(state => state.register.error)
  const [isLoading, setLoader] = useState(false)

  const onSubmit = (data) => {
    const formatted = {
      ...data,
      foundation_date: parseDate(data.foundation_date),
      cnpj_type: data.cnpjType,
      apan_associate: data.apanAssociate,
      identity_segments: formatCheckboxFields(data.identity_segments),
      other_states: formatCheckboxFields(data.other_states),
      diversity_functions: formatCheckboxFields(data.diversity_functions),
      business_segments: formatCheckboxFields(data.business_segments),
      business_fields: formatCheckboxFields(data.business_fields),
      identity_content: data.identityContent,
      type: 'enterprise'
    }
    // console.log(formatted)
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
          name="foundation_date"
          label="Data de Fundação"
          type="date"
          fullWidth
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

          <Checkbox
            label="Outros estados que a empresa tem atuação"
            register={register}
            options={states.map(uf => uf.name)}
            name="other_states"
          />
          
          <Checkbox
            label="Segmento de atuação"
            register={register}
            options={segment}
            name="business_segments"
          />
          <Checkbox
            label="Campos de atuação"
            register={register}
            options={actions}
            name="business_fields"
          />
          <Checkbox
            label="Funções que busca diversificar na empresa"
            register={register}
            options={functions}
            name="diversity_functions"
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

          <Switch
            label="Sua empresa é vocacionada para conteúdo identitário?"
            name="identityContent"
            error={errors.identityContent && errors.identityContent.message}
            onChange={e => handleRadio('identityContent', e.target.value)}
          />

          <Checkbox
            label="Se sim, em qual segmento?"
            options={identitySegments}
            name="identity_segments"
            register={register}
          />

          <Switch
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