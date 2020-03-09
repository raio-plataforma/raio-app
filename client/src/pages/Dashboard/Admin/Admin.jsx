import React from "react"
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import RoleCard from '../../../comps/RoleCard'
import Enterprise from '@material-ui/icons/AccountBalanceOutlined'
import Person from '@material-ui/icons/Person'
import { WrapperChoices, Title, Background } from './style'

const DashboardWrapper = () => 
    <div className="container">
      <Typography variant="h3" component="h2" style={{textAlign: 'center', margin: '10px 0'}}>Escolha uma visão: </Typography>
      <WrapperChoices>
        <RoleCard 
          icon={<Enterprise style={{ fontSize: 80, color: '#200122' }} />}
          to="/dashboard/admin/empresas"
          title="Empresarial"
        />
        
        <RoleCard 
          icon={<Person style={{ fontSize: 80, color: '#200122' }} />}
          to="/dashboard/admin/profissionais"
          title="Profissional"
        />
      </WrapperChoices>
    </div>

export default DashboardWrapper