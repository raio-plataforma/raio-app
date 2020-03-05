import { thunk, action } from 'easy-peasy'
import axios from 'axios'

const professionalModel = {
  getAllProfessionals: thunk(async (actions, payload) => {
    try {
      const res = await axios.get('/api/professional/all')

      actions.setprofessionals(
        res.data.filter(user => user.type === 'professional')
      )
    }
    catch (err) {
      console.log(err)
      const error = err.response.data && err.response.data.professionals
      actions.setError(error)
    }
  }),
  professionals: [],
  setProfessionals: action((state, payload) => ({
    professionals: [...payload]
  })),
  error: {},
  setError: action((state, payload) => ({
    error: payload
  }))
}

export default professionalModel