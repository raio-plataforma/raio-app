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
import Loading from "../../components/loading";
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
  const [isLoading, setIsLoading] = useState(true);
  const [notRegister, setNotRegister] = useState("")
  const [professionals, setProfessionals] = useState([])
  const getProfessionalAll = useStoreActions(actions => actions.user.getProfessionalAll)
  const getAllUsers = useStoreActions(actions => actions.user.getAllUsers)

  useEffect(() =>
    {
      setIsLoading(true);

      (
          async () => {
            const professionalAll = await getProfessionalAll(data)
            // const user = await getAllUsers()
            // const userProf = user.data.filter(isProf => isProf.type === 'professional')

            if (professionalAll.data.length === 0) {
              setNotRegister("Não existem profissionais cadastrados ainda")
            } else {
              // const dataTable = professionalAll.data.map((professional) => {
              //   const uprof = userProf.find(user => user._id == professional.user_id)
              //
              //   return({
              //     ...professional,
              //     name: uprof.name,
              //     gender: uprof.gender,
              //     self_declaration: uprof.self_declaration,
              //     phone: uprof.phone,
              //     home_state: states.filter(uf => uf.id == professional.home_state)[0].name
              //   })
              // }).filter(p => p.pcd == data.pcd || p.cnpj == data.cpnj)
              //
              // setProfessionals(dataTable)
            }
              setProfessionals(professionalAll.data)
            setIsLoading(false)
          }
      )();
    },
      [data]
  )

  const headCells = [
    { id: 'user_id.name', numeric: false, disablePadding: true, label: 'Nome' },
    { id: 'user_email', numeric: false, disablePadding: false, label: 'E-mail' },
    { id: 'user_id.phone', numeric: false, disablePadding: false, label: 'Telefone' },
    { id: 'cnpj', numeric: false, disablePadding: false, label: 'Possui CNPJ' },
    { id: 'user_id.gender', numeric: false, disablePadding: false, label: 'Gênero' },
    { id: 'pcd', numeric: false, disablePadding: false, label: 'PcD' },
    { id: 'user_id.self_declaration', numeric: false, disablePadding: false, label: 'Auto declaração' },
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

  console.log('filters', data)

  if(isLoading) return <Loading/>;
  if(professionals.length === 0) return <p>{notRegister}</p>;

  return (
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
  )
}

export default ResultSearchProfessionals
