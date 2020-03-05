import React, { useState } from "react"
import { useForm } from 'react-hook-form'
import { useStoreActions, useStoreState } from 'easy-peasy'

import InputText from '../../components/InputText'
import Button from '../../comps/Button'
import Form from '../../components/Form'
import { Error, Success } from '../../components/Status'

import history from '../../history'
import { Background, Group, Title, WrapButton } from './style'


const Vacancy = () => {
  const {
    register,
    handleSubmit,
    errors,
    reset
  } = useForm()

  const registerJob = useStoreActions(actions => actions.enterprise.registerJob)
  const registerError = useStoreState(state => state.enterprise.error)
  const [status, setStatus] = useState('')

  const onSubmit = async (data) => {
    const res = await registerJob({
      ...data,
      company_name: data.companyName,
      total_period: data.start + '-' + data.end
    })

    reset()

    if (res && res.status && res.status === 200) {
      setStatus(res.msg)
      return history.push('/dashboard/empresa')
    }
  }

  return (
    <Background>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title>Cadastro de Vaga</Title>
        <InputText
          name="title"
          type="text"
          register={register({
            required: 'Esse campo é obrigatório'
          })}
          label="Nome da Vaga"
          placeholder="Insira o nome da vaga"
          error={errors.title && errors.title.message}
        />

        <InputText
          name="function"
          type="text"
          register={register({
            required: 'Esse campo é obrigatório'
          })}
          label="Função"
          placeholder="Insira a função"
          error={errors.function && errors.function.message}
        />

        <InputText
          name="requirements"
          type="text"
          register={register({
            required: 'Esse campo é obrigatório'
          })}
          label="Requisitos"
          placeholder="Insira os requisitos da vaga"
          error={errors.requirements && errors.requirements.message}
        />

        <InputText
          name="location"
          type="text"
          register={register({
            required: 'Esse campo é obrigatório'
          })}
          label="Endereço"
          placeholder="Insira o endereço"
          error={errors.location && errors.location.message}
        />

        <Group>
          <InputText
            name="start"
            type="text"
            register={register({
              required: 'Esse campo é obrigatório'
            })}
            label="Data Inicial"
            placeholder="Insira a data inicial"
            error={errors.address && errors.address.message}
          />
          <InputText
            name="end"
            type="text"
            register={register({
              required: 'Esse campo é obrigatório'
            })}
            label="Data Final"
            placeholder="Insira a data final"
            error={errors.address && errors.address.message}
          />
        </Group>

        <InputText
          name="cache"
          type="number"
          register={register({
            required: 'Esse campo é obrigatório'
          })}
          label="Cachê"
          placeholder="Insira o valor do cachê"
          error={errors.formationInstitution && errors.formationInstitution.message}
        />

        <Success msg={status} />
        <Error msg={registerError} />

        <WrapButton>
          <Button
            type="submit"
            variant="primary"
          >
            Enviar
          </Button>
        </WrapButton>
      </Form>
    </Background>
  )
}

export default Vacancy;