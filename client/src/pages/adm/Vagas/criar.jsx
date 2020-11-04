import React, { useState } from 'react';
import { Container } from "@material-ui/core";
import { useForm } from 'react-hook-form'
import { useStoreActions, useStoreState } from 'easy-peasy'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import states from '../../../assets/states.json'
import cities from '../../../assets/cities.json'
import { functions, hiringType } from '../../Signup/dicioFields'
import Button from '../../../comps/Button'
import Checkbox from '../../../comps/Checkbox'
import { Error, Success } from '../../../components/Status'
import { parseDate, normalizeArrayData } from '../../../utils/formatter'
import Titulo from "../../../components/Titulo";
import SwitchLabels from "../../../comps/Switch";
import Carregando from "../../../components/loading/carregando";
import Erro from "../../../components/erro";
import cicloCacheJSON from "../../../assets/cicloCache.json";
import Select from '../../../comps/Select';


const AdmCriarVagaPagina =  async () => {
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null)

  const { register, handleSubmit, errors, reset } = useForm()
  const registerJob = useStoreActions(actions => actions.enterprise.registerJob)
  const registerError = useStoreState(state => state.enterprise.error)
  const [selectedDate, setSelectedDate] = React.useState({})
  const [status, setStatus] = useState('')
  const [citiesFromStates, setCities] = useState([])
  const stateList = list => list.map(uf => ({ value: uf.id, name: uf.name }))

  const handleDateChange = (date) => {
    setSelectedDate({ ...selectedDate, ...date });
  };

  const handleCities = state => {
    const filteredCities = cities.filter(city => city.state_id == state)
    setCities(filteredCities)
  }

  const onSubmit = data => {
    setCarregando(true);
    try {
      const period = `${parseDate(selectedDate.start)}-${parseDate(selectedDate.end)}`
  
      for (let s in states) {
        if (states[s].id === Number(data.state)) data.stateName = states[s].name
      }
  
      const formatted = {
        ...data,
        hiring_type: normalizeArrayData(data.hiring_type),
        total_period: period,
        status: 'Aguardando pagamento'
      }
      registerJob(formatted)
    } catch (error) {
      setErro("Ocorreu um erro, verifique todos os campos digitados e tente novamente!");
    }
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
                <Container center="true" maxWidth="md">
                 
                  <br /><br />
                </Container>
              )
            }
          </div>
        )
      }
    </div>
  )
}

export default AdmCriarVagaPagina;
