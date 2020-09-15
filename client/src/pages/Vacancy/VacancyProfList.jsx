import React, {useEffect} from "react"
import {useStoreState, useStoreActions} from 'easy-peasy'
import Alert from '@material-ui/lab/Alert'

import {Container, Group, Background} from './style'
import {IfElse} from '../../components/If'
import Tables from '../../comps/Tables'
import Button from "../../comps/Button";
import LinkIcon from '@material-ui/icons/Link'
import IconButton from '@material-ui/core/IconButton';

const LinkBtn = ({linkRef}) => (
    <IconButton>
        <a href={linkRef} target='_blank'>
            <LinkIcon color="primary"/>
        </a>
    </IconButton>);

const headCells = [
    {id: 'user_id.name', numeric: false, disablePadding: false, label: 'Nome'},
    {id: 'user_id.self_declaration', numeric: true, disablePadding: false, label: 'Auto declaração'},
    {id: 'user_id.gender', numeric: false, disablePadding: false, label: 'Gênero'},
    {id: 'level', numeric: false, disablePadding: false, label: 'Nível'},
    {id: 'pcd', numeric: false, disablePadding: false, label: 'PCD'},
    {id: 'travel', numeric: false, disablePadding: false, label: 'Viagens?'},
    {id: 'expertise_areas', numeric: false, disablePadding: false, label: 'Áreas'},
    {id: 'links', numeric: false, disablePadding: false, label: 'Portifolio'}
];

const VacancyProfList = ({match}) => {
    const vacancyProfs = useStoreState(state => state.vacancy.vacancyProfs);
    const getAllJobProfs = useStoreActions(actions => actions.vacancy.getAllJobProfs);

    console.log('???????');
    console.log(vacancyProfs);

    useEffect(() => {
        const id = match.params && match.params.id;
        getAllJobProfs(id);
    }, [getAllJobProfs, match.params]);

    if(!vacancyProfs || vacancyProfs.length === 0) return <p>&nbsp;</p>;

    const back = '/listagem/vagas/' + match.params.id;

    return (
        <Background>
            <Container>
                <div style={{marginBottom: 50}}>
                    <a href={back}>
                        <Button
                            variant="contained"
                        >Voltar</Button>
                    </a>
                </div>
                <Group>
                    <IfElse
                        condition={typeof vacancyProfs !== 'undefined' && vacancyProfs.length > 0}
                        True={
                            <Tables
                                title="Vagas"
                                headCells={headCells}
                                list={
                                    vacancyProfs.map(v => ({
                                        ...v,
                                        pcd: v.pcd ? 'Sim' : 'Não',
                                        travel: v.travel ? 'Sim' : 'Não',
                                        expertise_areas: v.expertise_areas?v.expertise_areas.join(','):'',
                                        links: <LinkBtn linkRef={v.links}/>
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

export default VacancyProfList
