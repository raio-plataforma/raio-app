import React, { useEffect, useState } from "react"
import { useStoreState, useStoreActions } from 'easy-peasy'
import { Link } from 'react-router-dom'
import Alert from '@material-ui/lab/Alert'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

import Title from '../../comps/Title'
import Button from '../../comps/Button'
import FormText from '../../comps/FormText'
import CardVacancy from '../../comps/CardVacancy'

const AllVacancies = () => {
  const vacancies = useStoreState(state => state.vacancy.vacancies)
  const getAllJobs = useStoreActions(actions => actions.vacancy.getAllJobs)
  const [jobList, setJobs] = useState([])
  const [jobFullList, setFullJobs] = useState([])

  useEffect(() =>
      {
        (
            async () =>
            {
              try
              {
                const jobs = await getAllJobs()
                jobList.length === 0 && setJobs(jobs.data)
                setFullJobs(jobs.data)
              }
              catch (e)
              {
                console.log(e)
              }
            }
        )();
      },
      [vacancies]
  )

  const handleText = event => {
    const lowerText = event.target.value.toLowerCase()
    const filteredJobs = jobList.filter(job => job.title.toLowerCase().startsWith(lowerText))

    !lowerText || lowerText === "" ? setJobs(jobFullList) : setJobs(filteredJobs)
  }

  return (
    <Container>
      <Title style={{margin: '30px 0'}}>Todas as vagas</Title>
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
            <CardVacancy
              key={job._id}
              id={job._id}
              enterpriseName={job.enterprise_name || "Confidencial"}
              jobTitle={job.title}
              location={job.location}
              jobDescription={job.requirements}
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

export default AllVacancies
