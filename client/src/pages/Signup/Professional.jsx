import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useStoreActions, useStoreState } from 'easy-peasy'
import Typography from '@material-ui/core/Typography'
import uuid from 'uuid'

import InputText from '../../components/InputText'
import Button from '../../components/Button'
import Textarea from '../../components/Textarea'
import Checkboxes from '../../components/Checkboxes'
import Radios from '../../components/Radios'
import Select from '../../components/Select'
import ChipOptions from '../../comps/ChipOptions'
import TransferList from '../../comps/TransferList'
import { Error } from '../../components/Status'

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

  const onSubmit = (data) => {
    const formatted = {
      ...data,
      birthday: data.birthday,
      cnpj_type: data.cnpjType,
      identity_content: data.identityContent,
      identity_segments: formatCheckboxFields(data.identitySegments),
      expertise_areas: formatCheckboxFields(data.expertiseAreas),
      apan_associate: data.apanAssociate,
      formation_institution: data.formationInstitution,
      home_state: data.homeState,
      type: 'professional'
    }
    console.log(formatted)
    registerUser(formatted)
    debugger;
  }

  const handleRadio = (field, selectedOption) => setValue(field, (selectedOption.toLowerCase() === 'true'))

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
        <ChipOptions name="links" label="Links" />
        <TransferList label="Áreas de atuação" name="expertiseAreas" list={functions} />
          {/* <Radios
            label="PcD (Pessoa com deficiência)"
            error={errors.pcd && errors.pcd.message}
            onChange={e => handleRadio('pcd', e.target.value)}
            name="pcd"
          /> */}
          {/* <FormControlLabel
            control={
              <Switch 
                inputRef={register}
                checked={state.checkedA}
                onChange={e => handleRadio('pcd', e.target.value)}
                name="pcd"
              />
            }
            label="PcD (Pessoa com deficiência)"
          /> */}
          {/* <Datepicker /> */}

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

          <InputText
            name="city"
            type="text"
            register={register({
              required: 'Esse campo é obrigatório',
            })}
            label="Cidade de Residência"
            placeholder="Cidade"
            error={errors.city && errors.city.message}
          />

          <InputText
            name="address"
            type="text"
            register={register({
              required: 'Esse campo é obrigatório',
            })}
            label="Endereço"
            placeholder="Insira seu endereço atual"
            error={errors.address && errors.address.message}
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

          <InputText
            name="formationInstitution"
            type="text"
            register={register({
              required: 'Esse campo é obrigatório',
            })}
            label="Qual foi a instituição ou processo de formação? "
            placeholder="Insira sua instituição de formação"
            error={errors.formationInstitution && errors.formationInstitution.message}
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

          <Checkboxes
            label="Se sim, em qual segmento?"
            register={register}
            fields={identitySegments}
            name="identitySegments"
          />

          <Checkboxes
            label="Áreas de atuação"
            register={register}
            fields={functions}
            name="expertiseAreas"
          />

          <Radios
            label="É associado(a) da APAN"
            error={errors.apanAssociate && errors.apanAssociate.message}
            onChange={e => handleRadio('apanAssociate', e.target.value)}
            name="apanAssociate"
          />

          <Textarea
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
          />

          <Textarea
            label="Links para IMDB, currículo, portfólio, reel e outros"
            placeholder="Insira aqui links"
            rows={5}
            error={errors.links && errors.links.message}
            name="links"
            register={register({
              required: 'Esse campo é obrigatório',
              minLength: {
                value: 10,
                message: 'Insira pelo menos um link'
              }
            })}
          />

          <Error msg={registerError && registerError.professional} />

          <Button type="submit">
            Enviar
          </Button>
        </form>
    </Background>
  )
}

export default Professionals