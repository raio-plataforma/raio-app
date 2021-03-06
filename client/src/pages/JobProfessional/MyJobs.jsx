import React, { useEffect, useState } from "react"
import { useStoreState, useStoreActions } from 'easy-peasy'
import { Link } from 'react-router-dom'
import Alert from '@material-ui/lab/Alert'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

import Title from '../../comps/Title'
import Button from '../../comps/Button'
import FormText from '../../comps/FormText'
import CardMyVacancy from '../../comps/CardMyVacancy'
import Titulo from "../../components/Titulo"
import SearchIcon from '@material-ui/icons/Search';
import Erro from "../../components/erro"
import Carregando from "../../components/loading/carregando"

const MyJobs = () => {
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState(null)

    const getAllJobs = useStoreActions(actions => actions.professional.getMyJobs)
    const [jobList, setJobs] = useState([])
    const [jobFullList, setFullJobs] = useState([])
    const deleteJob = useStoreActions(actions => actions.professional.deleteMyJob)

    // const user = useStoreState(state => state.auth.auth.user)
    const user = useStoreState(state => state.user.user)
    const userType = useStoreState(state => state.auth.auth.user)
    const getUser = useStoreActions(actions => actions.user.getUser)

    // console.log(vacancies);

    useEffect(() => {
        if ((String(userType.type) !== 'undefined') && (!user.id)) {
            getUser(userType.type)
        }

        if (String(user.name) !== 'undefined') {
            setCarregando(false);
        }

        (
            async () => {
                try {
                    if (!user.id) return

                    const jobs = await getAllJobs(user.id)
                    console.log(jobs.data);
                    jobList.length === 0 && setJobs(jobs.data)

                    setFullJobs(jobs.data)
                }
                catch (e) {
                    console.log(e)
                }
            }
        )();
    },
        [user, userType, getUser, setCarregando]
    )

    const handleDelete = async (id) => {
        console.log(id)

        await deleteJob(id)

        const jobs = await getAllJobs(user.id)
        if (jobs && jobs.data) setJobs(jobs.data)
    };

    const handleText = event => {
        const lowerText = event.target.value.toLowerCase()
        const filteredJobs = jobList.filter(job => job._job.title.toLowerCase().startsWith(lowerText))

        !lowerText || lowerText === "" ? setJobs(jobFullList) : setJobs(filteredJobs)
    }


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
                                    <Titulo>Minhas candidaturas</Titulo>

                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Grid container spacing={3}>
                                                <Grid item xs={10}>
                                                    <FormText
                                                        label="Pesquisar por vaga"
                                                        onChange={e => handleText(e)}
                                                    />
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Button variant="contained" color="primary" styles={{ display: 'block', width: '100%' }} >
                                                        <SearchIcon /> Buscar
                                                    </Button>
                                                </Grid>

                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <br /><br />
                                    <Grid container spacing={2}>
                                        {
                                            jobList.length > 0 ?
                                                (jobList.map(job => (
                                                    <CardMyVacancy
                                                        key={job._id}
                                                        id={job._id}
                                                        slug={job._job.slug || job._job._id}
                                                        enterpriseName={job._job.enterprise_name || "Confidencial"}
                                                        jobTitle={job._job.title}
                                                        location={job._job.city + ' - ' + job._job.stateName}
                                                        // period={job._job.total_period}
                                                        // jobDescription={job._job.requirements}
                                                        money={job._job.cache}
                                                        deleteFunc={handleDelete}
                                                    />
                                                ))) :
                                                <Grid item xs={12}>
                                                    <Alert variant="filled" severity="warning">Desculpe! Não encontramos vagas</Alert>
                                                </Grid>
                                        }
                                    </Grid>
                                </Container>
                            )
                        }
                    </div>
                )
            }
        </div>
    )


}

export default MyJobs
