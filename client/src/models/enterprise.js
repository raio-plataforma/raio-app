import { thunk, action } from 'easy-peasy'
import axios from 'axios'

const enterpriseModel = {
  registerJob: thunk(async (actions, payload) => {
    try {
      await axios.post('/api/job', payload)
      return {
        status: 200,
        msg: 'Sua vaga foi postada!'
      }
    }
    catch (err) {
      console.log(err)
      const error = err.response.data && err.response.data.job
      actions.setError(error)
    }
  }),
  getAllEnterpriseUsers: thunk(async (actions, payload) => {
    try {
      const enterprises = await axios.get('/api/enterprise/all')
      const users = await axios.get('/api/user/all')
      const fuse = (users.data)
        .filter(userFilter => userFilter.type === 'enterprise')
        .map(user => {
          const enterprise = (enterprises.data).filter(i => i.user_id === user._id)
          if (enterprise.length > 0) {
            return {
              ...enterprise[0],
              ...user,
              enterprise_id: enterprise[0]._id,
              enterprise_name: enterprise[0].name
            }
          }
          return false
        })
      actions.setEnterprises(fuse)
    }
    catch (err) {
      console.log(err)
      const error = err.response.data && err.response.data.enterprises
      actions.setError(error)
    }
  }),
  getAll: thunk(async (actions, payload) => {
    try {
      return await axios.get('/api/enterprise/all')
    }
    catch (err) {
      console.log(err)
      return err.response
    } 
  }),
  enterprises: [],
  setEnterprises: action((state, payload) => ({
    enterprises: payload
  })),
  error: {},
  setError: action((state, payload) => ({
    error: payload
  }))
}

export default enterpriseModel