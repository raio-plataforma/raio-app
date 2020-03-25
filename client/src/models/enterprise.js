import { thunk, action } from 'easy-peasy'
import history from '../history'
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
  editProfessional: thunk(async (actions, payload) => {
    try {
      await axios.put(`/api/enterprise/edit/${payload.id}`, payload)
      return history.push(`/dashboard/empresa`)
    }
    catch (e) {
      actions.setError(e)
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
  getEnterpriseById: thunk(async (actions, payload) => {
    try {
      const enterprise = await axios.get(`/api/enterprise/${payload}`)
      
      actions.setEnterprises({
        id: enterprise.data._id,
        enterprise_name: enterprise.data.enterprise_name,
        foundation_date: enterprise.data.foundation_date,
        presentation: enterprise.data.presentation,
        links: enterprise.data.links,
        diversity_functions: enterprise.data.diversity_functions,
        identity_content: enterprise.data.identity_content,
        cnpj_type: enterprise.data.cnpjType,
        identity_segments: enterprise.data.identity_segments,
        business_segments: enterprise.data.business_segments,
        business_fields: enterprise.data.business_fields,
        other_states: enterprise.data.other_states,
        city: enterprise.data.city,
        state: enterprise.data.state,
        apan_associate: enterprise.data.apan_associate
      })

      console.log("foi")
    }
    catch (e) {
      actions.setError(e)
      console.log('deu ruim')
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