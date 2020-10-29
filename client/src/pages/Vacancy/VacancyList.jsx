import React, { useEffect, useState } from "react"
import { useStoreState, useStoreActions } from 'easy-peasy'
import { Container, Group, Background } from './style'
import LinearScaleIcon from '@material-ui/icons/LinearScale';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddIcon from '@material-ui/icons/Add';
import Tables from '../../comps/Tables'
import Erro from "../../components/erro"
import Carregando from "../../components/loading/carregando"
import Titulo from "../../components/Titulo"

const headCells = [
  { id: 'enterprise_name', numeric: false, disablePadding: true, label: 'Empresa' },
  { id: 'title', numeric: false, disablePadding: false, label: 'Título' },
  { id: 'function', numeric: false, disablePadding: false, label: 'Funções' },
  { id: 'cache', numeric: true, disablePadding: false, label: 'Cachê' },
  { id: 'status', numeric: true, disablePadding: false, label: 'Status' }
];

const VacancyList = () => {
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  const vacancies = useStoreState(state => state.vacancy.vacancies)
  const getAllVacancies = useStoreActions(actions => actions.vacancy.getAllVacancies)
  const user = useStoreState(state => state.user.user)
  const userType = useStoreState(state => state.auth.auth.user)
  const getUser = useStoreActions(actions => actions.user.getUser)


  useEffect(() => {
    if ((String(userType.type) !== 'undefined') && (!user.enterprise_id)) {
      getUser(userType.type)
    }

    if ((user.enterprise_id) && (String(vacancies) == '')) {
      getAllVacancies(user.enterprise_id);
    }

    if (String(vacancies) !== '') {
      setCarregando(false);
    }
  });



  return (
    <div className="pageRender">
      { erro !== null ? (
        <Erro erro={erro} />
      ) : (
          <div>
            { carregando == true ? (
              <Carregando />
            ) : (
                <Container center="true" maxWidth="lg">
                  <Titulo> Vagas </Titulo>

                  <Tables
                    title="Vagas cadastradas na sua empresa"
                    headCells={headCells}
                    list={vacancies}
                    btnAddLink="/cadastro/vaga"
                    btnAddLabel={(<span><AddIcon style={{marginLeft:"0px"}}/> Anunciar uma nova</span>)}
                    actions={[
                      {
                        actionCampo: "_id",
                        action: "/painel/empresa/vaga/",
                        btn: <LinearScaleIcon />,
                        type: 'link', // link or btn
                        tooltip: 'Acompanhar detalhes da vaga'
                      },
                      {
                        actionCampo: "_id",
                        action: "/vaga/",
                        btn: <VisibilityIcon />,
                        type: 'link', // link or btn
                        target: '_blank',
                        tooltip: 'Ver pagina da vaga (Publica)'
                      }
                    ]}
                  />
                </Container>
              )
            }
          </div>
        )
      }
    </div>
  )

}

export default VacancyList
