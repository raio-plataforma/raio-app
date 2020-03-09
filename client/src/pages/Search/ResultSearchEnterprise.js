import React, { useEffect, useState } from "react"
import { useStoreActions } from 'easy-peasy'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'

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
import Tables from '../../comps/Tables'

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

    if (enterpriseAll.data.candidates === "Não existem candidatos cadastradas ainda") {
      setNotRegister("Não existem candidatos(a) cadastrados(a) ainda")
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

  const headCells = [
    { id: 'name_enterprise', numeric: false, disablePadding: true, label: 'Empresa' },
    { id: 'name', numeric: false, disablePadding: false, label: 'Responsável' },
    { id: 'email', numeric: false, disablePadding: false, label: 'E-mail' },
    { id: 'phone', numeric: false, disablePadding: false, label: 'Telefone' },
    { id: 'segments', numeric: false, disablePadding: false, label: 'Segmento' }
  ];

  const clearList = enterprises
  .filter(ent => ent.enterprise_id)
  .map(ent => ({
    id: ent.enterprise_id,
    name_enterprise: ent.name_enterprise,
    name: ent.name,
    email: ent.email,
    phone: ent.phone,
    segments: ent.business_segments
  }))
console.log(clearList)
  return (
    <WrapperResultSearch className="container">
      <Group>
        <Link href="/busca/empresas">Voltar</Link>
      </Group>
      <Typography component="h2" variant="h4">Resultado de busca de Empresas</Typography>
      <SubTitle>Resultado de Busca para:</SubTitle>
      <div className="chips-group">
          {
            list.map(term => <Chip label={term} />)
          }
        </div>
      
        {
          notRegister ?
            <p>{setNotRegister}</p>
            :
            enterprises.length > 0 ?
            <Tables
              title={`${enterprises.length} empresa${enterprises.length > 1 ? 's' : ''} 
              encontrada${enterprises.length > 1 ? 's' : ''}`}
              headCells={headCells}
              list={enterprises}
            /> : 
            <Text>Não achamos nenhuma empresa</Text>

        }
    </WrapperResultSearch>
  )
}

export default ResultSearchProfessionals
