import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useStoreActions } from 'easy-peasy'
import uuid from 'uuid'

import { If } from '../../components/If'
import Flexbox from '../../components/Flexbox'
import Button from '../../comps/Button'
import Textarea from '../../components/Textarea'
import Checkboxes from '../../components/Checkboxes'
import Radios from '../../components/Radios'
import Select from '../../components/Select'

import cities from '../../assets/cities.json'
import states from '../../assets/states.json'
import {
  segment,
  actions,
  functions,
  color,
  identitySegments,
  cnpj_type
} from '../Signup/dicioFields'

import { TitleSearch } from './styles'

import { Form, Background } from '../Signup/styles'
import ResultSearchEnterprise from './ResultSearchEnterprise'

const Enterprise = () => {
  const { register, handleSubmit, errors, getValues, setValue } = useForm()

  const registerCompany = useStoreActions(actions => actions.user.registerCompany)
  const [isLoading, setLoader] = useState(false)
  const [form, setForm] = useState(true)
  const [dados, setDados] = useState()

  const formatCheckboxFields = (field) => {
    const identifiers = Object.keys(field)
    return identifiers.filter((i) => field[i])
  }

  const onSubmit = (data) => {
    const formatted = {
      state: data.state,
      diversity_functions: formatCheckboxFields(data.diversityFunctions),
      business_segments: formatCheckboxFields(data.businessSegments),
      business_fields: formatCheckboxFields(data.businessFields),
    }
    setDados(formatted)
    setForm(false)
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
    <>
      {
        form ?
          <Background>
            <Flexbox justify="center">
              <Form onSubmit={handleSubmit(onSubmit)}>

                <TitleSearch>Busca de Empresas</TitleSearch>
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
                  label="Estado"
                  error={errors.state && errors.state.message}
                  name="state"
                  firstValue="Estado Sede"
                  register={register}
                  onChange={programIsLoading}
                  isLoading={isLoading}
                >
                  {states.map(item =>
                    <option value={item.name} key={item.id}>{item.name}</option>
                  )}
                </Select>

                <Button variant="contained" type="submit">
                  Enviar
                </Button>
              </Form>
            </Flexbox>
          </Background>
          :
          <ResultSearchEnterprise data={dados} />
      }
    </>
  )
}

export default Enterprise