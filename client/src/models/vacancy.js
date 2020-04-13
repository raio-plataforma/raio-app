import { thunk, action } from 'easy-peasy'
import axios from 'axios'

const vacancyModel = {
  getAllVacancies: thunk(async (actions, payload) => {
    // all specific enterpise vacancies
    try {
      const res = payload && await axios.get(`/api/job/all/${payload}`)
      actions.setVacancies(res && res.data)
    }
    catch (err) {
      console.log(err)
    }
  }),
  getAllJobs: thunk(async (actions) => {
    try {
      return await axios.get('/api/job/')
    }
    catch (err) {
      console.log(err)
      const error = err.response.data && err.response.data.jobs
      actions.setError(error)
    }
  }),
  vancancies: [],
  setVacancies: action((state, payload) => ({
    vacancies: payload
  })),
  error: {},
  setError: action((state, payload) => ({
    error: payload
  }))
}

export default vacancyModel