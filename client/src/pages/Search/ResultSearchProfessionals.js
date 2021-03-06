import React, {useEffect, useState} from "react"
import {useStoreActions} from 'easy-peasy'
import LinkIcon from '@material-ui/icons/Link'
import IconButton from '@material-ui/core/IconButton';
import Loading from "../../components/loading";
import Tables from '../../comps/Tables'
import {getState} from "../Dashboard/user_info";

const LinkBtn = ({linkRef}) => (
    <IconButton>
        <a href={linkRef} target='_blank'>
            <LinkIcon color="primary"/>
        </a>
    </IconButton>);

const checkArray = (src, search) => {
    const searchKeys = Object.keys(search);
};

const ResultSearchProfessionals = ({data}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [notRegister, setNotRegister] = useState("");
    const [professionals, setProfessionals] = useState([]);
    const getProfessionalAll = useStoreActions(actions => actions.user.getProfessionalAll);
    const getAllUsers = useStoreActions(actions => actions.user.getAllUsers);

    useEffect(() =>
        {
            setIsLoading(true);
            (
                async() => {
                    const professionalAll = await getProfessionalAll(data);

                    if(professionalAll.data.length === 0)
                    {
                        setNotRegister('Não existem profissionais cadastrados ainda');
                    }
                    setProfessionals(professionalAll.data);
                    setIsLoading(false)
                }
            )();
        },
        [data]
    );

    const headCells = [
        {id: 'user_id.name', numeric: false, disablePadding: true, label: 'Nome'},
        {id: 'user_id.self_declaration', numeric: false, disablePadding: false, label: 'Auto declaração'},
        {id: 'user_id.gender', numeric: false, disablePadding: false, label: 'Gênero'},
        {id: 'pcd', numeric: false, disablePadding: false, label: 'PcD'},
        {id: 'expertise_areas', numeric: false, disablePadding: false, label: 'Áreas'},
        {id: 'state', numeric: false, disablePadding: false, label: 'UF'},
        {id: 'level', numeric: false, disablePadding: false, label: 'Nível'},
        {id: 'travel', numeric: false, disablePadding: false, label: 'Viagens?'},
        {id: 'cnpj', numeric: false, disablePadding: false, label: 'Possui CNPJ'},
        {id: 'links', numeric: false, disablePadding: false, label: 'Links'},
    ];

    const dataNames = {
        expertise_areas: 'Áreas de atuação',
        self_declaration: 'Auto-declaração',
        gender: 'Gênero',
        home_state: 'Estado de residência',
        pcd: 'PcD',
        company_registry: 'Possui CNPJ',
    };

    console.log('filters', data)

    if(isLoading) return <Loading/>;
    if(professionals.length === 0) return <p>{notRegister}</p>;

    console.log(professionals);

    return (
        <Tables
            title={`${professionals.length} profissiona${professionals.length > 1 ? 'is' : 'l'} 
          encontrado${professionals.length > 1 ? 's' : ''}`}
            headCells={headCells}
            list={professionals.map(p => ({
                ...p,
                cnpj: p.cnpj ? 'Sim' : 'Não',
                pcd: p.pcd ? 'Sim' : 'Não',
                travel: p.travel ? 'Sim' : 'Não',
                expertise_areas:(p.expertise_areas && p.expertise_areas.length > 0) && p.expertise_areas.join(', ') || 'Nenhum',
                state:getState(p.state),
                links: <LinkBtn linkRef={p.links}/>
            }))}
        />
    )
};

export default ResultSearchProfessionals
