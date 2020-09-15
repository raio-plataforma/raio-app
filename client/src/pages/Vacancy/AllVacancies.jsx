import React, {useEffect, useState} from "react"
import {useStoreState, useStoreActions} from 'easy-peasy'
import {Link} from 'react-router-dom'
import Alert from '@material-ui/lab/Alert'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

import Title from '../../comps/Title'
import Button from '../../comps/Button'
import FormText from '../../comps/FormText'
import CardVacancy from '../../comps/CardVacancy'
import Typography from "@material-ui/core/Typography";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import {color as selfDeclaration, functions, gender} from "../Signup/dicioFields";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import states from "../../assets/states";
import Switch from "../../comps/Switch";
import {useForm} from "react-hook-form";

const AllVacancies = () => {
    const {
        register,
        handleSubmit,
        errors,
        setValue
    } = useForm();

    const [dados, setDados] = useState([]);
    const [selectedAreas, setAreas] = React.useState([]);
    const [isLoading, setLoader] = useState({
        city: false,
        submit: false
    });

    const formatCheckboxFields = (field) => {
        const identifiers = Object.keys(field);
        return identifiers.filter((i) => field[i])
    };

    const handleChange = (e, value) => setAreas(value);

    const onSubmit = (data) => {
        const formatted = {
            ...data,
            expertise_areas: selectedAreas
        };

        console.log(formatted);

        setDados(formatted)
    };

    const programIsLoading = () => {
        setLoader({...isLoading, city: true})
        setTimeout(() => {
            setLoader({...isLoading, city: false})
        }, 2000);
    };

    const handleRadio = (field, selectedOption) => setValue(field, (selectedOption.toLowerCase() === 'true'));

    // const vacancies = useStoreState(state => state.vacancy.vacancies)
    const getAllJobs = useStoreActions(actions => actions.vacancy.getAllJobs);
    const [jobList, setJobs] = useState([]);

    useEffect(() =>
        {
            (
                async() =>
                {
                    try
                    {
                        const jobs = await getAllJobs(dados)
                        setJobs(jobs.data)
                    }
                    catch(e)
                    {
                        console.log(e)
                    }
                }
            )();
        },
        // [vacancies]
        [dados]
    )

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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={3}>
                            <Grid container xs={1} alignItems="center">
                                <Typography>Filtrar por: </Typography>
                            </Grid>

                            <Grid item xs={6}>
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

                            <Grid item xs={4}>
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
                            </Grid>
                        </Grid>
                        <Grid container alignItems="center" style={{margin: '10px 0'}} xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="secondary"
                                styles={{display: 'block', width: '100%'}}
                                isLoading={isLoading.submit}
                            >
                                Buscar
                            </Button>
                        </Grid>
                    </form>
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
                                location={job.city + ' - ' + job.stateName}
                                period={job.total_period}
                                jobDescription={job.requirements}
                                money={'Cachê: R$ ' + job.cache}
                                func={job.function}
                                level={job.level}
                                travel={job.travel}
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
