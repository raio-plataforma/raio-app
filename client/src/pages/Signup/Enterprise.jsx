import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useStoreActions, useStoreState } from 'easy-peasy'
import Typography from '@material-ui/core/Typography'
import uuid from 'uuid'

import Flexbox from '../../components/Flexbox'
import Button from '../../comps/Button'
import Checkbox from '../../comps/Checkbox'
// import Textarea from '../../components/Textarea'
import Select from '../../components/Select'
// import InputText from '../../components/InputText'
import { Error } from '../../components/Status'

import TextField from '@material-ui/core/TextField';
import ChipOptions from '../../comps/ChipOptions'
import Switch from '../../comps/Switch'

import {
  segment,
  actions,
  functions,
  identitySegments,
  cnpj_type
} from './dicioFields'
import { formatCheckboxFields } from '../../utils/service'
import { parseDate } from '../../utils/formatter'
// import { dateToString, parseDate, normalizeArrayData } from '../../utils/formatter'
import { Form, Background, WrapButton, Title } from './styles'
import { Container, Grid } from '@material-ui/core'
import FormSelect from '../../comps/FormSelect'
import Autocomplete from '@material-ui/lab/Autocomplete'
import states from '../../assets/states.json'
import cities from '../../assets/cities.json'
import Titulo from '../../components/Titulo'

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

  const stateList = list => list.map(uf => ({ value: uf.id, name: uf.name }))
  const [filteredStates, setStates] = useState(states.map(uf => uf.name))
  const [citiesFromStates, setCities] = useState([])

  const handleCities = state => {

    const filteredCities = cities.filter(city => city.state_id == state)
    const filteredStates = states.filter(uf => uf.id != state).map(uf => uf.name)
    setCities(filteredCities)
    setStates(filteredStates)
  }

  // TODO: req hasNoRegister p/ validar se o usuário tem algum registro como profissional ou empresa. Se sim, redireciona para o dashboard, se não, mantém na página.
  return (
    <Container center="true" maxWidth="md" >
      <Form className="form-sem-espaco" width="auto" onSubmit={handleSubmit(onSubmit)}>
        <Titulo> Formulário de Cadastro da Empresa </Titulo>

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

        <br /><br />

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
        <br />
        <ChipOptions
          name="links"
          label="Links para site e redes sociais da empresa"
          autocomplete="false"
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

        <br /><br />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormSelect
              name="state"
              error={errors.state && errors.state.message}
              options={stateList(states)}
              register={register}
              firstValue="Estado"
              label="Estado Sede"
              onChange={(e) => { handleCities(e); programIsLoading() }}
              isLoading={isLoading}
              autocomplete="false"
            />
          </Grid>

          <Grid item xs={6}>
            <Autocomplete
              fullWidth
              freeSolo
              autocomplete="false"
              options={citiesFromStates.map(city => city.name).sort()}
              renderInput={params => (
                <TextField
                  {...params}
                  name="city"
                  inputRef={register({
                    required: 'Esse campo é obrigatório'
                  })}
                  color="primary"
                  label="Cidade da sede"
                  variant="filled"
                  placeholder="Busque a cidade"
                  error={errors.city && errors.city.message}
                  helperText={errors.city && errors.city.message}
                  autocomplete="false"
                />
              )}
            />
          </Grid>
        </Grid>

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

        <FormSelect
          name="cnpjType"
          error={errors.cnpjType && errors.cnpjType.message}
          options={cnpj_type}
          register={register}
          firstValue="Tipo de CNPJ"
          label="Qual o tipo do seu CNPJ?"
        />

        <Switch
          label="Sua empresa é vocacionada para conteúdo identitário?"
          name="identityContent"
          error={errors.identityContent && errors.identityContent.message}
          onChange={e => handleRadio('identityContent', e.target.value)}
        />

        <br />

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

        <center>
          <br /><br />
          <Button variant="contained" type="submit"> Enviar </Button>
        </center>

      </Form>
    </Container>
  )
}

export default Enterprise
