import React, {useEffect, useState} from "react"
import {useStoreState, useStoreActions} from 'easy-peasy'
import {Link} from 'react-router-dom'
import Alert from '@material-ui/lab/Alert'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

import Title from '../../comps/Title'
import Button from '../../comps/Button'
import FormText from '../../comps/FormText'
import CardMyVacancy from '../../comps/CardMyVacancy'

const MyJobs = () => {
    const getAllJobs = useStoreActions(actions => actions.professional.getMyJobs)
    const [jobList, setJobs] = useState([])
    const [jobFullList, setFullJobs] = useState([])
    const deleteJob = useStoreActions(actions => actions.professional.deleteMyJob)

    const user = useStoreState(state => state.auth.auth.user)

    // console.log(vacancies);

    useEffect(() =>
        {
            (
                async() =>
                {
                    try
                    {
                        if(!user.id)return

                        const jobs = await getAllJobs(user.id)
                        jobList.length === 0 && setJobs(jobs.data)

                        setFullJobs(jobs.data)
                    }
                    catch(e)
                    {
                        console.log(e)
                    }
                }
            )();
        },
        [user]
    )

    const handleDelete = async (id)=> {
        console.log(id)

        await deleteJob(id)

        const jobs = await getAllJobs(user.id)
        setJobs(jobs.data)
    };

    const handleText = event => {
        const lowerText = event.target.value.toLowerCase()
        const filteredJobs = jobList.filter(job => job._job.title.toLowerCase().startsWith(lowerText))

        !lowerText || lowerText === "" ? setJobs(jobFullList) : setJobs(filteredJobs)
    }

    return (
        <Container>
            <Title style={{margin: '30px 0'}}>Minhas candidaturas</Title>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <a href="/dashboard/profissional">
                        <Button
                            variant="contained"
                        >Voltar</Button>
                    </a>
                </Grid>
                <Grid item xs={12}>
                    <FormText
                        label="Pesquisar por vaga"
                        onChange={e => handleText(e)}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                {
                    jobList.length > 0 ?
                        (jobList.map(job => (
                            <CardMyVacancy
                                key={job._id}
                                id={job._id}
                                enterpriseName={job._job.enterprise_name || "Confidencial"}
                                jobTitle={job._job.title}
                                location={job._job.city + ' - ' + job._job.stateName}
                                period={job._job.total_period}
                                jobDescription={job._job.requirements}
                                money={'Cachê: R$ ' + job._job.cache}
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

export default MyJobs
