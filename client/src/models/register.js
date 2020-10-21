import { thunk, action } from 'easy-peasy'
import axios from 'axios'
import history from '../history'
import { getUserType } from '../utils/service'

const registerModel = {
  registerProfessional: thunk(async (actions, payload) => {
    try {
      await axios.post('/api/professional/register', payload)
      return history.push(`/dashboard/${getUserType(payload.type)}`)
    }
    catch (err) {
      console.log(err)
      const error = {
        professional: err.response.data && err.response.data.register
      }
      return actions.setErrors(error)
    }
  }),
  
  registerCompany: thunk(async (actions, payload) => {
    try {
      await axios.post('/api/enterprise/register', payload)
      return history.push(`/dashboard/${getUserType(payload.type)}`)
    }
    catch (err) {
      console.log(err)
      const error = {
        enterprise: err.response.data && err.response.data.register
      }
      return actions.setErrors(error)
    }
  }),
  registerUser: thunk(async (actions, payload) => {
    try {
      await axios.post('/api/user/register', payload)
      if (payload.type == "admin") {
        return history.push('/painel/admin/administradores') 
      } else {
        return history.push('/entrar?register=ok')
      }
    }
    catch (err) {
      console.log(err)
      const error = {
        user: err.response.data.register || err.response.data.email
      }
      return actions.setErrors(error)
    }
  }),
  error: {},
  setErrors: action((state, payload) => ({
    error: payload
  }))
}


export default registerModel