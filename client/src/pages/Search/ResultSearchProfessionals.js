import React, { useEffect, useState } from "react"
import { useStoreActions, useStoreState } from 'easy-peasy'
import Typography from '@material-ui/core/Typography'
import Alert from '@material-ui/lab/Alert'
import Chip from '@material-ui/core/Chip'

import { Wrapper, Group, WrapperResultSearch, SubTitle, Text, Link } from './styles'
import Button from '../../comps/Button'
import Tables from '../../comps/Tables'
import CardProfessional from './components/CardProfessional'
import { validatingFields } from '../../utils/service'
import Professionals from "../Signup/Professional"

const ResultSearchProfessionals = ({ data }) => {
  const [notRegister, setNotRegister] = useState()
  const [userFilter, setUserFilter] = useState([])
  const [professionals, setProfessionals] = useState([])
  const getProfessionalAll = useStoreActions(actions => actions.user.getProfessionalAll)
  const getUserAll = useStoreActions(actions => actions.user.getAllUsers)

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
    const professionalAll = await getProfessionalAll()
    const user = await getUserAll()

    if (professionalAll.data.candidates === "Não existem candidatos cadastradas ainda") {
      setNotRegister("Não existem candidatos(a) cadastrados(a) ainda")
    } else {

      const filter = professionalAll.data.filter((item) => {
        let itemArea = ""
        let areas = ""
        item.expertise_areas.map((value) => {
          itemArea = value
        })
        if (data.expertise_areas.length > 0) {
          data.expertise_areas.map((area) => {
            if (itemArea === area) {
              areas = area
            }
          })
        }

        return (
          itemArea === areas ||
          item.cnpj === data.cnpj ||
          item.state === data.state
        )
      })

      const filterUser = user.data.filter((item) => {
        if (item.type === "professional") {
          let id = ""
          filter.map((us) => {
            if (item._id === us.user_id) {
              id = us.user_id
            }
          })
          return item._id === id ||
            item.self_declaration === data.self_declaration ||
            item.gender === data.gender
        }
      })
      setUserFilter(filterUser)

      let obj = []
      filterUser.map((user) => {
        professionalAll.data.map((professional) => {
          if (user._id === professional.user_id) {
            obj.push(Object.assign({}, user, professional))
          }
        })
      })
      setProfessionals(obj)
    }
  }, [])

  const headCells = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Nome' },
    { id: 'email', numeric: false, disablePadding: false, label: 'E-mail' },
    { id: 'address', numeric: false, disablePadding: false, label: 'Endereço' },
    { id: 'phone', numeric: false, disablePadding: false, label: 'Telefone' },
    { id: 'cnpj', numeric: false, disablePadding: false, label: 'Possui CNPJ' },
    { id: 'gender', numeric: false, disablePadding: false, label: 'Gênero' },
    { id: 'self_declaration', numeric: false, disablePadding: false, label: 'Auto declaração' },
    { id: 'bio', numeric: false, disablePadding: false, label: 'Bio' },
    { id: 'links', numeric: false, disablePadding: false, label: 'Links' },
  ];
  
  return (
    <WrapperResultSearch className="container">
      <Button variant="contained">
        <Link href="/busca/profissionais">
          Voltar
        </Link>
      </Button>

      <Wrapper>
        <Typography component="h2" variant="h4">Resultado de busca de Profissionais</Typography>
        <div className="chips-group">
          {
            list.map(term => <Chip label={term} />)
          }
        </div>

        <Group>
          
            {
              notRegister || professionals.length === 0 ?
              <Alert severity="warning">{notRegister || 'Nenhum Profissional encontrado'}</Alert> :
              <Tables
                title={`${professionals.length} profissiona${professionals.length > 1 ? 'is' : 'l'} 
                encontrado${professionals.length > 1 && 's'}`}
                headCells={headCells}
                list={professionals.map(pro => ({...pro, cnpj: pro.cnpj ? 'Sim' : 'Não'}))}
              />
            }

        </Group>
      </Wrapper>
    </WrapperResultSearch >
  )
}

export default ResultSearchProfessionals
