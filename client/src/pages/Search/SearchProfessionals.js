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
  const [personName, setPersonName] = React.useState([]);
  const registerUser = useStoreActions(actions => actions.user.registerProfessional)
  const [isLoading, setLoader] = useState({
    city: false,
    submit: false
  })

  const formatCheckboxFields = (field) => {
    const identifiers = Object.keys(field)
    return identifiers.filter((i) => field[i])
  }

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  const onSubmit = (data) => {
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
        <form onChange={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
      <Grid container xs={1}  alignItems="center">
        <Typography>Filtrar por: </Typography>
      </Grid>
      <Grid item xs={10}>
      <Autocomplete
        multiple
        id="tags-standard"
        options={functions}
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField
          {...params}
          name="acmm"
          onChange={e => console.log(e.target.value)}
            inputRef={register}
            variant="filled"
            label="Multiple values"
            placeholder="Favorites"
          />
        )}
      />
      </Grid>
      <Grid container xs={1}  alignItems="center">
        <Button >
          + Avançada
        </Button>
      </Grid>
        <Grid item xs={4} md={2}>
          <Select
            label="Auto Declaração"
            register={register}
            name="selfDeclaration"
            error={errors.selfDeclaration && errors.selfDeclaration.message}
            firstValue="Auto Declaração"
          >
            {selfDeclaration.map(item =>
              <option value={item} key={uuid()}>{item}</option>
            )}
          </Select>
        </Grid>
        <Grid item xs={4} md={2}>
          <Select
            label="Gênero"
            register={register}
            name="gender"
            error={errors.gender && errors.gender.message}
            firstValue="Gênero"
          >
            {gender.map(item =>
              <option value={item} key={uuid()}>{item}</option>
            )}
          </Select>
        </Grid>
        <Grid item xs={4} md={2}>
          <Radios
            label="PcD (Pessoa com deficiência)"
            error={errors.pcd && errors.pcd.message}
            onChange={e => handleRadio('pcd', e.target.value)}
            name="pcd"
          />
        </Grid>
        <Grid item xs={4} md={2}>
          <Radios
        label="Possui CNPJ"
        onChange={e => handleRadio('companyRegistry', e.target.value)}
        error={errors.companyRegistry && errors.companyRegistry.message}
        name="companyRegistry"
      />
        </Grid>
        <Grid item xs={4} md={2}>
          <Select
            label="Estado de residência"
            error={errors.currentState && errors.currentState.message}
            name="currentState"
            firstValue="Estado"
            register={register}
            onChange={programIsLoading}
          >
            {states.map(item =>
              <option value={item.name} key={item.id}>{item.name}</option>
            )}
          </Select>
        </Grid>
          {/* <Checkboxes
            label="Áreas de atuação"
            register={register}
            fields={functions}
            name="expertiseAreas"
          /> */}
          

          
          
          

          

      

      
      </Grid>
      <Button
        type="submit"
        variant="contained"
        isLoading={isLoading.submit}
      >
        Buscar
      </Button>
      
      </form>
    
      
          <ResultSearchProfessionals data={dados} />
      
    </Container>
  )
}


export default SearchProfessionals