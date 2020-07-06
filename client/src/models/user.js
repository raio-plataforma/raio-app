import { thunk, action } from 'easy-peasy'
import history from '../history'
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
      const userTypeData = await axios.get(`/api/professional`)
      // Set current user profile
      actions.setUser({
        id: user.data._id,
        name: user.data.name,
        email: user.data.email,
        phone: user.data.phone,
        gender: user.data.gender,
        type: user.data.type,
        self_declaration: user.data.self_declaration,
        ...userTypeData.data,
        enterprise_id: userTypeData.data._id
      })
    }
    catch (e) {
      actions.setError(e)
    }
  }),
  editUser: thunk(async (actions, payload) => {
    try {
      await axios.put(`/api/user/edit/${payload.type}/${payload.id}`, payload)
      const type = payload.type === 'enterprise' ? 'empresa' : 'profissional'
      return history.push(`/dashboard/${type}`)
    }
    catch (e) {
      actions.setError(e)
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
  setUser: action((state, payload) =>
      ({
        user: { ...payload }
      })
  ),
  setError: action((state, payload) => ({
    error: payload
  }))
}

export default userModel
