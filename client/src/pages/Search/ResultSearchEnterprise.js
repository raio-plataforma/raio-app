import React, { useEffect, useState } from "react"
import { useStoreActions } from 'easy-peasy'
import {
  Wrapper,
  Group,
  TitleSearch,
  WrapperResultSearch,
  SubTitle,
  SearchResultEnterprise,
  Link,
  Text,
} from './styles'
import CardEnterprise from './components/CardEnterprise'

const ResultSearchProfessionals = ({ data }) => {
  const [enterprises, setEnterprise] = useState([])
  const [notRegister, setNotRegister] = useState()
  const getEnterpriseAll = useStoreActions(actions => actions.enterprise.getAll)

  const list = []
  Object.keys(data).forEach((item) => (
    Array.isArray(data[item]) ?
      data[item].map((arr) => {
        list.push(arr)
      }) :
      data[item] !== undefined && data[item] !== "" &&
      list.push(data[item])
  ))

  useEffect(async () => {
    const enterpriseAll = await getEnterpriseAll()

    if (!enterpriseAll.data) {
      setNotRegister("Não existem empresas cadastradas ainda")
    } else {
      let filter = enterpriseAll.data.filter((item) => {
        let itemFunctions = ""
        let dataFunctions = ""
        let itemSegments = ""
        let dataSegments = ""
        let itemFields = ""
        let dataFields = ""

        if (item.diversity_functions.length > 0) {
          item.diversity_functions.map((functions) => {
            itemFunctions = functions
          })
          if (data.diversity_functions.length > 0) {
            data.diversity_functions.map((functions) => {
              if (itemFunctions === functions) {
                dataFunctions = functions
              }
            })
          }
        }

        if (item.business_segments.length > 0) {
          item.business_segments.map((segments) => {
            itemSegments = segments
          })

          if (data.business_segments.length > 0) {
            data.business_segments.map((segments) => {
              if (itemSegments === segments) {
                dataSegments = segments
              }
            })
          }
        }
        if (item.business_fields.length > 0) {
          item.business_fields.map((fields) => {
            itemFields = fields
          })
          if (data.business_fields.length > 0) {
            data.business_fields.map((fields) => {
              if (itemFields === fields) {
                dataFields = fields
              }
            })
          }
        }

        return (
          itemFunctions === dataFunctions ||
          itemSegments === dataSegments ||
          itemFields === dataFields ||
          item.state === data.state)
      })

      setEnterprise(filter)
    }
  }, [])

  return (
    <WrapperResultSearch>
      <Group>
        <Link href="/busca/empresas">Voltar</Link>
      </Group>
      <Wrapper>
        <TitleSearch>Resultado de busca de Empresas</TitleSearch>
        <SubTitle>Resultado de Busca para:</SubTitle>
        <Text>{list.join(", ")}</Text>
        <SearchResultEnterprise>
          {
            notRegister ?
              <p>{setNotRegister}</p>
              :
              enterprises.length > 0 ?
                enterprises.map((enterprise) => (
                  <CardEnterprise
                    name={enterprise.name_enterprise}
                    email={enterprise.user_email}
                    state={enterprise.state}
                    cnpj={enterprise.cnpj_type && `Tipo de CNPJ: ${enterprise.cnpj_type}`}
                    apan_associate={enterprise.apan_associate ? "Associado a APAN" : "Não associado a APAN"}
                    business_segments={
                      enterprise.business_segments &&
                      enterprise.business_segments.map((state, index) => (
                        enterprise.business_segments.length === index + 1 ?
                          `${state}` :
                          `${state}, `
                      ))
                    }
                    business_fields={
                      enterprise.business_fields &&
                      enterprise.business_fields.map((state, index) => (
                        enterprise.business_fields.length === index + 1 ?
                          `${state}` :
                          `${state}, `
                      ))
                    }
                    diversity_functions={
                      enterprise.diversity_functions &&
                      enterprise.diversity_functions.map((state, index) => (
                        enterprise.diversity_functions.length === index + 1 ?
                          `${state}` :
                          `${state}, `
                      ))
                    }
                    presentation={enterprise.presentation}
                    links={enterprise.links}
                  />
                )) : <Text>Não achamos nenhuma empresa</Text>

          }
        </SearchResultEnterprise>

      </Wrapper>
    </WrapperResultSearch>
  )
}

export default ResultSearchProfessionals
