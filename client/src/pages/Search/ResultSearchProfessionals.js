import React, { useEffect, useState } from "react"
import { useStoreActions, useStoreState } from 'easy-peasy'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Alert from '@material-ui/lab/Alert'
import Chip from '@material-ui/core/Chip'
import states from '../../assets/states.json'
import loading from '../../assets/loading.svg'
import LinkIcon from '@material-ui/icons/Link'
import IconButton from '@material-ui/core/IconButton';
import { Wrapper, Group, WrapperResultSearch, SubTitle, Text, Link } from './styles'
import Button from '../../comps/Button'
import Tables from '../../comps/Tables'

const LinkBtn = ({linkRef}) => (
  <IconButton>
    <a href={linkRef} target='_blank'>
      <LinkIcon color="primary" />
    </a>
  </IconButton>)

const checkArray = (src, search) => {
  const searchKeys = Object.keys(search)
  
  console.log(src)
}

const ResultSearchProfessionals = ({ data }) => {
  const [notRegister, setNotRegister] = useState("")
  const [professionals, setProfessionals] = useState([])
  const getProfessionalAll = useStoreActions(actions => actions.user.getProfessionalAll)
  const getAllUsers = useStoreActions(actions => actions.user.getAllUsers)

  useEffect(async () => {
    const professionalAll = await getProfessionalAll()
    const user = await getAllUsers()
    const userProf = user.data.filter(isProf => isProf.type === 'professional')
    
    if (!professionalAll.data === "Não existem profissionais cadastrados ainda") {
      setNotRegister("Não existem profissionais cadastrados ainda")
    } else {
      
      const dataTable = professionalAll.data.map((professional) => {
        const uprof = userProf.find(user => user._id == professional.user_id)
        return({
          ...professional,
          name: uprof.name,
          gender: uprof.gender,
          self_declaration: uprof.self_declaration,
          phone: uprof.phone,
          home_state: states.filter(uf => uf.id == professional.home_state)[0].name
        })
      }).filter(p => p.pcd == data.pcd || p.cnpj == data.cpnj)
      
      setProfessionals(dataTable)
      
    }
  }, [data])

  const headCells = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Nome' },
    { id: 'user_email', numeric: false, disablePadding: false, label: 'E-mail' },
    { id: 'phone', numeric: false, disablePadding: false, label: 'Telefone' },
    { id: 'cnpj', numeric: false, disablePadding: false, label: 'Possui CNPJ' },
    { id: 'gender', numeric: false, disablePadding: false, label: 'Gênero' },
    { id: 'pcd', numeric: false, disablePadding: false, label: 'PcD' },
    { id: 'self_declaration', numeric: false, disablePadding: false, label: 'Auto declaração' },
    { id: 'links', numeric: false, disablePadding: false, label: 'Links' },
  ];
  const dataNames = {
    expertise_areas: 'Áreas de atuação',
    self_declaration: 'Auto-declaração',
    gender: 'Gênero',
    home_state: 'Estado de residência',
    pcd: 'PcD',
    company_registry: 'Possui CNPJ',
  }
  console.log('data', data)
  return (
    <>
      {
        notRegister || professionals.length === 0 ?
        <img src={loading} /> :
        <Tables
          title={`${professionals.length} profissiona${professionals.length > 1 ? 'is' : 'l'} 
          encontrado${professionals.length > 1 && 's'}`}
          headCells={headCells}
          list={professionals.map(p => ({
            ...p, 
            cnpj: p.cnpj ? "Sim": "Não",
            pcd: p.pcd ? "Sim": "Não",
            links: <LinkBtn linkRef={p.links} />
          }))}
        />
      }
    </>
  )
}

export default ResultSearchProfessionals
