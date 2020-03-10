import { thunk, action } from 'easy-peasy'
import axios from 'axios'

const userModel = {
  user: {},
  error: {},
  getUser: thunk(async (actions, payload) => {
    try {
      const user = await axios.get('/api/user/current')
      const userTypeData = await axios.get(`/api/${payload}`)
      // Set current user profile
      actions.setUser({
        ...user.data,
        ...userTypeData.data,
        enterprise_id: userTypeData.data._id
      })
    }
    catch (e) {
      throw e
    }
  }),
  getUserById: thunk(async (actions, payload) => {
    try {
      const user = await axios.get(`/api/user/${payload}`)
      const enterprise = await axios.get(`/api/enterprise/${payload}`)
      // Set current user profile
      
      actions.setUser({
        name: user.data.name,
        email: user.data.email,
        gender: user.data.gender,
        phone: user.data.phone,
        self_declaration: user.data.self_declaration,
        ...enterprise.data
      })
    }
    catch (e) {
      console.log('deu ruim')
      throw e
    }
  }),
  getAllUsers: thunk(async (actions) => {
    try {
      return await axios.get('/api/user/all')
    }
    catch (err) {
      console.log(err)
      const error = err.response.data && err.response.data.users
      actions.setError(error)
    }
  }),
  getProfessionalAll: thunk(async () => {
    try {
      return await axios.get('/api/professional/all')
    }
    catch (err) {
      console.log(err)
      return err.response
    }
  }),
  setUser: action((state, payload) => ({
    user: { ...payload }
  })),
  setError: action((state, payload) => ({
    error: payload
  }))
}

export default userModel