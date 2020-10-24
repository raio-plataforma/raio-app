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
import Typography from "@material-ui/core/Typography";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import { color as selfDeclaration, functions, gender } from "../Signup/dicioFields";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import states from "../../assets/states";
import Switch from "../../comps/Switch";
import { useForm } from "react-hook-form";
import Titulo from "../../components/Titulo"
import SearchIcon from '@material-ui/icons/Search';
import config from "../../config"

const AllVacancies = () => {
    const {
        register,
        handleSubmit,
        errors,
        setValue
    } = useForm()

    const [dados, setDados] = useState([])
    const [selectedAreas, setAreas] = React.useState([]);
    const [isLoading, setLoader] = useState({
        city: false,
        submit: false
    })

    const formatCheckboxFields = (field) => {
        const identifiers = Object.keys(field)
        return identifiers.filter((i) => field[i])
    }

    const handleChange = (e, value) => setAreas(value)

    const onSubmit = (data) => {
        const formatted = {
            ...data,
            expertise_areas: selectedAreas
        }

        console.log(formatted)

        setDados(formatted)
    }

    const programIsLoading = () => {
        setLoader({ ...isLoading, city: true })
        setTimeout(() => { setLoader({ ...isLoading, city: false }) }, 2000);
    }

    const handleRadio = (field, selectedOption) => setValue(field, (selectedOption.toLowerCase() === 'true'))

    // const vacancies = useStoreState(state => state.vacancy.vacancies)
    const getAllJobs = useStoreActions(actions => actions.vacancy.getAllJobs)
    const [jobList, setJobs] = useState([])

    useEffect(() => {
        (
            async () => {
                try {
                    const jobs = await getAllJobs(dados)
                    setJobs(jobs.data)
                }
                catch (e) {
                    console.log(e)
                }
            }
        )();
    },
        // [vacancies]
        [dados]
    )

    return (
        <Container center="true" maxWidth="lg">
            <Titulo> Vagas </Titulo>

            <Grid container spacing={2}>
                <Grid item xs={12}>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={3}>
                                <Grid item xs={12} sm={10} md={11}>
                                <Autocomplete
                                    multiple
                                    options={functions}
                                    onChange={handleChange}
                                    value={selectedAreas}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            name="expertise_areas"
                                            inputRef={register}
                                            variant="filled"
                                            label="Áreas de atuação"
                                            placeholder="Adicione as áreas de atuação"
                                        />
                                    )}
                                />
                            </Grid>
                                <Grid item xs={0} md={1} remove-mobile="true">
                                    <Button type="submit" variant="contained" color="primary" styles={{ display: 'block', width: '100%', height: '100%' }} isLoading={isLoading.submit} >
                                        <SearchIcon />
                                    </Button>
                                </Grid>
                        </Grid>
                        <br />
                    </form>
                </Grid>

                <Grid item xs={12} sm={2}>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl fullWidth>
                            <InputLabel shrink htmlFor="select-multiple-native">
                                Estado de residência
                                    </InputLabel>
                            <Select
                                multiple
                                native
                                variant="filled"
                                inputRef={register}
                                name="home_state"
                            >
                                {states.map((name) => (
                                    <option key={name.abbr} value={name.abbr}>
                                        {name.name}
                                    </option>
                                )
                                )}
                            </Select>
                        </FormControl>
                        <br /><br />
                        <Button type="submit" variant="contained" color="primary" styles={{ display: 'block', width: '100%' }} isLoading={isLoading.submit} >
                            <SearchIcon/> Buscar
                        </Button>
                        <br /><br />
                        <br /><br />
                    </form>
                </Grid>

                <Grid xs={12} sm={10}>

                    <Grid container spacing={2} style={{ padding: "8px" }}>
                        {
                            jobList.length > 0 ?
                                (jobList.map(job => (
                                    job.status == "Atraindo candidatos" &&
                                    <CardVacancy
                                        key={job._id}
                                        slug={job.slug || job._id}
                                        id={job._id}
                                        foto={config.pastaLogotipo + job.enterprise_id.logotipo}
                                        enterpriseName={job.enterprise_name || "Confidencial"}
                                        jobTitle={job.title}
                                        location={job.city + ' - ' + job.stateName}
                                        period={job.total_period}
                                        jobDescription={job.requirements}
                                        money={job.cache}
                                        func={job.function}
                                    />
                                ))) :
                                <Grid item xs={12}>
                                    <Alert variant="filled" severity="warning">Desculpe! Não encontramos vagas</Alert>
                                </Grid>
                        }
                    </Grid>

                </Grid>
            </Grid>
        </Container >
    )
}

export default AllVacancies
