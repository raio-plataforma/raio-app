import React, {useEffect} from "react"
import {useStoreState, useStoreActions} from 'easy-peasy'
import Alert from '@material-ui/lab/Alert'

import {Container, Group, Background} from './style'
import {IfElse} from '../../components/If'
import Tables from '../../comps/Tables'
import Button from "../../comps/Button";
import Grid from "@material-ui/core/Grid";
import LinkIcon from '@material-ui/icons/Link'
import IconButton from '@material-ui/core/IconButton';

const LinkBtn = ({linkRef}) => (
    <IconButton>
        <a href={linkRef}>
            <LinkIcon color="primary"/>
        </a>
    </IconButton>);

const headCells = [
    {id: 'enterprise_name', numeric: false, disablePadding: true, label: 'Empresa'},
    {id: 'title', numeric: false, disablePadding: false, label: 'Título'},
    {id: 'function', numeric: false, disablePadding: false, label: 'Funções'},
    {id: 'requirements', numeric: false, disablePadding: false, label: 'Requisitos'},
    {id: 'location', numeric: false, disablePadding: false, label: 'Endereço'},
    {id: 'level', numeric: true, disablePadding: false, label: 'Nível'},
    {id: 'cache', numeric: true, disablePadding: false, label: 'Cachê'},
    {id: 'total_period', numeric: true, disablePadding: false, label: 'Período'},
    {id: 'id', numeric: false, disablePadding: false, label: 'Candidatos'},
];

const VacancyList = ({match}) => {
    const vacancies = useStoreState(state => state.vacancy.vacancies);
    const getAllVacancies = useStoreActions(actions => actions.vacancy.getAllVacancies);

    console.log('??????')

    useEffect(() => {
        const id = match.params && match.params.id;
        getAllVacancies(id);
    }, [getAllVacancies, match.params]);

    if(!vacancies || vacancies.length === 0) return <p>&nbsp;</p>;

    return (
        <Background>
            <Container>
                <div style={{marginBottom: 50}}>
                    <a href="/dashboard/profissional">
                        <Button
                            variant="contained"
                        >Voltar</Button>
                    </a>
                </div>
                <Group>
                    <IfElse
                        condition={typeof vacancies !== 'undefined' && vacancies.length > 0}
                        True={
                            <Tables
                                title="Vagas"
                                headCells={headCells}
                                list={
                                    vacancies.map(v =>({
                                        ...v,
                                        id:<LinkBtn linkRef={'/listagem/candidatos/' + v._id} />
                                    }))
                                }
                            />
                        }
                        False={
                            <Alert severity="warning">Não há vagas cadastradas</Alert>
                        }
                    />
                </Group>
            </Container>
        </Background>
    )
}

export default VacancyList
