import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useStoreActions } from 'easy-peasy'
import Typography from '@material-ui/core/Typography'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import MenuItem from '@material-ui/core/MenuItem'
import Input from '@material-ui/core/Input'
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Grid from '@material-ui/core/Grid'
import uuid from 'uuid'

import Button from '../../comps/Button'

import Checkboxes from '../../components/Checkboxes'
import Radios from '../../components/Radios'
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


const SearchProfessionals = () => {
  const {
    register,
    handleSubmit,
    errors,
    setValue
  } = useForm()

  const [form, setForm] = useState(true)
  const [dados, setDados] = useState([])
  const [showAdvanced, handleAdvanced] = useState(false)
  const [selectedAreas, setAreas] = React.useState([]);
  const registerUser = useStoreActions(actions => actions.user.registerProfessional)
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
    // data.expertiseAreas = personName
    // const formatted = {
    //   pcd: data.pcd,
    //   gender: data.gender,
    //   cnpj: data.companyRegistry,
    //   self_declaration: data.selfDeclaration,
    //   state: data.currentState,
    //   expertise_areas: formatCheckboxFields(data.expertiseAreas)
    // }
    console.log('data =>', data)
    // setDados(formatted)
    setForm(false)
  }

  const programIsLoading = () => {
    setLoader({ ...isLoading, city: true })
    setTimeout(() => { setLoader({ ...isLoading, city: false }) }, 2000);
  }

  const handleRadio = (field, selectedOption) => setValue(field, (selectedOption.toLowerCase() === 'true'))

  // TODO: req hasNoRegister p/ validar se o usuário tem algum registro como profissional ou empresa. Se sim, redireciona para o dashboard, se não, mantém na página.

  return (
    <Container fixed>        
      <Typography component="h2" variant="h4">Busca de Profissionais</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid container xs={1}  alignItems="center">
              <Typography>Filtrar por: </Typography>
            </Grid>

            <Grid item xs={9}>
              <Autocomplete
                multiple
                options={functions}
                onChange={handleChange}
                defaultValue={selectedAreas}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="expertiseAreas"
                    inputRef={register}
                    variant="filled"
                    label="Áreas de atuação"
                    placeholder="Adicione as áreas de atuação"
                  />
                )}
              />
            </Grid>

            <Grid container xs={2}  alignItems="center" onClick={() => handleAdvanced(!showAdvanced)}>
              <Button>Busca Avançada</Button>
            </Grid>
            {
              showAdvanced && (
                <>
                  <Grid item xs={4} md={2}>
                    <FormControl fullWidth>
                      <InputLabel shrink htmlFor="select-multiple-native">
                        Auto-Declaração
                      </InputLabel>
                      <Select
                        multiple
                        native
                        variant="filled"
                        inputRef={register}
                        name="selfDeclaration"
                      >
                        {selfDeclaration.map((name) => (
                          <option key={name} value={name}>
                            {name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={4} md={2}>
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
                          <option key={name} value={name}>
                            {name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4} md={3}>
                    <Switch
                      name="pcd"
                      label="PcD (Pessoa com deficiência)"
                      register={register}
                    />
                    <Switch
                      name="companyRegistry"
                      label="Possui CNPJ"
                      register={register}
                    />
                    
                  </Grid>
                  <Grid item xs={4} md={3}>
                    <FormControl fullWidth>
                      <InputLabel shrink htmlFor="select-multiple-native">
                        Estado de residência
                      </InputLabel>
                      <Select
                        multiple
                        native
                        variant="filled"
                        inputRef={register}
                        name="currentState"
                      >
                        {states.map((name) => (
                          <option key={name.uf} value={name.uf}>
                            {name.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid container alignItems="center" xs={4} md={2}>
                    <Button
                      type="submit"
                      variant="contained"
                      isLoading={isLoading.submit}
                    >
                      Buscar
                    </Button>
                  </Grid>
                </>
              )
            }
          </Grid>
          
      
        </form>
    
      
          <ResultSearchProfessionals data={dados} />
      
    </Container>
  )
}


export default SearchProfessionals