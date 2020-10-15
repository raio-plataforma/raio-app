import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useStoreActions } from 'easy-peasy'
import { Link } from "react-router-dom"
import Typography from '@material-ui/core/Typography'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Grid from '@material-ui/core/Grid'
import uuid from 'uuid'

import Button from '../../comps/Button'

import Select from '@material-ui/core/Select'
import ChipOptions from '../../comps/ChipOptions'
import Switch from '../../comps/Switch'
import ResultSearchProfessionals from './ResultSearchProfessionals'


import states from '../../assets/states.json'
import {
    functions,
    color as selfDeclaration,
    gender,
} from '../Signup/dicioFields'
import Titulo from '../../components/Titulo'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const SearchProfessionals = () => {
    const {
        register,
        handleSubmit,
        errors,
        setValue,
        reset
    } = useForm()

    const [dados, setDados] = useState([])
    const [showAdvanced, setShowAdvanced] = useState(false)
    const [selectedAreas, setAreas] = React.useState([]);
    const registerUser = useStoreActions(actions => actions.user.registerProfessional)
    const [isLoading, setLoader] = useState({
        city: false,
        submit: false
    });

    const formatCheckboxFields = (field) => {
        const identifiers = Object.keys(field)
        return identifiers.filter((i) => field[i])
    };

    const handleChange = (e, value) => setAreas(value)

    const onSubmit = (data) => {
        const formatted = showAdvanced ? {
            ...data,
            expertise_areas: selectedAreas
        } : {
                expertise_areas: selectedAreas
            };

        console.log(formatted)

        setDados(formatted)
    };

    const clearForm = () => {
        console.log('clear');
        setAreas([]);
        reset();
    };

    const programIsLoading = () => {
        setLoader({ ...isLoading, city: true })
        setTimeout(() => {
            setLoader({ ...isLoading, city: false })
        }, 2000);
    };

    const handleRadio = (field, selectedOption) => setValue(field, (selectedOption.toLowerCase() === 'true'))

    // TODO: req hasNoRegister p/ validar se o usuário tem algum registro como profissional ou empresa. Se sim, redireciona para o dashboard, se não, mantém na página.

    return (
        <div>
            <Container center="true" maxWidth="md">
                <Titulo> Busca de Profissionais </Titulo>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>

                        <Grid item sm={10} xs={8}>
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

                        <Grid item sm={2} xs={4} alignItems="center" onClick={() => setShowAdvanced(!showAdvanced)}>
                            <Button styles={{ display: 'block', width: '100%' }}>Mais <ExpandMoreIcon /></Button>
                        </Grid>
                        {
                            showAdvanced && (
                                <>
                                    <Grid item xs={6} sm={4}>
                                        <FormControl fullWidth>
                                            <InputLabel shrink htmlFor="select-multiple-native">
                                                Auto-Declaração
                                        </InputLabel>
                                            <Select
                                                multiple
                                                native
                                                variant="filled"
                                                inputRef={register}
                                                name="self_declaration"
                                            >
                                                {selfDeclaration.map((name) => (
                                                    <option key={name} value={name} key={`self-${name}`}>
                                                        {name}
                                                    </option>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={6} sm={4}>
                                        <FormControl fullWidth>
                                            <InputLabel shrink htmlFor="select-multiple-native">
                                                Gênero
                                        </InputLabel>
                                            <Select
                                                multiple
                                                native
                                                variant="filled"
                                                inputRef={register}
                                                name="gender"
                                            >
                                                {gender.map((name) => (
                                                    <option key={name} value={name} key={name}>
                                                        {name}
                                                    </option>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={6} sm={4}>
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
                                    <Grid item xs={6} sm={12}>
                                        <Switch
                                            name="pcd"
                                            label="PcD (Pessoa com deficiência)"
                                            register={register}
                                        />
                                        <Switch
                                            name="company_registry"
                                            label="Possui CNPJ"
                                            register={register}
                                        />
                                    </Grid>
                                </>
                            )
                        }
                    </Grid>
                    <Grid container alignItems="center" style={{ margin: '20px 0' }} xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            styles={{ display: 'block', width: '100%' }}
                            isLoading={isLoading.submit}
                        >
                            Buscar
                    </Button>
                    </Grid>
                </form>

                {/* <Button styles={{ marginLeft: 30 }} onClick={() => {clearForm() }}>
                Limpar
            </Button> */}

            <br/><br/>

            </Container>

            <Container center="true" maxWidth="lg">
                {Object.keys(dados).length > 0 && <ResultSearchProfessionals data={dados} />}
            </Container>
        </div>
    )
}


export default SearchProfessionals
